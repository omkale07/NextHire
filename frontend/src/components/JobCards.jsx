import React, { useState } from "react";
import { MapPin, DollarSign, Clock, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useApplyJob from "../hooks/useApplyJob";

const filters = [
  "All",
  "Frontend ",
  "Backend",
  "Full Stack",
  "UI / UX",
  "Mobile",
  "Remote",
];

export default function JobCards({ onApply }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [starred, setStarred] = useState(new Set());

  const { allJobs } = useSelector((store) => store.job);


  const toggleStar = (id) => {
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };


  const filtered =
    activeFilter === "All"
      ? allJobs.slice(0, 6)
      : allJobs
          .slice(0, 6)
          .filter(
            (j) =>
              j.location === activeFilter || j.title.includes(activeFilter),
          );

  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-white/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-3">
            <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Featured Opportunities
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Hand-picked jobs from top companies
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === f
                  ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-400 hover:text-cyan-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Job Cards Grid — same white card style as original */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 3).map((job) => {
            const isStarred = starred.has(job._id);

            return (
              <div
                key={job._id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
              >
                {/* Badge */}
                {"Hot 🔥" && (
                  <div
                    className={`absolute -top-3 -right-3 bg-linear-to-r ${"from-cyan-500 to-blue-500"} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
                    style={{ animation: "floatCard 6s ease-in-out infinite" }}
                  >
                    {"New"}
                  </div>
                )}

                {/* Top: Logo + Title + Star */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-linear-to-br from-cyan-50 to-blue-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `<span class="text-lg flex items-center justify-center w-full h-full">${job.company.name?.charAt(0) || "?"}</span>`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base group-hover:text-cyan-600 transition-colors duration-200">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {job.company.name}
                      </p>
                    </div>
                  </div>

                  {/* Star / bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(job._id);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isStarred
                        ? "bg-yellow-50 border border-yellow-300"
                        : "bg-slate-50 border border-slate-200 hover:bg-cyan-50 hover:border-cyan-300"
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        isStarred
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">
                      {job.salary}-LPA
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs rounded-full font-medium">
                      {job.title}
                    </span>
                  </div>
                </div>

                {/* Apply Button — same style as original */}
                <div className="flex gap-3">
                  {/* Details Button */}
                  <button
                    onClick={() => navigate(`description/${job._id}`)}
                    className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-700 bg-white hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/findjobs")}
            className="bg-white text-slate-700 px-8 py-3 rounded-full font-semibold border-2 border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
          >
            View All Jobs
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
