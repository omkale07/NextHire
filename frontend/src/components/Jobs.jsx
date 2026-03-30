import React, { useEffect, useState } from "react";
import Job from "./Job";
import FilterCards from "./FilterCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";



const Jobs = () => {

  const {allJobs} = useSelector((store)=> store.job);
  const {filterJobs} = useSelector(store=>store.job); 
  const [filterData, setFilterData] = useState(allJobs);

  const salaryRange = filterJobs?.Salary;

  const salaryMap = {
  "0-3 LPA": [0, 3],
  "3-6 LPA": [3, 6],
  "6-10 LPA": [6, 10],
  "10-15 LPA": [10, 15],
  "15+ LPA": [15, Infinity],
};

const [min, max] = salaryMap[salaryRange] || [0, Infinity];


useEffect(() => {
  if (filterJobs) {
    const filteredData = allJobs.filter((job) => {
      const jobSalary = parseInt(job?.salary) || 0;
      const industry = filterJobs.Industry?.toLowerCase() || "";
      const location = filterJobs.Location?.toLowerCase() || "";

      return (
        (!industry || job.title?.toLowerCase().includes(industry)) &&
        (!location || job.location?.toLowerCase().includes(location)) &&
        (!salaryRange || (jobSalary >= min && jobSalary <= max))
      );
    });

    setFilterData(filteredData);
  } else {
    setFilterData(allJobs);
  }
}, [allJobs, filterJobs]);
  

  return (
    <div>
      <div className=" mx-auto px-6 py-8">
        {/* MAIN LAYOUT */}
        <div className="flex gap-8 items-start">
          {/* LEFT SIDEBAR */}
          <div className="w-70 shrink-0">
            <FilterCards />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1">
            {/* Job Count */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              ({filterData.length})Jobs Found
            </h2>

            {/* JOB GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterData.map((job, index) => (
                <motion.div
                initial={{opacity:0, x:100}} 
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:-100}}
                transition={{duration:0.3}}
                key={index}>
                <Job job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
