import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Directrice, Boutique en ligne',
    content: 'Arnaud a créé notre site e-commerce et gère notre hébergement. Excellent service client et site très performant !',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face'
  },
  {
    name: 'Pierre Martin',
    role: 'Gérant, Restaurant Le Gourmet',
    content: 'Grâce au SEO d\'Arnaud, notre restaurant apparaît en première page Google. Les réservations ont doublé !',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  },
  {
    name: 'Sophie Laurent',
    role: 'Artisan, Créations Sophie',
    content: 'Site web magnifique, maintenance impeccable et campagnes SEA très efficaces. Je recommande vivement !',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
  }
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-[var(--bg-card)] border border-[var(--primary)]/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
  >
    <div className="flex-grow">
      <div className="flex items-center mb-4">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-[var(--primary)]" />
        <div>
          <h4 className="font-bold text-[var(--text)] text-lg">{testimonial.name}</h4>
          <p className="text-[var(--text-secondary)] text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-[var(--text-light)] italic mb-4 flex-grow">“{testimonial.content}”</p>
    </div>
    <div className="flex items-center text-yellow-400 mt-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
    </div>
  </motion.div>
);

const HomeTestimonials = () => (
  <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 lg:mb-20"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full px-4 py-2 mb-6">
          <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--text)] tracking-wide">Ce que disent mes clients</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] mb-6">
          La confiance, ça se <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">mérite</span>
        </h2>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Découvrez pourquoi des dizaines d'entrepreneurs me font confiance pour leur projet digital.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default HomeTestimonials;