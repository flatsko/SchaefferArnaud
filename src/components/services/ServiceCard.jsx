import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onSelect }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`card ${service.popular ? 'border-2 border-blue-600' : ''}`}
    >
      {service.popular && (
        <div className="popular-badge">Le plus populaire</div>
      )}
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Icon className="text-blue-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {service.price}€
          <span className="text-lg font-normal text-gray-500"> / projet</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">Durée estimée : {service.duration}</p>
        
        <ul className="space-y-4 mb-8">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <Check className="text-white" size={12} />
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button onClick={() => onSelect(service)} className="btn btn-primary w-full">
          Choisir ce service <ArrowRight className="ml-2" size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;