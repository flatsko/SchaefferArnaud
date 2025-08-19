import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { userProfileSchema } from '../utils/validation.js';
import { generateReferralCode } from '../utils/jwt.js';

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Obtenir tous les utilisateurs (Admin seulement)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, role } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (role) {
    where.role = role;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: {
            orders: true,
            tickets: true,
            referrals: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir un utilisateur par ID
// @route   GET /api/users/:id
// @access  Private/Admin ou propriétaire
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Vérifier les permissions
  if (req.user.role !== 'ADMIN' && req.user.id !== id) {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
      referredBy: true,
      _count: {
        select: {
          orders: true,
          tickets: true,
          referrals: true,
          referredUsers: true
        }
      }
    }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    });
  }

  res.json({
    success: true,
    data: { user }
  });
}));

// @desc    Mettre à jour le profil utilisateur
// @route   PUT /api/users/:id
// @access  Private (propriétaire ou admin)
router.put('/:id', authenticate, validate(userProfileSchema), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, currentPassword, newPassword } = req.body;
  
  // Vérifier les permissions
  if (req.user.role !== 'ADMIN' && req.user.id !== id) {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    });
  }

  const updateData = {};
  
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  
  // Vérifier si l'email est déjà utilisé
  if (email && email !== user.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }
    
    updateData.email = email;
  }
  
  // Changer le mot de passe si demandé
  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel requis'
      });
    }
    
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }
    
    const saltRounds = 12;
    updateData.password = await bcrypt.hash(newPassword, saltRounds);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      lastLoginAt: true
    }
  });

  res.json({
    success: true,
    message: 'Profil mis à jour avec succès',
    data: { user: updatedUser }
  });
}));

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    });
  }

  // Supprimer l'utilisateur (cascade défini dans le schéma)
  await prisma.user.delete({
    where: { id }
  });

  res.json({
    success: true,
    message: 'Utilisateur supprimé avec succès'
  });
}));

// @desc    Changer le rôle d'un utilisateur
// @route   PATCH /api/users/:id/role
// @access  Private/Admin
router.patch('/:id/role', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['USER', 'ADMIN'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Rôle invalide'
    });
  }

  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    });
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true
    }
  });

  res.json({
    success: true,
    message: 'Rôle mis à jour avec succès',
    data: { user: updatedUser }
  });
}));

// @desc    Obtenir les statistiques utilisateur
// @route   GET /api/users/:id/stats
// @access  Private (propriétaire ou admin)
router.get('/:id/stats', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Vérifier les permissions
  if (req.user.role !== 'ADMIN' && req.user.id !== id) {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  const [orderStats, ticketStats, referralStats] = await Promise.all([
    // Statistiques des commandes
    prisma.order.aggregate({
      where: { userId: id },
      _count: { id: true },
      _sum: { totalAmount: true }
    }),
    
    // Statistiques des tickets
    prisma.ticket.groupBy({
      by: ['status'],
      where: { userId: id },
      _count: { id: true }
    }),
    
    // Statistiques de parrainage
    prisma.referral.aggregate({
      where: { referrerId: id },
      _count: { id: true },
      _sum: { commissionAmount: true }
    })
  ]);

  res.json({
    success: true,
    data: {
      orders: {
        total: orderStats._count.id || 0,
        totalAmount: orderStats._sum.totalAmount || 0
      },
      tickets: ticketStats.reduce((acc, stat) => {
        acc[stat.status.toLowerCase()] = stat._count.id;
        return acc;
      }, {}),
      referrals: {
        total: referralStats._count.id || 0,
        totalCommission: referralStats._sum.commissionAmount || 0
      }
    }
  });
}));

// @desc    Créer un code de parrainage
// @route   POST /api/users/:id/referral-code
// @access  Private (propriétaire ou admin)
router.post('/:id/referral-code', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Vérifier les permissions
  if (req.user.role !== 'ADMIN' && req.user.id !== id) {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  // Vérifier si l'utilisateur a déjà un code actif
  const existingReferral = await prisma.referral.findFirst({
    where: {
      referrerId: id,
      status: 'PENDING'
    }
  });

  if (existingReferral) {
    return res.status(400).json({
      success: false,
      message: 'Vous avez déjà un code de parrainage actif',
      data: { code: existingReferral.code }
    });
  }

  // Générer un nouveau code
  const code = await generateReferralCode();
  
  const referral = await prisma.referral.create({
    data: {
      referrerId: id,
      code,
      commissionRate: parseFloat(process.env.REFERRAL_COMMISSION_RATE) || 0.1
    }
  });

  res.status(201).json({
    success: true,
    message: 'Code de parrainage créé avec succès',
    data: { referral }
  });
}));

export default router;