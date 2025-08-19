import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Générer un token JWT
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Vérifier un token JWT
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Créer une session utilisateur
export const createSession = async (userId) => {
  const token = generateToken({ userId });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 jours

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });

  return { session, token };
};

// Supprimer une session
export const deleteSession = async (sessionId) => {
  await prisma.session.delete({
    where: { id: sessionId }
  });
};

// Supprimer toutes les sessions d'un utilisateur
export const deleteAllUserSessions = async (userId) => {
  await prisma.session.deleteMany({
    where: { userId }
  });
};

// Nettoyer les sessions expirées
export const cleanExpiredSessions = async () => {
  const result = await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  });
  
  console.log(`🧹 ${result.count} sessions expirées supprimées`);
  return result.count;
};

// Générer un token de réinitialisation de mot de passe
export const generateResetToken = () => {
  return uuidv4();
};

// Générer un code de parrainage unique
export const generateReferralCode = async () => {
  const length = parseInt(process.env.REFERRAL_CODE_LENGTH) || 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Vérifier l'unicité
    const existing = await prisma.referral.findUnique({
      where: { code }
    });
    
    if (!existing) {
      isUnique = true;
    }
  }
  
  return code;
};