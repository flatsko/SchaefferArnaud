/**
 * Configuration centralisée de la navigation
 */

export const ROUTES = {
  HOME: '/',
  SERVICES: {
    ROOT: '/services',
    WEB_DEVELOPMENT: '/services/developpement-web',
    HOSTING: '/services/hebergement-maintenance',
    SEO: '/services/seo-referencement'
  },
  PORTFOLIO: '/portfolio',
  JOURNAL: '/journal',
  ABOUT: '/about',
  CONTACT: '/contact',
  REFERRAL: '/parrainage',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout'
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
    SHOP: '/dashboard/shop',
    TICKETS: '/dashboard/tickets'
  },
  ADMIN: '/admin'
};

export const NAVIGATION_CONFIG = [
  {
    name: "Accueil",
    href: ROUTES.HOME,
    hasDropdown: false,
  },
  {
    name: "Services",
    href: ROUTES.SERVICES.ROOT,
    hasDropdown: true,
    subItems: [
      { name: "Développement Web", href: ROUTES.SERVICES.WEB_DEVELOPMENT },
      { name: "Hébergement & Maintenance", href: ROUTES.SERVICES.HOSTING },
      { name: "SEO & Référencement", href: ROUTES.SERVICES.SEO },
    ],
  },
  { name: "Portfolio", href: ROUTES.PORTFOLIO, hasDropdown: false },
  { name: "Journal", href: ROUTES.JOURNAL, hasDropdown: false },
  { name: "À propos", href: ROUTES.ABOUT, hasDropdown: false },
  { name: "Contact", href: ROUTES.CONTACT, hasDropdown: false },
  { name: "Parrainage", href: ROUTES.REFERRAL, hasDropdown: false },
];

export const BREAKPOINTS = {
  MOBILE: 767,
  TABLET: 1023,
  DESKTOP: 1024
};

export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 200,
    MEDIUM: 300,
    SLOW: 600
  },
  SPRING: {
    STIFFNESS: 500,
    DAMPING: 30
  }
};