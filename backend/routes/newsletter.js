import express from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validation.js';
import { newsletterValidation } from '../utils/validation.js';
import { subscribeToNewsletter } from '../utils/email.js';

const router = express.Router();
const prisma = new PrismaClient();

// @desc    S'abonner à la newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
router.post('/subscribe', 
  validate(newsletterValidation.subscribe),
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
      // Vérifier si l'email existe déjà
      const existingSubscription = await prisma.newsletterSubscription.findUnique({
        where: { email }
      });

      if (existingSubscription) {
        if (existingSubscription.isActive) {
          return res.status(400).json({
            success: false,
            message: 'Cette adresse email est déjà abonnée à la newsletter.'
          });
        } else {
          // Réactiver l'abonnement
          await prisma.newsletterSubscription.update({
            where: { email },
            data: {
              isActive: true,
              subscribedAt: new Date()
            }
          });
        }
      } else {
        // Créer un nouvel abonnement
        await prisma.newsletterSubscription.create({
          data: {
            email,
            isActive: true,
            subscribedAt: new Date()
          }
        });
      }

      // Ajouter à Brevo
      await subscribeToNewsletter(email);

      res.status(201).json({
        success: true,
        message: 'Inscription à la newsletter réussie ! Vous recevrez bientôt nos derniers articles.'
      });

    } catch (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'inscription. Veuillez réessayer plus tard.'
      });
    }
  })
);

// @desc    Se désabonner de la newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
router.post('/unsubscribe',
  validate(newsletterValidation.unsubscribe),
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
      const subscription = await prisma.newsletterSubscription.findUnique({
        where: { email }
      });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'Aucun abonnement trouvé pour cette adresse email.'
        });
      }

      // Désactiver l'abonnement
      await prisma.newsletterSubscription.update({
        where: { email },
        data: {
          isActive: false,
          unsubscribedAt: new Date()
        }
      });

      res.json({
        success: true,
        message: 'Désabonnement réussi. Vous ne recevrez plus nos emails.'
      });

    } catch (error) {
      console.error('Erreur lors du désabonnement:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du désabonnement. Veuillez réessayer plus tard.'
      });
    }
  })
);

// @desc    Obtenir les statistiques de la newsletter (Admin)
// @route   GET /api/newsletter/stats
// @access  Private/Admin
router.get('/stats', asyncHandler(async (req, res) => {
  const totalSubscribers = await prisma.newsletterSubscription.count({
    where: { isActive: true }
  });

  const totalUnsubscribed = await prisma.newsletterSubscription.count({
    where: { isActive: false }
  });

  const recentSubscriptions = await prisma.newsletterSubscription.count({
    where: {
      isActive: true,
      subscribedAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 derniers jours
      }
    }
  });

  res.json({
    success: true,
    data: {
      totalSubscribers,
      totalUnsubscribed,
      recentSubscriptions
    }
  });
}));

export default router;