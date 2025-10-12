import { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import Navbar from "../components_lite/Navbar";
import { toast } from "sonner";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated!");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/${
            params.id
          }/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.job) {
          dispatch(setAllApplicants(res.data.job));
        } else {
          toast.error("No applicants found for this job.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5">
        <h1 className="font-bold text-xl mb-4">
          Applicants ({applicants?.applications?.length || 0})
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading applicants...</p>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;
