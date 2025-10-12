import { setCompanies } from "@/redux/companyslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view companies.");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_COMPANY_API_ENDPOINT}/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          toast.error(res.data.message || "Failed to fetch companies.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
