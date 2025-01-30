import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://apijob-job-searching-api.p.rapidapi.com/v1/job/search";
const API_HEADERS = {
  "x-rapidapi-key": "48494c1768msha51a80dbc318960p1614f7jsnc2753fc5f2c8",
  "x-rapidapi-host": "apijob-job-searching-api.p.rapidapi.com",
  "Content-Type": "application/json",
};

// Async thunk to fetch job details using the new API
export const fetchJobDetails = createAsyncThunk(
  "job/fetchJobDetails",
  async (query = "frontend developer") => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ q: query }),
      });

      const data = await response.json();
      console.log("API response:", data); // Log response to check structure

      // ✅ Extract job details correctly from `hits`
      return data.hits || [];
    } catch (error) {
      console.error("Error fetching job details:", error);
      throw error;
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default jobSlice.reducer;
