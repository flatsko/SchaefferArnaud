import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'arnaud@arnaud-schaeffer.com',
    link: 'mailto:arnaud@arnaud-schaeffer.com'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '06 36 06 10 97',
    link: 'tel:+33636061097'
  },
  {
    icon: MapPin,
    title: 'Localisation',
    value: 'La Rochelle, France',
    link: null
  }
];

const ContactInfoCard = ({ icon: Icon, title, value, link, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-800 p-6 rounded-lg text-center"
  >
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full">
      <Icon className="w-8 h-8 text-purple-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    {link ? (
      <a href={link} className="text-gray-300 hover:text-purple-400 transition-colors">
        {value}
      </a>
    ) : (
      <p className="text-gray-300">{value}</p>
    )}
  </motion.div>
);

const ContactInfo = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {contactInfo.map((info, index) => (
      <ContactInfoCard key={index} {...info} index={index} />
    ))}
  </div>
);

export default ContactInfo;