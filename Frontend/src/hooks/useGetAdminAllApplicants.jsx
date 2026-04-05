import { setAllAdminApplicants } from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdminAllApplicants = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/alladminapplicants`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                if (res.data.success) {
                    dispatch(setAllAdminApplicants(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch]);
};

export default useGetAdminAllApplicants;
