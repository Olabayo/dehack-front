import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileOverview: {},
    error: false,
    success: false,
    fetching: false,
  },
  reducers: {
    requestOverview: state => {
      return { ...state, fetching: true }
    },
    requestChangePass: state => {
      return { ...state, fetching: true }
    },
    cancelOverviewRequest: state => {
      return { ...state, fetching: false }
    },
    cancelChangePassRequest: state => {
      return { ...state, fetching: false }
    },
    receiveOverview: (state, action) => {
      return { ...state, profileOverview: action.payload, fetching: false, success: true }
    },
    clearOverview: state => {
      return { ...state, profileOverview: {} }
    },
  },
});

export const { requestOverview, requestChangePass,  cancelOverviewRequest, cancelChangePassRequest, receiveOverview, clearOverview } = profileSlice.actions;

export default profileSlice.reducer;
