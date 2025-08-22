import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Composant atomique pour les liens de navigation
 */
export const NavigationLink = ({ 
  to, 
  children, 
  isActive = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "px-3 py-2 text-sm font-medium transition-colors duration-200";
  const activeClasses = isActive ? 'text-purple-500' : 'text-white hover:text-purple-500';
  
  return (
    <Link
      to={to}
      className={`${baseClasses} ${activeClasses} ${className}`}
      {...props}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
          layoutId="activeTab"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

/**
 * Composant pour les boutons de navigation avec dropdown
 */
export const NavigationDropdown = ({ 
  label, 
  items = [], 
  isOpen = false,
  isActive = false,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  ...props 
}) => {
  return (
    <div 
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-purple-500' : 'text-white hover:text-purple-500'
        }`}
        onClick={onToggle}
        {...props}
      >
        {label}
        <svg 
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
          {items.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-3 text-sm text-gray-100 hover:text-purple-500 hover:bg-gray-700 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};