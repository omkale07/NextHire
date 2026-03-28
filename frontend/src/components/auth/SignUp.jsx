import React, { useState } from 'react';
import { Briefcase, Mail, Lock, User, Eye, EyeOff, ArrowRight, GraduationCap, Building2, Phone, Camera, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
  });

 const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('password', formData.password);
      data.append('role', formData.role);
      if (profileImageFile) data.append('file', profileImageFile);

      const response = await axios.post(`${USER_API_ENDPOINT}/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if(response.data.success){
        toast.success(response.data.message);
        navigate("/login")
      }

      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
      {/* Fixed Back Button — top-left, always visible */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-cyan-50 hover:border-cyan-400 text-slate-600 hover:text-cyan-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:rotate-12 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              NextHire
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Create Your Account</h2>
          <p className="text-sm text-slate-600">Join thousands finding their dream careers</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200/50 p-6">
          <div className="flex gap-6 mb-6">
            <div className="shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Profile Photo</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profile-upload" />
                <label
                  htmlFor="profile-upload"
                  className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-all hover:border-cyan-500 overflow-hidden"
                >
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs text-slate-500">Upload</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {['student', 'recruiter'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      formData.role === r
                        ? 'border-cyan-500 bg-linear-to-br from-cyan-50 to-blue-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                      formData.role === r ? 'bg-linear-to-br from-cyan-500 to-blue-600' : 'bg-slate-100'
                    }`}>
                      {r === 'student'
                        ? <GraduationCap className={`w-5 h-5 ${formData.role === r ? 'text-white' : 'text-slate-600'}`} />
                        : <Building2 className={`w-5 h-5 ${formData.role === r ? 'text-white' : 'text-slate-600'}`} />
                      }
                    </div>
                    <div className={`text-sm font-semibold text-center capitalize ${
                      formData.role === r ? 'text-cyan-700' : 'text-slate-600'
                    }`}>
                      {r}
                    </div>
                    {formData.role === r && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold text-base hover:shadow-xl hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="text-cyan-600 hover:text-blue-600 font-semibold transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}