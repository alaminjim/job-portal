import { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated!");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            Create Company
          </h1>
          <p className="text-gray-600">
            Enter the company name to create a new company record.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-gray-700 font-semibold">Company Name</Label>
          <Input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-200"
          />
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="text-gray-500 hover:text-purple-600 border-gray-300 hover:border-purple-400"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
