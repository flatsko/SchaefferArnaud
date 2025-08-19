import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const DeveloppementWeb = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Web Vitrine",
      description: "Sites élégants et professionnels pour présenter votre entreprise avec impact.",
      features: ["Design responsive", "Optimisation SEO", "Performance optimisée"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Applications Web",
      description: "Solutions web sur mesure pour automatiser vos processus métier.",
      features: ["Interface intuitive", "Sécurité renforcée", "Évolutivité"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Sites E-commerce",
      description: "Boutiques en ligne performantes pour développer vos ventes.",
      features: ["Paiement sécurisé", "Gestion des stocks", "Analytics avancées"]
    }
  ];

  const technologies = [
    "React", "Vue.js", "Node.js", "PHP", "WordPress", "Shopify"
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

      {/* Services Section */}
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
              Nos Services de Développement
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Des solutions techniques adaptées à vos besoins spécifiques
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
                className="bg-[var(--background)] p-8 rounded-xl border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50 transition-colors"
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

      {/* Technologies Section */}
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
              Technologies Maîtrisées
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Nous utilisons les dernières technologies pour garantir performance et modernité
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-secondary)] px-6 py-3 rounded-full border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50 transition-colors"
              >
                <span className="font-medium">{tech}</span>
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
              Prêt à Digitaliser Votre Entreprise ?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg">
              Discutons de votre projet et créons ensemble la solution web parfaite pour vos besoins.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Commencer maintenant
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeveloppementWeb;