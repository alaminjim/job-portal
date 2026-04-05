import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Footer from "./Footer";
import NotFound from "../Shared/NotFound";

import JobSkeleton from "./JobSkeleton";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs || []);
  const loading = !allJobs;

  useEffect(() => {
    if (!allJobs) return;
    
    // ... filtering logic ...
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-1/5 ml-5">
            <FilterCard />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {loading ? (
              <div className="grid grid-cols-1 m-5 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6 mt-5">
                 {[1, 2, 3, 4, 5, 6].map((i) => <JobSkeleton key={i} />)}
              </div>
            ) : filterJobs.length <= 0 ? (
              <div className="text-center py-20 text-gray-500">
                <NotFound />
              </div>
            ) : (
              <div className="grid grid-cols-1 m-5 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6 mt-5">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={job._id}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
