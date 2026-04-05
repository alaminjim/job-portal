import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, Briefcase, Trophy } from "lucide-react";

const stats = [
  { icon: <Briefcase className="w-8 h-8 text-purple-500" />, label: "Fresh Jobs", value: "1,200+" },
  { icon: <Building2 className="w-8 h-8 text-indigo-500" />, label: "Companies", value: "850+" },
  { icon: <Users className="w-8 h-8 text-blue-500" />, label: "Active Users", value: "15k+" },
  { icon: <Trophy className="w-8 h-8 text-orange-500" />, label: "Hired Monthly", value: "450+" },
];

const HomeStats = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-3xl text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-2xl border border-white/20"
          >
            <div className="p-4 bg-white/50 rounded-2xl shadow-inner">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tighter">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeStats;
