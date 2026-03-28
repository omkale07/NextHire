import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { JOB_API_ENDPOINT} from '../components/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const GetAllJobs = () => {

const dispatch = useDispatch();
const{searchText} = useSelector(store=>store.job);

 useEffect(() => {
   
   const fetchAllJobs = async () =>{
    try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchText}`,{
            withCredentials:true
        })
        if(res.data.success){
         dispatch(setAllJobs(res.data.jobs))
        }
        console.log(res);
    } catch (error) {
        console.log(error)
    }
   }
fetchAllJobs();
 }, [])
 
}

export default GetAllJobs