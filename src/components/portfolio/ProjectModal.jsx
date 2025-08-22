import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

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
              <div className="flex gap-4">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline flex items-center gap-1">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Fonctionnalités Clés</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {project.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;