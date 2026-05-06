import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Student",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const ChangeFilehandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 9000, // 9s — stops spinner if Vercel hangs
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Server is taking too long. Please try again.");
      } else {
        const errorMessage = error.response
          ? error.response.data.message
          : "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (!input.role) {
        toast.error("Please select a role first (Student or Recruiter) before continuing with Google.");
        return;
      }
      try {
        dispatch(setLoading(true));
        const res = await axios.post(
          `${import.meta.env.VITE_USER_API_ENDPOINT}/google-auth`,
          { token: tokenResponse.access_token, role: input.role },
          { headers: { "Content-Type": "application/json" }, timeout: 9000 }
        );
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message);
          window.location.reload(); 
        }
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          toast.error("Server is taking too long. Please try again.");
        } else {
          toast.error(error.response?.data?.message || "Google registration failed.");
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
    onError: () => toast.error("Google Registration Failed"),
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-white to-indigo-50 flex items-center justify-center pt-16 md:pt-20 px-4">
      <motion.form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>
          <p className="mt-2 text-gray-500">
            Join JobPortal to explore opportunities and connect with recruiters.
          </p>
        </div>

        {/* Fullname */}
        <div className="flex flex-col">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Enter your name"
            className="mt-1"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter your email"
            className="mt-1"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="********"
            className="mt-1"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="+8801XXXXXXXXX"
            className="mt-1"
          />
        </div>

        {/* Role */}
        <RadioGroup className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="role"
              value="Student"
              checked={input.role === "Student"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label>Student</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="role"
              value="Recruiter"
              checked={input.role === "Recruiter"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label>Recruiter</Label>
          </div>
        </RadioGroup>

        {/* Profile Photo */}
        <div className="flex flex-col">
          <Label>Profile Photo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={ChangeFilehandler}
            className="cursor-pointer mt-1"
          />
        </div>

        {/* Submit */}
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition text-lg font-medium"
          >
            Register
          </motion.button>
        )}

        {/* Google Auth Divider & Button */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
