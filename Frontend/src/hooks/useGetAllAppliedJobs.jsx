import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view applied jobs.");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        } else {
          toast.error(res.data.message || "Failed to fetch applied jobs.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    })();
  }, [dispatch]);

  return null;
};

export default useGetAppliedJobs;
