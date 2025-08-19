import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, MessageSquare } from 'lucide-react';
import { sendContactEmail, openEmailClient } from '../services/emailService';

const Contact = () => {
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

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@arnaud-schaeffer.com',
      link: 'mailto:contact@arnaud-schaeffer.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Paris, France',
      link: null
    }
  ];

  const stats = [
    {
      icon: Clock,
      value: '24h',
      label: 'Temps de réponse moyen'
    },
    {
      icon: Users,
      value: '50+',
      label: 'Projets réalisés'
    },
    {
      icon: CheckCircle,
      value: '99%',
      label: 'Taux de satisfaction'
    },
    {
      icon: MessageSquare,
      value: '100%',
      label: 'Projets livrés à temps'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Tentative d'envoi via EmailJS
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        // Si EmailJS échoue, utiliser mailto comme fallback
        openEmailClient(formData);
        setIsSubmitted(true);
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
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      // En cas d'erreur, utiliser mailto comme fallback
      openEmailClient(formData);
      setSubmitError('Le service d\'envoi automatique n\'est pas disponible. Votre client email va s\'ouvrir.');
      
      // Marquer comme envoyé après un délai pour laisser le temps à l'utilisateur de voir le message
      setTimeout(() => {
        setIsSubmitted(true);
        setSubmitError(null);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Parlons de votre
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent"> projet</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Vous avez un projet en tête ? Je suis là pour vous accompagner de l'idée à la réalisation. 
              Contactez-moi pour discuter de vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                Restons en contact
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Je réponds généralement dans les 24 heures. N'hésitez pas à me contacter 
                pour discuter de votre projet, même si vous n'êtes qu'au stade de l'idée.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-gray-700 border border-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="text-purple-500" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{info.title}</h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-300 hover:text-purple-500 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Consultation gratuite</h3>
                <p className="text-blue-100">
                  Je propose une consultation gratuite de 30 minutes pour discuter 
                  de votre projet et vous donner mes premiers conseils.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Message envoyé !
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-primary"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded-lg"
                      >
                        <p className="text-sm">{submitError}</p>
                      </motion.div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de projet *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="">Sélectionner</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="">Sélectionner</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Délai souhaité
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="">Sélectionner</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>{timeline}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Décrivez votre projet *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full btn-lg group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      En envoyant ce formulaire, vous acceptez que je vous recontacte 
                      concernant votre projet.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Réservez votre consultation gratuite
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Planifiez directement un créneau de 30 minutes pour discuter de votre projet. 
              C'est gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center bg-gray-800 border border-purple-500 rounded-full px-4 py-2 shadow-sm">
                <Clock className="text-purple-400 mr-2" size={20} />
                <span className="text-white font-medium">30 minutes</span>
              </div>
              <div className="flex items-center bg-gray-800 border border-purple-500 rounded-full px-4 py-2 shadow-sm">
                <Users className="text-purple-400 mr-2" size={20} />
                <span className="text-white font-medium">Consultation personnalisée</span>
              </div>
              <div className="flex items-center bg-gray-800 border border-purple-500 rounded-full px-4 py-2 shadow-sm">
                <MessageSquare className="text-purple-400 mr-2" size={20} />
                <span className="text-white font-medium">Conseils gratuits</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 overflow-hidden">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/arnaud-cl6s/30min" 
                style={{
                  minWidth: '320px',
                  height: '700px',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Voici les questions que l'on me pose le plus souvent.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Combien de temps prend un projet typique ?",
                answer: "Cela dépend de la complexité du projet. Un site vitrine prend généralement 2-4 semaines, une application web 6-12 semaines, et une application mobile 8-16 semaines. Je fournis toujours une estimation détaillée après notre première discussion."
              },
              {
                question: "Proposez-vous un suivi après la livraison ?",
                answer: "Oui, j'inclus toujours une période de garantie et de support après la livraison. Je propose également des contrats de maintenance pour assurer la sécurité et les mises à jour de votre application."
              },
              {
                question: "Travaillez-vous avec des équipes existantes ?",
                answer: "Absolument ! Je peux m'intégrer à votre équipe existante ou travailler en collaboration avec vos développeurs internes. J'ai l'habitude de travailler avec des équipes distribuées."
              },
              {
                question: "Quels sont vos tarifs ?",
                answer: "Mes tarifs varient selon la complexité et la durée du projet. Je propose des tarifs au forfait pour les projets bien définis et des tarifs journaliers pour les missions de consulting. Contactez-moi pour un devis personnalisé."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 border border-gray-600 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;