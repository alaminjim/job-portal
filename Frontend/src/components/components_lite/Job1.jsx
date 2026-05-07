/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const isBookmarked = user?.profile?.bookmarks?.includes(job?._id) || false;

  const isApplied =
    job?.applications?.some(
      (application) =>
        application?.applicant === user?._id || application === user?._id
    ) || false;

  const bookmarkHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to bookmark jobs");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/bookmark/${job?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        // Update user in redux
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            bookmarks: res.data.bookmarks,
          },
        };
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl glass-card cursor-pointer flex flex-col justify-between h-[400px] transition-all duration-300"
    >
      {/* Top row - Time + Bookmark */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          {isApplied && (
            <Badge className="w-fit mt-1 px-2 py-0 h-5 bg-green-100 text-green-600 border-none font-bold text-[10px] uppercase">
              Applied
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={bookmarkHandler}
        >
          {isBookmarked ? (
            <BookMarked className="text-purple-600" />
          ) : (
            <Bookmark className="text-gray-600" />
          )}
        </Button>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 border border-gray-100 shadow-sm flex-shrink-0">
          <AvatarImage src={job?.company?.logo} className="object-contain p-1" />
          <AvatarFallback className="bg-purple-100 text-purple-700 font-bold uppercase">
            {job?.company?.name?.charAt(0) || "C"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">
            {job?.location || "Bangladesh"}
          </p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h2 className="font-bold text-lg text-gray-800 mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} BDT
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 transition font-semibold"
        >
          Details
        </Button>
        <Button 
          onClick={bookmarkHandler}
          className={`font-semibold ${isBookmarked ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200' : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white'}`}
        >
          {isApplied ? "Applied" : isBookmarked ? "Saved" : "Save For Later"}
        </Button>
      </div>
    </motion.div>
  );
};

export default Job1;
