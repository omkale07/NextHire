import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { JOB_API_ENDPOINT} from '../components/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs} from '../redux/jobSlice'

const useGetAllAdminJobs = () => {

const dispatch = useDispatch();

 useEffect(() => {
   
   const fetchAllAdminJobs = async () =>{
    try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{
            withCredentials:true
        })
        if(res.data.success){
         dispatch(setAllAdminJobs(res.data.jobs))
        }
        console.log(res);
    } catch (error) {
        console.log(error)
    }
   }
fetchAllAdminJobs();
 }, [])
 
}

export default useGetAllAdminJobs