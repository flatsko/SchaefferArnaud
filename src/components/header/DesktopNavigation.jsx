import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNavigation = ({ navigation, isActive, isAnySubActive, onServicesToggle, isServicesOpen, authSection }) => (
  <nav className="invisible md:visible flex items-center space-x-8 ml-auto">
    {navigation.map((item) => (
      <div key={item.name} className="relative">
        {item.hasDropdown ? (
          <div
            className="relative group"
            onMouseEnter={() => onServicesToggle(item.name)}
            onMouseLeave={() => onServicesToggle(item.name)}
          >
            <button
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(item.href) || isAnySubActive(item.subItems)
                  ? "text-purple-500"
                  : "text-white hover:text-purple-500"
              }`}
            >
              {item.name}
              <svg
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    className={`block px-4 py-3 text-sm text-gray-100 hover:text-purple-500 hover:bg-gray-700 transition-colors duration-200 ${
                      isActive(subItem.href)
                        ? "bg-gray-700 text-purple-500"
                        : ""
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.href}
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive(item.href)
                ? "text-purple-500"
                : "text-white hover:text-purple-500"
            }`}
          >
            {item.name}
          </Link>
        )}
      </div>
    ))}
    {authSection}
  </nav>
);

export default DesktopNavigation;