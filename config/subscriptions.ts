import "react";

import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";
import { Icons } from "@/components/shared/icons";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Maintenance Partielle",
    description: "L'éssentiel Assuré",
    benefits: [
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus",
    ],
    limitations: [
      "Hébergement inclus.",
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus.",
    ],
    prices: {
      monthly: 25,
      yearly: 250,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Maintenance Complete",
    description: "Votre Site au Top 24/7",
    benefits: [
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus",
    ],
    limitations: [
      "Hébergement inclus.",
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus.",
    ],
    prices: {
      monthly: 22,
      yearly: 12,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Pay As You Go",
    description: "Boost Visibilité",
    benefits: [
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus",
    ],
    limitations: [
      "Hébergement inclus.",
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus.",
    ],
    prices: {
      monthly: 22,
      yearly: 12,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Maintenance SEO ",
    icon: Icons.check,

    description: "Boost Visibilité",
    benefits: [
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus",
    ],
    limitations: [
      "Hébergement inclus.",
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus.",
    ],
    prices: {
      monthly: 22,
      yearly: 12,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Boost Visibilité",
    description: "Base Solide",
    benefits: [
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus",
    ],
    limitations: [
      "Hébergement inclus.",
      "Hébergement inclus",
      "Hébergement inclus",
      "Hébergement inclus.",
    ],
    prices: {
      monthly: 22,
      yearly: 12,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "partielle",
  "complete",
  "payAsYouGo",
  "sEO",
  "hebergement",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Hébergement du site	",
    partielle: true,
    complete: true,
    payAsYouGo: false,
    sEO: false,
    hebergement: true,
  },
  {
    feature: "Mises à jour CMS et plugins	",
    partielle: true,
    complete: true,
    payAsYouGo: true,
    sEO: false,
    hebergement: false,
  },
  {
    feature: "Sauvegarde des données	",
    partielle: "Mensuelle",
    complete: "Hebdomadaire",
    payAsYouGo: "A la demande",
    sEO: false,
    hebergement: "Mensuel",
  },
  {
    feature: "Modifications mineures design/contenu	",
    partielle: false,
    complete: true,
    payAsYouGo: true,
    sEO: false,
    hebergement: false,
  },
  {
    feature: "Ajout de nouvelles fonctionnalités	",
    partielle: false,
    complete: true,
    payAsYouGo: true,
    sEO: false,
    hebergement: false,
  },
  {
    feature: "Support technique	",
    partielle: false,
    complete: true,
    payAsYouGo: true,
    sEO: false,
    hebergement: false,
  },
  {
    feature: "Audit SEO régulier	",
    partielle: false,
    complete: false,
    payAsYouGo: false,
    sEO: true,
    hebergement: false,
  },
  {
    feature: "Optimisation du contenu pour SEO	",
    partielle: false,
    complete: false,
    payAsYouGo: false,
    sEO: true,
    hebergement: false,
  },
  {
    feature: "Suggestions de nouveaux contenus SEO	",
    partielle: false,
    complete: false,
    payAsYouGo: false,
    sEO: true,
    hebergement: false,
  },
  {
    feature: "Rapport mensuel de performance	",
    partielle: false,
    complete: true,
    payAsYouGo: false,
    sEO: true,
    hebergement: false,
  },
  {
    feature: "Facturation	",
    partielle: "Mensuelle/Annuelle",
    complete: "Mensuelle/Annuelle",
    payAsYouGo: "A l'usage",
    sEO: "Mensuelle",
    hebergement: "Annuelle",
  },
  {
    feature: "Engagement",
    partielle: "1 an (renouvelable)	",
    complete: "1 an (renouvelable)	",
    payAsYouGo: "Aucun",
    sEO: "6 mois min.	",
    hebergement: "1 an (renouvelable)",
  },
  {
    feature: "Responsabilité maintenance du site		",
    partielle: "Moi",
    complete: "Moi",
    payAsYouGo: "Moi",
    sEO: "Moi",
    hebergement: "Toi",
  },
  {
    feature: "Adapté pour		",
    partielle: "Sites simples	",
    complete: "Sites complexes	",
    payAsYouGo: "Besoins variés	",
    sEO: "Focus SEO	",
    hebergement: "Clients autonomes",
  },

  // Add more rows as needed
];
