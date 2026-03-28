import React, { useState } from 'react';
import {
  ArrowRight, Briefcase, MapPin, DollarSign,
  Clock, Layers, Star, AlignLeft, Hash
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { JOB_API_ENDPOINT } from '../utils/constant';

const initialForm = {
  title: '',
  description: '',
  requirement: '',
  salary: '',
  location: '',
  jobType: '',
  exprience: '',
  position: '',
  companyId: '',
};

const JOB_TYPES = ['Fulltime', 'Parttime', 'Remote', 'Internship', 'Contract'];

export default function PostJob() {

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { allCompany } = useSelector(store => store.company);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(form)
    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, form, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/myjobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const isReady =
    form.title.trim() &&
    form.description.trim() &&
    form.companyId.trim() &&
    form.location.trim() &&
    form.jobType;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-start justify-center px-4 font-sans pt-6 pb-10">

      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -left-32 w-72 h-72 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Post a Job</h1>
          <p className="text-slate-400 text-sm">Fill in the details to attract the right candidates.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/80 shadow-xl shadow-slate-200/60 p-6 space-y-1">

          {/* Job Title */}
          <Field icon={<Hash className="w-4 h-4" />} label="Job Title">
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </Field>

          {/* Description */}
          <Field icon={<AlignLeft className="w-4 h-4" />} label="Description" isLast={false}>
            <textarea
              rows={3}
              placeholder="What will this role involve?"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full resize-none leading-relaxed pt-0.5"
            />
          </Field>

          {/* Requirements */}
          <Field icon={<Star className="w-4 h-4" />} label="Requirements">
            <input
              type="text"
              placeholder="e.g. React, Node.js, TypeScript"
              value={form.requirement}
              onChange={e => set('requirement', e.target.value)}
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </Field>

          {/* Row: Salary + Experience */}
          <div className="grid grid-cols-2 gap-0">
            <div className="border-b border-slate-200/80 py-3 flex items-center space-x-3 pr-4">
              <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Salary (LPA)</p>
                <input
                  type="number"
                  placeholder="e.g. 8"
                  value={form.salary}
                  onChange={e => set('salary', e.target.value)}
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
              </div>
            </div>
            <div className="border-b border-slate-200/80 py-3 flex items-center space-x-3 pl-4 border-l border-l-slate-200/80">
              <Layers className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Experience (yrs)</p>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={form.exprience}
                  onChange={e => set('exprience', e.target.value)}
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Row: Location + Positions */}
          <div className="grid grid-cols-2 gap-0">
            <div className="border-b border-slate-200/80 py-3 flex items-center space-x-3 pr-4">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Location</p>
                <input
                  type="text"
                  placeholder="e.g. Pune"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
              </div>
            </div>
            <div className="border-b border-slate-200/80 py-3 flex items-center space-x-3 pl-4 border-l border-l-slate-200/80">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Positions</p>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  value={form.position}
                  onChange={e => set('position', e.target.value)}
                  className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Job Type */}
          <div className="border-b border-slate-200/80 py-3 flex items-start space-x-3">
            <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Job Type</p>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set('jobType', type)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      form.jobType === type
                        ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-sm shadow-cyan-200'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Company Select */}
          <div className="pt-3 pb-1">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Company</p>
            {allCompany && allCompany.length > 0 ? (
              <select
                value={form.companyId}
                onChange={e => set('companyId', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
              >
                <option value="">Select a company</option>
                {allCompany.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            ) : (
              <p className="text-xs text-rose-400 font-medium">
                No companies found. Please{' '}
                <span
                  onClick={() => navigate('/admin/companies/create')}
                  className="underline cursor-pointer text-cyan-500 hover:text-blue-600"
                >
                  create a company
                </span>{' '}
                first.
              </p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 mt-5">
          <button
            onClick={() => navigate(-1)}
            className="px-7 py-3 rounded-full border border-slate-200 bg-white text-slate-500 font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isReady || loading}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              isReady && !loading
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{loading ? 'Posting...' : 'Post Job'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
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

/* Reusable field row */
function Field({ icon, label, children }) {
  return (
    <div className="border-b border-slate-200/80 py-3 flex items-start space-x-3">
      <span className="text-slate-400 shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}