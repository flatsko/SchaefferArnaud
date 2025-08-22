import AboutHero from '../components/about/AboutHero';
import AboutContent from '../components/about/AboutContent';

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-[var(--background)]">
      {/* About Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[var(--background)] via-[var(--bg-secondary)] to-[var(--background)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 left-10 w-80 h-80 bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-[var(--secondary)]/30 to-[var(--accent)]/30 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <AboutHero />
          <AboutContent />
        </div>
      </section>
    </div>
  );
};

export default About;