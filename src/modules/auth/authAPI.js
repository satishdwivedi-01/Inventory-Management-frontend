// API functions for authentication-related operations
import api from "../../api/axios";

export const loginAPI = (data) => api.post("/auth/login", data);
export const meAPI = () => api.get("/auth/me");
export const logoutAPI = () => api.post("/auth/logout");
