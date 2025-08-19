import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "ACCUEIL", href: "/" },
    { 
      name: "SERVICES", 
      href: "/services",
      hasDropdown: true,
      subItems: [
        { name: "Développement Web", href: "/services/developpement-web" },
        { name: "Hébergement & Maintenance", href: "/services/hebergement-maintenance" },
        { name: "SEO & Référencement", href: "/services/seo-referencement" }
      ]
    },
    { name: "PARRAINAGE", href: "/parrainage" },
    { name: "JOURNAL", href: "/journal" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-600/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src="/src/assets/logo.svg"
              alt="Arnaud Schaeffer"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="flex items-center space-x-8 text-white">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href) || item.subItems?.some(sub => isActive(sub.href))
                          ? 'text-purple-500'
                          : 'text-white hover:text-purple-500'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                                isActive(subItem.href)
                                  ? 'text-purple-500 bg-gray-700'
                                  : 'text-gray-100 hover:text-purple-500 hover:bg-gray-700'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {(isActive(item.href) || item.subItems?.some(sub => isActive(sub.href))) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-purple-500'
                        : 'text-white hover:text-purple-500'
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Commencer un projet
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="p-2 rounded-md text-gray-100 hover:text-purple-500 hover:bg-gray-700 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[var(--background)] border-t border-[var(--text-secondary)]/20">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${
                          isActive(item.href) || item.subItems?.some(sub => isActive(sub.href))
                            ? 'text-[var(--primary)] bg-[var(--bg-secondary)]'
                            : 'text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          isServicesOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                isActive(subItem.href)
                                  ? 'text-[var(--primary)] bg-[var(--bg-secondary)]'
                                  : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-secondary)]'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive(item.href)
                          ? 'text-[var(--primary)] bg-[var(--bg-secondary)]'
                          : 'text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 w-full block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commencer un projet
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
