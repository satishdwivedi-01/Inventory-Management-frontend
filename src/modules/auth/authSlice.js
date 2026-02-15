// Redux slice for authentication state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, meAPI, logoutAPI } from "./authAPI";

export const login = createAsyncThunk("auth/login", async (data) => {
  await loginAPI(data);

  const res = await meAPI();

  return res.data.user; // change based on response
});

export const getMe = createAsyncThunk("auth/me", async () => {


  const res = await meAPI();
  return res.data.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutAPI();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    checkingAuth: true, //  dont redirect until get who user is
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // getme
      .addCase(getMe.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.checkingAuth = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.checkingAuth = false;
      })

      // logout

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
