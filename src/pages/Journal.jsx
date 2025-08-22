import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, User, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const categories = ['Tous', 'Développement Web', 'SEO', 'Tendances', 'Conseils'];

  const articles = [
    {
      id: 1,
      title: 'Les tendances du développement web en 2025',
      excerpt: 'Découvrez les technologies et frameworks qui vont dominer le développement web cette année.',
      category: 'Tendances',
      date: '15 Janvier 2025',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Optimiser le SEO de votre site web',
      excerpt: 'Guide complet pour améliorer le référencement naturel de votre site internet.',
      category: 'SEO',
      date: '12 Janvier 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'React vs Vue.js : Quel framework choisir ?',
      excerpt: 'Comparaison détaillée entre React et Vue.js pour votre prochain projet web.',
      category: 'Développement Web',
      date: '10 Janvier 2025',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: '10 conseils pour un site web performant',
      excerpt: 'Astuces pratiques pour optimiser les performances et l\'expérience utilisateur de votre site.',
      category: 'Conseils',
      date: '8 Janvier 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'L\'importance du responsive design',
      excerpt: 'Pourquoi votre site doit être optimisé pour tous les appareils en 2025.',
      category: 'Développement Web',
      date: '5 Janvier 2025',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Stratégies SEA pour 2025',
      excerpt: 'Comment optimiser vos campagnes publicitaires Google Ads cette année.',
      category: 'SEO',
      date: '3 Janvier 2025',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'
    }
  ];

  const filteredArticles = selectedCategory === 'Tous' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text)] mb-6">
              Mon
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent block"> Journal</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Découvrez mes derniers articles sur le développement web, le SEO, 
              et les tendances du digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-[var(--background)]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-[var(--text)] mb-8 text-center">
                Article à la une
              </h2>
              <div className="bg-[var(--bg-card)] rounded-2xl overflow-hidden shadow-lg border border-[var(--text-secondary)]/20 group hover:scale-[1.02] transition-all duration-300">
                <div className="aspect-video bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] relative overflow-hidden">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-[var(--text-secondary)] text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 group flex items-center">
                    Lire l'article
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white border border-[var(--text-secondary)]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter(article => !article.featured).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-all duration-300 border border-[var(--text-secondary)]/20"
              >
                <div className="aspect-video bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[var(--primary)] text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <button className="text-[var(--primary)] font-semibold hover:underline flex items-center group">
                    Lire plus
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Restez informé
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Recevez mes derniers articles et conseils directement dans votre boîte mail.
            </p>
            {submitStatus === 'success' ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 text-white">
                  <CheckCircle size={24} />
                  <span className="text-lg font-semibold">Merci pour votre inscription !</span>
                </div>
                <p className="text-white/90 text-center mt-2">
                  Vous recevrez bientôt un email de confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[var(--primary)] border-t-transparent"></div>
                        Inscription...
                      </>
                    ) : (
                      'S\'abonner'
                    )}
                  </button>
                </div>
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-200 mt-3 justify-center">
                    <AlertCircle size={16} />
                    <span className="text-sm">Une erreur est survenue. Veuillez réessayer.</span>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Journal;