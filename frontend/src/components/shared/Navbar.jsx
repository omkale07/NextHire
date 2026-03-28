import React from "react";
import { LogOut, User2, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { setUser } from "/src/redux/authSlice.js";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/landing");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            NextHire
          </span>
        </div>

        {/* Links */}

        <div className="hidden md:flex items-center space-x-8">
          {user && user.role == "recruiter" ? (
            <>
              <Link
                to="/admin/home"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/admin/myjobs"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                My Listing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/admin/companies"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                Companies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/findjobs"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                Find Jobs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/browse"
                className="text-slate-700 hover:text-cyan-600 font-medium transition-colors relative group"
              >
                Browse
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="text-slate-700 hover:text-cyan-600 font-medium transition-colors">
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-300">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
           <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Avatar className="cursor-pointer w-10 h-10 ring-2 ring-blue-400 ring-offset-2 hover:ring-blue-500 transition-all">
       {user?.profile?.profilePhoto ? (
    <AvatarImage
      src={user.profile.profilePhoto}
      alt="profile"
      className="object-cover w-full h-full rounded-full"
    />
  ) : (
    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">
      {user?.fullname?.[0]?.toUpperCase() || "U"}
    </AvatarFallback>
  )}
    </Avatar>
  </PopoverTrigger>

  <PopoverContent
    sideOffset={5}
    className="z-9999 w-80 p-0 overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white"
  >
    <div className="px-4 py-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14 ring-4 ring-gray-100 shadow-md">
          <AvatarImage
            src={user?.profile?.profilePhoto}
            alt="profile"
            className="object-cover w-full h-full rounded-full"
          />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">
            {user?.fullname?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="text-gray-800 text-base font-bold">
            {user?.fullname || "Your Name"}
          </h4>
          <p className="text-sm text-muted-foreground">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-2" />

      {/* Actions */}
      <div className="flex flex-col gap-1">
        {user && user?.role === "student" && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <User2 className="w-4 h-4 text-blue-600" />
            </div>

            <Button
              variant="link"
              className="p-0 h-auto text-gray-700 font-medium no-underline hover:no-underline"
              onClick={() => setOpen(false)}
            >
              <Link to="/profile">View Profile</Link>
            </Button>
          </div>
        )}

        {/* Logout */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-red-50 cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>

          <Button
            variant="link"
            onClick={logoutHandler}
            className="p-0 h-auto text-gray-700 font-medium no-underline hover:no-underline focus:outline-none"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
