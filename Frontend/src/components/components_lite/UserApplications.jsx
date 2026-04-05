import React from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import Footer from "../components_lite/Footer";

const UserApplications = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 pt-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl border border-white/20 shadow-2xl bg-white/70 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My <span className="text-aura">Applications</span>
              <Badge variant="outline" className="ml-4 text-aura border-aura/30 bg-aura/5">
                {allAppliedJobs?.length || 0} Total
              </Badge>
            </h1>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm">
            <Table>
              <TableCaption className="pb-4 italic text-sm text-gray-400">
                Tracking your career journey — one application at a time.
              </TableCaption>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">Date</TableHead>
                  <TableHead className="font-bold text-gray-700">Job Title</TableHead>
                  <TableHead className="font-bold text-gray-700">Company</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Applicants</TableHead>
                  <TableHead className="text-right font-bold text-gray-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAppliedJobs && allAppliedJobs.length > 0 ? (
                  allAppliedJobs.map((item) => (
                    <TableRow key={item._id} className="hover:bg-purple-50/30 transition-colors">
                      <TableCell className="text-gray-500 font-medium">
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-bold text-gray-900">{item?.job?.title}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{item?.job?.company?.name}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold px-3">
                          {item?.job?.applications?.length || 0} Competition
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`capitalize px-4 py-1.5 rounded-full shadow-sm text-[12px] font-bold ${
                            item?.status === "rejected"
                              ? "bg-red-100 text-red-600 border-red-200"
                              : item?.status === "accepted"
                              ? "bg-green-100 text-green-600 border-green-200"
                              : "bg-blue-100 text-blue-600 border-blue-200"
                          }`}
                        >
                          {item?.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center text-gray-400 font-medium italic">
                      You haven't applied to any jobs yet. Your next opportunity is just a click away!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default UserApplications;
