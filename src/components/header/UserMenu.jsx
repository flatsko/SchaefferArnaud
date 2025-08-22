import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ user, onLogout }) => {
  const menuItems = [
    { label: "Tableau de bord", href: "/dashboard" },
    { label: "Profil", href: "/dashboard/profile" },
    { label: "Boutique", href: "/dashboard/shop" },
    { label: "Support", href: "/dashboard/tickets" },
    ...(user?.role === "admin"
      ? [{ label: "Administration", href: "/admin" }]
      : []),
  ];

  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
      <div className="py-1">
        <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
          <div className="font-medium text-white">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>

        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-purple-400 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}

        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default UserMenu;