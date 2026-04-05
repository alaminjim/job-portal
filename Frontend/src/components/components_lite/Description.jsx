/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { JobDetailSkeleton } from "./JobSkeleton";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const token = localStorage.getItem("token");

  const applyJobHandler = async () => {
    if (!token) {
      toast.error("You must be logged in to apply.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API_ENDPOINT}/get/${jobId}`,
          { headers }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          if (user?._id) {
            setIsApplied(
              res.data.job.applications.some(
                (application) => application.applicant === user?._id
              )
            );
          }
        } else {
          setError("Failed to fetch job.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return <JobDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-red-500 font-medium">Error: {error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="text-center py-20 text-gray-500">Job not found.</div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl lg:mx-auto my-10 mx-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border border-gray-200 shadow-sm flex-shrink-0">
               <AvatarImage src={singleJob?.company?.logo} className="object-contain p-2" />
               <AvatarFallback className="bg-purple-100 text-purple-700 font-extrabold text-xl">
                 {singleJob?.company?.name?.charAt(0) || "C"}
               </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">{singleJob?.title}</h1>
              <p className="text-gray-500 font-medium">{singleJob?.company?.name} • {singleJob?.location}</p>
              <div className=" flex gap-2 items-center mt-2">
                <Badge className={" text-blue-600 font-bold border-blue-100 bg-blue-50"} variant={"outline"}>
                  {singleJob?.position} Positions
                </Badge>
                <Badge className={" text-orange-600 font-bold border-orange-100 bg-orange-50"} variant={"outline"}>
                  {singleJob?.salary} LPA
                </Badge>
                <Badge className={" text-purple-600  font-bold border-purple-100 bg-purple-50"} variant={"outline"}>
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg hidden lg:block ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6B3AC2] hover:bg-[#552d9b]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Role:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.position} Open Positions
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Job Type:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Post Date:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
        <div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg lg:hidden block ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#6B3AC2] hover:bg-[#552d9b]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        <Button
          onClick={() => navigate("/")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
        >
          Back to Home
        </Button>
        <Button
          onClick={() => navigate("/Jobs")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          Back to More Jobs
        </Button>
      </div>
    </div>
  );
};

export default Description;
