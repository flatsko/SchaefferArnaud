import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Award,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";

const services = [
  {
    title: "Développement Web",
    description:
      "Création de sites et applications web sur-mesure avec des technologies modernes.",
    longDescription:
      "Solutions web innovantes qui transforment votre présence digitale et propulsent votre entreprise vers de nouveaux sommets.",
    link: "/services/developpement-web",
    icon: Code,
    features: [
      "React & Next.js",
      "Design responsive",
      "Performance optimisée",
      "SEO intégré",
    ],
    price: "À partir de 2 500€",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-600/10",
  },
  {
    title: "Hébergement & Maintenance",
    description:
      "Solutions fiables pour héberger et maintenir vos projets en toute sécurité.",
    longDescription:
      "Infrastructure cloud sécurisée avec monitoring 24/7 et support technique dédié pour garantir la disponibilité de vos services.",
    link: "/services/hebergement-maintenance",
    icon: Server,
    features: [
      "Cloud AWS/Azure",
      "Monitoring 24/7",
      "Sauvegardes automatiques",
      "Support technique",
    ],
    price: "À partir de 99€/mois",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
  },
  {
    title: "SEO & Référencement",
    description:
      "Améliorez votre visibilité sur les moteurs de recherche et attirez plus de clients.",
    longDescription:
      "Stratégies SEO avancées pour dominer les résultats de recherche et maximiser votre visibilité en ligne.",
    link: "/services/seo-referencement",
    icon: Search,
    features: [
      "Audit SEO complet",
      "Optimisation technique",
      "Content marketing",
      "Suivi des performances",
    ],
    price: "À partir de 299€/mois",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-600/10",
  },
];

const premiumFeatures = [
  {
    icon: Shield,
    title: "Sécurité Renforcée",
    description:
      "Protection maximale contre les cybermenaces avec les dernières technologies de sécurité.",
  },
  {
    icon: TrendingUp,
    title: "Performance Optimale",
    description:
      "Chargement ultra-rapide et expérience utilisateur fluide sur tous les appareils.",
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description:
      "Standards de développement les plus élevés avec code propre et maintenable.",
  },
  {
    icon: Users,
    title: "Support Dédié",
    description:
      "Accompagnement personnalisé et support technique réactif 7j/7.",
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-violet-500/20 border border-violet-500/20 transition-all duration-500 group-hover:scale-105 h-full">
        {/* Background gradient effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative p-8 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="text-white" size={32} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {service.longDescription}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle
                    className="text-violet-400 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <span
                className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
              >
                {service.price}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            to={service.link}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 group-hover:scale-105`}
          >
            Découvrir
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-violet-400" size={32} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900/20 text-white pt-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-violet-500/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-full blur-xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
          >
            <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Mes Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8"
          >
            Solutions digitales premium pour propulser votre entreprise vers
            l'excellence. De la conception au déploiement, je transforme vos
            idées en succès digital.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-600/10 backdrop-blur-sm border border-violet-500/20 rounded-full">
              <Star className="text-violet-400" size={16} />
              <span>Excellence garantie</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 rounded-full">
              <Zap className="text-blue-400" size={16} />
              <span>Livraison rapide</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-full">
              <Globe className="text-emerald-400" size={16} />
              <span>Support 24/7</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Services Grid */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Expertise Premium
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez mes domaines d'expertise et comment je peux transformer
              votre vision en réalité digitale.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* Premium Features */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Pourquoi Me Choisir
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Une approche premium qui fait la différence dans chaque projet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative bg-gradient-to-br from-gray-800/50 to-violet-900/20 backdrop-blur-sm rounded-3xl p-12 border border-violet-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-600/5" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Prêt à Transformer Votre Vision ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discutons de votre projet et découvrons ensemble comment créer
                une solution digitale qui dépasse vos attentes.
              </p>
              <Link to="/contact" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 text-lg"
                >
                  Démarrer Mon Projet
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Services;
