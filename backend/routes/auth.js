import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { createSession, deleteSession, generateResetToken } from '../utils/jwt.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../utils/email.js';
import { registerSchema, loginSchema, resetPasswordSchema } from '../utils/validation.js';

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validate(registerSchema), asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, referralCode } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Un utilisateur avec cet email existe déjà'
    });
  }

  // Hasher le mot de passe
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Vérifier le code de parrainage si fourni
  let referrer = null;
  if (referralCode) {
    const referral = await prisma.referral.findUnique({
      where: { code: referralCode },
      include: { referrer: true }
    });

    if (!referral) {
      return res.status(400).json({
        success: false,
        message: 'Code de parrainage invalide'
      });
    }

    referrer = referral.referrer;
  }

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      referredBy: referrer?.id
    }
  });

  // Créer une session
  const { session, token } = await createSession(user.id);

  // Envoyer l'email de bienvenue
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Erreur envoi email de bienvenue:', error);
  }

  // Traiter le parrainage si applicable
  if (referrer) {
    try {
      await prisma.referral.update({
        where: { code: referralCode },
        data: {
          referredUserId: user.id,
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Erreur mise à jour parrainage:', error);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Inscription réussie',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    }
  });
}));

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validate(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Trouver l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email ou mot de passe incorrect'
    });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Email ou mot de passe incorrect'
    });
  }

  // Créer une session
  const { session, token } = await createSession(user.id);

  // Mettre à jour la dernière connexion
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  });

  res.json({
    success: true,
    message: 'Connexion réussie',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    }
  });
}));

// @desc    Déconnexion utilisateur
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', authenticate, asyncHandler(async (req, res) => {
  // Supprimer la session
  await deleteSession(req.session.id);

  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
}));

// @desc    Obtenir le profil utilisateur actuel
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
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
    data: { user }
  });
}));

// @desc    Demande de réinitialisation de mot de passe
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email requis'
    });
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // Ne pas révéler si l'email existe ou non
    return res.json({
      success: true,
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé'
    });
  }

  // Générer un token de réinitialisation
  const resetToken = generateResetToken();
  const resetTokenExpiry = new Date();
  resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // 1 heure

  // Sauvegarder le token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry
    }
  });

  // Envoyer l'email
  try {
    await sendPasswordResetEmail(user, resetToken);
  } catch (error) {
    console.error('Erreur envoi email réinitialisation:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email'
    });
  }

  res.json({
    success: true,
    message: 'Si cet email existe, un lien de réinitialisation a été envoyé'
  });
}));

// @desc    Réinitialisation de mot de passe
// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', validate(resetPasswordSchema), asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  // Trouver l'utilisateur avec le token valide
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date()
      }
    }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Token invalide ou expiré'
    });
  }

  // Hasher le nouveau mot de passe
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Mettre à jour le mot de passe et supprimer le token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  res.json({
    success: true,
    message: 'Mot de passe réinitialisé avec succès'
  });
}));

export default router;