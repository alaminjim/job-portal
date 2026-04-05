import React from "react";
import { motion } from "framer-motion";

const AuraLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full"
        ></motion.div>
        
        {/* Inner reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute top-1 left-1 w-14 h-14 border-r-4 border-l-4 border-indigo-400 rounded-full opacity-70"
        ></motion.div>

        {/* Center glowing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full blur-[1px]"
        ></motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg font-bold text-aura tracking-widest uppercase text-[12px]"
      >
        Finding Opportunities...
      </motion.p>
    </div>
  );
};

export default AuraLoader;
