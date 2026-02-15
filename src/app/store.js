import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import productReducer from "../modules/products/productSlice";
import dashboardReducer from "../modules/dashboard/dashboardSlice";
import stockReducer from "../modules/stock/stockSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    dashboard: dashboardReducer,
    stock: stockReducer,
  },
});
