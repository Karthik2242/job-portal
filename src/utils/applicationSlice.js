import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
  },
});

export const { addApplication } = applicationSlice.actions;

export default applicationSlice.reducer;
