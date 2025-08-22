import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Search, Shield, Star, Users, Award, CheckCircle, Sparkles, TrendingUp, MessageCircle, ExternalLink } from 'lucide-react';

const Home = () => {
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-32 right-10 sm:top-40 sm:right-20 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 left-32 sm:bottom-20 sm:left-40 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[var(--primary)] rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text)] tracking-wide">Développeur Web Premium</span>
              <Star className="w-4 h-4 text-[var(--secondary)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--text)] mb-6 leading-tight">
                <span className="block mb-2">Arnaud Schaeffer</span>
                <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent block animate-pulse"> 
                  Développeur Web
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] mb-4 max-w-4xl mx-auto leading-relaxed">
                Création de sites web modernes, hébergement sécurisé et stratégies SEO/SEA 
                <span className="text-[var(--primary)] font-semibold">pour développer votre présence digitale</span>.
              </p>
              
              {/* Sous-titre avec icônes */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 text-[var(--text-light)]">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-sm sm:text-base">8+ ans d'expérience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--secondary)]" />
                  <span className="text-sm sm:text-base">100+ projets réalisés</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
                  <span className="text-sm sm:text-base">Résultats garantis</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
            >
              <Link 
                to="/contact" 
                className="group relative overflow-hidden bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
              >
                <span className="relative z-10">Démarrer un projet</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/portfolio" 
                className="group bg-[var(--bg-card)] border-2 border-[var(--primary)]/30 text-[var(--text)] font-semibold px-8 py-4 rounded-xl hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center backdrop-blur-sm"
              >
                <span>Voir mes réalisations</span>
                <CheckCircle className="w-5 h-5 group-hover:text-[var(--primary)] transition-colors duration-300" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="group text-center bg-[var(--bg-card)]/50 backdrop-blur-sm border border-[var(--primary)]/20 rounded-xl p-6 hover:border-[var(--primary)]/40 hover:bg-[var(--bg-card)]/70 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-2 group-hover:from-[var(--secondary)] group-hover:to-[var(--accent)] transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-[var(--text-secondary)] text-sm sm:text-base font-medium group-hover:text-[var(--text)] transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--background)] to-[var(--bg-secondary)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[var(--secondary)]/20 to-[var(--accent)]/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text)] tracking-wide">Services Premium</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-6 leading-tight">
              Des Solutions Web 
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                Sur-Mesure
              </span>
              <br />pour Entrepreneurs
            </h2>
            
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Transformez votre vision en réalité digitale avec des solutions personnalisées qui génèrent des résultats concrets.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative bg-[var(--bg-card)]/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <Icon className="text-white" size={40} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">{service.title}</h3>
                    
                    {/* Subtitle */}
                    <p className="text-lg text-[var(--secondary)] mb-4 font-medium">{service.subtitle}</p>
                    
                    {/* Description */}
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6 group-hover:text-[var(--text-light)] transition-colors duration-300">{service.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--primary)] mr-3 flex-shrink-0" />
                          <span className="text-sm lg:text-base">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Link 
                      to={service.buttonLink}
                      className={`relative block w-full text-center bg-gradient-to-r ${service.color} text-white font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group/btn`}
                    >
                      <span className="relative z-10">{service.buttonText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 left-10 w-80 h-80 bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-[var(--secondary)]/30 to-[var(--accent)]/30 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-6 py-2 mb-6">
              <Users className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text)] tracking-wide">Mon Histoire</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-8 leading-tight">
              De la Passion à la Mission :
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent block">
                Mon Engagement pour les Entrepreneurs
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed"
          >
            <p className="text-xl mb-6">
              Imaginez un collégien de 5ème en 2003, déjà fasciné par le code HTML, créant son premier site web sur un hébergement Free. C'était moi, et cette première expérience a marqué le début d'une passion qui ne m'a jamais quitté.
            </p>

            <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--text-secondary)]/20 mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Pourquoi je fais ce métier ?</h3>
              <p className="mb-4">
                Ce n'est pas un hasard si aujourd'hui je me consacre à développer la visibilité des entrepreneurs. Mon parcours m'a appris une leçon essentielle : un site web n'est pas une œuvre d'art destinée à flatter l'ego du développeur. C'est un outil qui doit générer des résultats concrets pour votre activité.
              </p>
              <p className="italic text-[var(--primary)] font-medium">
                Je me souviens encore de ce moment décisif avec un installateur de panneaux solaires. Alors que je lui présentais fièrement mon travail, son regard est resté fixé ailleurs, il n'a pas regardé une seule seconde son nouveau site web. Cette expérience m'a enseigné une leçon : le site n'est pas important, ce qui est important c'est le nombre de client qu'il vous rapporte !
              </p>
            </div>

            <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Mon engagement envers vous</h3>
              <p className="mb-4">
                Après des années d'expérience dans le développement web, enrichies par un passage en entreprise qui m'a permis d'affûter mes compétences en organisation et en relations humaines, j'ai aujourd'hui une conviction profonde :
              </p>
              <blockquote className="text-xl font-semibold text-[var(--primary)] text-center py-4 border-l-4 border-[var(--primary)] pl-6 mb-4">
                Les entrepreneurs de notre région méritent d'être visibles sur le web et de vivre correctement de leur savoir-faire.
              </blockquote>
              <p className="text-right font-medium text-[var(--text)]">
                — Arnaud
              </p>
            </div>

            <p className="text-lg mb-6">
              C'est pourquoi je ne m'engage dans un projet que lorsque je suis certain de pouvoir générer des résultats tangibles. Ma promesse ? Transformer votre présence en ligne en un véritable outil de croissance pour votre activité.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--text-secondary)]/20">
                <h4 className="text-xl font-bold text-[var(--text)] mb-4">Ce qui me distingue ?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Une expertise technique forgée depuis mes débuts précoces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Une compréhension approfondie du marketing digital</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Une approche orientée résultats, validée par mon expérience terrain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Un engagement total envers la réussite de votre projet</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 p-6 rounded-xl border border-[var(--primary)]/30">
                <h4 className="text-xl font-bold text-[var(--text)] mb-4">🤝 Prêt à développer ensemble votre visibilité en ligne ?</h4>
                <p className="mb-6">
                  Aujourd'hui, armé de mes compétences en développement web et en marketing digital, je mets mon expertise au service de votre réussite. Parce que chaque entrepreneur mérite d'être reconnu pour son talent et son savoir-faire.
                </p>
                <Link 
                  to="/contact" 
                  className="btn btn-primary w-full text-center block"
                >
                  Discutons de votre Projet
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--background)] to-[var(--bg-secondary)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[var(--secondary)]/20 to-[var(--accent)]/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-6 py-2 mb-6">
              <Star className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text)] tracking-wide">Témoignages</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-6 leading-tight">
              Ce que disent 
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                mes clients
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              La satisfaction client est au cœur de mon travail. Découvrez leurs témoignages authentiques.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-[var(--bg-card)]/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Stars rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[var(--primary)] fill-current" />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <p className="text-[var(--text-secondary)] italic leading-relaxed mb-6 text-lg group-hover:text-[var(--text)] transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full mr-4 border-2 border-[var(--primary)]/30 group-hover:border-[var(--primary)] transition-colors duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text)] text-lg group-hover:text-[var(--primary)] transition-colors duration-300">{testimonial.name}</h4>
                      <p className="text-[var(--text-secondary)] text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white tracking-wide">Démarrons Ensemble</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Prêt à transformer votre 
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-pulse">
                vision en réalité
              </span> ?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Contactez-moi dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé. 
              Ensemble, créons quelque chose d'extraordinaire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group bg-white text-[var(--primary)] px-10 py-5 rounded-full font-bold text-lg hover:bg-white/95 transition-all duration-300 inline-flex items-center gap-3 shadow-2xl hover:shadow-white/25 hover:transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                 Démarrer maintenant
                 <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/portfolio"
                className="group border-2 border-white/80 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--primary)] transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-sm hover:transform hover:scale-105"
              >
                <Award className="w-6 h-6 group-hover:animate-spin" />
                 Voir mes réalisations
                 <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Devis gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Réponse sous 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Satisfaction garantie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;