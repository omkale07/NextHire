import React, { useState } from "react";
import {
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Building2,
} from "lucide-react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "/src/redux/authSlice.js";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user?.role === "recruiter") {
          navigate("/admin/home");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">

      {/* Back Button — fixed top-left, always visible */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-cyan-50 hover:border-cyan-400 text-slate-600 hover:text-cyan-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:rotate-12 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              NextHire
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Welcome Back!
          </h2>
          <p className="text-sm text-slate-600">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200/50 p-6">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Student Button */}
              <button
                type="button"
                onClick={() => setInput({ ...input, role: "student" })}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  input.role === "student"
                    ? "border-cyan-500 bg-linear-to-br from-cyan-50 to-blue-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                    input.role === "student"
                      ? "bg-linear-to-br from-cyan-500 to-blue-600"
                      : "bg-slate-100"
                  }`}
                >
                  <GraduationCap
                    className={`w-5 h-5 ${input.role === "student" ? "text-white" : "text-slate-600"}`}
                  />
                </div>
                <div
                  className={`text-sm font-semibold text-center ${input.role === "student" ? "text-cyan-700" : "text-slate-600"}`}
                >
                  Student
                </div>
                {input.role === "student" && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Recruiter Button */}
              <button
                type="button"
                onClick={() => setInput({ ...input, role: "recruiter" })}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  input.role === "recruiter"
                    ? "border-cyan-500 bg-linear-to-br from-cyan-50 to-blue-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                    input.role === "recruiter"
                      ? "bg-linear-to-br from-cyan-500 to-blue-600"
                      : "bg-slate-100"
                  }`}
                >
                  <Building2
                    className={`w-5 h-5 ${input.role === "recruiter" ? "text-white" : "text-slate-600"}`}
                  />
                </div>
                <div
                  className={`text-sm font-semibold text-center ${input.role === "recruiter" ? "text-cyan-700" : "text-slate-600"}`}
                >
                  Recruiter
                </div>
                {input.role === "recruiter" && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold text-base hover:shadow-xl hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-cyan-600 hover:text-blue-600 font-semibold transition-colors"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}