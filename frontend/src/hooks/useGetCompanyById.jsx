import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { COMPANY_API_ENDPOINT} from '../components/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingalCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {

const dispatch = useDispatch();

 useEffect(() => {
   
   const fetchSingalCompany = async () =>{
    try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{
            withCredentials:true
        })
        if(res.data.success){
         dispatch(setSingalCompany(res.data.company))
        }
        console.log(res);
    } catch (error) {
        console.log(error)
    }
   }
fetchSingalCompany();
 }, [companyId, dispatch])
 
}

export default useGetCompanyById