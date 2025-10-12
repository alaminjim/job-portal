import { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen pb-10 m-5">
      <Navbar />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl my-8 p-8 shadow-lg hover:shadow-2xl transition"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 ring-4 ring-purple-400 ring-offset-2">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname || "User"}
              />
            </Avatar>
            <div className="flex flex-col gap-1 max-w-md">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition flex items-center gap-2"
          >
            <Pen className="w-4 h-4" /> Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-purple-500" />
            <a
              href={`mailto:${user?.email}`}
              className="hover:text-purple-600 transition"
            >
              {user?.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-purple-500" />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="hover:text-purple-600 transition"
            >
              {user?.phoneNumber || "No phone added"}
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-6">
          <h2 className="text-gray-900 font-semibold text-lg mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-purple-300 to-indigo-300 text-purple-900 font-semibold hover:scale-105 transition-transform cursor-pointer p-2"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills added</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl p-6 shadow-lg mt-6"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-4">Applied Jobs</h1>
        <AppliedJob />
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
      <Footer></Footer>
    </div>
  );
};

export default Profile;
