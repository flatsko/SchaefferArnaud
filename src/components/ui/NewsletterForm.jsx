import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

const NewsletterForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // ///////////////////////////////////////////////////////////////////
    // TODO: Intégration Brevo (Sendinblue)
    // Remplacer l'URL ci-dessous par votre endpoint d'API backend qui gère l'inscription
    // ///////////////////////////////////////////////////////////////////
    try {
      // Simule un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemple de réponse de l'API
      // const response = await fetch('/api/subscribe-newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // if (!response.ok) {
      //   throw new Error('Une erreur est survenue.');
      // }

      setStatus('success');
      setMessage('Merci ! Vous êtes bien inscrit à notre newsletter.');
      setEmail('');
      setTimeout(() => {
        setIsExpanded(false);
        setStatus('idle');
      }, 3000);

    } catch (error) {
      setStatus('error');
      setMessage('Oups, une erreur est survenue. Veuillez réessayer.');
       setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-md mx-auto">
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, width: '80%' }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: '80%' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={20} />
              <input
                type="email"
                placeholder="Votre adresse email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-28 py-4 bg-gray-800/50 border-2 border-violet-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 shadow-lg"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <ArrowRight size={20} />
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30"
          >
            S'abonner à la newsletter
            <ArrowRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -bottom-12 flex items-center gap-2 text-green-400">
            <CheckCircle size={16} />
            <span>{message}</span>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -bottom-12 flex items-center gap-2 text-red-400">
            <AlertTriangle size={16} />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterForm;