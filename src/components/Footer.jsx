import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Icon from "./ui/Icon";
import { Logo } from "./ui";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/arnaudschaeffer",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/arnaudschaeffer",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/arnaudschaeffer",
    },
  ];

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  const services = [
    { name: "Hébergement/Maintenance", href: "/services#hosting" },
    { name: "Création de sites", href: "/services#web-development" },
    { name: "SEO", href: "/services#seo" },
    { name: "SEA", href: "/services#sea" },
  ];

  return (
    <footer className="bg-[var(--background)] text-[var(--text)]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
            </div>
            <p className="text-[var(--text-secondary)] mb-6">
              Développeur web spécialisé dans la création de sites internet,
              l'hébergement sécurisé et les stratégies SEO/SEA.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center hover:bg-[var(--primary)] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[var(--primary)]" />
                <a
                  href="mailto:arnaud@arnaud-schaeffer.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-300"
                >
                  arnaud@arnaud-schaeffer.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[var(--primary)]" />
                <a
                  href="tel:+33636061097"
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-300"
                >
                  06 36 06 10 97
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[var(--primary)]" />
                <span className="text-[var(--text-secondary)]">
                  La Rochelle, France
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-[var(--text-secondary)]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-secondary)] text-sm">
              © {currentYear} Arnaud Schaeffer. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
              <Link
                to="/terms"
                className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm transition-colors duration-300"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
