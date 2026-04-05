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
      <div className="max-w-7xl mx-auto my-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-aura tracking-tight">
            Applicants List
            <span className="ml-3 px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full font-bold">
              {applicants?.applications?.length || 0}
            </span>
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="h-16 w-full bg-gray-100 animate-pulse rounded-xl"></div>
             ))}
          </div>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;
