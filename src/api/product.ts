import { api } from "../lib/interceptor";

export default {
  getProduct: () => api.get("/products"),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  createProduct: (formdata: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    api.post(`/products`, formdata, config);
  },
  updateProduct: (payload: string, id: string) =>
    api.put(`/products/${id}`, payload),
  getProductByCategory: (id: string) => api.get(`/products/category/${id}`),
  getProductById: (id: string) => api.get(`/products/${id}`),
  getSearch: (id: string) => api.get(`/products/search/${id}`),
};
