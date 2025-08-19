import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ticketSchema, ticketMessageSchema, ticketStatusSchema } from '../utils/validation.js';
import { sendTicketNotificationEmail } from '../utils/email.js';

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Créer un nouveau ticket
// @route   POST /api/tickets
// @access  Private
router.post('/', authenticate, validate(ticketSchema), asyncHandler(async (req, res) => {
  const { subject, description, priority = 'MEDIUM', category } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      userId: req.user.id,
      subject,
      description,
      priority,
      category,
      status: 'OPEN'
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  // Envoyer une notification email
  try {
    await sendTicketNotificationEmail(req.user, ticket, true);
  } catch (error) {
    console.error('Erreur envoi email ticket:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Ticket créé avec succès',
    data: { ticket }
  });
}));

// @desc    Obtenir les tickets de l'utilisateur
// @route   GET /api/tickets/my-tickets
// @access  Private
router.get('/my-tickets', authenticate, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, priority } = req.query;
  const skip = (page - 1) * limit;

  const where = { userId: req.user.id };
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.ticket.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      tickets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir un ticket par ID
// @route   GET /api/tickets/:id
// @access  Private
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      messages: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Ticket non trouvé'
    });
  }

  // Vérifier les permissions
  if (ticket.userId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  res.json({
    success: true,
    data: { ticket }
  });
}));

// @desc    Ajouter un message à un ticket
// @route   POST /api/tickets/:id/messages
// @access  Private
router.post('/:id/messages', authenticate, validate(ticketMessageSchema), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, attachments } = req.body;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: true
    }
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Ticket non trouvé'
    });
  }

  // Vérifier les permissions
  if (ticket.userId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  // Créer le message
  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: id,
      userId: req.user.id,
      content,
      attachments: attachments || [],
      isFromAdmin: req.user.role === 'ADMIN'
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true
        }
      }
    }
  });

  // Mettre à jour le ticket (dernière activité et statut si nécessaire)
  const updateData = {
    updatedAt: new Date()
  };

  // Si c'est un admin qui répond, changer le statut à IN_PROGRESS
  if (req.user.role === 'ADMIN' && ticket.status === 'OPEN') {
    updateData.status = 'IN_PROGRESS';
  }
  // Si c'est l'utilisateur qui répond et le ticket était fermé, le rouvrir
  else if (req.user.role !== 'ADMIN' && ticket.status === 'CLOSED') {
    updateData.status = 'OPEN';
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id },
    data: updateData
  });

  // Envoyer une notification email si c'est une réponse admin
  if (req.user.role === 'ADMIN' && ticket.userId !== req.user.id) {
    try {
      await sendTicketNotificationEmail(ticket.user, updatedTicket, false);
    } catch (error) {
      console.error('Erreur envoi email ticket:', error);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Message ajouté avec succès',
    data: { message }
  });
}));

// @desc    Mettre à jour le statut d'un ticket
// @route   PATCH /api/tickets/:id/status
// @access  Private
router.patch('/:id/status', authenticate, validate(ticketStatusSchema), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: true
    }
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Ticket non trouvé'
    });
  }

  // Vérifier les permissions
  if (ticket.userId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  // Les utilisateurs ne peuvent que fermer leurs propres tickets
  if (req.user.role !== 'ADMIN' && status !== 'CLOSED') {
    return res.status(403).json({
      success: false,
      message: 'Vous ne pouvez que fermer vos tickets'
    });
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id },
    data: {
      status,
      ...(status === 'CLOSED' && { closedAt: new Date() })
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  // Envoyer une notification si le statut change
  try {
    await sendTicketNotificationEmail(ticket.user, updatedTicket, false);
  } catch (error) {
    console.error('Erreur envoi email ticket:', error);
  }

  res.json({
    success: true,
    message: 'Statut du ticket mis à jour',
    data: { ticket: updatedTicket }
  });
}));

// @desc    Obtenir tous les tickets (Admin seulement)
// @route   GET /api/tickets
// @access  Private/Admin
router.get('/', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, priority, userId, category } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (userId) where.userId = userId;
  if (category) where.category = category;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    }),
    prisma.ticket.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      tickets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Assigner un ticket à un admin
// @route   PATCH /api/tickets/:id/assign
// @access  Private/Admin
router.patch('/:id/assign', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assignedToId } = req.body;

  const ticket = await prisma.ticket.findUnique({
    where: { id }
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Ticket non trouvé'
    });
  }

  // Vérifier que l'utilisateur assigné est un admin
  if (assignedToId) {
    const assignedUser = await prisma.user.findUnique({
      where: { id: assignedToId }
    });

    if (!assignedUser || assignedUser.role !== 'ADMIN') {
      return res.status(400).json({
        success: false,
        message: 'L\'utilisateur assigné doit être un administrateur'
      });
    }
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id },
    data: {
      assignedToId,
      status: assignedToId ? 'IN_PROGRESS' : ticket.status
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  res.json({
    success: true,
    message: assignedToId ? 'Ticket assigné avec succès' : 'Assignment retiré',
    data: { ticket: updatedTicket }
  });
}));

// @desc    Obtenir les statistiques des tickets
// @route   GET /api/tickets/stats
// @access  Private/Admin
router.get('/stats', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const [statusStats, priorityStats, categoryStats, responseTimeStats] = await Promise.all([
    // Statistiques par statut
    prisma.ticket.groupBy({
      by: ['status'],
      _count: { id: true }
    }),
    
    // Statistiques par priorité
    prisma.ticket.groupBy({
      by: ['priority'],
      _count: { id: true }
    }),
    
    // Statistiques par catégorie
    prisma.ticket.groupBy({
      by: ['category'],
      _count: { id: true },
      where: {
        category: {
          not: null
        }
      }
    }),
    
    // Temps de réponse moyen (tickets fermés)
    prisma.$queryRaw`
      SELECT 
        AVG(EXTRACT(EPOCH FROM ("closedAt" - "createdAt"))/3600) as avg_resolution_hours,
        COUNT(*) as resolved_tickets
      FROM "Ticket"
      WHERE status = 'CLOSED' AND "closedAt" IS NOT NULL
    `
  ]);

  // Tickets créés par mois
  const monthlyStats = await prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('month', "createdAt") as month,
      COUNT(*) as tickets,
      COUNT(CASE WHEN status = 'CLOSED' THEN 1 END) as resolved
    FROM "Ticket"
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY month DESC
    LIMIT 12
  `;

  res.json({
    success: true,
    data: {
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status.toLowerCase()] = stat._count.id;
        return acc;
      }, {}),
      byPriority: priorityStats.reduce((acc, stat) => {
        acc[stat.priority.toLowerCase()] = stat._count.id;
        return acc;
      }, {}),
      byCategory: categoryStats.reduce((acc, stat) => {
        acc[stat.category] = stat._count.id;
        return acc;
      }, {}),
      responseTime: responseTimeStats[0] || { avg_resolution_hours: 0, resolved_tickets: 0 },
      monthly: monthlyStats
    }
  });
}));

// @desc    Supprimer un ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({
    where: { id }
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Ticket non trouvé'
    });
  }

  // Supprimer le ticket (cascade défini dans le schéma pour les messages)
  await prisma.ticket.delete({
    where: { id }
  });

  res.json({
    success: true,
    message: 'Ticket supprimé avec succès'
  });
}));

// @desc    Obtenir les tickets assignés à l'admin connecté
// @route   GET /api/tickets/assigned-to-me
// @access  Private/Admin
router.get('/assigned-to-me', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (page - 1) * limit;

  const where = { assignedToId: req.user.id };
  if (status) where.status = status;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { updatedAt: 'desc' }
      ]
    }),
    prisma.ticket.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      tickets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

export default router;