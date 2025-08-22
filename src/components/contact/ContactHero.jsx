import { motion } from 'framer-motion';

const ContactHero = () => (
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
);

export default ContactHero;