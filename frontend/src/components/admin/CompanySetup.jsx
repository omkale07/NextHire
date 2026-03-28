import React, { useState, useEffect } from 'react';
import { ArrowRight, Upload, Globe, MapPin, Briefcase, Building2 } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';

export default function CompanySetup() {

  const params = useParams();
  useGetCompanyById(params.id);

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ name: '', website: '', location: '', description: '' });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const navigate = useNavigate();
  const { singalCompany } = useSelector(store => store.company);

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("name", form.name);
      formdata.append("website", form.website);
      formdata.append("location", form.location);
      formdata.append("description", form.description);

      if (logo) {
        formdata.append("file", logo);
      }

      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formdata, {
        
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
   setForm({ 
      name: singalCompany.name || "",
      website: singalCompany.website || "",
      location: singalCompany.location || "",
      description: singalCompany.description || "",
      file:singalCompany.file || ""
       });
       
  }, [singalCompany]);

  const isReady = form.name.trim() || form.website.trim() || form.location.trim() || form.description.trim();

  return (
    <div className="h-[calc(100vh-72px)] bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-start justify-center px-4 font-sans overflow-hidden pt-12">

      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          {/* <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Step 2 of 2</p> */}
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Set up your company</h1>
          <p className="text-slate-400 text-sm">Help job seekers know who they're applying to.</p>
        </div>

        <div className="space-y-4">

          {/* Logo Upload */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-100 to-blue-100 border-2 border-dashed border-cyan-300 flex items-center justify-center overflow-hidden shrink-0">
              {logo
                ? <img src={preview} alt="logo" className="w-full h-full object-cover" />
                : <Briefcase className="w-4 h-4 text-cyan-400" />}
            </div>
            <label className="cursor-pointer">
              <p className="text-sm font-semibold text-slate-700">Company Logo</p>
              <p className="text-xs text-cyan-600 hover:text-blue-600 transition-colors mt-0.5 flex items-center space-x-1">
                <Upload className="w-3 h-3" />
                <span>Upload image</span>
              </p>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
            </label>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200/60"></div>

          {/* Company Name */}
          <div className="flex items-center space-x-3 border-b border-slate-200/80 py-3">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Company name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Website */}
          <div className="flex items-center space-x-3 border-b border-slate-200/80 py-3">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Website"
              value={form.website}
              onChange={e => set('website', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3 border-b border-slate-200/80 py-3">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Headquarters location"
              value={form.location}
              onChange={e => set('location', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* About */}
          <div className="border-b border-slate-200/80 py-3">
            <textarea
              rows={3}
              placeholder="Short description of your company..."
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button onClick={() => navigate(-1)} className="px-7 py-3 rounded-full border border-slate-200 bg-white text-slate-500 font-semibold text-sm hover:bg-slate-50 transition-all duration-200">
              Back
            </button>
            <button onClick={handleSubmit}
              disabled={!isReady}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                isReady
                  ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Update</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }
      `}</style>
    </div>
  );
}