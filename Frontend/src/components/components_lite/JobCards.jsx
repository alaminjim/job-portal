/* eslint-disable react/prop-types */
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl glass-card cursor-pointer transition-all duration-300"
    >
      {/* Company / Name */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 border border-gray-200 rounded-full">
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

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job.position && (
          <Badge className="text-blue-600 font-bold" variant="ghost">
            {job.position} Position{job.position > 1 ? "s" : ""}
          </Badge>
        )}
        {job.salary && (
          <Badge className="text-orange-500 font-bold" variant="ghost">
            {job.salary} BDT
          </Badge>
        )}
        {job.location && (
          <Badge className="text-purple-700 font-bold" variant="ghost">
            {job.location}
          </Badge>
        )}
        {job.jobType && (
          <Badge className="text-gray-900 font-bold" variant="ghost">
            {job.jobType}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default JobCards;
