import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("User not logged in, skipping job fetch.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_JOB_API_ENDPOINT
          }/get?keyword=${searchedQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError(res.data.message || "Failed to fetch jobs.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(
          err.response?.data?.message || err.message || "An error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);

  return { loading, error };
};

export default useGetAllJobs;
