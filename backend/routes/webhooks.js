import express from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler.js';
import { sendOrderConfirmationEmail, sendReferralSuccessEmail } from '../utils/email.js';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware pour vérifier la signature Stripe
const verifyStripeSignature = (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    return res.status(400).json({
      success: false,
      message: 'Signature Stripe manquante ou secret webhook non configuré'
    });
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    req.stripeEvent = event;
    next();
  } catch (err) {
    console.error('❌ Erreur signature webhook Stripe:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Signature webhook invalide'
    });
  }
};

// @desc    Webhook Stripe pour gérer les événements de paiement
// @route   POST /api/webhooks/stripe
// @access  Public (mais sécurisé par signature)
router.post('/stripe', express.raw({ type: 'application/json' }), verifyStripeSignature, asyncHandler(async (req, res) => {
  const event = req.stripeEvent;

  console.log(`🔔 Webhook Stripe reçu: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      default:
        console.log(`⚠️ Événement Stripe non géré: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('❌ Erreur traitement webhook Stripe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur traitement webhook'
    });
  }
}));

// Gérer le succès d'un PaymentIntent (commandes)
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('💳 PaymentIntent réussi:', paymentIntent.id);

  // Trouver la commande correspondante
  const order = await prisma.order.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    console.error('❌ Commande non trouvée pour PaymentIntent:', paymentIntent.id);
    return;
  }

  // Mettre à jour le statut de la commande
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'CONFIRMED',
      paidAt: new Date()
    },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  // Envoyer l'email de confirmation
  try {
    await sendOrderConfirmationEmail(order.user, updatedOrder);
    console.log('📧 Email de confirmation envoyé pour la commande:', order.id);
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation commande:', error);
  }

  // Traiter le parrainage si applicable
  if (order.user.referredBy) {
    await processReferralCommission(order.user, updatedOrder.totalAmount);
  }
}

// Gérer l'échec d'un PaymentIntent
async function handlePaymentIntentFailed(paymentIntent) {
  console.log('❌ PaymentIntent échoué:', paymentIntent.id);

  const order = await prisma.order.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id }
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'FAILED' }
    });
  }
}

// Gérer le succès d'un paiement de facture (abonnements)
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('💳 Paiement facture réussi:', invoice.id);

  if (invoice.subscription) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: invoice.subscription },
      include: { user: true, plan: true }
    });

    if (subscription) {
      // Mettre à jour l'abonnement
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: 'ACTIVE',
          currentPeriodStart: new Date(invoice.period_start * 1000),
          currentPeriodEnd: new Date(invoice.period_end * 1000)
        }
      });

      // Traiter le parrainage pour les nouveaux abonnements
      if (subscription.user.referredBy && subscription.status !== 'ACTIVE') {
        await processReferralCommission(subscription.user, subscription.plan.price);
      }
    }
  }
}

// Gérer l'échec d'un paiement de facture
async function handleInvoicePaymentFailed(invoice) {
  console.log('❌ Paiement facture échoué:', invoice.id);

  if (invoice.subscription) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: invoice.subscription }
    });

    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'PAST_DUE' }
      });
    }
  }
}

// Gérer la création d'un abonnement
async function handleSubscriptionCreated(subscription) {
  console.log('📅 Abonnement créé:', subscription.id);
  // La création est déjà gérée côté application
}

// Gérer la mise à jour d'un abonnement
async function handleSubscriptionUpdated(subscription) {
  console.log('📅 Abonnement mis à jour:', subscription.id);

  const dbSubscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (dbSubscription) {
    const updateData = {
      status: subscription.status.toUpperCase(),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    };

    if (subscription.canceled_at) {
      updateData.cancelledAt = new Date(subscription.canceled_at * 1000);
    }

    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: updateData
    });
  }
}

// Gérer la suppression d'un abonnement
async function handleSubscriptionDeleted(subscription) {
  console.log('📅 Abonnement supprimé:', subscription.id);

  const dbSubscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (dbSubscription) {
    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date()
      }
    });
  }
}

// Gérer la completion d'une session de checkout
async function handleCheckoutSessionCompleted(session) {
  console.log('🛒 Session checkout complétée:', session.id);

  // Gérer selon le mode de la session
  if (session.mode === 'subscription') {
    // Abonnement via Checkout
    if (session.subscription) {
      const subscription = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: session.subscription },
        include: { user: true, plan: true }
      });

      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: 'ACTIVE' }
        });
      }
    }
  } else if (session.mode === 'payment') {
    // Paiement unique via Checkout
    if (session.payment_intent) {
      await handlePaymentIntentSucceeded({ id: session.payment_intent });
    }
  }
}

// Traiter la commission de parrainage
async function processReferralCommission(referredUser, amount) {
  try {
    const referral = await prisma.referral.findFirst({
      where: {
        referredUserId: referredUser.id,
        status: 'PENDING'
      },
      include: {
        referrer: true
      }
    });

    if (!referral) {
      console.log('⚠️ Aucun parrainage trouvé pour l\'utilisateur:', referredUser.id);
      return;
    }

    // Calculer la commission
    const commissionAmount = amount * referral.commissionRate;

    // Mettre à jour le parrainage
    const updatedReferral = await prisma.referral.update({
      where: { id: referral.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        commissionAmount
      },
      include: {
        referrer: true,
        referredUser: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    // Envoyer l'email de félicitations
    try {
      await sendReferralSuccessEmail(
        updatedReferral.referrer,
        updatedReferral.referredUser,
        commissionAmount
      );
      console.log('📧 Email de parrainage envoyé à:', updatedReferral.referrer.email);
    } catch (error) {
      console.error('❌ Erreur envoi email parrainage:', error);
    }

    console.log(`💰 Commission de parrainage traitée: ${commissionAmount}€ pour ${updatedReferral.referrer.email}`);
  } catch (error) {
    console.error('❌ Erreur traitement commission parrainage:', error);
  }
}

// @desc    Webhook de test pour vérifier la configuration
// @route   POST /api/webhooks/test
// @access  Public (en développement seulement)
if (process.env.NODE_ENV === 'development') {
  router.post('/test', asyncHandler(async (req, res) => {
    console.log('🧪 Webhook de test reçu:', req.body);
    
    res.json({
      success: true,
      message: 'Webhook de test reçu',
      timestamp: new Date().toISOString(),
      body: req.body
    });
  }));
}

export default router;