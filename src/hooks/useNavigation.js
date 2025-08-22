import { useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook pour gérer la navigation et les états actifs
 * @param {Array} navigationItems - Configuration de navigation
 * @returns {Object} - États et fonctions de navigation
 */
export const useNavigation = (navigationItems) => {
  const location = useLocation();
  
  const [openDropdowns, setOpenDropdowns] = useState({});

  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  const isAnySubActive = useCallback((subItems) => {
    return subItems?.some(sub => location.pathname === sub.href) || false;
  }, [location.pathname]);

  const toggleDropdown = useCallback((key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const closeDropdown = useCallback((key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: false
    }));
  }, []);

  const processedNavigation = useMemo(() => {
    return navigationItems.map(item => ({
      ...item,
      isActive: isActive(item.href),
      isAnySubActive: isAnySubActive(item.subItems),
      isDropdownOpen: openDropdowns[item.name] || false
    }));
  }, [navigationItems, isActive, isAnySubActive, openDropdowns]);

  return {
    processedNavigation,
    isActive,
    isAnySubActive,
    toggleDropdown,
    closeDropdown,
    openDropdowns
  };
};

import { NAVIGATION_CONFIG } from '../config/navigation.config';

// Configuration de navigation par défaut
export const defaultNavigation = NAVIGATION_CONFIG;