import { configureStore } from '@reduxjs/toolkit';
import applicationReducer from './applicationSlice';
import jobReducer from './JobSlice';

const store = configureStore({
  reducer: {
    application: applicationReducer,
    job: jobReducer,
  },
});

export default store;
