import { api } from "../lib/interceptor";
import { IResponseParam } from "../types/params";

export default {
  getAllBrand: () => api.get("/brand"),
  getBrandById: (id: string) => api.get(`/brand/${id}`),
  updateBrand: (id: string, formData: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    api.put(`/brand/${id}`, formData, config);
  },
  createBrand: (formData: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    api.post(`/brand`, formData, config);
  },
  deleteBrand: (id: string) => api.delete(`/brand/${id}`),
  searchBrand: (params: IResponseParam) => api.get("/brand/search", { params }),
};
