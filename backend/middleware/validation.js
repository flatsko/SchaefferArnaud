/**
 * Middleware de validation utilisant Joi
 * Valide les données de la requête selon un schéma donné
 */

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