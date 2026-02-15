import { Routes, Route } from "react-router-dom";
import Login from "../modules/auth/pages/Login";

import ProtectedRoute from "../components/layout/ProtectedRoute";


import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductList from "../modules/products/pages/ProductList";
import StockPage from "../modules/stock/pages/StockPage";



import Layout from "../components/layout/mainLayout";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute roles={["ADMIN", "VIEWER"]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />


      <Route
        path="/products"
        element={
          <ProtectedRoute roles={["ADMIN", "VIEWER"]}>
            <Layout>
              <ProductList />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/stock"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <Layout>
              <StockPage />
            </Layout>
          </ProtectedRoute>
        }
      />


    </Routes>
  );
};

export default AppRoutes;
