import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Eye,
  Trash2,
  ChevronRight,
  MapPin,
  Search,
  Calendar,
  DollarSign,
  Users,
  Building2,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { setAllAdminJobs } from "../../redux/jobSlice";
import { toast } from "sonner";

const JOB_TYPES = [
  "All",
  "Fulltime",
  "Parttime",
  "Contract",
  "Internship",
  "Remote",
];

export default function Jobs() {
  useGetAllAdminJobs();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteModal, setDeleteModal] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const { allAdminJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filtered = (allAdminJobs || []).filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company?.name?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || j.jobType === typeFilter;
    return matchSearch && matchType;
  });
 
 const handleDelete = async(jobId) =>{
  try {
    const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`,{
      withCredentials:true
    })
    if(res.data.success){
    dispatch(setAllAdminJobs(allAdminJobs.filter((j) => j._id !== jobId)));
    setDeleteModal(null)
    toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
 }
  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-linear-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <main className="relative z-10 pt-10 pb-16 px-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Job Listings</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage all posted job opportunities on NextHire.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/myjobs/create")}
            className="hidden md:flex items-center space-x-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Job</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Total Jobs",
              value: allAdminJobs?.length ?? 0,
              icon: <Briefcase className="w-5 h-5 text-cyan-600" />,
              bg: "bg-cyan-50",
            },
            {
              label: "Companies Hiring",
              value: new Set((allAdminJobs || []).map((j) => j.company?._id)).size,
              icon: <Building2 className="w-5 h-5 text-purple-600" />,
              bg: "bg-purple-50",
            },
            {
              label: "Total Applicants",
              value: (allAdminJobs || []).reduce(
                (sum, j) => sum + (j.application?.length ?? 0),
                0,
              ),
              icon: <Users className="w-5 h-5 text-blue-600" />,
              bg: "bg-blue-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 flex items-center space-x-3 shadow-sm"
            >
              <div
                className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-cyan-600" />
              <span>All Jobs</span>
              <span className="ml-2 bg-cyan-100 text-cyan-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </h2>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs or companies…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-transparent focus:border-cyan-300 focus:bg-white text-sm text-slate-700 outline-none transition-all w-full sm:w-64"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen((p) => !p)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {typeFilter === "All" ? "Type" : typeFilter}
                  </span>
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200/60 z-20 overflow-hidden">
                    {JOB_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTypeFilter(t);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          typeFilter === t
                            ? "bg-cyan-50 text-cyan-700 font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t}
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
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Salary
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Posted
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-slate-400"
                    >
                      <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No jobs found</p>
                      <p className="text-xs mt-1">
                        Try adjusting your search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((job) => {
                    return (
                      <tr
                        key={job._id}
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        {/* Company */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                              {job.company?.logo ? (
                                <img
                                  src={job.company.logo}
                                  alt={job.company.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Building2 className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-800 truncate">
                                {job.company?.name ?? "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Job Title */}
                        <td className="px-4 py-4">
                          <div className="min-w-0">
                            <div className="font-medium text-slate-700 truncate">
                              {job.title}
                            </div>
                            {job.application?.length > 0 && (
                              <div className="text-xs text-slate-400 truncate hidden sm:flex items-center space-x-1 mt-0.5">
                                <Users className="w-3 h-3 shrink-0 text-cyan-500" />
                                <span className="text-cyan-600 font-medium">
                                  {job.application.length} applicant
                                  {job.application.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{job.location ?? "—"}</span>
                          </div>
                        </td>

                        {/* Salary */}
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <span>
                              {job.salary
                                ? `${Number(job.salary).toLocaleString()} LPA`
                                : "Not disclosed"}
                            </span>
                          </div>
                        </td>

                        {/* Posted Date */}
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {new Date(job.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() =>
                                navigate(`/admin/myjobs/${job._id}/applicants`)
                              }
                              className="w-8 h-8 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                              title="View Applicants"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModal(job._id)}
                              className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
              Showing {filtered.length} of {allAdminJobs?.length ?? 0} jobs
            </p>
            <button className="text-cyan-600 text-sm font-semibold hover:text-blue-600 flex items-center space-x-1 transition-colors">
              <span>Export CSV</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-cyan-300/30">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-10 -translate-x-10" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Post a new job on NextHire</h3>
              <p className="text-white/75 text-sm mt-1">
                Reach 100K+ active job seekers and find the perfect candidate
                fast.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/myjobs/create")}
              className="shrink-0 bg-white text-slate-800 px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4 text-cyan-600" />
              <span>Post a Job</span>
            </button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-200/60 animate-scale-in">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 text-center mb-1">
              Delete Job?
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              This will permanently remove{" "}
              <span className="font-semibold text-slate-700">
                {(allAdminJobs || []).find((j) => j._id === deleteModal)?.title}
              </span>{" "}
              and all its applications. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-red-500 to-rose-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-red-300/40 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}