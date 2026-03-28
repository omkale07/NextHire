import React, { useState } from 'react';
import { Search, MapPin, Star, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const popularTerms = ['Designer', 'Developer', 'Manager', 'Marketing', 'Data Science'];

export default function HeroSection({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) onSearch({ keyword, location });
    dispatch(setSearchText(keyword));
    navigate("/browse");
  };

  return (
    <section className="relative pt-20 pb-20 px-6 overflow-hidden">
      {/* Floating background orbs — same as original */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'linear-linear(135deg, rgba(34,211,238,0.2), rgba(59,130,246,0.2))', animation: 'floatOrb 6s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'linear-linear(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))', animation: 'floatOrb 7s ease-in-out infinite 1s' }}
      />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Trust badge */}
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-200/50 shadow-sm mb-6">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-slate-700">Trusted by 100K+ job seekers</span>
        </div>

        {/* Heading — same linear as original */}
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Find Your{' '}
          </span>
          <span className="bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dream Career
          </span>
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          Discover thousands of opportunities from top companies. Your perfect job is just a search away.
        </p>

        {/* ── Search Bar ── exact replica of original */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 md:space-x-2 max-w-3xl mx-auto border border-slate-200/50">
          <div className="flex-1 flex items-center space-x-3 px-4 py-2">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 self-center" />

          <div className="flex-1 flex items-center space-x-3 px-4 py-2">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Search</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Popular chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-slate-600">
          <span className="font-medium">Popular:</span>
          {popularTerms.map((term) => (
            <button
              key={term}
              onClick={() => { setKeyword(term); if (onSearch) onSearch({ keyword: term, location }); }}
              className="px-4 py-1.5 bg-white/80 rounded-full hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300 border border-slate-200/50 shadow-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}