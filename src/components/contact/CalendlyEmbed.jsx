import { useEffect } from "react";
import { motion } from "framer-motion";

const CalendlyEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h2 className="text-4xl font-bold text-white text-center mb-8">
        Planifiez un <span className="text-purple-400">appel</span>
      </h2>
      <div
        className="calendly-inline-widget w-full h-[700px] bg-gray-800 rounded-lg overflow-hidden"
        data-url="https://calendly.com/arnaud-cl6s/30min"
      ></div>
    </motion.div>
  );
};

export default CalendlyEmbed;
