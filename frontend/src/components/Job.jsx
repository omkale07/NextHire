import React, { useState } from "react";
import { MapPin, DollarSign, Clock, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useApplyJob from "../hooks/useApplyJob";

export default function Job(props) {
  const job = props.job;

  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-cyan-50 to-blue-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
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
            <p className="text-sm text-slate-500 mt-0.5">{job.company.name}</p>
          </div>
        </div>

        {/* Star */}
        <button
          onClick={toggleStar}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            isStarred
              ? "bg-yellow-50 border border-yellow-300"
              : "bg-slate-50 border border-slate-200 hover:bg-cyan-50 hover:border-cyan-300"
          }`}
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              isStarred ? "text-yellow-500 fill-yellow-500" : "text-slate-400"
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-5 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <DollarSign className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-700">{job.salary}-LPA</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{job.jobType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs rounded-full font-medium">
            {job.title}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
        {job?.description || "NA"}
      </p>

      {/* Buttons Row */}
      <div className="flex gap-3">
        {/* Details Button */}
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-700 bg-white hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
        >
          Details
        </button>
      </div>

      {/* Floating badge animation */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
