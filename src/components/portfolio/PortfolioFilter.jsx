import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const PortfolioFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-4 mb-12"
    >
      <Filter className="text-gray-400" />
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </motion.div>
  );
};

export default PortfolioFilter;