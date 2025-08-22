import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
    className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed"
  >
    <p className="text-xl mb-6">
      Imaginez un collégien de 5ème en 2003, déjà fasciné par le code HTML, créant son premier site web sur un hébergement Free. C'était moi, et cette première expérience a marqué le début d'une passion qui ne m'a jamais quitté.
    </p>

    <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--text-secondary)]/20 mb-8">
      <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Pourquoi je fais ce métier ?</h3>
      <p className="mb-4">
        Ce n'est pas un hasard si aujourd'hui je me consacre à développer la visibilité des entrepreneurs. Mon parcours m'a appris une leçon essentielle : un site web n'est pas une œuvre d'art destinée à flatter l'ego du développeur. C'est un outil qui doit générer des résultats concrets pour votre activité.
      </p>
      <p className="italic text-[var(--primary)] font-medium">
        Je me souviens encore de ce moment décisif avec un installateur de panneaux solaires. Alors que je lui présentais fièrement mon travail, son regard est resté fixé ailleurs, il n'a pas regardé une seule seconde son nouveau site web. Cette expérience m'a enseigné une leçon : le site n'est pas important, ce qui est important c'est le nombre de client qu'il vous rapporte !
      </p>
    </div>

    <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 p-8 rounded-xl mb-8">
      <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Mon engagement envers vous</h3>
      <p className="mb-4">
        Après des années d'expérience dans le développement web, enrichies par un passage en entreprise qui m'a permis d'affûter mes compétences en organisation et en relations humaines, j'ai aujourd'hui une conviction profonde :
      </p>
      <blockquote className="text-xl font-semibold text-[var(--primary)] text-center py-4 border-l-4 border-[var(--primary)] pl-6 mb-4">
        Les entrepreneurs de notre région méritent d'être visibles sur le web et de vivre correctement de leur savoir-faire.
      </blockquote>
      <p className="text-right font-medium text-[var(--text)]">
        — Arnaud
      </p>
    </div>

    <p className="text-lg mb-6">
      C'est pourquoi je ne m'engage dans un projet que lorsque je suis certain de pouvoir générer des résultats tangibles. Ma promesse ? Transformer votre présence en ligne en un véritable outil de croissance pour votre activité.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--text-secondary)]/20">
        <h4 className="text-xl font-bold text-[var(--text)] mb-4">Ce qui me distingue ?</h4>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Une expertise technique forgée depuis mes débuts précoces</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Une compréhension approfondie du marketing digital</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Une approche orientée résultats, validée par mon expérience terrain</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Un engagement total envers la réussite de votre projet</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 p-6 rounded-xl border border-[var(--primary)]/30">
        <h4 className="text-xl font-bold text-[var(--text)] mb-4">🤝 Prêt à développer ensemble votre visibilité en ligne ?</h4>
        <p className="mb-6">
          Aujourd'hui, armé de mes compétences en développement web et en marketing digital, je mets mon expertise au service de votre réussite. Parce que chaque entrepreneur mérite d'être reconnu pour son talent et son savoir-faire.
        </p>
        <Link 
          to="/contact" 
          className="btn btn-primary w-full text-center block"
        >
          Discutons de votre Projet
        </Link>
      </div>
    </div>
  </motion.div>
);

export default AboutContent;