import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        allCompany : [],
        singalCompany : null
    },
    reducers:{
        
        setAllCompany : (state, action) =>{
            state.allCompany = action.payload
        },

        setSingalCompany : (state, action) =>{
            state.singalCompany = action.payload
        }
    }
})

export const {setSingalCompany, setAllCompany} = companySlice.actions;
export default companySlice.reducer;