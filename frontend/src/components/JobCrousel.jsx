import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchText } from '../redux/jobSlice';

const categories = [
  {
    label: 'Frontend',
    emoji: '🖥️',
    count: '4,210',
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    tag: 'text-cyan-700',
    skills: ['React', 'Vue', 'TypeScript', 'CSS'],
  },
  {
    label: 'Backend',
    emoji: '⚙️',
    count: '5,830',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    tag: 'text-violet-700',
    skills: ['Node.js', 'Python', 'Java', 'Go'],
  },
  {
    label: 'Full Stack',
    emoji: '🚀',
    count: '6,940',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    tag: 'text-blue-700',
    skills: ['MERN', 'Next.js', 'PostgreSQL', 'AWS'],
  },
  {
    label: 'UI / UX',
    emoji: '🎨',
    count: '3,120',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    tag: 'text-pink-700',
    skills: ['Figma', 'Prototyping', 'Research', 'Design Sys'],
  },
  {
    label: 'Data Analyst',
    emoji: '📊',
    count: '2,980',
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    tag: 'text-orange-700',
    skills: ['Python', 'ML', 'Pandas', 'TensorFlow'],
  },
  {
    label: 'DevOps',
    emoji: '🔧',
    count: '2,450',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    tag: 'text-teal-700',
    skills: ['Docker', 'K8s', 'CI/CD', 'Terraform'],
  },
  {
    label: 'Mobile',
    emoji: '📱',
    count: '3,670',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    tag: 'text-red-700',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    label: 'Cloud / SRE',
    emoji: '☁️',
    count: '1,890',
    color: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    tag: 'text-sky-700',
    skills: ['AWS', 'GCP', 'Azure', 'SRE'],
  },
];

export default function JobCarousel({ onCategorySelect }) {
  const scrollRef = useRef(null);
  const [active, setActive] = useState('Full Stack');
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const handleClick = (label) => {
    setActive(label);
    if (onCategorySelect) onCategorySelect(label);
    dispatch(setSearchText(label));
    navigate("/browse");
  };

  return (
    <section className="py-16 px-6" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Browse by Role
            </h2>
            <p className="text-slate-500 mt-1">Pick a specialisation and discover matching jobs</p>
          </div>

          {/* Arrow buttons — same style as original's rounded buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canLeft
                  ? 'border-slate-200 bg-white shadow-sm hover:border-cyan-400 hover:text-cyan-600'
                  : 'border-slate-100 bg-white/50 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canRight
                  ? 'border-slate-200 bg-white shadow-sm hover:border-cyan-400 hover:text-cyan-600'
                  : 'border-slate-100 bg-white/50 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const isActive = active === cat.label;
            return (
              <div
                key={cat.label}
                onClick={() => handleClick(cat.label)}
                className={`shrink-0 .w-[220px] rounded-2xl border p-5 cursor-pointer transition-all duration-300 group
                  ${isActive
                    ? `${cat.bg} ${cat.border} shadow-lg -translate-y-1`
                    : 'bg-white border-slate-200/70 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-linear-to-br ${cat.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  {cat.emoji}
                </div>

                {/* Label & count */}
                <h3 className="text-lg font-bold text-slate-800 mb-0.5">{cat.label}</h3>
                <p className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {cat.count}
                </p>
                <p className="text-xs text-slate-400 mb-3">open positions</p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cat.bg} ${cat.border} border ${cat.tag}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Explore link */}
                <button onClick={()=>handleClick(cat.label)}
                  className={`mt-4 flex items-center gap-1 text-xs font-semibold group-hover:translate-x-1.5 transition-transform duration-200 ${
                    isActive ? cat.tag : 'text-cyan-600'
                  }`}
                >
                  Explore jobs <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
      </div>
    </section>
  );
}