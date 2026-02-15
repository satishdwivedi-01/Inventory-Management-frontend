import api from "../../api/axios";

export const getDashboardAPI = () => api.get("/dashboard");
