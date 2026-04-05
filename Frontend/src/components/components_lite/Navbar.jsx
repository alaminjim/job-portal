import { setSearchedQuery } from "@/redux/jobSlice";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset redux state
    dispatch(setUser(null));

    // Redirect
    navigate("/login");

    // Success toast
    toast.success("Logged out successfully");
  };

  const menuItems =
    user?.role === "Recruiter"
      ? [
          { label: "Companies", to: "/admin/companies" },
          { label: "Jobs", to: "/admin/jobs" },
        ]
      : [
          { label: "Home", to: "/" },
          { label: "Browse", to: "/Browse" },
          { label: "Jobs", to: "/Jobs" },
        ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-navbar" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => dispatch(setSearchedQuery(""))}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-extrabold text-aura tracking-tight">
              JobPortal
            </h1>
          </Link>

          {/* Desktop Menu + Auth */}
          <div className="hidden md:flex items-center gap-6">
            {/* Desktop Menu */}
            <ul className="flex items-center gap-6 font-medium text-gray-700">
              {menuItems.map((item) => (
                <li key={item.to} className="relative group">
                  <Link
                    to={item.to}
                    onClick={() => dispatch(setSearchedQuery(""))}
                    className="hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 transition duration-300"
                  >
                    {item.label}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-400 transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* Desktop Auth / Avatar */}
            {!user ? (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 hover:from-purple-600 hover:to-indigo-600 transition-transform duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-transform duration-300">
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-gray-200 shadow-sm overflow-hidden">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user.fullname}
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-72 rounded-lg shadow-lg p-4 bg-white border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="border-2 border-gray-200 shadow-sm overflow-hidden">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user.fullname}
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.fullname}</h3>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {user.role === "Student" && (
                      <Link
                        to="/Profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-50 text-gray-700 transition"
                      >
                        <User2 /> Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-gray-700 transition"
                    >
                      <LogOut /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Hamburger + User */}
          <div className="md:hidden flex items-center gap-3">
            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-96 p-5" : "max-h-0 p-0"
          }`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-700 font-medium hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400 py-2 px-3 rounded-md transition"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login">
                <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 hover:from-purple-600 hover:to-indigo-600 transition-transform duration-300">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-transform duration-300">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-3">
              {user.role === "Student" && (
                <Link
                  to="/Profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-50 text-gray-700 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  <User2 /> Profile
                </Link>
              )}
              <button
                onClick={() => {
                  logoutHandler();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-gray-700 transition"
              >
                <LogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="pt-[72px]" />
    </>
  );
};

export default Navbar;
