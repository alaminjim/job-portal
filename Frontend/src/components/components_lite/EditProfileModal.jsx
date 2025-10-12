/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to update profile.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(
          setUser({
            ...res.data.user,
            skills: input.skills.split(",").map((s) => s.trim()),
          })
        );
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full rounded-2xl p-6 sm:p-8 bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4 sm:py-6">
          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label
              htmlFor="fullname"
              className="sm:w-32 text-gray-700 font-medium"
            >
              Name
            </Label>
            <input
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label
              htmlFor="email"
              className="sm:w-32 text-gray-700 font-medium"
            >
              Email
            </Label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label
              htmlFor="phoneNumber"
              className="sm:w-32 text-gray-700 font-medium"
            >
              Phone
            </Label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full"
              placeholder="+880123456789"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="bio" className="sm:w-32 text-gray-700 font-medium">
              Bio
            </Label>
            <textarea
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full resize-none h-20"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label
              htmlFor="skills"
              className="sm:w-32 text-gray-700 font-medium"
            >
              Skills
            </Label>
            <input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="Separate with commas"
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full"
            />
          </div>

          {/* Submit Button */}
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 py-2 rounded-lg"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              {loading ? "Please wait..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
