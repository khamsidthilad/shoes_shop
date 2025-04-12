import { api } from "../lib/interceptor";

export default {
  getCategory: () => api.get(`/categories`),
  getCategoryById: () => api.get(`/categories`),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
  createCategory: () => api.post(`/categories`),
  updateCategory: () => api.post(`/categories`),
};
