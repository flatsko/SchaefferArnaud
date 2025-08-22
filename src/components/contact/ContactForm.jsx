import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Building, Code, DollarSign, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { sendContactEmail, openEmailClient } from '../../services/emailService';

const projectTypes = [
  'Application Web',
  'Application Mobile',
  'E-commerce',
  'SaaS',
  'Site Vitrine',
  'API/Backend',
  'Consulting',
  'Autre'
];

const budgetRanges = [
  'Moins de 5 000€',
  '5 000€ - 15 000€',
  '15 000€ - 30 000€',
  '30 000€ - 50 000€',
  'Plus de 50 000€',
  'À discuter'
];

const timelines = [
  'Urgent (moins de 1 mois)',
  '1-3 mois',
  '3-6 mois',
  '6-12 mois',
  'Plus de 12 mois',
  'Flexible'
];

const InputField = ({ icon: Icon, label, error, children, ...props }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">
        <Icon className="w-4 h-4 inline mr-2" />
        {label}
      </label>
      <div className="relative">
        {children || (
          <input
            {...props}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/70"
          />
        )}
        {error && (
          <p className="text-red-400 text-sm mt-1 flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

const SelectField = ({ icon: Icon, label, options, placeholder, error, ...props }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">
        <Icon className="w-4 h-4 inline mr-2" />
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/70 appearance-none cursor-pointer"
        >
          <option value="" className="bg-gray-800">{placeholder}</option>
          {options.map(option => (
            <option key={option} value={option} className="bg-gray-800">{option}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-1 flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

const TextareaField = ({ icon: Icon, label, error, ...props }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">
        <Icon className="w-4 h-4 inline mr-2" />
        {label}
      </label>
      <div className="relative">
        <textarea
          {...props}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/70 resize-none"
        />
        {error && (
          <p className="text-red-400 text-sm mt-1 flex items-center">
            <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.projectType) newErrors.projectType = 'Veuillez sélectionner un type de projet';
    if (!formData.budget) newErrors.budget = 'Veuillez sélectionner un budget';
    if (!formData.timeline) newErrors.timeline = 'Veuillez sélectionner un délai';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    else if (formData.message.trim().length < 10) newErrors.message = 'Le message doit contenir au moins 10 caractères';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        openEmailClient(formData);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      openEmailClient(formData);
      setSubmitError('Le service d\'envoi automatique n\'est pas disponible. Votre client email va s\'ouvrir.');
      
      setTimeout(() => {
        setIsSubmitted(true);
        setSubmitError(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
      if (!submitError) {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      }
    }
  };

  if (isSubmitted && !submitError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl"></div>
        <div className="relative text-center p-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Message envoyé avec succès !
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-lg"
          >
            Je vous répondrai dans les plus brefs délais.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <button
              onClick={() => {
                setIsSubmitted(false);
                setErrors({});
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
      
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="relative space-y-8 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Démarrons votre projet</h3>
          <p className="text-gray-400">Partagez vos idées et recevez un devis personnalisé</p>
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-400 text-sm">{submitError}</p>
          </motion.div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              icon={User}
              label="Nom complet"
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <InputField
              icon={Mail}
              label="Adresse email"
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>

          <InputField
            icon={Building}
            label="Entreprise"
            type="text"
            name="company"
            placeholder="Nom de votre entreprise (facultatif)"
            value={formData.company}
            onChange={handleChange}
          />

          {/* Project Details */}
          <SelectField
            icon={Code}
            label="Type de projet"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            options={projectTypes}
            placeholder="Sélectionnez le type de projet"
            error={errors.projectType}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              icon={DollarSign}
              label="Budget estimé"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              options={budgetRanges}
              placeholder="Sélectionnez votre budget"
              error={errors.budget}
              required
            />
            <SelectField
              icon={Clock}
              label="Délai souhaité"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              options={timelines}
              placeholder="Sélectionnez le délai"
              error={errors.timeline}
              required
            />
          </div>

          <TextareaField
            icon={MessageSquare}
            label="Description du projet"
            name="message"
            placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, contraintes techniques..."
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            rows={6}
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="relative flex items-center justify-center space-x-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Envoyer le message</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </div>
        </motion.button>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
        </p>
      </motion.form>
    </div>
  );
};

export default ContactForm;