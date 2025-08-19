import { motion } from 'framer-motion';
import { Download, Award, Users, Coffee, Code2 } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'Node.js / Express', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Python / Django', level: 85 },
    { name: 'PostgreSQL / MongoDB', level: 82 },
    { name: 'AWS / Docker', level: 80 },
    { name: 'React Native', level: 78 },
    { name: 'GraphQL', level: 75 }
  ];

  const experience = [
    {
      year: '2023 - Présent',
      title: 'Développeur Full-Stack Senior',
      company: 'Freelance',
      description: 'Développement d\'applications web et mobiles pour diverses entreprises. Spécialisation en React, Node.js et architecture cloud.'
    },
    {
      year: '2021 - 2023',
      title: 'Lead Developer',
      company: 'TechInnovate',
      description: 'Direction d\'une équipe de 5 développeurs. Mise en place d\'architectures scalables et formation des équipes aux bonnes pratiques.'
    },
    {
      year: '2019 - 2021',
      title: 'Développeur Full-Stack',
      company: 'DigitalSolutions',
      description: 'Développement d\'applications web complexes avec React et Node.js. Participation à la conception d\'APIs RESTful et GraphQL.'
    },
    {
      year: '2018 - 2019',
      title: 'Développeur Frontend',
      company: 'WebAgency',
      description: 'Création d\'interfaces utilisateur modernes et responsives. Collaboration étroite avec les équipes design et UX.'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Certifications',
      description: 'AWS Solutions Architect, Google Cloud Professional'
    },
    {
      icon: Users,
      title: 'Équipes dirigées',
      description: 'Plus de 15 développeurs formés et encadrés'
    },
    {
      icon: Coffee,
      title: 'Projets livrés',
      description: '50+ applications web et mobiles développées'
    },
    {
      icon: Code2,
      title: 'Open Source',
      description: 'Contributeur actif sur GitHub avec 1000+ stars'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--text)] mb-6">
                À propos de
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"> moi</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                Passionné par le développement depuis plus de 5 ans, je transforme vos idées en solutions digitales innovantes. 
                Mon expertise couvre l'ensemble du stack technologique moderne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary">
                  <Download size={20} className="mr-2" />
                  Télécharger mon CV
                </button>
                <a href="#contact" className="btn btn-secondary">
                  Me contacter
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                  alt="Arnaud Schaeffer"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
              <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              Mes Compétences
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Une expertise technique solide acquise au fil des années et constamment mise à jour.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[var(--text)]">{skill.name}</span>
                  <span className="text-[var(--primary)] font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-[var(--bg-secondary)] rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
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
              Mon Parcours
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Une progression constante à travers des expériences enrichissantes.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index !== experience.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-full bg-[var(--text-secondary)]"></div>
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-2 top-2 w-4 h-4 bg-[var(--primary)] rounded-full"></div>
                
                <div className="card ml-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text)]">{exp.title}</h3>
                      <p className="text-[var(--primary)] font-medium">{exp.company}</p>
                    </div>
                    <span className="text-[var(--text-secondary)] font-medium mt-2 md:mt-0">{exp.year}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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
              Mes Réalisations
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Quelques chiffres qui témoignent de mon engagement et de mon expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-2">{achievement.title}</h3>
                  <p className="text-[var(--text-secondary)]">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Au-delà du code
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Quand je ne code pas, vous me trouverez en train de découvrir de nouvelles technologies, 
              de contribuer à des projets open source, ou de partager mes connaissances lors de conférences tech. 
              Je crois fermement que l'apprentissage continu est la clé du succès dans notre domaine.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-white">
                🎯 Veille technologique
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-white">
                🚀 Innovation
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-white">
                🤝 Mentorat
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-white">
                📚 Formation continue
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;