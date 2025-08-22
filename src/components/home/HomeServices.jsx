import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Search, Shield, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Site Internet',
    subtitle: 'Votre vitrine digitale sur mesure ! 🌟',
    description: 'Je crée votre site web avec soin et précision. Un site simple à utiliser qui met en valeur votre activité et attire naturellement de nouveaux clients près de chez vous.',
    features: [
      '🎨 Design impactant',
      '⚡ Performance optimisée',
      '🔍 SEO puissant intégré'
    ],
    buttonText: '🚀 LANCEZ VOTRE PROJET WEB',
    buttonLink: '/services/developpement-web',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Search,
    title: 'Visibilité locale',
    subtitle: 'Faites-vous connaître dans votre zone ! 📍',
    description: 'Je booste en ligne optimisée. Des solutions concrètes pour que vos futurs clients vous trouvent facilement sur internet.',
    features: [
      '🎯 Référencement local ciblé',
      '📊 Suivi de vos résultats',
      '💡 Conseils personnalisés'
    ],
    buttonText: '📈 DÉVELOPPEZ VOTRE CLIENTÈLE LOCALE',
    buttonLink: '/services/seo-referencement',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Maintenance',
    subtitle: 'Restez Serein, je m\'occupe de tout ! 🛡️',
    description: 'Concentrez-vous sur votre métier pendant que je veille sur votre présence en ligne. Une maintenance proactive pour garder votre site performant et sécurisé.',
    features: [
      '🔄 Mises à jour',
      '🔒 Sécurité renforcée',
      '📞 Support réactif'
    ],
    buttonText: '🧘 GARDEZ L\'ESPRIT TRANQUILLE',
    buttonLink: '/services/hebergement-maintenance',
    color: 'from-green-500 to-emerald-500'
  }
];

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`group relative bg-[var(--bg-card)] border border-[var(--primary)]/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-[var(--primary)]/50 transition-all duration-300 flex flex-col h-full`}
  >
    <div className="flex-grow">
      <div className={`absolute -top-8 left-8 w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-[var(--text)] mt-10 mb-2">{service.title}</h3>
      <p className="text-[var(--text-secondary)] mb-4 font-medium">{service.subtitle}</p>
      <p className="text-[var(--text-light)] mb-6 text-sm leading-relaxed">{service.description}</p>
      <ul className="space-y-3 mb-8">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-[var(--text-light)] text-sm">
            <CheckCircle className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <Link 
      to={service.buttonLink} 
      className={`mt-auto block w-full text-center bg-gradient-to-r ${service.color} text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
    >
      {service.buttonText}
    </Link>
  </motion.div>
);

const HomeServices = () => (
  <section className="py-20 lg:py-32 bg-[var(--background)]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 lg:mb-20"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-6">
          Des solutions <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">sur mesure</span> pour votre succès
        </h2>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Que vous ayez besoin d'un site web, d'améliorer votre visibilité ou de sécuriser votre présence en ligne, j'ai la solution qu'il vous faut.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default HomeServices;