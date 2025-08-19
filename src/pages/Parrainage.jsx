import { motion } from 'framer-motion';
import { Users, Heart, Star, Gift, ArrowRight, CheckCircle } from 'lucide-react';

const Parrainage = () => {
  const benefits = [
    {
      icon: Gift,
      title: 'Récompenses attractives',
      description: 'Recevez des réductions sur vos futurs projets pour chaque parrainage réussi.'
    },
    {
      icon: Users,
      title: 'Réseau professionnel',
      description: 'Élargissez votre réseau en recommandant mes services à vos contacts.'
    },
    {
      icon: Star,
      title: 'Reconnaissance',
      description: 'Devenez un partenaire privilégié avec des avantages exclusifs.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Recommandez',
      description: 'Partagez mes coordonnées avec vos contacts qui ont besoin de services web.'
    },
    {
      number: '02',
      title: 'Connexion',
      description: 'Votre contact me contacte en mentionnant votre recommandation.'
    },
    {
      number: '03',
      title: 'Récompense',
      description: 'Une fois le projet signé, vous recevez votre récompense de parrainage.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text)] mb-6">
              Programme de
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent block"> Parrainage</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Recommandez mes services et bénéficiez de récompenses attractives. 
              Ensemble, développons un réseau de confiance et de qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary group flex items-center justify-center">
                <Heart className="mr-2" size={20} />
                Devenir parrain
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Pourquoi parrainer ?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Découvrez tous les avantages de notre programme de parrainage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[var(--bg-card)] p-8 rounded-xl shadow-lg group hover:scale-105 transition-all duration-300 border border-[var(--text-secondary)]/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-4">{benefit.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
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
              Comment ça marche ?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Un processus simple en 3 étapes pour commencer à parrainer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-4">{step.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="text-[var(--primary)] mx-auto" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez notre programme de parrainage dès aujourd'hui et commencez à bénéficier de nos récompenses.
            </p>
            <button className="bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 group flex items-center justify-center mx-auto">
              <CheckCircle className="mr-2" size={20} />
              Devenir parrain maintenant
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Parrainage;