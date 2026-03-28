import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './Hero'
import JobCarousel from './JobCrousel'
import JobCards from './JobCards'
import GetAllJobs from '../hooks/GetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  GetAllJobs();

const {user} = useSelector(store=>store.auth);
const navigate = useNavigate();

useEffect(() => {
 if(user?.role == 'recruiter'){
  navigate("/admin/home");
 }
}, [])


  return (
    <div>
        <HeroSection/>
        <JobCarousel/>
        <JobCards/>
    </div>
  )
}

export default Home;