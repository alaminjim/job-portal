import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to fetch jobs.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API_ENDPOINT}/getadminjobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status) {
          dispatch(setAllAdminJobs(res.data.jobs));
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

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllAdminJobs;
