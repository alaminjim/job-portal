import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId, onError) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      if (!companyId) return;

      const token = localStorage.getItem("token");
      if (!token) {
        if (onError) onError("You must be logged in");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data?.company) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.warn(`No company found for ID: ${companyId}`);
          if (onError) onError("No company found");
        }
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        console.error(`Error fetching company (status: ${status}): ${message}`);
        if (onError) onError(message);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch, onError]);
};

export default useGetCompanyById;
