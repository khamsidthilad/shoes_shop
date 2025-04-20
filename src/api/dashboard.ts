import { api } from "../lib/interceptor";

export default {
  getDashboard: () => api.get(`/admin/dashboard`),
};
