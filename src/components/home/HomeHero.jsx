import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stats = [
  { number: "30+", label: "Sites créés" },
  { number: "8", label: "Années d'expérience" },
  { number: "20+", label: "Clients satisfaits" },
  { number: "24/7", label: "Support technique" },
];

const HomeHero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)] overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute top-32 right-10 sm:top-40 sm:right-20 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-10 left-32 sm:bottom-20 sm:left-40 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

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
              animationDuration: `${3 + Math.random() * 4}s`,
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
          <span className="text-sm font-medium text-[var(--text)] tracking-wide">
            Développeur Web Premium
          </span>
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
            Création de sites web modernes, hébergement sécurisé et stratégies
            SEO/SEA
            <span className="text-[var(--primary)] font-semibold">
              {" "}
              pour développer votre présence digitale
            </span>
            .
          </p>

          {/* Sous-titre avec icônes */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 text-[var(--text-light)]">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-sm sm:text-base">8 ans d'expérience</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--secondary)]" />
              <span className="text-sm sm:text-base">
                30+ sites web créés
              </span>
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
  </section>
);

export default HomeHero;
