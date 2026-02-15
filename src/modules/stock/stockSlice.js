// stockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { moveStockAPI, getMovementsAPI, deleteMovementAPI } from "./stockAPI";
import { fetchProducts } from "../products/productSlice";
import { fetchDashboard } from "../dashboard/dashboardSlice";

// Move Stock (IN/OUT)
export const moveStock = createAsyncThunk(
  "stock/move",
  async (data, { dispatch }) => {
    await moveStockAPI(data);
    dispatch(fetchProducts());
    dispatch(fetchDashboard());
  }
);

// Fetch movement history with search, pagination
export const fetchMovements = createAsyncThunk(
  "stock/history",
  async ({ page = 1, limit = 10, search = "" } = {}) => {
    const res = await getMovementsAPI({ page, limit, search });
    return res.data;
  }
);

// Delete a movement
export const deleteMovement = createAsyncThunk(
  "stock/delete",
  async (id, { dispatch }) => {
    await deleteMovementAPI(id);
    dispatch(fetchMovements()); // refresh list
  }
);

const slice = createSlice({
  name: "stock",
  initialState: {
    movements: [],
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => { state.loading = true; })
      .addCase(fetchMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      });
  },
});

export default slice.reducer;
