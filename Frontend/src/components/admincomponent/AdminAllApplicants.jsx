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

const AdminAllApplicants = () => {
  useGetAdminAllApplicants();
  const { allAdminApplicants } = useSelector((store) => store.application);

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
                  <TableHead className="font-bold text-gray-700">Date</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="text-right font-bold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAdminApplicants &&
                  allAdminApplicants.map((item) => (
                    <TableRow key={item._id} className="hover:bg-purple-50/30 transition-colors">
                      <TableCell className="font-medium text-gray-900">{item?.applicant?.fullname}</TableCell>
                      <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>
                      <TableCell className="text-aura font-semibold">{item?.job?.title}</TableCell>
                      <TableCell className="text-gray-600">{item?.job?.company?.name}</TableCell>
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
            {(!allAdminApplicants || allAdminApplicants.length === 0) && (
                <div className="py-20 text-center text-gray-400 font-medium italic">
                    No applicants found yet. Your job postings are waiting for talent!
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAllApplicants;
