import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Composant atomique pour les boutons d'authentification
 */
export const AuthButton = ({ 
  to, 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'border border-purple-600 text-purple-500 hover:bg-purple-600 hover:text-white'
  };

  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200";
  const variantClasses = variants[variant] || variants.primary;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
};

/**
 * Composant pour le bouton mobile menu
 */
export const MobileMenuButton = ({ 
  isOpen = false,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-white hover:text-purple-500 transition-colors duration-200 ${className}`}
      {...props}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-1' : ''
        }`} />
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 my-1 ${
          isOpen ? 'opacity-0' : ''
        }`} />
        <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-1' : ''
        }`} />
      </div>
    </button>
  );
};