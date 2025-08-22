import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Check, 
  X, 
  Calendar, 
  Euro, 
  Crown, 
  Zap,
  Shield,
  Star,
  AlertCircle
} from 'lucide-react';
import { subscriptionAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import DashboardLayout from '../../components/DashboardLayout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Subscriptions = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansResponse, subscriptionsResponse] = await Promise.all([
          subscriptionAPI.getPlans(),
          subscriptionAPI.getMySubscriptions()
        ]);
        setPlans(plansResponse.data);
        setMySubscriptions(subscriptionsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des abonnements:', error);
        toast.error('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = async (planId) => {
    setSubscribing(planId);
    try {
      const response = await subscriptionAPI.subscribe({ planId });
      
      if (response.data.clientSecret) {
        const stripe = await stripePromise;
        const { error } = await stripe.confirmCardPayment(response.data.clientSecret);
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Abonnement activé avec succès !');
          // Recharger les données
          const subscriptionsResponse = await subscriptionAPI.getMySubscriptions();
          setMySubscriptions(subscriptionsResponse.data);
        }
      } else if (response.data.subscription) {
        toast.success('Abonnement activé avec succès !');
        const subscriptionsResponse = await subscriptionAPI.getMySubscriptions();
        setMySubscriptions(subscriptionsResponse.data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'abonnement');
    } finally {
      setSubscribing(null);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cet abonnement ?')) {
      return;
    }

    setCancelling(subscriptionId);
    try {
      await subscriptionAPI.cancelSubscription(subscriptionId);
      toast.success('Abonnement annulé avec succès');
      
      // Recharger les données
      const subscriptionsResponse = await subscriptionAPI.getMySubscriptions();
      setMySubscriptions(subscriptionsResponse.data);
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'annulation');
    } finally {
      setCancelling(null);
    }
  };

  const isSubscribedToPlan = (planId) => {
    return mySubscriptions.some(sub => 
      sub.planId === planId && ['ACTIVE', 'TRIALING'].includes(sub.status)
    );
  };

  const getSubscriptionForPlan = (planId) => {
    return mySubscriptions.find(sub => 
      sub.planId === planId && ['ACTIVE', 'TRIALING', 'PAST_DUE'].includes(sub.status)
    );
  };

  const getPlanIcon = (planName) => {
    const name = planName.toLowerCase();
    if (name.includes('premium') || name.includes('pro')) return Crown;
    if (name.includes('basic') || name.includes('starter')) return Shield;
    if (name.includes('enterprise') || name.includes('business')) return Star;
    return Zap;
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'text-green-600 bg-green-100',
      TRIALING: 'text-blue-600 bg-blue-100',
      PAST_DUE: 'text-yellow-600 bg-yellow-100',
      CANCELLED: 'text-red-600 bg-red-100',
      INCOMPLETE: 'text-gray-600 bg-gray-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  if (loading) {
    return (
      <DashboardLayout title="Abonnements">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner text="Chargement des abonnements..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Mes Abonnements"
      subtitle="Gérez vos abonnements et découvrez nos plans premium."
    >

        {/* Abonnements actuels */}
        {mySubscriptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Abonnements actuels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mySubscriptions.map((subscription) => {
                const plan = plans.find(p => p.id === subscription.planId);
                if (!plan) return null;
                
                const Icon = getPlanIcon(plan.name);
                
                return (
                  <motion.div
                    key={subscription.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-sm text-gray-600">
                            {plan.price}€/{plan.interval}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(subscription.status)
                      }`}>
                        {subscription.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Début:</span>
                        <span className="font-medium">
                          {new Date(subscription.currentPeriodStart).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fin:</span>
                        <span className="font-medium">
                          {new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      {subscription.cancelAtPeriodEnd && (
                        <div className="flex items-center text-sm text-yellow-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Sera annulé à la fin de la période</span>
                        </div>
                      )}
                    </div>
                    
                    {subscription.status === 'ACTIVE' && !subscription.cancelAtPeriodEnd && (
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        disabled={cancelling === subscription.id}
                        className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {cancelling === subscription.id ? 'Annulation...' : 'Annuler l\'abonnement'}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Plans disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {mySubscriptions.length > 0 ? 'Autres plans disponibles' : 'Plans d\'abonnement'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = getPlanIcon(plan.name);
              const isSubscribed = isSubscribedToPlan(plan.id);
              const subscription = getSubscriptionForPlan(plan.id);
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm p-8 relative ${
                    plan.featured ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
                  } ${isSubscribed ? 'opacity-75' : ''}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-full ${
                      plan.featured ? 'bg-blue-100' : 'bg-gray-100'
                    } mb-4`}>
                      <Icon className={`h-8 w-8 ${
                        plan.featured ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                      <span className="text-gray-600">/{plan.interval}</span>
                    </div>
                    
                    {plan.features && (
                      <ul className="space-y-3 mb-8 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {isSubscribed ? (
                      <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                          <Check className="h-4 w-4 mr-2" />
                          Abonné
                        </div>
                        {subscription && subscription.status === 'PAST_DUE' && (
                          <p className="text-sm text-yellow-600 mt-2">
                            Paiement en retard
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={subscribing === plan.id}
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                          plan.featured
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {subscribing === plan.id ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Abonnement...
                          </div>
                        ) : (
                          'S\'abonner'
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-blue-50 rounded-xl p-8"
        >
          <div className="text-center">
            <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Paiements sécurisés
            </h3>
            <p className="text-gray-600 mb-4">
              Tous les paiements sont traités de manière sécurisée via Stripe.
              Vous pouvez annuler votre abonnement à tout moment.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Sécurisé SSL</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Annulation flexible</span>
              </div>
              <div className="flex items-center">
                <Euro className="h-4 w-4 mr-1" />
                <span>Facturation transparente</span>
              </div>
            </div>
          </div>
        </motion.div>
    </DashboardLayout>
  );
};

export default Subscriptions;