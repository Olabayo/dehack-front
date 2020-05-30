import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    error: false,
    success: false,
    fetching: false,
  },
  reducers: {
    requestAuth: state => {
      return { ...state, fetching: true }
    },
    cancelRequestAuth: state => {
      return { ...state, fetching: false }
    },
    receiveAuth: (state, action) => {
      return { ...state, currentUser: action.payload, fetching: false, success: true }
    },
    clearAuth: state => {
      return { ...state, currentUser: {} }
    },
  },
});

export const { requestAuth, cancelRequestAuth, receiveAuth, clearAuth } = authSlice.actions;


export const selectState = state => state.auth.fetching;

export default authSlice.reducer;
