import React from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAdminAllApplicants from "@/hooks/useGetAdminAllApplicants";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { updateAdminApplicantStatus } from "@/redux/applicationSlice";
import { useDispatch } from "react-redux";

const AdminAllApplicants = () => {
  useGetAdminAllApplicants();
  const dispatch = useDispatch();
  const { allAdminApplicants } = useSelector((store) => store.application);
  const [filterText, setFilterText] = React.useState("");
  const [filteredApplicants, setFilteredApplicants] = React.useState([]);

  React.useEffect(() => {
    if (allAdminApplicants) {
      const filtered = allAdminApplicants.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item?.applicant?.fullname?.toLowerCase().includes(searchText) ||
          item?.applicant?.email?.toLowerCase().includes(searchText) ||
          item?.job?.title?.toLowerCase().includes(searchText) ||
          item?.job?.company?.name?.toLowerCase().includes(searchText)
        );
      });
      setFilteredApplicants(filtered);
    }
  }, [allAdminApplicants, filterText]);

  const statusHandler = async (status, id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateAdminApplicantStatus({ id, status: status.toLowerCase() }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const shortlistingStatus = ["Accepted", "Rejected"];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl border border-white/20 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Global <span className="text-aura">Applicants</span>
              <Badge variant="outline" className="ml-4 text-aura border-aura/30 bg-aura/5">
                {allAdminApplicants?.length || 0} Total
              </Badge>
            </h1>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search applicants or jobs..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus:ring-aura focus:border-aura transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white/50">
            <Table>
              <TableCaption className="pb-4">A list of all recent job applications across all your postings.</TableCaption>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">Full Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Email</TableHead>
                  <TableHead className="font-bold text-gray-700">Applied Job</TableHead>
                  <TableHead className="font-bold text-gray-700">Company</TableHead>
                  <TableHead className="font-bold text-gray-700">Resume</TableHead>
                  <TableHead className="font-bold text-gray-700">Date</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants &&
                  filteredApplicants.map((item) => (
                    <TableRow key={item._id} className="hover:bg-purple-50/30 transition-colors">
                      <TableCell className="font-medium text-gray-900">{item?.applicant?.fullname}</TableCell>
                      <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>
                      <TableCell className="text-aura font-semibold">{item?.job?.title}</TableCell>
                      <TableCell className="text-gray-600">{item?.job?.company?.name}</TableCell>
                      <TableCell>
                        {item?.applicant?.profile?.resume ? (
                          <a
                            href={item?.applicant?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium text-sm"
                          >
                            {item?.applicant?.profile?.resumeOriginalname || "View Resume"}
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No Resume</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`capitalize px-3 py-1 rounded-full ${
                            item?.status === "accepted"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : item?.status === "rejected"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {item?.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger>
                            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors inline-block">
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-32 p-2 rounded-xl shadow-xl border-gray-100">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                onClick={() => statusHandler(status, item?._id)}
                                key={index}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                              >
                                <span>{status}</span>
                              </div>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {(!filteredApplicants || filteredApplicants.length === 0) && (
                <div className="py-20 text-center text-gray-400 font-medium italic">
                    {filterText ? "No applicants match your search." : "No applicants found yet. Your job postings are waiting for talent!"}
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAllApplicants;
