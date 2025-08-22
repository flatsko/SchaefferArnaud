import { motion } from 'framer-motion';

const stats = [
  { id: 1, name: 'Projets terminés', value: '50+' },
  { id: 2, name: 'Années d\'expérience', value: '3+' },
  { id: 3, name: 'Clients satisfaits', value: '100%' },
  { id: 4, name: 'Taux de réactivité', value: '99%' },
];

const HomeStats = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl lg:max-w-none"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Votre succès est ma priorité</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Je m'engage à fournir des résultats qui dépassent vos attentes.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeStats;