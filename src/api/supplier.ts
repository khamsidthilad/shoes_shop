import { api } from "../lib/interceptor";
import { ISupplier } from "../types/admin/supplier";

export default {
  getAllSupplier: () => api.get("/supplier"),
  getSupplierById: (id: string) => api.get(`/supplier/${id}`),
  createSupplier: (payload: ISupplier) => api.post(`/supplier`, payload),
  updateSupplier: (payload: ISupplier, id: string) =>
    api.put(`/supplier/${id}`, payload),
  deleteSupplier: (id: string) => api.delete(`/supplier/${id}`),
};
