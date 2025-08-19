import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware d'authentification
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Token d\'authentification requis' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists and is valid
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true
          }
        }
      }
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ 
        error: 'Session expirée ou invalide' 
      });
    }

    if (!session.user.isActive) {
      return res.status(401).json({ 
        error: 'Compte désactivé' 
      });
    }

    // Add user to request object
    req.user = session.user;
    req.sessionId = session.id;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token invalide' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expiré' 
      });
    }
    
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ 
      error: 'Erreur interne du serveur' 
    });
  }
};

// Middleware de vérification des rôles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentification requise' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Permissions insuffisantes' 
      });
    }

    next();
  };
};

// Middleware pour vérifier si l'utilisateur peut accéder à ses propres données
export const authorizeOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentification requise' 
    });
  }

  const userId = req.params.userId || req.params.id;
  
  if (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN' || req.user.id === userId) {
    next();
  } else {
    return res.status(403).json({ 
      error: 'Accès non autorisé' 
    });
  }
};

// Middleware optionnel d'authentification (pour les routes publiques avec données utilisateur optionnelles)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue sans utilisateur
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true
          }
        }
      }
    });

    if (session && session.expiresAt >= new Date() && session.user.isActive) {
      req.user = session.user;
      req.sessionId = session.id;
    }
    
    next();
  } catch (error) {
    // En cas d'erreur, continuer sans utilisateur
    next();
  }
};