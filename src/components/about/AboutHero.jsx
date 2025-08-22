import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const AboutHero = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mb-16 lg:mb-20"
  >
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-6 py-2 mb-6">
      <Users className="w-4 h-4 text-[var(--primary)]" />
      <span className="text-sm font-medium text-[var(--text)] tracking-wide">Mon Histoire</span>
    </div>
    
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-8 leading-tight">
      De la Passion à la Mission :
      <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent block">
        Mon Engagement pour les Entrepreneurs
      </span>
    </h1>
  </motion.div>
);

export default AboutHero;