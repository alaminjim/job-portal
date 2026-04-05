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
        },
        updateAdminApplicantStatus:(state,action) => {
            const {id, status} = action.payload;
            state.allAdminApplicants = state.allAdminApplicants.map((item) => 
                item._id === id ? {...item, status} : item
            );
        }
    }
});

export const {setAllApplicants, setAllAdminApplicants, updateAdminApplicantStatus} = applicationSlice.actions;
export default applicationSlice.reducer;
export const applicationReducer = applicationSlice.reducer;
