import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle, MessageSquare } from 'lucide-react';

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

const StatCard = ({ icon: Icon, value, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center"
  >
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full">
      <Icon className="w-8 h-8 text-purple-400" />
    </div>
    <p className="text-4xl font-bold text-white">{value}</p>
    <p className="text-gray-400">{label}</p>
  </motion.div>
);

const ContactStats = () => (
  <section className="py-16 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ContactStats;