/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => setIsBookmarked(!isBookmarked)}
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
        <Avatar className="w-12 h-12 border border-gray-200">
          <AvatarImage src={job?.company?.logo} />
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
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white font-semibold">
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job1;
