import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Anika Rahman",
    role: "Software Engineer",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "JobPortal helped me find my dream job within 2 weeks of applying. The platform is incredibly intuitive and efficient."
  },
  {
    name: "Sajid Ahmed",
    role: "Product Designer",
    company: "Salesforce",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "The best job portal I've ever used. The AI recommendations are spot on and the UI is simply beautiful."
  },
  {
    name: "Nabila Islam",
    role: "Data Scientist",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "I love the 'Save for Later' feature! It helps me organize my applications and never miss out on opportunities."
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Join thousands of successful professionals who found their next career move with JobPortal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-100/50 border border-purple-50 relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-purple-200" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-purple-600 font-medium">{t.role} @ {t.company}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">"{t.content}"</p>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-50 rounded-full -z-10 opacity-50"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
