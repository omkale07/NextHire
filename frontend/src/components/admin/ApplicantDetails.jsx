import React, { useEffect, useState } from "react";
import {
  Users, Mail, Phone, FileText, Calendar,
  CheckCircle2, XCircle, Clock, Search,
  Filter, Building2, Download, ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { toast } from "sonner";


export default function ApplicantDetails() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statuses, setStatuses] = useState({});


  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {applicants} = useSelector(store=>store.applicant)
  const { allAdminJobs } = useSelector((store) => store.job);
  const job = (allAdminJobs || []).find((j) => j._id === params.id);

  useEffect(() => {
   
   const getAllApplication = async() =>{
         try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{
          withCredentials:true
        })
        if(res.data.success){
        dispatch(setAllApplicants(res.data.job));
        }
        } catch (error) {
      console.log(error);
    }
    }
    getAllApplication();
    
  }, [params.id]);



  const updateStatus = async(id, status) =>{
    try {
      const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,
    {status},
    {withCredentials:true}
  );
  if(res.data.success){
    setStatuses((prev) => ({ ...prev, [id]: status }));
    toast.success(res.data.message);
  }
    } catch (error) {
      console.log(error);
    }
 
  }
  

  const getStatus = (app) => (statuses[app._id] || app.status || "pending").toLowerCase();

  const filtered = applicants.application.filter((app) => {
    const name = app.applicant?.fullname?.toLowerCase() || "";
    const email = app.applicant?.email?.toLowerCase() || "";
    const matchSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || getStatus(app) === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const total    = applicants.application.length;
  const pending  = applicants.application.filter((a) => getStatus(a) === "pending").length;
  const accepted = applicants.application.filter((a) => getStatus(a) === "accepted").length;
  const rejected = applicants.application.filter((a) => getStatus(a) === "rejected").length;


  const badgeClass = (s) => {
    if (s === "accepted") return "bg-emerald-50 text-emerald-600 border-emerald-200";
    if (s === "rejected") return "bg-red-50 text-red-500 border-red-200";
    return "bg-amber-50 text-amber-600 border-amber-200";
  };
  const dotClass = (s) => {
    if (s === "accepted") return "bg-emerald-500";
    if (s === "rejected") return "bg-red-500";
    return "bg-amber-400";
  };
  const label = (s) => {
    if (s === "accepted") return "Accepted";
    if (s === "rejected") return "Rejected";
    return "Pending";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 font-sans">

      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-linear-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <main className="relative z-10 pt-10 pb-16 px-6 max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center space-x-3">
          <button onClick={()=>navigate(-1)}className="w-9 h-9 rounded-xl bg-white/70 border border-slate-200/60 hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Applications</h1>
            <p className="text-slate-500 mt-0.5 text-sm flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{job.company.name}</span>
              <span className="text-slate-300">·</span>
              <span className="font-medium text-cyan-600">{job.title}</span>
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total</p>
              <p className="text-xl font-bold text-slate-800">{total}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Pending</p>
              <p className="text-xl font-bold text-slate-800">{pending}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Accepted</p>
              <p className="text-xl font-bold text-slate-800">{accepted}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Rejected</p>
              <p className="text-xl font-bold text-slate-800">{rejected}</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-600" />
              <span>Applicants</span>
              <span className="ml-1 bg-cyan-100 text-cyan-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </h2>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-transparent focus:border-cyan-300 focus:bg-white text-sm text-slate-700 outline-none transition-all w-full sm:w-60"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen((p) => !p)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">{statusFilter === "All" ? "Status" : statusFilter}</span>
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200/60 z-20 overflow-hidden">
                    {["All", "Pending", "Accepted", "Rejected"].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setStatusFilter(s); setFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          statusFilter === s ? "bg-cyan-50 text-cyan-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Applicant</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Resume</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Applied</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                      <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No applications found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filter.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((app) => {
                    const status = getStatus(app);
                    const isSettled = status === "accepted" || status === "rejected";

                    return (
                      <tr key={app._id} className="hover:bg-slate-50/60 transition-colors group">

                        {/* Applicant */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0 shadow-sm text-white font-bold text-sm">
                              {app.applicant?.fullname?.[0]?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{app.applicant?.fullname ?? "—"}</p>
                              <p className="text-xs text-slate-400 truncate flex items-center space-x-1 mt-0.5 md:hidden">
                                <Mail className="w-3 h-3 shrink-0" />
                                <span>{app.applicant?.email ?? "—"}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span className="truncate max-w-\[160px]\">{app.applicant?.email ?? "—"}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span>{app.applicant?.phoneNumber ?? "—"}</span>
                            </div>
                          </div>
                        </td>

                        {/* Resume */}
                        <td className="px-4 py-4 hidden lg:table-cell">
                          {app.applicant?.profile?.resume ? (
                            <a
                              href={app.applicant.profile.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 text-xs font-semibold border border-cyan-200/60 transition-colors group/resume"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{app.applicant.profile.resumeOriginalName ?? "View Resume"}</span>
                              <Download className="w-3 h-3 opacity-0 group-hover/resume:opacity-100 transition-opacity" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Not uploaded</span>
                          )}
                        </td>

                        {/* Applied Date */}
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            <span>
                              {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass(status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotClass(status)}`} />
                            <span>{label(status)}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            {isSettled ? (
                              <button
                                onClick={() => updateStatus(app._id, "pending")}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-semibold transition-colors opacity-0 group-hover:opacity-100"
                              >
                                Reset
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => updateStatus(app._id, "accepted")}
                                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/60 text-xs font-semibold transition-all hover:shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Accept</span>
                                </button>
                                <button
                                  onClick={() => updateStatus(app._id, "rejected")}
                                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 border border-red-200/60 text-xs font-semibold transition-all hover:shadow-sm opacity-0 group-hover:opacity-100"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing {filtered.length} of {applicants.application.length} applications
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>{accepted} accepted</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span>{rejected} rejected</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span>{pending} pending</span>
              </span>
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