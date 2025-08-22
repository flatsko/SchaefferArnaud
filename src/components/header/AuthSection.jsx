import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const AuthSection = ({
  user,
  onLogout,
  isMobile = false,
  userMenuOpen,
  onUserMenuToggle,
}) => {
  // Temporairement caché pour la mise en ligne frontend uniquement
  return null;

  // Code original commenté pour réactivation future
  /*
  const isMobileClass = isMobile ? "w-full" : "";

  if (user) {
    return (
      <div className={`relative ${isMobileClass}`}>
        <button
          onClick={onUserMenuToggle}
          className="flex items-center space-x-2 px-3 py-2 text-white hover:text-purple-500 transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </span>
          </div>
          <span className="text-sm font-medium">{user.firstName}</span>
        </button>

        {userMenuOpen && <UserMenu user={user} onLogout={onLogout} />}
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-4"}`}>
      <Link
        to="/login"
        className={`px-4 py-2 text-sm font-medium text-white hover:text-purple-400 transition-colors duration-200 ${isMobileClass}`}
      >
        Connexion
      </Link>
      <Link
        to="/register"
        className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isMobileClass}`}
      >
        Inscription
      </Link>
    </div>
  );
  */
};

export default AuthSection;