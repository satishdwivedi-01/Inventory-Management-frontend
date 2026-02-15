import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardAPI } from "./dashboardAPI";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async () => {
    const res = await getDashboardAPI();
    return res.data.data;
  }
);

const slice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default slice.reducer;
