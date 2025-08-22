export const services = [
  {
    iconName: "Server",
    title: "Hébergement Web Professionnel",
    description:
      "Solutions d'hébergement fiables et performantes pour tous vos projets web.",
    features: [
      "Serveurs haute performance",
      "Disponibilité 99.9%",
      "Support technique expert",
      "Migration gratuite",
    ],
  },
  {
    iconName: "Settings",
    title: "Maintenance WordPress",
    description:
      "Maintenance complète de votre site WordPress pour une sécurité et performance optimales.",
    features: [
      "Mises à jour automatiques",
      "Sauvegardes quotidiennes",
      "Optimisation vitesse",
      "Monitoring sécurité",
    ],
  },
  {
    iconName: "Shield",
    title: "Sécurité & Monitoring",
    description:
      "Protection avancée et surveillance continue de votre site web.",
    features: [
      "Firewall WAF",
      "Détection malware",
      "Certificats SSL",
      "Rapports mensuels",
    ],
  },
];

export const plans = [
  {
    name: "Pack Sérénité 😌",
    monthlyPrice: "19€",
    annualPrice: "192€",
    monthlyOriginalPrice: "25€",
    annualOriginalPrice: "300€",
    description: "La base solide pour votre présence en ligne",
    features: [
      "Hébergement",
      "Mises à jour de base",
      "Sauvegarde mensuelle",
      "100 comptes email",
    ],
    notIncluded: ["Modifications du site", "Support technique complet"],
    popular: false,
    monthlyStripeLink: "https://buy.stripe.com/pack-serenite-monthly",
    annualStripeLink: "https://buy.stripe.com/pack-serenite-annual",
  },
  {
    name: "Pack Tranquillité 😌",
    monthlyPrice: "25€",
    annualPrice: "252€",
    monthlyOriginalPrice: "32€",
    annualOriginalPrice: "384€",
    description: "Des opérations sans faille pour votre site",
    features: [
      "Tout le pack Sérénité",
      "Sauvegarde hebdomadaire",
      "Support technique",
      "Guide Avancé Des Bonnes Pratiques SEO (50€)",
      "20% de réduction sur la prochaine prestation",
    ],
    popular: true,
    monthlyStripeLink: "https://buy.stripe.com/pack-tranquillite-monthly",
    annualStripeLink: "https://buy.stripe.com/pack-tranquillite-annual",
  },
  {
    name: "Pack Zen 😌",
    monthlyPrice: "35€",
    annualPrice: "348€",
    monthlyOriginalPrice: "45€",
    annualOriginalPrice: "540€",
    description: "L'offre ultime pour votre présence en ligne",
    features: [
      "Tout le pack Tranquillité",
      "Rapport trimestriel SEO",
      "Sauvegarde journalière",
      "Support technique Premium",
      "Plugin PressGEO Pro - le top pour votre référencement (84€/an)",
      "Optimisation des performances du site (70€)",
      "Réduction d'un article pour votre Blog (100€)",
    ],
    popular: false,
    monthlyStripeLink: "https://buy.stripe.com/cNi5kv61c2Bp7oneoTejK01",
    annualStripeLink: "https://buy.stripe.com/aEU8x8esmfXIehq7ss",
  },
];

export const comparisonData = [
  {
    feature: "Hébergement",
    serenite: { included: true, details: "" },
    tranquillite: { included: true, details: "" },
    zen: { included: true, details: "" },
  },
  {
    feature: "Migration vers mes serveurs",
    serenite: { included: true, details: "" },
    tranquillite: { included: true, details: "" },
    zen: { included: true, details: "" },
  },
  {
    feature: "Mises à jour",
    serenite: { included: true, details: "" },
    tranquillite: { included: true, details: "" },
    zen: { included: true, details: "" },
  },
  {
    feature: "Sauvegarde",
    serenite: { included: true, details: "Mensuelle" },
    tranquillite: { included: true, details: "Hebdomadaire" },
    zen: { included: true, details: "Quotidienne" },
  },
  {
    feature: "Modifications du site",
    serenite: { included: false, details: "" },
    tranquillite: {
      included: true,
      details: "Uniquement Bugs/Modifications mineures (30min par mois)",
    },
    zen: {
      included: true,
      details: "Bugs/Modifications/Ajout de contenu (30min par mois)",
    },
  },
  {
    feature: "Comptes email",
    serenite: { included: true, details: "100" },
    tranquillite: { included: true, details: "100" },
    zen: { included: true, details: "100" },
  },
  {
    feature: "Support technique",
    serenite: { included: false, details: "" },
    tranquillite: { included: true, details: "Standard" },
    zen: { included: true, details: "Premium" },
  },
  {
    feature: "Rapport SEO",
    serenite: { included: false, details: "" },
    tranquillite: { included: false, details: "" },
    zen: { included: true, details: "Trimestriel" },
  },
  {
    feature: "Guide SEO",
    serenite: { included: false, details: "" },
    tranquillite: {
      included: true,
      details: "Guide Avancé Des Bonnes Pratiques SEO (50€)",
    },
    zen: {
      included: true,
      details: "Guide Avancé Des Bonnes Pratiques SEO (50€)",
    },
  },
  {
    feature: "Plugin PressGEO Pro",
    serenite: { included: false, details: "" },
    tranquillite: { included: false, details: "" },
    zen: { included: true, details: "Plugin PressGEO Pro (84€/an)" },
  },
  {
    feature: "Optimisation performances",
    serenite: { included: false, details: "" },
    tranquillite: { included: false, details: "" },
    zen: {
      included: true,
      details: "Optimisation des performances du site (70€)",
    },
  },
  {
    feature: "Article Blog",
    serenite: { included: false, details: "" },
    tranquillite: { included: false, details: "" },
    zen: {
      included: true,
      details: "Réduction d'un article pour votre Blog (100€)",
    },
  },
  {
    feature: "Réduction prochaine prestation",
    serenite: { included: false, details: "" },
    tranquillite: { included: true, details: "20%" },
    zen: { included: true, details: "20%" },
  },
];
