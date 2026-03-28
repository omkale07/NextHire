import {
  Briefcase,
  Users,
  Building2,
  Award,
  Zap,
  Plus,
  ChevronRight,
  Clock,
  MapPin,
  Target,
  ArrowUp,
  ArrowDown,
  Calendar,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

export default function AdminHome() {

  useGetAllAdminJobs();

  const { allAdminJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

const totalApplicants = allAdminJobs.reduce((sum, job) => sum + job.application.length, 0);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-linear-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-10 pb-16 px-6 max-w-7xl mx-auto space-y-6">

        {/* Welcome Banner */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, {user?.fullname}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Here's what's happening with your listings today.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/home/create")}
            className="hidden md:flex items-center space-x-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Create Company</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <ArrowUp className="w-3 h-3 mr-0.5" />+12
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{totalApplicants}</div>
            <div className="text-sm text-slate-500">Total Applicants</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <ArrowUp className="w-3 h-3 mr-0.5" />+8
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{Math.floor(totalApplicants/2)}</div>
            <div className="text-sm text-slate-500">Interviews Scheduled</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-500">
                <ArrowDown className="w-3 h-3 mr-0.5" />-1
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{Math.floor(totalApplicants/3)}</div>
            <div className="text-sm text-slate-500">Positions Filled</div>
          </div>
        </div>

        {/* Job Listings + Right Panel */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-lg">Job Listings</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {allAdminJobs.slice(0, 3).map((job) => (
                <div
                  key={job._id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="font-semibold text-slate-800 text-sm truncate mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{job.createdAt.slice(0, 10)}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5 shrink-0">
                    <div className="text-center hidden md:block">
                      <div className="font-bold text-slate-800 text-sm">{job.application.length}</div>
                      <div className="text-xs text-slate-400">Applicants</div>
                    </div>
                    <div className="text-center hidden lg:block">
                      <div className="font-bold text-slate-800 text-sm">{job.application.length * 2}</div>
                      <div className="text-xs text-slate-400">Views</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => navigate("/admin/myjobs")}
                className="text-cyan-600 text-sm font-semibold hover:text-blue-600 flex items-center space-x-1 transition-colors"
              >
                <span>View all listings</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            <div className="bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-cyan-300/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Post a New Job</h3>
                <p className="text-white/80 text-sm mb-5">
                  Reach 100K+ active job seekers on NextHire instantly.
                </p>
                <button
                  onClick={() => navigate("/admin/myjobs")}
                  className="w-full bg-white text-slate-800 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4 text-cyan-600" />
                  <span>Create Listing</span>
                </button>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-cyan-600" />
                <span>Hiring Pipeline</span>
              </h3>
              {[
                { stage: "Applications", count: totalApplicants, color: "bg-cyan-500", pct: 100 },
                { stage: "Screening",    count: totalApplicants,  color: "bg-blue-500", pct: 30 },
                { stage: "Interviews",   count: Math.floor(totalApplicants/2),   color: "bg-purple-500", pct: 7.5 },
                { stage: "Hired",        count: Math.floor(totalApplicants/3),    color: "bg-emerald-500", pct: 0.6 },
              ].map((item) => (
                <div key={item.stage} className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">{item.stage}</span>
                    <span className="font-bold text-slate-800">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
}