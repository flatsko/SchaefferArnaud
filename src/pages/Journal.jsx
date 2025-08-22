import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { articles } from "../data/articlesData";
import NewsletterForm from "../components/ui/NewsletterForm";

const ArticleCard = ({ article, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="relative bg-gradient-to-br from-gray-800/50 to-violet-900/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-violet-500/20 border border-violet-500/20 transition-all duration-500 group hover:scale-105"
  >
    <Link to={`/journal/${article.slug}`} className="block">
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/50 via-transparent to-transparent z-10" />
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-full mb-4">
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
          <span className="text-violet-300 font-semibold text-xs uppercase tracking-wider">
            {article.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors leading-tight">
          {article.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-violet-400" />
            <span className="font-medium">{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-violet-400" />
            <span className="font-medium">{article.readTime}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-violet-400 font-semibold text-sm group-hover:text-violet-300 transition-colors">
          Lire l'article
          <ArrowRight
            className="ml-2 group-hover:translate-x-1 transition-transform"
            size={16}
          />
        </div>
      </div>
    </Link>
  </motion.div>
);

const Journal = () => {
  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

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
              Le Journal
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Mes réflexions, analyses et conseils d'expert sur l'entrepreneuriat,
            le développement web et la transformation digitale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full" />
          </motion.div>
        </motion.section>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 md:mb-32"
          >
            <Link
              to={`/journal/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="relative bg-gradient-to-br from-gray-800/40 to-violet-900/30 backdrop-blur-sm border border-violet-500/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/20 to-transparent rounded-full blur-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-lg" />

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-full mb-6">
                      <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
                      <span className="text-violet-300 font-semibold text-sm uppercase tracking-wider">
                        {featuredArticle.category}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 group-hover:text-violet-200 transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-violet-400" />
                        <span className="font-medium">
                          {featuredArticle.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-violet-400" />
                        <span className="font-medium">
                          {featuredArticle.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          className="w-8 h-8 rounded-full border-2 border-violet-500/30"
                        />
                        <span className="font-medium text-gray-300">
                          {featuredArticle.author.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-violet-400 font-bold text-lg group-hover:text-violet-300 transition-colors">
                      Lire l'article complet
                      <ArrowRight
                        className="ml-3 group-hover:translate-x-2 transition-transform duration-300"
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Autres Articles
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pb-32"
        >
          <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-sm border border-violet-500/20 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-violet-500/20 rounded-full blur-xl" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-violet-300 to-purple-400 bg-clip-text text-transparent">
                Restez informé des dernières tendances
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Recevez mes analyses exclusives et conseils d'expert directement
                dans votre boîte mail. Pas de spam, que du contenu premium.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Journal;
