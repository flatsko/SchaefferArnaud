import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "../hooks/useNavigation";
import { NAVIGATION_CONFIG } from "../config/navigation.config";

import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import AuthSection from "./header/AuthSection";
import Icon from "./ui/Icon";
import Logo from "./ui/Logo";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const {
    processedNavigation,
    isActive,
    isAnySubActive,
    toggleDropdown,
    openDropdowns,
  } = useNavigation(NAVIGATION_CONFIG);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/");
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [logout, navigate]);

  const authSection = (
    <AuthSection
      user={user}
      onLogout={handleLogout}
      userMenuOpen={userMenuOpen}
      onUserMenuToggle={() => setUserMenuOpen(!userMenuOpen)}
    />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[55] bg-gray-900/90 backdrop-blur-md border-b border-gray-600/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo size="large" />

          {/* Navigation Desktop */}
          <DesktopNavigation
            navigation={processedNavigation}
            isActive={isActive}
            isAnySubActive={isAnySubActive}
            onServicesToggle={() => toggleDropdown("Services")}
            isServicesOpen={openDropdowns["Services"]}
            authSection={authSection}
          />

          {/* Mobile Menu Button - toujours à droite */}
          <div className="mg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-[60]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white/10 backdrop-blur-sm text-white hover:text-purple-300 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 rounded-full shadow-lg"
              aria-label={
                isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              <Icon
                name={isMobileMenuOpen ? "close" : "menu"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <MobileNavigation
          navigation={processedNavigation}
          isActive={isActive}
          isAnySubActive={isAnySubActive}
          authSection={authSection}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
