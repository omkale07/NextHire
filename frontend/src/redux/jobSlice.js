import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singalJob : null,
        allAdminJobs:[],
        allAppliedJobs:[],
        searchText:"",
        filterJobs:null,
    },
    reducers:{
        setAllJobs:(state, action)=>{
            state.allJobs = action.payload;
        },

        setSingalJob:(state, action)=>{
            state.singalJob = action.payload;
        },

        setAllAdminJobs:(state, action)=>{
            state.allAdminJobs = action.payload;
        },
        setAllAppliedJobs:(state, action)=>{
            state.allAppliedJobs = action.payload;
        },

        setSearchText:(state, action)=>{
            state.searchText = action.payload;
        },

        setFilterJobs:(state, action)=>{
            state.filterJobs = action.payload;
        }
    }
})

export const {setAllJobs, setSingalJob, setAllAdminJobs, setAllAppliedJobs, setSearchText, setFilterJobs} = jobSlice.actions;
export default jobSlice.reducer;