import { motion } from 'framer-motion';

const AdditionalServices = ({ services, onSelect }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Complémentaires</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Bénéficiez de mon expertise pour des besoins spécifiques et ponctuels.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  <Icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button onClick={() => onSelect(service)} className="btn btn-secondary w-full">
                  À partir de {service.price}€
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;