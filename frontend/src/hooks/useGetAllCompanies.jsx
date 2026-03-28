import axios from 'axios';
import React, { useEffect } from 'react'
import { setAllCompany } from '../redux/companySlice';
import { useDispatch } from 'react-redux';
import { COMPANY_API_ENDPOINT } from '../components/utils/constant';

const useGetAllCompanies = () => {

  const dispatch = useDispatch();
 useEffect(() => {

   const fetchAllCompany = async () =>{
    try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`,{
            withCredentials:true
        })
        if(res.data.success){
         dispatch(setAllCompany(res.data.companies));
        }
    } catch (error) {
        console.log(error)
    }
   }
fetchAllCompany();
 }, [])

}

export default useGetAllCompanies;