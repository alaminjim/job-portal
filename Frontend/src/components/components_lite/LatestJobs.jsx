import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import NotFound from "../Shared/NotFound";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []); // Safely access allJobs

  return (
    <div className="max-w-7xl mx-auto my-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center sm:text-left"
      >
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </motion.h2>

      {/* Job Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
      >
        {allJobs.length === 0 ? (
          <span className="col-span-full text-center text-gray-500 font-medium">
            <NotFound></NotFound>
          </span>
        ) : (
          allJobs.slice(0, 6).map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : (
              <span
                key={Math.random()}
                className="text-gray-400 text-sm italic text-center"
              >
                Invalid Job Data
              </span>
            )
          )
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
