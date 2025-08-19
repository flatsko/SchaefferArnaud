import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, X } from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'web', name: 'Applications Web' },
    { id: 'mobile', name: 'Applications Mobile' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'saas', name: 'SaaS' }
  ];

  const projects = [
    {
      id: 1,
      title: 'EcoShop - Plateforme E-commerce',
      category: 'ecommerce',
      description: 'Plateforme e-commerce moderne avec paiement Stripe et gestion d\'inventaire en temps réel.',
      longDescription: 'EcoShop est une plateforme e-commerce complète développée pour une startup spécialisée dans les produits écologiques. Le projet inclut un système de gestion des commandes, des paiements sécurisés via Stripe, un tableau de bord administrateur complet, et une interface utilisateur moderne et responsive.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      liveUrl: 'https://ecoshop-demo.com',
      githubUrl: 'https://github.com/arnaud/ecoshop',
      features: [
        'Interface utilisateur moderne et responsive',
        'Système de paiement sécurisé avec Stripe',
        'Gestion d\'inventaire en temps réel',
        'Tableau de bord administrateur',
        'Système de recommandations',
        'Optimisation SEO avancée'
      ],
      client: 'EcoStart',
      duration: '3 mois',
      year: '2023'
    },
    {
      id: 2,
      title: 'TaskFlow - Application de Gestion',
      category: 'saas',
      description: 'Application SaaS de gestion de projets avec collaboration en temps réel et analytics avancés.',
      longDescription: 'TaskFlow est une application SaaS complète de gestion de projets développée pour améliorer la productivité des équipes. Elle inclut des fonctionnalités de collaboration en temps réel, des tableaux de bord analytiques, et un système de notifications intelligent.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: 'https://taskflow-app.com',
      githubUrl: 'https://github.com/arnaud/taskflow',
      features: [
        'Collaboration en temps réel',
        'Tableaux de bord analytiques',
        'Système de notifications intelligent',
        'Gestion des équipes et permissions',
        'Intégration avec outils externes',
        'API REST complète'
      ],
      client: 'ProductiveTech',
      duration: '4 mois',
      year: '2023'
    },
    {
      id: 3,
      title: 'FitTracker - App Mobile Fitness',
      category: 'mobile',
      description: 'Application mobile de suivi fitness avec IA pour recommandations personnalisées.',
      longDescription: 'FitTracker est une application mobile innovante qui utilise l\'intelligence artificielle pour fournir des recommandations d\'entraînement personnalisées. Elle inclut un suivi des activités, des défis communautaires, et une intégration avec les appareils de fitness.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Python', 'TensorFlow', 'Firebase', 'Stripe'],
      liveUrl: 'https://fittracker-app.com',
      githubUrl: 'https://github.com/arnaud/fittracker',
      features: [
        'Suivi d\'activités en temps réel',
        'Recommandations IA personnalisées',
        'Défis communautaires',
        'Intégration appareils fitness',
        'Plans d\'entraînement adaptatifs',
        'Analyse de progression'
      ],
      client: 'HealthTech Solutions',
      duration: '5 mois',
      year: '2022'
    },
    {
      id: 4,
      title: 'LearnHub - Plateforme E-learning',
      category: 'web',
      description: 'Plateforme d\'apprentissage en ligne avec vidéos interactives et suivi de progression.',
      longDescription: 'LearnHub est une plateforme e-learning moderne qui révolutionne l\'apprentissage en ligne. Elle propose des cours interactifs, un système de certification, et des outils d\'analyse pour les instructeurs.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3', 'Stripe'],
      liveUrl: 'https://learnhub-platform.com',
      githubUrl: 'https://github.com/arnaud/learnhub',
      features: [
        'Cours vidéo interactifs',
        'Système de certification',
        'Suivi de progression détaillé',
        'Outils d\'analyse pour instructeurs',
        'Forum communautaire',
        'Paiements et abonnements'
      ],
      client: 'EduInnovate',
      duration: '6 mois',
      year: '2022'
    },
    {
      id: 5,
      title: 'CryptoWallet - Portefeuille Digital',
      category: 'web',
      description: 'Application web sécurisée de gestion de cryptomonnaies avec trading intégré.',
      longDescription: 'CryptoWallet est une application web ultra-sécurisée pour la gestion de cryptomonnaies. Elle inclut des fonctionnalités de trading, des analyses de marché en temps réel, et un système de sécurité multi-niveaux.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'Redis', 'WebSocket', 'Blockchain APIs'],
      liveUrl: 'https://cryptowallet-secure.com',
      githubUrl: 'https://github.com/arnaud/cryptowallet',
      features: [
        'Sécurité multi-niveaux',
        'Trading en temps réel',
        'Analyses de marché avancées',
        'Portefeuille multi-devises',
        'Notifications intelligentes',
        'API pour développeurs'
      ],
      client: 'CryptoSecure',
      duration: '4 mois',
      year: '2023'
    },
    {
      id: 6,
      title: 'RestaurantOS - Système de Gestion',
      category: 'saas',
      description: 'Solution complète de gestion pour restaurants avec commandes en ligne et analytics.',
      longDescription: 'RestaurantOS est une solution SaaS complète pour la gestion de restaurants. Elle inclut la gestion des commandes, l\'inventaire, le personnel, et propose des analyses détaillées pour optimiser les opérations.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe', 'PWA'],
      liveUrl: 'https://restaurantos.com',
      githubUrl: 'https://github.com/arnaud/restaurantos',
      features: [
        'Gestion des commandes en ligne',
        'Système de réservation',
        'Gestion d\'inventaire automatisée',
        'Analytics et rapports détaillés',
        'Application mobile pour staff',
        'Intégration systèmes de paiement'
      ],
      client: 'RestauTech',
      duration: '5 mois',
      year: '2022'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {project.year}
              </span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Durée</h4>
                <p className="text-gray-600">{project.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Liens</h4>
                <div className="flex gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Description</h4>
              <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Fonctionnalités clés</h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Technologies utilisées</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text)] mb-6">
              Mon
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"> Portfolio</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
              Découvrez mes réalisations récentes et les technologies que j'utilise pour créer des solutions innovantes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[var(--background)] border-b border-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="inline mr-2" size={16} />
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à créer quelque chose d'incroyable ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Chaque projet est unique. Discutons de vos besoins et créons ensemble votre prochaine réussite.
            </p>
            <a href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg">
              Démarrer un projet
            </a>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Portfolio;