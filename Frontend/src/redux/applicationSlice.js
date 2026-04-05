import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        allAdminApplicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setAllAdminApplicants:(state,action) => {
            state.allAdminApplicants = action.payload;
        }
    }
});

export const {setAllApplicants, setAllAdminApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;
export const applicationReducer = applicationSlice.reducer;
