import { api } from "../lib/interceptor";
import { ICategory } from "../types/admin/product/product";

export default {
  getCategory: () => api.get(`/categories`),
  getCategoryById: (id:string) => api.get(`/categories/${id}`),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
  createCategory: (payload: ICategory) => api.post(`/categories`, payload),
  updateCategory: (id: string, payload: ICategory) =>
    api.put(`/categories/${id}`, payload),
};
