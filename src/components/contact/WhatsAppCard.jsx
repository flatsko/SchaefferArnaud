import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const WhatsAppCard = () => {
  const phoneNumber = '+33636061097'; // Même numéro que pour l'appel
  const message = encodeURIComponent('Bonjour Arnaud, je souhaiterais discuter d\'un projet avec vous.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl"></div>
      
      <div className="relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center">
        {/* WhatsApp Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg shadow-green-500/25"
        >
          <MessageCircle className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl font-bold text-white mb-3"
        >
          Contactez-moi sur WhatsApp
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-300 mb-6 leading-relaxed"
        >
          Discutons de votre projet directement sur WhatsApp pour une réponse rapide et personnalisée.
        </motion.p>

        {/* Phone number display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center space-x-2 mb-6 text-gray-400"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">06 36 06 10 97</span>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 group"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Ouvrir WhatsApp</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 mt-4"
        >
          Disponible du lundi au vendredi, 9h-18h
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WhatsAppCard;