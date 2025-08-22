import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, BookOpen, Home } from 'lucide-react';
import { articles } from '../data/articlesData';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900/20 text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-violet-500/10 rounded-full blur-2xl" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-violet-300 to-purple-400 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 mb-8 text-lg"
          >
            Désolé, l'article que vous cherchez n'existe pas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:scale-105"
            >
              <ArrowLeft size={20} />
              Retour au Journal
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const relatedArticles = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900/20 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-violet-500/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-full blur-xl" />
      
      {/* Fixed Navigation Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-violet-500/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600/20 to-purple-700/20 hover:from-violet-600/30 hover:to-purple-700/30 backdrop-blur-sm border border-violet-500/30 rounded-xl transition-all duration-300 text-violet-200 hover:text-white font-semibold hover:scale-105"
            >
              <ArrowLeft size={18} />
              <span>Retour au Journal</span>
            </Link>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-violet-300 transition-colors"
            >
              <Home size={18} />
              <span>Accueil</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pt-36 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Article Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
              <span className="text-violet-300 font-semibold text-sm uppercase tracking-wider">{article.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight bg-gradient-to-r from-white via-violet-100 to-purple-200 bg-clip-text text-transparent">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-violet-400" />
                <span className="font-medium">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-violet-400" />
                <span className="font-medium">{article.readTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full border-2 border-violet-500/30"
                />
                <span className="font-medium text-gray-300">{article.author.name}</span>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-24"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-transparent z-10" />
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating excerpt box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-10 left-8 right-8 bg-gradient-to-br from-gray-800/90 to-violet-900/40 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 shadow-xl"
            >
              <p className="text-gray-200 text-lg leading-relaxed italic">
                "{article.excerpt}"
              </p>
            </motion.div>
          </motion.div>

          {/* Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="prose prose-invert prose-lg max-w-none mx-auto prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-gray-100 prose-h2:text-3xl prose-h2:bg-gradient-to-r prose-h2:from-violet-300 prose-h2:to-purple-400 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:mt-16 prose-h2:mb-8"
          >
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </motion.article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-32 pt-16 border-t border-violet-500/20"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Articles similaires
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  >
                    <Link 
                      to={`/journal/${related.slug}`} 
                      className="block relative bg-gradient-to-br from-gray-800/50 to-violet-900/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-violet-500/20 border border-violet-500/20 transition-all duration-500 group hover:scale-105"
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/50 via-transparent to-transparent z-10" />
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-full mb-4">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
                          <span className="text-violet-300 font-semibold text-xs uppercase tracking-wider">{related.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors leading-tight">{related.title}</h3>
                        <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-violet-400" />
                            <span className="font-medium">{related.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen size={14} className="text-violet-400" />
                            <span className="font-medium">{related.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-32 mb-16"
          >
            <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-sm border border-violet-500/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-violet-500/20 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-violet-300 to-purple-400 bg-clip-text text-transparent">
                  Besoin d'accompagnement ?
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Transformez votre vision en réalité digitale. Découvrez mes services personnalisés 
                  pour développer votre présence en ligne.
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:scale-105"
                >
                  Découvrir mes services
                  <ArrowLeft className="rotate-180" size={20} />
                </Link>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
};

export default ArticleDetail;