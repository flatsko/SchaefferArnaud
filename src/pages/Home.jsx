import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Globe, Server, Search, Megaphone, Shield, Zap } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: 'Hébergement/Maintenance',
      description: 'Solutions d\'hébergement sécurisées et maintenance continue de vos sites web.',
      color: 'from-[var(--primary)] to-[var(--secondary)]'
    },
    {
      icon: Code,
      title: 'Réalisation de sites internet',
      description: 'Création de sites web modernes, responsives et optimisés pour vos besoins.',
      color: 'from-[var(--secondary)] to-[var(--accent)]'
    },
    {
      icon: Search,
      title: 'SEO',
      description: 'Optimisation pour les moteurs de recherche et amélioration de votre visibilité.',
      color: 'from-[var(--accent)] to-[var(--primary)]'
    },
    {
      icon: Megaphone,
      title: 'SEA',
      description: 'Campagnes publicitaires ciblées pour maximiser votre retour sur investissement.',
      color: 'from-[var(--primary)] to-[var(--accent)]'
    }
  ];

  const stats = [
    { number: '100+', label: 'Sites créés' },
    { number: '8+', label: 'Années d\'expérience' },
    { number: '50+', label: 'Clients satisfaits' },
    { number: '24/7', label: 'Support technique' }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice, Boutique en ligne',
      content: 'Arnaud a créé notre site e-commerce et gère notre hébergement. Excellent service client et site très performant !',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Pierre Martin',
      role: 'Gérant, Restaurant Le Gourmet',
      content: 'Grâce au SEO d\'Arnaud, notre restaurant apparaît en première page Google. Les réservations ont doublé !',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Sophie Laurent',
      role: 'Artisan, Créations Sophie',
      content: 'Site web magnifique, maintenance impeccable et campagnes SEA très efficaces. Je recommande vivement !',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[var(--secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[var(--text)] mb-6">
                Arnaud Schaeffer
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent block"> Développeur Web</span>
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
                Création de sites web modernes, hébergement sécurisé et stratégies SEO/SEA pour développer votre présence digitale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link to="/contact" className="btn btn-primary group flex items-center">
                Démarrer un projet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                Voir mes réalisations
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2">{stat.number}</div>
                  <div className="text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[var(--text-secondary)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--text-secondary)] rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
              Mes Services
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Solutions complètes pour votre présence digitale : création, hébergement, référencement et publicité en ligne.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[var(--bg-card)] p-6 rounded-xl shadow-lg group hover:scale-105 transition-all duration-300 border border-[var(--text-secondary)]/20"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-4">{service.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
              Ce que disent mes clients
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              La satisfaction client est au cœur de mon travail. Découvrez leurs témoignages.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-card)] p-6 rounded-xl shadow-lg border border-[var(--text-secondary)]/20"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--text)]">{testimonial.name}</h4>
                    <p className="text-[var(--text-secondary)] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--background)] mb-6">
              Développons votre présence digitale
            </h2>
            <p className="text-xl text-[var(--background)]/80 mb-8 max-w-2xl mx-auto">
              Site web, hébergement, SEO, SEA... Discutons de vos besoins pour propulser votre activité en ligne.
            </p>
            <Link to="/contact" className="bg-[var(--background)] text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300">
              Demander un devis gratuit
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;