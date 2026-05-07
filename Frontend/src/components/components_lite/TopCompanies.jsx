import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  { name: "Google", logo: "https://www.svgrepo.com/show/475656/google-color.svg" },
  { name: "Amazon", logo: "https://www.svgrepo.com/show/442887/amazon.svg" },
  { name: "Microsoft", logo: "https://www.svgrepo.com/show/333581/microsoft.svg" },
  { name: "Apple", logo: "https://www.svgrepo.com/show/333501/apple.svg" },
  { name: "Salesforce", logo: "https://www.svgrepo.com/show/331575/salesforce.svg" },
  { name: "Adobe", logo: "https://www.svgrepo.com/show/333500/adobe.svg" },
];

const TopCompanies = () => {
  return (
    <div className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Trusted by the world's most innovative companies
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
          {companies.map((company, index) => (
            <motion.img
              key={index}
              initial={{ opacity: 0, grayscale: 1 }}
              whileInView={{ opacity: 1, grayscale: 0 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              src={company.logo}
              alt={company.name}
              className="h-8 md:h-10 w-auto filter transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
