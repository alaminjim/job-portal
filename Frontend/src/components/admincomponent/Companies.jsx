import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-gray-50 to-gray-100">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-10 px-4"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Company Management
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Input
                type="text"
                placeholder="Search company..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full pl-4 pr-10 border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
              />
            </div>
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-purple-100 p-6"
        >
          <CompaniesTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Companies;
