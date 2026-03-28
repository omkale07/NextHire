import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingalCompany } from '/src/redux/companySlice';




export default function CreateCompany() {
  const [companyName, setCompanyName] = useState('');

  const preview = companyName.trim() || 'Your Company';
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const registerCompany = async () => {
  try {
    const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName}, {
        headers:{
        "Content-Type" : "application/json"
        },

       withCredentials:true,
    })
    if(res?.data?.success){
        dispatch(setSingalCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
  }

   
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 font-sans">

      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -left-40 w-80 h-80 bg-linear-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg text-center -mt-20">

        {/* Conversational Heading */}
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-3">Let's get you set up</p>
        <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-3">
          What do you call <br />
          <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent transition-all duration-300">
            {preview}
          </span>
          <span className="inline-block w-0.5 h-9 bg-cyan-500 ml-1 align-middle animate-blink"></span>
        </h1>
        <p className="text-slate-400 text-sm mb-10">
          You can always change this later.
        </p>

        {/* Borderless inline input */}
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Type your company name..."
          autoFocus
          className="w-full text-center text-lg text-slate-700 placeholder-slate-300 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all duration-300 shadow-sm mb-8"
        />

        {/* Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <button onClick={()=>navigate("/admin/home")} className="px-7 py-3 rounded-full border border-slate-200 bg-white text-slate-500 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
            Cancel
          </button>
          <button onClick={registerCompany}
            disabled={!companyName.trim()}
            className={`flex items-center space-x-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              companyName.trim()
                ? 'bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
}