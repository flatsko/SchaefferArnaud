import Joi from 'joi';

// Schémas de validation pour l'authentification
export const authValidation = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email invalide',
      'any.required': 'Email requis'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'any.required': 'Mot de passe requis'
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le prénom doit contenir au moins 2 caractères',
      'string.max': 'Le prénom ne peut pas dépasser 50 caractères',
      'any.required': 'Prénom requis'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères',
      'any.required': 'Nom requis'
    }),
    phone: Joi.string().pattern(/^[+]?[0-9\s\-\(\)]{10,}$/).optional().messages({
      'string.pattern.base': 'Numéro de téléphone invalide'
    }),
    referralCode: Joi.string().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email invalide',
      'any.required': 'Email requis'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Mot de passe requis'
    })
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email invalide',
      'any.required': 'Email requis'
    })
  }),

  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Token requis'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'any.required': 'Mot de passe requis'
    })
  })
};

// Schémas de validation pour les utilisateurs
export const userValidation = {
  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^[+]?[0-9\s\-\(\)]{10,}$/).optional().allow(''),
    avatar: Joi.string().uri().optional().allow('')
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Mot de passe actuel requis'
    }),
    newPassword: Joi.string().min(8).required().messages({
      'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères',
      'any.required': 'Nouveau mot de passe requis'
    })
  })
};

// Schémas de validation pour les tickets
export const ticketValidation = {
  create: Joi.object({
    subject: Joi.string().min(5).max(200).required().messages({
      'string.min': 'Le sujet doit contenir au moins 5 caractères',
      'string.max': 'Le sujet ne peut pas dépasser 200 caractères',
      'any.required': 'Sujet requis'
    }),
    description: Joi.string().min(10).max(2000).required().messages({
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 2000 caractères',
      'any.required': 'Description requise'
    }),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').optional()
  }),

  addMessage: Joi.object({
    message: Joi.string().min(1).max(2000).required().messages({
      'string.min': 'Le message ne peut pas être vide',
      'string.max': 'Le message ne peut pas dépasser 2000 caractères',
      'any.required': 'Message requis'
    })
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED').required().messages({
      'any.only': 'Statut invalide',
      'any.required': 'Statut requis'
    })
  })
};

// Schémas de validation pour les commandes
export const orderValidation = {
  create: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    ).min(1).required().messages({
      'array.min': 'Au moins un article requis'
    })
  })
};

// Middleware de validation
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Données invalides',
        details: errors
      });
    }
    
    next();
  };
};