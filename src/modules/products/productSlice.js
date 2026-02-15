import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params) => {
    const res = await getProductsAPI(params);
    return res.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { dispatch }) => {
    await createProductAPI(data);
    dispatch(fetchProducts());
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { dispatch }) => {
    await updateProductAPI(id, data);
    dispatch(fetchProducts());
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { dispatch }) => {
    await deleteProductAPI(id);
    dispatch(fetchProducts());
  }
);

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
      });
  },
});

export const { setPage, setLimit } = slice.actions;
export default slice.reducer;
