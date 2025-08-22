import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour détecter les breakpoints responsive
 * @param {string} query - Media query string (ex: '(min-width: 768px)')
 * @returns {boolean} - État correspondant à la media query
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(media.matches);
    };

    updateMatches();
    media.addEventListener('change', updateMatches);

    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
};

// Hooks pré-configurés pour les breakpoints courants
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');