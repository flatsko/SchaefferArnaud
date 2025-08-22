import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, CheckCircle, ArrowRight, Star, Shield, TrendingUp, Award, Clock, Users } from 'lucide-react';

const DeveloppementWeb = () => {
  const services = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Sites Web Vitrine Premium",
      description: "Création de sites web d'exception qui captivent vos visiteurs et renforcent votre image de marque.",
      features: ["Design sur-mesure premium", "Optimisation SEO avancée", "Performance optimisée", "Animation fluides", "Compatible tous appareils"],
      price: "À partir de 2 500€"
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: "Applications Web d'Entreprise",
      description: "Solutions web sur mesure conçues pour transformer vos processus métier et maximiser votre efficacité.",
      features: ["Architecture scalable", "Sécurité renforcée", "Interface intuitive", "API RESTful", "Maintenance incluse"],
      price: "À partir de 5 000€"
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "E-commerce Haut de Gamme",
      description: "Boutiques en ligne performantes avec une expérience utilisateur exceptionnelle et des fonctionnalités avancées.",
      features: ["UX/UI premium", "Paiement sécurisé", "Analytics avancées", "Gestion des stocks", "Support 24/7"],
      price: "À partir de 3 500€"
    }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS", "Docker"
  ];

  const premiumFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité Renforcée",
      description: "Protection maximale contre les cybermenaces"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Performance Optimale",
      description: "Chargement rapide et expérience fluide"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Qualité Premium",
      description: "Standards de développement les plus élevés"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Livraison Rapide",
      description: "Délais respectés avec suivi personnalisé"
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
              Développement Web
              <span className="text-[var(--primary)] block">Sur Mesure</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
              Créons ensemble des solutions web innovantes qui propulsent votre entreprise vers le succès digital.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
            >
              Démarrer votre projet
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Services Premium
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Des solutions web d'exception qui transforment votre présence digitale et propulsent votre entreprise vers de nouveaux sommets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-700/50 pt-6">
                    <p className="text-purple-400 font-semibold text-lg">{service.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Stack Technique Premium
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Des technologies de pointe pour des solutions web performantes et scalables
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-8 py-4 rounded-full border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <span className="font-semibold text-white">{tech}</span>
              </motion.div>
            ))}
          </div>

          {/* Premium Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Premium */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-8">
              <Users className="h-12 w-12 text-purple-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Prêt pour l'Excellence ?
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Transformons ensemble votre vision digitale en réalité avec des solutions web d'exception qui dépassent vos attentes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white px-12 py-5 rounded-xl font-semibold hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl shadow-purple-500/30 text-lg"
            >
              <Zap className="h-6 w-6" />
              <span>Commencer votre projet premium</span>
            </motion.button>
            
            <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>100% Satisfait ou Refait</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>Support Premium 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-400" />
                <span>Qualité Garantie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeveloppementWeb;