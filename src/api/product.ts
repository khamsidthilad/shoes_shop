import { api } from "../lib/interceptor";

export default {
  getProduct: () => api.get("/products"),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  createProduct: (formdata: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    api.post(`/products`, formdata, config);
  },
  updateProduct: (formdata: FormData, id: string) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    api.put(`/products/${id}`, formdata, config);
  },

  getProductByCategory: (id: number) => api.get(`/products/category/${id}`),
  getProductById: (id: string) => api.get(`/products/${id}`),
  getSearch: (id: string) => api.get(`/products/search/${id}`),
};
