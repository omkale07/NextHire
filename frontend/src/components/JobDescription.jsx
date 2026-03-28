import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import {setSingalJob} from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "./utils/constant";
import useApplyJob from "../hooks/useApplyJob";

const JobDescription = () => {

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const {singalJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth);


  const {applyJob, isApplying, isAppliedd} = useApplyJob(jobId);

 
  useEffect(() => {
   
   const fetchSingalJob = async () =>{
    try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`,{
            withCredentials:true
        })
        if(res.data.success){
         dispatch(setSingalJob(res.data.job));
        }
        console.log(res);
    } catch (error) {
        console.log(error)
    }
   }
fetchSingalJob();
 }, [jobId, dispatch, user?._id])


  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* ── Header ── */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">

            {/* Left — title + badges */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{singalJob?.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge
                  className="px-3 py-1 text-blue-700 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold"
                  variant="ghost"
                >
                  {singalJob?.position} position 
                </Badge>
                <Badge
                  className="px-3 py-1 text-[#F83002] bg-red-50 border border-red-100 rounded-full text-xs font-semibold"
                  variant="ghost"
                >
                  {singalJob?.jobType}
                </Badge>
                <Badge
                  className="px-3 py-1 text-[#7209b7] bg-purple-50 border border-purple-100 rounded-full text-xs font-semibold"
                  variant="ghost"
                >
                 {singalJob?.salary} LPA
                </Badge>
              </div>
            </div>

            {/* Right — Apply button */}
            <button
              onClick={applyJob}
              disabled={isAppliedd || isApplying}
              className={`shrink-0 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isAppliedd
                  ? "bg-emerald-50 border border-emerald-300 text-emerald-600 cursor-default"
                  : "bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105"
              }`}
            >
            {isApplying ? "Applying..." : isAppliedd ? "✓ Applied!" : "Apply Now"}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Job Description</h2>

          <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Role</span>
              <span className="text-sm text-gray-600">{singalJob?.title}</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Location</span>
              <span className="text-sm text-gray-600">{singalJob?.location}</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Description</span>
              <span className="text-sm text-gray-600">{singalJob?.description}</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Experience</span>
              <span className="text-sm text-gray-600">{singalJob?.exprienceLevel
} yrs</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Salary</span>
              <span className="text-sm text-gray-600">{singalJob?.salary} LPA</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Total Applicants</span>
              <span className="text-sm text-gray-600">{singalJob?.application?.length}</span>
            </div>
            <div className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <span className="w-36 shrink-0 text-sm font-semibold text-gray-700">Posted Date</span>
              <span className="text-sm text-gray-600">{singalJob?.createdAt.slice(0, 10)
}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDescription;