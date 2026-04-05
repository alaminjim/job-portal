import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu, Bell } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Instant Application",
    desc: "Apply to your dream jobs with just a single click using our smart profile system.",
    color: "from-yellow-400/20 to-orange-500/20",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
    title: "Verified Companies",
    desc: "We manually verify every company to ensure a safe and secure recruitment process.",
    color: "from-green-400/20 to-teal-500/20",
  },
  {
    icon: <Cpu className="w-10 h-10 text-blue-500" />,
    title: "AI Job Matching",
    desc: "Our unique AI algorithm suggests jobs that perfectly match your skills and experience.",
    color: "from-blue-400/20 to-indigo-500/20",
  },
  {
    icon: <Bell className="w-10 h-10 text-purple-500" />,
    title: "Real-time Alerts",
    desc: "Never miss an opportunity with instant notifications about the latest job openings.",
    color: "from-purple-400/20 to-pink-500/20",
  },
];

const FeatureAura = () => {
  return (
    <div className="max-w-7xl mx-auto my-32 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 uppercase">
            Unlock Your <span className="text-aura">Potential</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Discover why thousands of professionals choose our platform for their career growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
            className={`p-10 rounded-[40px] glass-card border border-white/30 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:shadow-3xl group cursor-pointer`}
          >
            {/* Background Gradient Blob */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
            
            <div className="relative z-10 flex flex-col gap-6 items-start">
              <div className="p-4 bg-white/60 rounded-3xl shadow-lg border border-white/40 ring-4 ring-white/20 transform group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-gray-600 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureAura;
