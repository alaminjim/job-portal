import { useState } from "react";
import { Button } from "../ui/button";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    if (!query) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-tr from-purple-50/50 via-white to-sky-50/50 pt-28 pb-16 relative overflow-hidden">
      {/* Floating Circles */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-200 rounded-full opacity-20"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center px-4 md:px-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="px-6 py-2 rounded-full glass-card text-purple-600 font-semibold flex items-center gap-2 shadow-sm">
            <PiBuildingOfficeBold className="text-aura text-2xl" />
            No.1 Job Hunt Platform
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight text-gray-900"
        >
          Explore, Apply & <br />
          Grow Your <span className="text-aura">Career</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-500 mb-10 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        >
          Connecting talented professionals with their dream opportunities. 
          Start your journey towards a meaningful career today with curated job matches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center w-full max-w-3xl mx-auto glass-card rounded-full overflow-hidden p-1.5 pr-1.5 gap-2 border-white/30 shadow-2xl"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title, company, or skills..."
            className="flex-1 px-8 py-4 bg-transparent text-gray-800 outline-none text-base md:text-lg placeholder:text-gray-400 font-medium"
          />
          <Button
            onClick={searchjobHandler}
            className="aura-gradient hover:opacity-90 text-white rounded-full w-14 h-14 md:w-auto md:px-10 flex items-center justify-center transition-all duration-300 font-bold shadow-lg hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Search className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
