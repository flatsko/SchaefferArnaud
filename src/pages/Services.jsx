import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Code, Smartphone, Cloud, Zap, Users, Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_your_stripe_public_key_here');

const CheckoutForm = ({ service, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Ici vous devriez appeler votre backend pour créer un PaymentIntent
      // Pour la démo, on simule un paiement réussi
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? 'Traitement...' : `Payer ${service.price}€`}
      </button>
    </form>
  );
};

const PaymentModal = ({ service, isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[var(--background)] rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[var(--text)]">Paiement sécurisé</h3>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text)]"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-[var(--text)]">{service.title}</h4>
          <p className="text-[var(--text-secondary)]">{service.description}</p>
          <p className="text-2xl font-bold text-[var(--primary)] mt-2">{service.price}€</p>
        </div>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm service={service} onSuccess={onSuccess} />
        </Elements>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const services = [
    {
      id: 1,
      icon: Code,
      title: 'Développement Web',
      description: 'Application web moderne et responsive',
      price: 2500,
      duration: '4-6 semaines',
      features: [
        'Design responsive',
        'Interface utilisateur moderne',
        'Optimisation SEO',
        'Intégration API',
        'Tests automatisés',
        'Déploiement inclus'
      ],
      popular: false
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Application Mobile',
      description: 'App native iOS/Android ou cross-platform',
      price: 4500,
      duration: '8-12 semaines',
      features: [
        'Design natif',
        'Performance optimisée',
        'Notifications push',
        'Intégration backend',
        'Tests sur devices',
        'Publication stores'
      ],
      popular: true
    },
    {
      id: 3,
      icon: Cloud,
      title: 'Solution Cloud',
      description: 'Architecture cloud scalable et sécurisée',
      price: 3500,
      duration: '6-8 semaines',
      features: [
        'Architecture AWS/GCP',
        'Auto-scaling',
        'Monitoring avancé',
        'Sécurité renforcée',
        'Backup automatique',
        'Support 24/7'
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      icon: Zap,
      title: 'Audit de Performance',
      description: 'Analyse complète et optimisation de votre application existante',
      price: 800
    },
    {
      icon: Users,
      title: 'Formation Équipe',
      description: 'Formation de vos équipes aux technologies modernes',
      price: 1200
    },
    {
      icon: Shield,
      title: 'Audit Sécurité',
      description: 'Évaluation et renforcement de la sécurité de vos applications',
      price: 1000
    }
  ];

  const handlePayment = (service) => {
    setSelectedService(service);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text)] mb-6">
              Mes
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"> Services</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
              Des solutions sur mesure pour transformer vos idées en réalité digitale. 
              Paiement sécurisé et transparent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
              Services Principaux
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Choisissez le service qui correspond à vos besoins. Paiement sécurisé par Stripe.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative card ${service.popular ? 'ring-2 ring-blue-600' : ''}`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-2">{service.title}</h3>
                <p className="text-[var(--text-secondary)] mb-4">{service.description}</p>
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                  {service.price}€
                </div>
                <p className="text-[var(--text-secondary)]">{service.duration}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handlePayment(service)}
                    className={`btn w-full ${
                      service.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Commencer le projet
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
              Solutions Complètes
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Des services additionnels pour optimiser et sécuriser vos projets existants.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3">{service.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-[var(--primary)] mb-4">
                    {service.price}€
                  </div>
                  <button
                    onClick={() => handlePayment(service)}
                    className="btn btn-secondary w-full"
                  >
                    Commander
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
              Mon Processus
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de votre projet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Analyse', description: 'Étude approfondie de vos besoins et objectifs' },
              { step: '02', title: 'Conception', description: 'Design et architecture de la solution' },
              { step: '03', title: 'Développement', description: 'Implémentation avec feedback régulier' },
              { step: '04', title: 'Livraison', description: 'Tests, déploiement et formation' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3">{process.title}</h3>
                <p className="text-[var(--text-secondary)]">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        service={selectedService}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Success Message */}
      {paymentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center">
            <Check className="mr-2" size={20} />
            Paiement réussi ! Je vous contacterai sous 24h.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Services;