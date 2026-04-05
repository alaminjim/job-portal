import { setCompanies } from "@/redux/companyslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_COMPANY_API_ENDPOINT}/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
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
  }, [dispatch, token]);
};

export default useGetAllCompanies;
