import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-purple-700">
            Admin Jobs Dashboard
          </h1>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md transition duration-200"
          >
            Post New Job
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Input
            className="flex-1 border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
            placeholder="Filter by Job Title, Company or Location"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-x-auto">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
