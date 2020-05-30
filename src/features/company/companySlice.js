import { createSlice } from '@reduxjs/toolkit';

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyProfile: {},
    error: false,
    success: false,
    fetching: false,
  },
  reducers: {
    requestProfile: state => {
      return { ...state, fetching: true }
    },
    cancelProfileRequest: state => {
      return { ...state, fetching: false }
    },
    receiveProfile: (state, action) => {
      return { ...state, companyProfile: action.payload, fetching: false, success: true }
    },
    clearProfile: state => {
      return { ...state, companyProfile: {} }
    },
  },
});

export const { requestProfile, cancelProfileRequest,  receiveProfile, clearProfile } = companySlice.actions;

export default companySlice.reducer;
