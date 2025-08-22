import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Composant Logo réutilisable avec animation
 */
export const Logo = ({
  size = "default",
  animated = true,
  className = "",
  ...props
}) => {
  const sizes = {
    small: "h-8 w-8",
    default: "h-10 w-10",
    large: "h-12 w-12",
  };

  const logoSize = sizes[size] || sizes.default;

  return (
    <Link
      to="/"
      className={`flex items-center space-x-2 ${className}`}
      {...props}
    >
      <motion.div
        whileHover={animated ? { scale: 1.1 } : {}}
        transition={animated ? { duration: 0.3 } : {}}
        className="flex-shrink-0"
      >
        <img
          src="/logoSchaefferArnaud.png"
          alt="SchaefferArnaud Logo"
          className={`${logoSize} object-contain`}
        />
      </motion.div>
      <motion.span 
        className="text-xl font-bold text-white tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Arnaud
        </span>
        {" "}
        <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-wide">
          Schaeffer
        </span>
      </motion.span>
    </Link>
  );
};
export default Logo;
