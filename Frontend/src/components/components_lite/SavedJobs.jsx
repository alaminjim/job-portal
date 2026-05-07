import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import AuraLoader from "../Shared/AuraLoader";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_USER_API_ENDPOINT}/bookmarks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setSavedJobs(res.data.bookmarks);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
        >
            <div className="h-8 w-2 bg-purple-600 rounded-full"></div>
            <h1 className="font-bold text-3xl text-gray-800 tracking-tight">
                Saved Jobs
                <span className="ml-3 text-lg font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {savedJobs.length}
                </span>
            </h1>
        </motion.div>

        {loading ? (
          <AuraLoader />
        ) : savedJobs.length <= 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-[50vh] text-gray-500 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </div>
            <span className="text-xl font-semibold text-gray-700">No saved jobs yet</span>
            <p className="mt-2 text-gray-400 text-center max-w-xs">
                Jobs you save will appear here. Start exploring and bookmark your favorite roles!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={job?._id}
              >
                <Job1 job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
