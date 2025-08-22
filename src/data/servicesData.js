import { Code, PenTool, Search, Megaphone, BarChart, ShieldCheck } from 'lucide-react';

export const mainServices = [
  {
    title: 'Développement Web Sur-Mesure',
    description: 'Création de sites web et applications performants, adaptés à vos besoins.',
    price: 2500,
    duration: '4-6 semaines',
    icon: Code,
    popular: true,
    features: [
      'Design personnalisé et responsive',
      'Développement front-end et back-end',
      'Système de gestion de contenu (CMS)',
      'Optimisation pour les moteurs de recherche (SEO)',
      'Hébergement et mise en ligne',
    ],
  },
  {
    title: 'Conception UI/UX',
    description: 'Interfaces intuitives et expériences utilisateur mémorables.',
    price: 1500,
    duration: '2-3 semaines',
    icon: PenTool,
    features: [
      'Recherche utilisateur et personas',
      'Wireframing et prototypage interactif',
      'Tests d\'utilisabilité',
      'Création de design system',
      'Optimisation de la conversion',
    ],
  },
  {
    title: 'Stratégie SEO Complète',
    description: 'Améliorez votre visibilité et attirez un trafic qualifié.',
    price: 1200,
    duration: '3-4 semaines',
    icon: Search,
    features: [
      'Audit technique et sémantique',
      'Recherche de mots-clés stratégiques',
      'Optimisation on-page et off-page',
      'Création de contenu optimisé',
      'Rapports de performance mensuels',
    ],
  },
];

export const additionalServices = [
  {
    title: 'Marketing de Contenu',
    description: 'Engagez votre audience avec du contenu pertinent et de qualité.',
    price: 800,
    icon: Megaphone,
  },
  {
    title: 'Analyse de Données',
    description: 'Prenez des décisions éclairées grâce à l\'analyse de vos données web.',
    price: 600,
    icon: BarChart,
  },
  {
    title: 'Maintenance & Sécurité',
    description: 'Assurez la pérennité et la sécurité de votre site web.',
    price: 400,
    icon: ShieldCheck,
  },
];