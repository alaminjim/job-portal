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
  const [filterJobs, setFilterJobs] = useState([]);
  const loading = allJobs === null;

  useEffect(() => {
    if (allJobs) {
      if (!searchedQuery || searchedQuery.trim() === "") {
        setFilterJobs(allJobs);
        return;
      }
      const filteredJobs = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          (job.title && job.title.toLowerCase().includes(query)) ||
          (job.description && job.description.toLowerCase().includes(query)) ||
          (job.location && job.location.toLowerCase().includes(query)) ||
          (job.experience && job.experience.toLowerCase().includes(query)) ||
          (job.salary && job.salary.toString().toLowerCase().includes(query)) ||
          (job.jobType && job.jobType.toLowerCase().includes(query)) ||
          (job.position && job.position.toString().toLowerCase().includes(query))
        );
      });
      setFilterJobs(filteredJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-[20%] hidden md:block">
            <FilterCard />
          </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => <JobSkeleton key={i} />)}
              </div>
            ) : filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <span className="text-lg">No jobs matched your filter.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={job?._id}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
