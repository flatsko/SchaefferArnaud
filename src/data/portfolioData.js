export const categories = [
  { id: 'all', name: 'Tous les projets' },
  { id: 'web', name: 'Applications Web' },
  { id: 'vitrine', name: 'Sites Vitrine' },
  { id: 'ecommerce', name: 'E-commerce' }
];

export const projects = [
  {
    id: 1,
    title: 'EcoShop - Plateforme E-commerce',
    category: 'ecommerce',
    description: 'Plateforme e-commerce moderne avec paiement Stripe et gestion d\'inventaire en temps réel.',
    longDescription: 'EcoShop est une plateforme e-commerce complète développée pour une startup spécialisée dans les produits écologiques. Le projet inclut un système de gestion des commandes, des paiements sécurisés via Stripe, un tableau de bord administrateur complet, et une interface utilisateur moderne et responsive.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    liveUrl: 'https://ecoshop-demo.com',
    githubUrl: 'https://github.com/arnaud/ecoshop',
    features: [
      'Interface utilisateur moderne et responsive',
      'Système de paiement sécurisé avec Stripe',
      'Gestion d\'inventaire en temps réel',
      'Tableau de bord administrateur',
      'Système de recommandations',
      'Optimisation SEO avancée'
    ],
    client: 'EcoStart',
    duration: '3 mois',
    year: '2023'
  },
  {
    id: 2,
    title: 'Avocat Premium - Site Vitrine',
    category: 'vitrine',
    description: 'Site vitrine premium pour cabinet d\'avocat avec design sophistiqué et optimisation SEO.',
    longDescription: 'Site vitrine haut de gamme développé pour un cabinet d\'avocat prestigieux. Design élégant et professionnel, optimisation SEO avancée, formulaires de contact sécurisés, et présentation des services juridiques avec une approche premium.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'EmailJS'],
    liveUrl: 'https://avocat-premium.com',
    githubUrl: 'https://github.com/arnaud/avocat-premium',
    features: [
      'Design premium et élégant',
      'Optimisation SEO avancée',
      'Formulaires de contact sécurisés',
      'Animations fluides et modernes',
      'Responsive design parfait',
      'Performance optimisée'
    ],
    client: 'Cabinet Juridique Prestige',
    duration: '2 mois',
    year: '2023'
  },
  {
    id: 3,
    title: 'Architecte Design - Site Vitrine',
    category: 'vitrine',
    description: 'Site vitrine artistique pour architecte avec galerie interactive et design avant-gardiste.',
    longDescription: 'Site vitrine créatif développé pour un architecte renommé. Interface artistique avec galerie de projets interactive, animations 3D, présentation immersive des réalisations, et design avant-gardiste reflétant l\'expertise créative du client.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
    technologies: ['React', 'Three.js', 'GSAP', 'Tailwind CSS', 'Netlify'],
    liveUrl: 'https://architecte-design.com',
    githubUrl: 'https://github.com/arnaud/architecte-design',
    features: [
      'Galerie interactive 3D',
      'Animations artistiques avancées',
      'Design avant-gardiste',
      'Portfolio immersif',
      'Interface intuitive',
      'Performance optimisée'
    ],
    client: 'Studio Architecture Moderne',
    duration: '3 mois',
    year: '2022'
  },
  {
    id: 4,
    title: 'LearnHub - Plateforme E-learning',
    category: 'web',
    description: 'Plateforme d\'apprentissage en ligne avec vidéos interactives et suivi de progression.',
    longDescription: 'LearnHub est une plateforme e-learning moderne qui révolutionne l\'apprentissage en ligne. Elle propose des cours interactifs, un système de certification, et des outils d\'analyse pour les instructeurs.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3', 'Stripe'],
    liveUrl: 'https://learnhub-platform.com',
    githubUrl: 'https://github.com/arnaud/learnhub',
    features: [
      'Cours vidéo interactifs',
      'Système de certification',
      'Suivi de progression détaillé',
      'Outils d\'analyse pour instructeurs',
      'Forum communautaire',
      'Paiements et abonnements'
    ],
    client: 'EduInnovate',
    duration: '6 mois',
    year: '2022'
  },
  {
    id: 5,
    title: 'CryptoWallet - Portefeuille Digital',
    category: 'web',
    description: 'Application web sécurisée de gestion de cryptomonnaies avec trading intégré.',
    longDescription: 'CryptoWallet est une application web ultra-sécurisée pour la gestion de cryptomonnaies. Elle inclut des fonctionnalités de trading, des analyses de marché en temps réel, et un système de sécurité multi-niveaux.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'Redis', 'WebSocket', 'Blockchain APIs'],
    liveUrl: 'https://cryptowallet-secure.com',
    githubUrl: 'https://github.com/arnaud/cryptowallet',
    features: [
      'Sécurité multi-niveaux',
      'Trading en temps réel',
      'Analyses de marché avancées',
      'Portefeuille multi-devises',
      'Notifications intelligentes',
      'API pour développeurs'
    ],
    client: 'CryptoSecure',
    duration: '4 mois',
    year: '2023'
  },
  {
    id: 6,
    title: 'Restaurant Gastronomique - Site Vitrine',
    category: 'vitrine',
    description: 'Site vitrine luxueux pour restaurant gastronomique avec réservation en ligne et menu interactif.',
    longDescription: 'Site vitrine premium développé pour un restaurant gastronomique étoilé. Design luxueux et raffiné, menu interactif avec photos haute qualité, système de réservation intégré, et présentation immersive de l\'expérience culinaire.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'Sanity CMS'],
    liveUrl: 'https://restaurant-gastronomique.com',
    githubUrl: 'https://github.com/arnaud/restaurant-gastronomique',
    features: [
      'Design luxueux et raffiné',
      'Menu interactif premium',
      'Système de réservation intégré',
      'Galerie photos haute qualité',
      'Expérience immersive',
      'Optimisation mobile parfaite'
    ],
    client: 'Restaurant Le Prestige',
    duration: '2 mois',
    year: '2022'
  }
];