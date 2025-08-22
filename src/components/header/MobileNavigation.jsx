import React from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const MobileNavigation = ({ navigation, isActive, authSection, onClose }) => (
  <motion.div
    initial="closed"
    animate="open"
    exit="closed"
    variants={variants}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="md:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-xl z-[60]"
    onClick={onClose}
    aria-modal="true"
    role="dialog"
  >
    <div className="fixed top-6 right-6 z-[70]">
      <button
        onClick={onClose}
        className="p-3 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full shadow-2xl shadow-purple-500/25"
        aria-label="Fermer le menu"
      >
        <Icon name="close" className="w-6 h-6" />
      </button>
    </div>
    <div className="pt-20 h-full" onClick={(e) => e.stopPropagation()}>
      <nav className="flex flex-col px-6 pb-6 bg-gray-950/95 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            {item.hasDropdown ? (
              <div className="space-y-2">
                <span className="text-purple-300 font-bold text-xl border-b border-white/30 pb-3 block">
                  {item.name}
                </span>
                <div className="ml-4 space-y-3">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={`block px-4 py-4 text-lg rounded-lg transition-all duration-300 ${
                        isActive(subItem.href)
                          ? "text-purple-300 bg-white/15 font-semibold border-l-4 border-purple-400"
                          : "text-gray-200 hover:bg-white/10 hover:text-white border-l-4 border-transparent"
                      }`}
                      onClick={onClose}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.href}
                className={`block px-4 py-4 text-xl rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-purple-300 bg-white/15 font-semibold border-l-4 border-purple-400"
                    : "text-gray-200 hover:bg-white/10 hover:text-white border-l-4 border-transparent"
                }`}
                onClick={onClose}
              >
                {item.name}
              </Link>
            )}
          </motion.div>
        ))}
        <div className="border-t border-white/20 pt-6 mt-8">
          <div className="px-4">{authSection}</div>
        </div>
      </nav>
    </div>
  </motion.div>
);

export default MobileNavigation;
