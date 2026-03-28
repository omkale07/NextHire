import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import GetAllJobs from "../hooks/GetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/jobSlice";
import { motion } from "framer-motion";

const Browse = () => {
  GetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto my-10 px-4">
        {/* Heading */}
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>

        {/* Jobs Grid */}
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              key={job._id}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
