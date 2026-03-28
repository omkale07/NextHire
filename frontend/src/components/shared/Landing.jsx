import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Users, TrendingUp, ChevronRight, MapPin, DollarSign, Clock, Star, Building2, Award, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function JobHuntLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jobCategories = [
    { name: 'Technology', count: '12,543', icon: Zap, color: 'from-cyan-500 to-blue-500' },
    { name: 'Design', count: '8,291', icon: Award, color: 'from-purple-500 to-pink-500' },
    { name: 'Marketing', count: '9,876', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { name: 'Business', count: '15,234', icon: Building2, color: 'from-emerald-500 to-teal-500' },
  ];

  const featuredJobs = [
    {
      company: 'TechCorp',
      role: 'Senior Product Designer',
      location: 'Remote',
      salary: '$120k - $150k',
      type: 'Full-time',
      logo: '🚀'
    },
    {
      company: 'InnovateLabs',
      role: 'Full Stack Developer',
      location: 'New York, NY',
      salary: '$100k - $140k',
      type: 'Full-time',
      logo: '💡'
    },
    {
      company: 'CreativeHub',
      role: 'Marketing Manager',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      type: 'Full-time',
      logo: '🎨'
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Jobs', icon: Briefcase },
    { number: '100K+', label: 'Job Seekers', icon: Users },
    { number: '5K+', label: 'Companies', icon: Building2 },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-linear-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                NextHire
              </span>
            </div>

          

            <div className="flex items-center space-x-4">
             <Link to="/login"><button  className="text-slate-700 hover:text-cyan-600 font-medium transition-colors">
                Sign In
              </button></Link> 
            <Link to="/signup"><button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-300">
                Get Started
              </button></Link> 
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-200/50 shadow-sm mb-6 animate-fade-in-up">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-slate-700">Trusted by 100K+ job seekers</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up animation-delay-100">
              <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Find Your{' '}
              </span>
              <span className="bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-linear">
                Dream Career
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 animate-fade-in-up animation-delay-200">
              Discover thousands of opportunities from top companies. Your perfect job is just a search away.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 md:space-x-2 max-w-3xl mx-auto border border-slate-200/50 animate-fade-in-up animation-delay-300">
              <div className="flex-1 flex items-center space-x-3 px-4 py-2">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-slate-200"></div>
              <div className="flex-1 flex items-center space-x-3 px-4 py-2">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                />
              </div>
              <button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Search</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-slate-600 animate-fade-in-up animation-delay-400">
              <span className="font-medium">Popular:</span>
              {['Designer', 'Developer', 'Manager', 'Marketing'].map((term) => (
                <button
                  key={term}
                  className="px-4 py-1.5 bg-white/80 rounded-full hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300 border border-slate-200/50 shadow-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="hidden lg:block">
            {/* Top Left Badge */}
            <div className="absolute top-40 left-10 bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-4 border border-slate-200/50 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">95%</div>
                  <div className="text-xs text-slate-500">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Top Right Badge */}
            <div className="absolute top-52 right-10 bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-4 border border-slate-200/50 animate-float-delayed">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">100K+</div>
                  <div className="text-xs text-slate-500">Job Seekers</div>
                </div>
              </div>
            </div>

            {/* Bottom Left Badge */}
            <div className="absolute bottom-40 left-20 bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-4 border border-slate-200/50 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">5K+</div>
                  <div className="text-xs text-slate-500">Companies</div>
                </div>
              </div>
            </div>

            {/* Bottom Right Small Badge */}
            <div className="absolute bottom-32 right-20 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full shadow-xl shadow-cyan-300/50 p-3 border-4 border-white animate-float-delayed" style={{animationDelay: '1.5s'}}>
              <Star className="w-6 h-6 text-white fill-white" />
            </div>

            {/* Small Floating Icon Top */}
            <div className="absolute top-32 right-1/4 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg p-2.5 border-4 border-white animate-float" style={{animationDelay: '0.5s'}}>
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
          </div>

          {/* Illustration Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            {/* Card 1 */}
            <div className="relative animate-fade-in-up animation-delay-500">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-6 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">Senior Designer</h3>
                    <p className="text-sm text-slate-500">TechCorp Inc.</p>
                  </div>
                  <button className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center hover:bg-cyan-50 transition-colors">
                    <Star className="w-4 h-4 text-slate-400 hover:text-cyan-600 hover:fill-cyan-600 transition-all" />
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-slate-700">$120k - $150k</span>
                  </div>
                </div>
                <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform group-hover:scale-105 transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative animate-fade-in-up animation-delay-600">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-6 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    💡
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">Full Stack Dev</h3>
                    <p className="text-sm text-slate-500">InnovateLabs</p>
                  </div>
                  <button className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center hover:bg-purple-50 transition-colors">
                    <Star className="w-4 h-4 text-slate-400 hover:text-purple-600 hover:fill-purple-600 transition-all" />
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>New York, NY</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-slate-700">$100k - $140k</span>
                  </div>
                </div>
                <button className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transform group-hover:scale-105 transition-all duration-300">
                  Apply Now
                </button>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-linear-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-float flex items-center space-x-1">
                <span>Hot</span>
                <span>🔥</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative animate-fade-in-up animation-delay-700">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-6 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🎨
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">Marketing Lead</h3>
                    <p className="text-sm text-slate-500">CreativeHub</p>
                  </div>
                  <button className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
                    <Star className="w-4 h-4 text-slate-400 hover:text-orange-600 hover:fill-orange-600 transition-all" />
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-slate-700">$90k - $120k</span>
                  </div>
                </div>
                <button className="w-full bg-linear-to-r from-orange-500 to-red-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transform group-hover:scale-105 transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Explore by Category
              </span>
            </h2>
            <p className="text-xl text-slate-600">Find jobs in your preferred industry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <div
                key={category.name}
                className="group bg-white rounded-2xl p-6 border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-linear-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{category.name}</h3>
                <p className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {category.count}
                </p>
                <p className="text-sm text-slate-500">open positions</p>
                <div className="mt-4 flex items-center text-cyan-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm">Explore jobs</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS0xMCAwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who found their dream careers through NextHire
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={()=>navigate("/signup")} className="bg-white text-slate-800 px-8 py-4 rounded-full font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  Create Free Account
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Centered */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold">NextHire</span>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Your trusted partner in finding the perfect career opportunity.
            </p>
          </div>

          {/* Links Section - Centered Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="font-bold mb-4 text-lg">For Job Seekers</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Career Advice</a></li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="font-bold mb-4 text-lg">For Employers</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Recruit</a></li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="font-bold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="font-bold mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links - Centered */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
            </a>
          </div>

          {/* Bottom Section - Centered */}
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-400">&copy; 2025 NextHire. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes linear {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animate-linear {
          background-size: 200% 200%;
          animation: linear 3s ease infinite;
        }
      `}</style>
    </div>
  );
}