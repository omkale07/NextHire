import React, { useState } from "react";
import {
  Building2,
  Plus,
  Eye,
  Edit3,
  Trash2,
  ChevronRight,
  MapPin,
  Search,
  Briefcase,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";



export default function Companies() {
  useGetAllCompanies();

  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const { allCompany } = useSelector((store) => store.company);

  console.log("Redux companies:", allCompany);

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const filtered = (allCompany || []).filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

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
            <h1 className="text-3xl font-bold text-slate-800">Companies</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage all registered companies on NextHire.
            </p>
          </div>
          <button
            onClick={()=>navigate("/admin/companies/create")}
            className="hidden md:flex items-center space-x-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-cyan-600" />
              <span>All Companies</span>
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
                  placeholder="Search companies…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-transparent focus:border-cyan-300 focus:bg-white text-sm text-slate-700 outline-none transition-all w-full sm:w-52"
                />
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Date
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
                      colSpan={4}
                      className="px-6 py-16 text-center text-slate-400"
                    >
                      <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No companies found</p>
                      <p className="text-xs mt-1">
                        Try adjusting your search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((company) => {
                    return (
                      <tr
                        key={company._id}
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl shrink-0 shadow-sm overflow-hidden">
                              {company.logo ? (
                                <img
                                  src={company.logo}
                                  alt={company.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-slate-400 text-sm">
                                  N/A
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="font-semibold text-slate-800 truncate">
                                {company.name}
                              </div>
                              <div className="text-xs text-slate-400 truncate hidden sm:block">
                                {company.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Location */}
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{company.location}</span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {new Date(company.createdAt).toLocaleDateString(
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
                                navigate(`/admin/companies/${company._id}`)
                              }
                              className="w-8 h-8 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/companies/${company._id}`)
                              }
                              className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModal(company._id)}
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
              Showing {filtered.length} of {allCompany.length} companies
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
              <h3 className="font-bold text-lg">
                Add a new company to NextHire
              </h3>
              <p className="text-white/75 text-sm mt-1">
                Register a company and start posting jobs to 100K+ active job
                seekers.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/companies/create")}
              className="shrink-0 bg-white text-slate-800 px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4 text-cyan-600" />
              <span>Add Company</span>
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
              Delete Company?
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              This will permanently delete{" "}
              <span className="font-semibold text-slate-700">
                {allCompany.find((c) => c.id === deleteModal)?.name}
              </span>{" "}
              and all its listings. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteModal(null)}
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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
