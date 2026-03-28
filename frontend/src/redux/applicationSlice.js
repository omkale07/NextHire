import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"applicant",
    initialState:{
        applicants : [],
    },
    reducers:{
        
        setAllApplicants : (state, action) =>{
            state.applicants = action.payload
        },

        setAllApplication : (state, action) =>{
            state.allApplication = action.payload
        }
    }
})

export const {setAllApplicants} = companySlice.actions;
export default companySlice.reducer;