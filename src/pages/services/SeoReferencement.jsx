import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BarChart3, CheckCircle, ArrowRight, Eye, Users, Globe } from 'lucide-react';

const SeoReferencement = () => {
  const services = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Audit SEO Complet",
      description: "Analyse approfondie de votre site pour identifier les opportunités d'amélioration.",
      features: ["Analyse technique", "Audit de contenu", "Étude concurrentielle", "Rapport détaillé"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Optimisation On-Page",
      description: "Optimisation complète de vos pages pour améliorer leur positionnement.",
      features: ["Mots-clés stratégiques", "Balises optimisées", "Structure améliorée", "Contenu optimisé"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Stratégie de Contenu",
      description: "Création d'une stratégie de contenu pour attirer et convertir vos prospects.",
      features: ["Calendrier éditorial", "Articles optimisés", "Mots-clés longue traîne", "Content marketing"]
    }
  ];

  const stats = [
    {
      icon: <Eye className="h-8 w-8" />,
      value: "+150%",
      label: "Visibilité moyenne",
      description: "Augmentation de la visibilité en ligne"
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "+200%",
      label: "Trafic organique",
      description: "Croissance du trafic qualifié"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "+85%",
      label: "Conversions",
      description: "Amélioration du taux de conversion"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: "#1",
      label: "Positions Google",
      description: "Mots-clés en première page"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Audit & Analyse",
      description: "Analyse complète de votre site et de la concurrence pour identifier les opportunités."
    },
    {
      step: "02",
      title: "Stratégie SEO",
      description: "Élaboration d'une stratégie personnalisée basée sur vos objectifs business."
    },
    {
      step: "03",
      title: "Optimisation",
      description: "Mise en œuvre des optimisations techniques et de contenu sur votre site."
    },
    {
      step: "04",
      title: "Suivi & Reporting",
      description: "Monitoring continu des performances avec rapports mensuels détaillés."
    }
  ];

  const packages = [
    {
      name: "SEO Starter",
      price: "299€",
      period: "/mois",
      description: "Parfait pour débuter",
      features: [
        "Audit SEO initial",
        "Optimisation 5 pages",
        "Recherche mots-clés",
        "Rapport mensuel",
        "Support email"
      ],
      popular: false
    },
    {
      name: "SEO Pro",
      price: "599€",
      period: "/mois",
      description: "Pour une croissance soutenue",
      features: [
        "Audit SEO complet",
        "Optimisation 15 pages",
        "Stratégie de contenu",
        "Link building",
        "Rapports bi-mensuels",
        "Support prioritaire",
        "Suivi positions"
      ],
      popular: true
    },
    {
      name: "SEO Enterprise",
      price: "1299€",
      period: "/mois",
      description: "Solution complète",
      features: [
        "Audit SEO avancé",
        "Optimisation illimitée",
        "Stratégie multi-canaux",
        "Link building premium",
        "Rapports hebdomadaires",
        "Support dédié 24/7",
        "Consultant SEO attitré",
        "Formation équipe"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SEO &
              <span className="text-[var(--primary)] block">Référencement</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
              Propulsez votre site en première page de Google et attirez plus de clients qualifiés grâce à notre expertise SEO.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
            >
              Audit SEO gratuit
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Résultats Prouvés
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Nos clients obtiennent des résultats mesurables et durables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-[var(--background)] p-6 rounded-xl border border-[var(--text-secondary)]/20"
              >
                <div className="text-[var(--primary)] mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Services SEO
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Une approche complète pour dominer les résultats de recherche
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-secondary)] p-8 rounded-xl border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50 transition-colors"
              >
                <div className="text-[var(--primary)] mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre Processus SEO
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Une méthodologie éprouvée pour des résultats garantis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-[var(--primary)] text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Packages SEO
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Choisissez la formule adaptée à vos ambitions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-[var(--bg-secondary)] p-8 rounded-xl border ${
                  pkg.popular 
                    ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' 
                    : 'border-[var(--text-secondary)]/20'
                } hover:border-[var(--primary)]/50 transition-colors`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommandé
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-[var(--text-secondary)] ml-1">{pkg.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90'
                      : 'bg-[var(--background)] text-[var(--text)] border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50'
                  }`}
                >
                  Choisir ce package
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Dominer Google ?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg">
              Obtenez un audit SEO gratuit et découvrez comment améliorer votre visibilité en ligne.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Audit gratuit maintenant
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SeoReferencement;