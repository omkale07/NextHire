import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterJobs } from "../redux/jobSlice";

const filterData = [
  {
    title: "Location",
    options: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"],
  },
  {
    title: "Industry",
    options: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX", "Mobile"],
  },
  {
    title: "Salary",
    options: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
  },
];

export default function FilterCards({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const handleChange = (category, value) => {
    const updated = { ...selectedFilters, [category]: value };
    setSelectedFilters(updated);
    if (onFilterChange) onFilterChange(updated);
    dispatch(setFilterJobs(updated));
  };


  return (
    <aside className="w-full md:w-72 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-fit sticky top-24">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Filter Jobs
      </h2>

      <div className="space-y-8">
        {filterData.map((section) => (
          <div key={section.title}>

            {/* Section Title */}
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              {section.title}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {section.options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    selectedFilters[section.title] === option
                      ? "bg-cyan-50 border border-cyan-400"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <input
                    type="radio"
                    name={section.title}
                    value={option}
                    checked={selectedFilters[section.title] === option}
                    onChange={() => handleChange(section.title, option)}
                    className="accent-cyan-600 w-4 h-4"
                  />

                  <span className="text-sm text-slate-700">{option}</span>
                </label>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Clear Filter Button */}
      <button
        onClick={() => {
          setSelectedFilters({});
          if (onFilterChange) onFilterChange({});
          dispatch(setFilterJobs({}));
        }}
        className="mt-8 w-full py-2 rounded-xl border border-slate-300 text-slate-600 hover:border-red-400 hover:text-red-500 transition-all"
      >
        Clear Filters
      </button>

    </aside>
  );
}
