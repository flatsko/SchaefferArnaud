import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { generateReferralCode } from '../utils/jwt.js';
import { sendReferralSuccessEmail } from '../utils/email.js';

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Obtenir les parrainages de l'utilisateur
// @route   GET /api/referrals/my-referrals
// @access  Private
router.get('/my-referrals', authenticate, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const [referrals, total, stats] = await Promise.all([
    prisma.referral.findMany({
      where: { referrerId: req.user.id },
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        referredUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.referral.count({
      where: { referrerId: req.user.id }
    }),
    prisma.referral.aggregate({
      where: { referrerId: req.user.id },
      _count: { id: true },
      _sum: { commissionAmount: true }
    })
  ]);

  res.json({
    success: true,
    data: {
      referrals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        totalReferrals: stats._count.id || 0,
        totalCommissions: stats._sum.commissionAmount || 0,
        pendingReferrals: referrals.filter(r => r.status === 'PENDING').length,
        completedReferrals: referrals.filter(r => r.status === 'COMPLETED').length
      }
    }
  });
}));

// @desc    Créer un nouveau code de parrainage
// @route   POST /api/referrals/create-code
// @access  Private
router.post('/create-code', authenticate, asyncHandler(async (req, res) => {
  // Vérifier si l'utilisateur a déjà un code actif
  const existingReferral = await prisma.referral.findFirst({
    where: {
      referrerId: req.user.id,
      status: 'PENDING'
    }
  });

  if (existingReferral) {
    return res.status(400).json({
      success: false,
      message: 'Vous avez déjà un code de parrainage actif',
      data: { 
        code: existingReferral.code,
        createdAt: existingReferral.createdAt
      }
    });
  }

  // Générer un nouveau code
  const code = await generateReferralCode();
  const commissionRate = parseFloat(process.env.REFERRAL_COMMISSION_RATE) || 0.1;
  
  const referral = await prisma.referral.create({
    data: {
      referrerId: req.user.id,
      code,
      commissionRate
    }
  });

  res.status(201).json({
    success: true,
    message: 'Code de parrainage créé avec succès',
    data: { referral }
  });
}));

// @desc    Vérifier la validité d'un code de parrainage
// @route   GET /api/referrals/verify/:code
// @access  Public
router.get('/verify/:code', asyncHandler(async (req, res) => {
  const { code } = req.params;

  const referral = await prisma.referral.findUnique({
    where: { code },
    include: {
      referrer: {
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });

  if (!referral) {
    return res.status(404).json({
      success: false,
      message: 'Code de parrainage invalide'
    });
  }

  if (referral.status !== 'PENDING') {
    return res.status(400).json({
      success: false,
      message: 'Ce code de parrainage a déjà été utilisé'
    });
  }

  res.json({
    success: true,
    message: 'Code de parrainage valide',
    data: {
      code: referral.code,
      referrer: referral.referrer,
      commissionRate: referral.commissionRate
    }
  });
}));

// @desc    Traiter un parrainage (appelé lors de l'inscription)
// @route   POST /api/referrals/process
// @access  Private (utilisé en interne)
router.post('/process', authenticate, asyncHandler(async (req, res) => {
  const { referralCode, newUserId } = req.body;

  if (!referralCode || !newUserId) {
    return res.status(400).json({
      success: false,
      message: 'Code de parrainage et ID utilisateur requis'
    });
  }

  const referral = await prisma.referral.findUnique({
    where: { code: referralCode },
    include: {
      referrer: true
    }
  });

  if (!referral || referral.status !== 'PENDING') {
    return res.status(400).json({
      success: false,
      message: 'Code de parrainage invalide ou déjà utilisé'
    });
  }

  // Calculer la commission (peut être basée sur un montant fixe ou un pourcentage)
  const baseCommission = parseFloat(process.env.REFERRAL_BASE_COMMISSION) || 10; // 10€ par défaut
  const commissionAmount = baseCommission * referral.commissionRate;

  // Mettre à jour le parrainage
  const updatedReferral = await prisma.referral.update({
    where: { id: referral.id },
    data: {
      referredUserId: newUserId,
      status: 'COMPLETED',
      completedAt: new Date(),
      commissionAmount
    },
    include: {
      referrer: true,
      referredUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  // Envoyer un email de félicitations au parrain
  try {
    await sendReferralSuccessEmail(
      updatedReferral.referrer,
      updatedReferral.referredUser,
      commissionAmount
    );
  } catch (error) {
    console.error('Erreur envoi email parrainage:', error);
  }

  res.json({
    success: true,
    message: 'Parrainage traité avec succès',
    data: { referral: updatedReferral }
  });
}));

// @desc    Obtenir les statistiques de parrainage d'un utilisateur
// @route   GET /api/referrals/stats
// @access  Private
router.get('/stats', authenticate, asyncHandler(async (req, res) => {
  const [totalStats, monthlyStats, recentReferrals] = await Promise.all([
    // Statistiques totales
    prisma.referral.aggregate({
      where: { referrerId: req.user.id },
      _count: { id: true },
      _sum: { commissionAmount: true }
    }),
    
    // Statistiques mensuelles
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "completedAt") as month,
        COUNT(*) as referrals,
        SUM("commissionAmount") as commissions
      FROM "Referral"
      WHERE "referrerId" = ${req.user.id}
        AND status = 'COMPLETED'
        AND "completedAt" IS NOT NULL
      GROUP BY DATE_TRUNC('month', "completedAt")
      ORDER BY month DESC
      LIMIT 12
    `,
    
    // Parrainages récents
    prisma.referral.findMany({
      where: {
        referrerId: req.user.id,
        status: 'COMPLETED'
      },
      include: {
        referredUser: {
          select: {
            firstName: true,
            lastName: true,
            createdAt: true
          }
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 5
    })
  ]);

  // Calculer le taux de conversion
  const pendingCount = await prisma.referral.count({
    where: {
      referrerId: req.user.id,
      status: 'PENDING'
    }
  });

  const completedCount = totalStats._count.id || 0;
  const totalCodes = completedCount + pendingCount;
  const conversionRate = totalCodes > 0 ? (completedCount / totalCodes) * 100 : 0;

  res.json({
    success: true,
    data: {
      total: {
        referrals: completedCount,
        commissions: totalStats._sum.commissionAmount || 0,
        pendingCodes: pendingCount,
        conversionRate: Math.round(conversionRate * 100) / 100
      },
      monthly: monthlyStats,
      recent: recentReferrals
    }
  });
}));

// @desc    Obtenir tous les parrainages (Admin seulement)
// @route   GET /api/referrals
// @access  Private/Admin
router.get('/', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, referrerId } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;
  if (referrerId) where.referrerId = referrerId;

  const [referrals, total] = await Promise.all([
    prisma.referral.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        referrer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        referredUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.referral.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      referrals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir les statistiques globales de parrainage (Admin seulement)
// @route   GET /api/referrals/admin/stats
// @access  Private/Admin
router.get('/admin/stats', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const [statusStats, topReferrers, monthlyStats] = await Promise.all([
    // Statistiques par statut
    prisma.referral.groupBy({
      by: ['status'],
      _count: { id: true },
      _sum: { commissionAmount: true }
    }),
    
    // Top parrains
    prisma.referral.groupBy({
      by: ['referrerId'],
      where: { status: 'COMPLETED' },
      _count: { id: true },
      _sum: { commissionAmount: true },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    }),
    
    // Statistiques mensuelles globales
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "completedAt") as month,
        COUNT(*) as referrals,
        SUM("commissionAmount") as commissions,
        COUNT(DISTINCT "referrerId") as active_referrers
      FROM "Referral"
      WHERE status = 'COMPLETED'
        AND "completedAt" IS NOT NULL
      GROUP BY DATE_TRUNC('month', "completedAt")
      ORDER BY month DESC
      LIMIT 12
    `
  ]);

  res.json({
    success: true,
    data: {
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status.toLowerCase()] = {
          count: stat._count.id,
          commissions: stat._sum.commissionAmount || 0
        };
        return acc;
      }, {}),
      topReferrers,
      monthly: monthlyStats
    }
  });
}));

// @desc    Mettre à jour le taux de commission d'un parrainage
// @route   PATCH /api/referrals/:id/commission
// @access  Private/Admin
router.patch('/:id/commission', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { commissionRate, commissionAmount } = req.body;

  const referral = await prisma.referral.findUnique({
    where: { id }
  });

  if (!referral) {
    return res.status(404).json({
      success: false,
      message: 'Parrainage non trouvé'
    });
  }

  const updateData = {};
  if (commissionRate !== undefined) {
    updateData.commissionRate = parseFloat(commissionRate);
  }
  if (commissionAmount !== undefined) {
    updateData.commissionAmount = parseFloat(commissionAmount);
  }

  const updatedReferral = await prisma.referral.update({
    where: { id },
    data: updateData,
    include: {
      referrer: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  res.json({
    success: true,
    message: 'Commission mise à jour avec succès',
    data: { referral: updatedReferral }
  });
}));

export default router;