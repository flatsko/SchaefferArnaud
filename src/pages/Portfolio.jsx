import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Award,
  Eye,
} from "lucide-react";
import { projects, categories } from "../data/portfolioData";
import { Link } from "react-router-dom";

const PortfolioFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-4 mb-16"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25"
              : "bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-violet-500/20 text-gray-300 hover:text-white hover:border-violet-500/40"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
};

const ProjectCard = ({ project, onSelectProject, index }) => {
  const getCategoryGradient = (category) => {
    switch (category) {
      case "vitrine":
        return "from-violet-500 to-purple-600";
      case "ecommerce":
        return "from-emerald-500 to-teal-600";
      case "web":
        return "from-blue-500 to-cyan-600";
      default:
        return "from-violet-500 to-purple-600";
    }
  };

  const getCategoryBgGradient = (category) => {
    switch (category) {
      case "vitrine":
        return "from-violet-500/10 to-purple-600/10";
      case "ecommerce":
        return "from-emerald-500/10 to-teal-600/10";
      case "web":
        return "from-blue-500/10 to-cyan-600/10";
      default:
        return "from-violet-500/10 to-purple-600/10";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={() => onSelectProject(project)}
    >
      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-violet-500/20 border border-violet-500/20 transition-all duration-500 group-hover:scale-105 h-full">
        {/* Background gradient effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryBgGradient(
            project.category
          )} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Image */}
        <div className="aspect-video overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getCategoryGradient(
                project.category
              )} backdrop-blur-sm rounded-full`}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="text-white font-semibold text-xs uppercase tracking-wider">
                {categories.find((cat) => cat.id === project.category)?.name}
              </span>
            </div>
          </div>

          {/* View overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Eye className="text-white" size={24} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-md text-violet-300 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 backdrop-blur-sm border border-gray-500/30 rounded-md text-gray-400 text-xs font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-violet-400" />
              <span className="font-medium">{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-violet-400" />
              <span className="font-medium">{project.duration}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center text-violet-400 font-semibold text-sm group-hover:text-violet-300 transition-colors">
            Voir le projet
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={16}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const getCategoryGradient = (category) => {
    switch (category) {
      case "vitrine":
        return "from-violet-500 to-purple-600";
      case "ecommerce":
        return "from-emerald-500 to-teal-600";
      case "web":
        return "from-blue-500 to-cyan-600";
      default:
        return "from-violet-500 to-purple-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-violet-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Header Image */}
          <div className="aspect-video overflow-hidden relative rounded-t-3xl">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Category badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getCategoryGradient(
                  project.category
                )} backdrop-blur-sm rounded-full`}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  {categories.find((cat) => cat.id === project.category)?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                {project.title}
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Meta info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 mb-3">
                  <User className="text-violet-400" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">Client</h4>
                <p className="text-gray-400 text-sm">{project.client}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 mb-3">
                  <Clock className="text-blue-400" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">Durée</h4>
                <p className="text-gray-400 text-sm">{project.duration}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-sm border border-emerald-500/30 mb-3">
                  <Calendar className="text-emerald-400" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-1">Année</h4>
                <p className="text-gray-400 text-sm">{project.year}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Fonctionnalités Clés
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle
                      className="text-violet-400 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Technologies Utilisées
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-500/30 rounded-xl text-violet-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${getCategoryGradient(
                  project.category
                )} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300`}
              >
                <ExternalLink size={20} />
                Voir le site
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
              >
                <Github size={20} />
                Code source
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
              Portfolio
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8"
          >
            Découvrez une sélection de mes réalisations les plus remarquables.
            Chaque projet reflète mon engagement vers l'excellence et
            l'innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-600/10 backdrop-blur-sm border border-violet-500/20 rounded-full">
              <Star className="text-violet-400" size={16} />
              <span>Projets premium</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 rounded-full">
              <Zap className="text-blue-400" size={16} />
              <span>Technologies modernes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-full">
              <Award className="text-emerald-400" size={16} />
              <span>Clients satisfaits</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Filter */}
        <PortfolioFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelectProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative bg-gradient-to-br from-gray-800/50 to-violet-900/20 backdrop-blur-sm rounded-3xl p-12 border border-violet-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-600/5" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Un Projet en Tête ?
              </h2>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Transformons ensemble votre vision en réalité digitale
                exceptionnelle.
              </p>
              <Link to="/contact" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 text-lg"
                >
                  Discutons de Votre Projet
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
