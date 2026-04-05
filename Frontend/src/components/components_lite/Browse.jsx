import { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./Footer";

import JobSkeleton from "./JobSkeleton";

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  const loading = allJobs === null;
  const dispatch = useDispatch();
  
  useGetAllJobs(); // This hook updates allJobs in Redux

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10 ml-3">
          Search Results ({allJobs?.length || 0})
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 m-5 gap-4">
          {loading ? (
             [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <JobSkeleton key={i} />)
          ) : allJobs && allJobs.length > 0 ? (
            allJobs.map((job) => <Job1 key={job._id} job={job} />)
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No jobs found. Try another search.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
