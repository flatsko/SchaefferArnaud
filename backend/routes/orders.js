import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { orderSchema } from '../utils/validation.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Obtenir tous les produits
// @route   GET /api/orders/products
// @access  Public
router.get('/products', asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const where = { isActive: true };
  
  if (category) {
    where.category = category;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir un produit par ID
// @route   GET /api/orders/products/:id
// @access  Public
router.get('/products/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Produit non trouvé'
    });
  }

  res.json({
    success: true,
    data: { product }
  });
}));

// @desc    Créer un nouveau produit (Admin seulement)
// @route   POST /api/orders/products
// @access  Private/Admin
router.post('/products', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { name, description, price, category, images, stripeProductId, stripePriceId } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Nom et prix sont requis'
    });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      category,
      images: images || [],
      stripeProductId,
      stripePriceId
    }
  });

  res.status(201).json({
    success: true,
    message: 'Produit créé avec succès',
    data: { product }
  });
}));

// @desc    Mettre à jour un produit
// @route   PUT /api/orders/products/:id
// @access  Private/Admin
router.put('/products/:id', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, images, isActive } = req.body;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produit non trouvé'
    });
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(category && { category }),
      ...(images && { images }),
      ...(typeof isActive === 'boolean' && { isActive })
    }
  });

  res.json({
    success: true,
    message: 'Produit mis à jour avec succès',
    data: { product: updatedProduct }
  });
}));

// @desc    Supprimer un produit
// @route   DELETE /api/orders/products/:id
// @access  Private/Admin
router.delete('/products/:id', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produit non trouvé'
    });
  }

  await prisma.product.delete({
    where: { id }
  });

  res.json({
    success: true,
    message: 'Produit supprimé avec succès'
  });
}));

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private
router.post('/', authenticate, validate(orderSchema), asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethodId } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Au moins un article est requis'
    });
  }

  // Vérifier que tous les produits existent et calculer le total
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });

    if (!product || !product.isActive) {
      return res.status(400).json({
        success: false,
        message: `Produit ${item.productId} non trouvé ou inactif`
      });
    }

    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = product.price * quantity;
    totalAmount += itemTotal;

    orderItems.push({
      productId: product.id,
      quantity,
      price: product.price,
      total: itemTotal
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
      
      await prisma.user.update({
        where: { id: req.user.id },
        data: { stripeCustomerId }
      });
    }

    // Créer le PaymentIntent Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convertir en centimes
      currency: 'eur',
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: `${process.env.FRONTEND_URL}/orders/success`,
      metadata: {
        userId: req.user.id,
        orderType: 'product_purchase'
      }
    });

    // Créer la commande en base
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        status: paymentIntent.status === 'succeeded' ? 'CONFIRMED' : 'PENDING',
        shippingAddress,
        stripePaymentIntentId: paymentIntent.id,
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Envoyer l'email de confirmation si le paiement est réussi
    if (paymentIntent.status === 'succeeded') {
      try {
        await sendOrderConfirmationEmail(req.user, order);
      } catch (error) {
        console.error('Erreur envoi email confirmation:', error);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      data: {
        order,
        clientSecret: paymentIntent.client_secret,
        requiresAction: paymentIntent.status === 'requires_action'
      }
    });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la commande'
    });
  }
}));

// @desc    Obtenir les commandes de l'utilisateur
// @route   GET /api/orders/my-orders
// @access  Private
router.get('/my-orders', authenticate, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (page - 1) * limit;

  const where = { userId: req.user.id };
  if (status) where.status = status;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.order.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Obtenir une commande par ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      },
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Commande non trouvée'
    });
  }

  // Vérifier les permissions
  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Accès refusé'
    });
  }

  res.json({
    success: true,
    data: { order }
  });
}));

// @desc    Obtenir toutes les commandes (Admin seulement)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, userId } = req.query;
  const skip = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;
  if (userId) where.userId = userId;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.order.count({ where })
  ]);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
}));

// @desc    Mettre à jour le statut d'une commande
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
router.patch('/:id/status', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Statut invalide'
    });
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true
    }
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Commande non trouvée'
    });
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  res.json({
    success: true,
    message: 'Statut de la commande mis à jour',
    data: { order: updatedOrder }
  });
}));

// @desc    Obtenir les statistiques des commandes
// @route   GET /api/orders/stats
// @access  Private/Admin
router.get('/stats', authenticate, authorize(['ADMIN']), asyncHandler(async (req, res) => {
  const [statusStats, revenueStats, topProducts] = await Promise.all([
    // Statistiques par statut
    prisma.order.groupBy({
      by: ['status'],
      _count: { id: true },
      _sum: { totalAmount: true }
    }),
    
    // Revenus mensuels
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        COUNT(*) as orders,
        SUM("totalAmount") as revenue
      FROM "Order"
      WHERE status IN ('CONFIRMED', 'SHIPPED', 'DELIVERED')
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
      LIMIT 12
    `,
    
    // Produits les plus vendus
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      _count: { id: true },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    })
  ]);

  res.json({
    success: true,
    data: {
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status.toLowerCase()] = {
          count: stat._count.id,
          revenue: stat._sum.totalAmount || 0
        };
        return acc;
      }, {}),
      monthlyRevenue: revenueStats,
      topProducts
    }
  });
}));

export default router;