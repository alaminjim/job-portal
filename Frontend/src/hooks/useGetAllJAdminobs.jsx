import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      if (!token) return;

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API_ENDPOINT}/getadminjobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
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
  }, [dispatch, token]);

  return { loading, error };
};

export default useGetAllAdminJobs;
