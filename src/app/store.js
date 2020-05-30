import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import companyReducer from '../features/company/companySlice';

export default configureStore({
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    profile: profileReducer,
    company: companyReducer
  },
});
