/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated!");
        setLoading(false);
        return;
      }

      // Protected API request with Authorization header
      const res = await axios.post(
        `${import.meta.env.VITE_JOB_API_ENDPOINT}/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Clear input form
        setInput({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experience: "",
          position: 0,
          companyId: "",
        });

        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full my-10 px-2">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-5xl w-full bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
            Post a New Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter job title"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Enter job description"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter job location"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter job salary"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter job position"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Comma-separated requirements"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                placeholder="Enter required experience"
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Full-time, Part-time, etc."
                className="my-1 hover:shadow-md focus:ring-1 focus:ring-purple-400"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 text-sm mt-1">
                  *Please register a company first.*
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={loading || companies.length === 0}
              className={`w-full md:w-1/2 flex items-center justify-center gap-2 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading && <Loader2 className="animate-spin h-4 w-4" />}
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
