import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 lg:w-[1100px]">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full shadow-md"
      >
        <Briefcase className="w-16 h-16 text-purple-600" />
      </motion.div>

      {/* Animated Title */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl font-semibold text-gray-800 mt-6"
      >
        Job Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-500 mt-3 max-w-md leading-relaxed text-sm lg:text-lg"
      >
        We couldn’t find any jobs matching your search criteria. Try adjusting
        your filters or check back later for new openings.
      </motion.p>

      {/* Refresh Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
      >
        Refresh Jobs
      </motion.button>
    </div>
  );
};

export default NotFound;
