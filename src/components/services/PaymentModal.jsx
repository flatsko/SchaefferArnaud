import { useState } from 'react';
import { motion } from 'framer-motion';
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
        className="bg-white rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Paiement sécurisé</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900">{service.title}</h4>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{service.price}€</p>
        </div>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm service={service} onSuccess={onSuccess} />
        </Elements>
      </motion.div>
    </div>
  );
};

export default PaymentModal;