import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import JobSkeleton from "./JobSkeleton";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const loading = !allJobs;

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
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
        {allJobs === null ? (
          /* Show skeletons while initial loading (null) */
          [1, 2, 3, 4, 5, 6].map((i) => <JobSkeleton key={i} />)
        ) : allJobs.length === 0 ? (
          /* Show NotFound only after loaded and actually empty */
          <span className="col-span-full text-center text-gray-500 font-medium">
            No Jobs Available
          </span>
        ) : (
          allJobs.slice(0, 6).map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : null
          )
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
