import api from "../../api/axios";

export const getProductsAPI = (params) =>
  api.get("/products", { params });

export const createProductAPI = (data) =>
  api.post("/products", data);

export const updateProductAPI = (id, data) =>
  api.put(`/products/${id}`, data);

export const deleteProductAPI = (id) =>
  api.delete(`/products/${id}`);
