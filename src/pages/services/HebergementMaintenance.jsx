import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, X, Server, Settings, Shield, Wrench, Zap, Monitor } from 'lucide-react';
import { useState } from 'react';
import { services, plans, comparisonData } from '../../data/hebergementMaintenanceData';

// Mapping des noms d'icônes vers les composants
const iconComponents = {
  Server,
  Settings,
  Shield,
  Wrench,
  Zap,
  Monitor
};

const HebergementMaintenance = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full px-6 py-2 mb-8"
            >
              <span className="text-[var(--primary)] text-sm font-medium uppercase tracking-wide">
                UNE MAINTENANCE WEB SANS PRISE DE TÊTE
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Gardez Votre Site Web
              <span className="text-[var(--primary)] block">Performant et Sécurisé 🔒</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto mb-12 leading-relaxed">
              Vous souhaitez un site web qui fonctionne sans souci pour vous concentrer sur votre métier ? Mes solutions de maintenance s'occupent de tout.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const pricingSection = document.getElementById('pricing-section');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2 mb-12"
            >
              Choisir mon pack
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-[var(--text-secondary)]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                <span>Support réactif</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                <span>Tarifs transparents</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services de Maintenance
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Une maintenance complète pour un site WordPress performant et sécurisé
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--background)] p-8 rounded-xl border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50 transition-colors"
              >
                <div className="text-[var(--primary)] mb-4">
                  {React.createElement(iconComponents[service.iconName], { className: "h-8 w-8" })}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Formules de Maintenance
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Choisissez la formule adaptée à votre site WordPress
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium transition-colors ${
                !isAnnual ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'
              }`}>
                Mensuel
              </span>
              <button
                 onClick={() => setIsAnnual(!isAnnual)}
                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
                   isAnnual ? 'bg-[var(--primary)]' : 'bg-[var(--text-secondary)]/30'
                 }`}
               >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${
                isAnnual ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'
              }`}>
                Annuel
              </span>
              {isAnnual && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  -20% économie
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-[var(--bg-secondary)] p-8 rounded-xl border ${
                  plan.popular 
                    ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' 
                    : 'border-[var(--text-secondary)]/20'
                } hover:border-[var(--primary)]/50 transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-[var(--text-secondary)] mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-lg text-[var(--text-secondary)] line-through mr-2">
                      {isAnnual ? plan.annualOriginalPrice : plan.monthlyOriginalPrice}
                    </span>
                    <span className="text-4xl font-bold">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[var(--text-secondary)] ml-1">
                      {isAnnual ? ' / an' : ' / mois'}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-green-600 font-medium">
                      Soit {Math.round(parseInt(plan.annualPrice) / 12)}€/mois
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded && plan.notIncluded.map((feature, idx) => (
                    <li key={`not-${idx}`} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(isAnnual ? plan.annualStripeLink : plan.monthlyStripeLink, '_blank')}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90'
                      : 'bg-[var(--background)] text-[var(--text)] border border-[var(--text-secondary)]/20 hover:border-[var(--primary)]/50'
                  }`}
                >
                  Choisir cette formule
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Le comparatif :
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[var(--background)] rounded-xl overflow-hidden border border-[var(--text-secondary)]/20"
          >
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[var(--primary)] text-white">
              <div className="p-4 font-semibold"></div>
              <div className="p-4 text-center font-semibold border-l border-white/20">Pack Sérénité</div>
              <div className="p-4 text-center font-semibold border-l border-white/20">Pack Tranquillité</div>
              <div className="p-4 text-center font-semibold border-l border-white/20">Pack Zen</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[var(--text-secondary)]/20">
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-4 hover:bg-[var(--bg-secondary)]/50 transition-colors">
                  <div className="p-4 font-medium">{item.feature}</div>
                  
                  {/* Pack Sérénité */}
                  <div className="p-4 text-center border-l border-[var(--text-secondary)]/20 text-sm">
                    {item.serenite.included ? (
                      item.serenite.details ? (
                        <span>{item.serenite.details}</span>
                      ) : (
                        <CheckCircle className="h-5 w-5 text-[var(--primary)] mx-auto" />
                      )
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Non inclus</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Pack Tranquillité */}
                  <div className="p-4 text-center border-l border-[var(--text-secondary)]/20 text-sm">
                    {item.tranquillite.included ? (
                      item.tranquillite.details ? (
                        item.tranquillite.details.includes('🎁') ? (
                          <span className="inline-flex items-center gap-1 text-[var(--primary)] font-medium">
                            {item.tranquillite.details}
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                            <span>{item.tranquillite.details}</span>
                          </div>
                        )
                      ) : (
                        <CheckCircle className="h-5 w-5 text-[var(--primary)] mx-auto" />
                      )
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Non inclus</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Pack Zen */}
                  <div className="p-4 text-center border-l border-[var(--text-secondary)]/20 text-sm">
                    {item.zen.included ? (
                      item.zen.details ? (
                        item.zen.details.includes('🎁') ? (
                          <span className="inline-flex items-center gap-1 text-[var(--primary)] font-medium">
                            {item.zen.details}
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                            <span>{item.zen.details}</span>
                          </div>
                        )
                      ) : (
                        <CheckCircle className="h-5 w-5 text-[var(--primary)] mx-auto" />
                      )
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Non inclus</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 bg-[var(--bg-secondary)] p-6">
              <div></div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
                >
                  Choisir la Sérénité 😊
                </motion.button>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Satisfaction garantie 30 jours ou remboursé</p>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
                >
                  Choisir la Tranquillité 😌
                </motion.button>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Satisfaction garantie 30 jours ou remboursé</p>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition-colors inline-flex items-center gap-2"
                >
                  Adopter le mode Zen 😌
                </motion.button>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Satisfaction garantie 30 jours ou remboursé</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi Choisir Ma Maintenance ?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-[var(--primary)] mt-1">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Expertise WordPress</h3>
                    <p className="text-[var(--text-secondary)]">
                      Mon expertise WordPress assure la maintenance complète de votre site.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[var(--primary)] mt-1">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Sécurité Renforcée</h3>
                    <p className="text-[var(--text-secondary)]">
                      Protection contre les malwares, mises à jour sécurisées et monitoring continu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[var(--primary)] mt-1">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Performance Optimisée</h3>
                    <p className="text-[var(--text-secondary)]">
                      Optimisation continue pour des temps de chargement rapides et une meilleure expérience utilisateur.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[var(--background)] p-8 rounded-xl border border-[var(--text-secondary)]/20">
                <Monitor className="h-16 w-16 text-[var(--primary)] mb-6 mx-auto" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Tableau de Bord Intuitif</h3>
                  <p className="text-[var(--text-secondary)]">
                    Gérez facilement votre hébergement avec mon interface moderne et intuitive.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[var(--background)] rounded-2xl p-8 md:p-12 border border-[var(--text-secondary)]/10 shadow-xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary)]">
                Besoin d'aide pour choisir la solution idéale ?
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                Échangeons gratuitement pour trouver l'offre qui correspond à vos besoins
              </p>
            </div>

            {/* Three steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--background)] p-6 rounded-xl border border-[var(--text-secondary)]/10 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Analyse personnalisée</h3>
                <p className="text-[var(--text-secondary)] text-sm">de vos besoins spécifiques</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--background)] p-6 rounded-xl border border-[var(--text-secondary)]/10 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Conseils</h3>
                <p className="text-[var(--text-secondary)] text-sm">adaptés à votre budget et vos objectifs</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--background)] p-6 rounded-xl border border-[var(--text-secondary)]/10 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Recommandation</h3>
                <p className="text-[var(--text-secondary)] text-sm">de la formule la plus pertinente</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                Planifier mon appel conseil gratuit
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HebergementMaintenance;