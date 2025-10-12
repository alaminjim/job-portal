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
    <div className="bg-gradient-to-tr from-purple-50 via-white to-indigo-50 pt-28 pb-16 relative overflow-hidden">
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
          <span className="px-5 py-2 rounded-full bg-gray-200 text-red-600 font-medium flex items-center gap-2 shadow-md">
            <PiBuildingOfficeBold className="text-[#614232] text-2xl" />
            No.1 Job Hunt Website
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 mb-10 max-w-xl mx-auto text-base md:text-lg"
        >
          Start your hunt for the best, life-changing career opportunities from
          here in your selected areas conveniently and get hired quickly.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex w-full max-w-3xl mx-auto shadow-lg border border-gray-300 rounded-full overflow-hidden"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Dream Job"
            className="flex-1 px-4 py-3 text-gray-700 outline-none border-none text-base sm:text-lg placeholder:pl-4"
          />
          <Button
            onClick={searchjobHandler}
            className="flex items-center border-l-none  rounded-l-none justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 transition text-base sm:text-lg"
            style={{ minHeight: "52px" }}
          >
            <Search className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
