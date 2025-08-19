import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Obtenir tous les plans d'abonnement
// @route   GET /api/subscriptions/plans
// @access  Public
router.get('/plans', asyncHandler(async (req, res) => {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' }
  });

  res.json({
    success: true,
    data: { plans }
  });
}));

// @desc    Créer un nouveau plan (Admin seulement)
// @route   POST /api/subscriptions/plans
// @access  Private/Admin
router.post('/plans', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { name, description, price, duration, features, stripeProductId, stripePriceId } = req.body;

  if (!name || !price || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Nom, prix et durée sont requis'
    });
  }

  const plan = await prisma.plan.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      duration,
      features: features || [],
      stripeProductId,
      stripePriceId
    }
  });

  res.status(201).json({
    success: true,
    message: 'Plan créé avec succès',
    data: { plan }
  });
}));

// @desc    Mettre à jour un plan
// @route   PUT /api/subscriptions/plans/:id
// @access  Private/Admin
router.put('/plans/:id', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration, features, isActive } = req.body;

  const plan = await prisma.plan.findUnique({
    where: { id }
  });

  if (!plan) {
    return res.status(404).json({
      success: false,
      message: 'Plan non trouvé'
    });
  }

  const updatedPlan = await prisma.plan.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(duration && { duration }),
      ...(features && { features }),
      ...(typeof isActive === 'boolean' && { isActive })
    }
  });

  res.json({
    success: true,
    message: 'Plan mis à jour avec succès',
    data: { plan: updatedPlan }
  });
}));

// @desc    Obtenir les abonnements de l'utilisateur
// @route   GET /api/subscriptions/my-subscriptions
// @access  Private
router.get('/my-subscriptions', authenticate, asyncHandler(async (req, res) => {
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: req.user.id },
    include: {
      plan: true
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({
    success: true,
    data: { subscriptions }
  });
}));

// @desc    Créer un abonnement
// @route   POST /api/subscriptions/subscribe
// @access  Private
router.post('/subscribe', authenticate, asyncHandler(async (req, res) => {
  const { planId, paymentMethodId } = req.body;

  if (!planId) {
    return res.status(400).json({
      success: false,
      message: 'ID du plan requis'
    });
  }

  // Vérifier que le plan existe
  const plan = await prisma.plan.findUnique({
    where: { id: planId }
  });

  if (!plan || !plan.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Plan non trouvé ou inactif'
    });
  }

  // Vérifier si l'utilisateur a déjà un abonnement actif pour ce plan
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      userId: req.user.id,
      planId,
      status: 'ACTIVE'
    }
  });

  if (existingSubscription) {
    return res.status(400).json({
      success: false,
      message: 'Vous avez déjà un abonnement actif pour ce plan'
    });
  }

  try {
    // Créer le customer Stripe si nécessaire
    let stripeCustomerId = req.user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: `${req.user.firstName} ${req.user.lastName}`,
        metadata: {
          userId: req.user.id
        }
      });
      
      stripeCustomerId = customer.id;
      
      // Mettre à jour l'utilisateur avec l'ID Stripe
      await prisma.user.update({
        where: { id: req.user.id },
        data: { stripeCustomerId }
      });
    }

    // Créer l'abonnement Stripe
    const stripeSubscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{
        price: plan.stripePriceId
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      ...(paymentMethodId && {
        default_payment_method: paymentMethodId
      })
    });

    // Calculer la date d'expiration
    const expiresAt = new Date();
    switch (plan.duration) {
      case 'MONTHLY':
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        break;
      case 'YEARLY':
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        break;
      case 'LIFETIME':
        expiresAt.setFullYear(expiresAt.getFullYear() + 100); // 100 ans pour "à vie"
        break;
    }

    // Créer l'abonnement en base
    const subscription = await prisma.subscription.create({
      data: {
        userId: req.user.id,
        planId,
        stripeSubscriptionId: stripeSubscription.id,
        status: stripeSubscription.status === 'active' ? 'ACTIVE' : 'PENDING',
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        expiresAt
      },
      include: {
        plan: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Abonnement créé avec succès',
      data: {
        subscription,
        clientSecret: stripeSubscription.latest_invoice?.payment_intent?.client_secret
      }
    });
  } catch (error) {
    console.error('Erreur création abonnement Stripe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'abonnement'
    });
  }
}));

// @desc    Annuler un abonnement
// @route   DELETE /api/subscriptions/:id
// @access  Private
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subscription = await prisma.subscription.findUnique({
    where: { id },
    include: { plan: true }
  });

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: 'Abonnement non trouvé'
    });
  }

  // Vérifier que l'utilisateur est propriétaire ou admin
  if (subscription.userId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  if (subscription.status === 'CANCELLED') {
    return res.status(400).json({
      success: false,
      message: 'Abonnement déjà annulé'
    });
  }

  try {
    // Annuler l'abonnement Stripe
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
    }

    // Mettre à jour le statut en base
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date()
      },
      include: { plan: true }
    });

    res.json({
      success: true,
      message: 'Abonnement annulé avec succès',
      data: { subscription: updatedSubscription }
    });
  } catch (error) {
    console.error('Erreur annulation abonnement Stripe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'annulation de l\'abonnement'
    });
  }
}));

// @desc    Obtenir tous les abonnements (Admin seulement)
// @route   GET /api/subscriptions
// @access  Private/Admin
router.get('/', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, planId } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;
  if (planId) where.planId = planId;

  const [subscriptions, total] = await Promise.all([
    prisma.subscription.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        plan: true
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.subscription.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      subscriptions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir les statistiques des abonnements
// @route   GET /api/subscriptions/stats
// @access  Private/Admin
router.get('/stats', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const [statusStats, planStats, revenueStats] = await Promise.all([
    // Statistiques par statut
    prisma.subscription.groupBy({
      by: ['status'],
      _count: { id: true }
    }),
    
    // Statistiques par plan
    prisma.subscription.groupBy({
      by: ['planId'],
      _count: { id: true },
      include: {
        plan: {
          select: { name: true }
        }
      }
    }),
    
    // Revenus mensuels
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        COUNT(*) as subscriptions,
        SUM(p.price) as revenue
      FROM "Subscription" s
      JOIN "Plan" p ON s."planId" = p.id
      WHERE s.status = 'ACTIVE'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
      LIMIT 12
    `
  ]);

  res.json({
    success: true,
    data: {
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status.toLowerCase()] = stat._count.id;
        return acc;
      }, {}),
      byPlan: planStats,
      monthlyRevenue: revenueStats
    }
  });
}));

export default router;