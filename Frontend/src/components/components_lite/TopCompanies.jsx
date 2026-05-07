import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
  { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
];

const TopCompanies = () => {
  return (
    <div className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">
          Trusted by the world's most innovative companies
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.15 }}
              className="flex items-center gap-2"
            >
                <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 md:h-12 w-auto object-contain transition-all duration-300 drop-shadow-sm"
                />
                <span className="font-bold text-gray-700 text-lg hidden sm:block">{company.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
