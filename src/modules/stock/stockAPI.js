// API calls related to stock movements and history
import api from "../../api/axios";

export const moveStockAPI = (data) =>
  api.post("/stocks/movement", data);

export const getMovementsAPI = (params) =>
  api.get("/stocks/history", { params });

export const deleteMovementAPI = (id) =>
  api.delete(`/stocks/movement/${id}`);