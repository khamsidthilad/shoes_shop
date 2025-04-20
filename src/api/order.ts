import { api } from "../lib/interceptor";
import { IShippingOrder, IStatusOrder } from "../types/admin/order/order";

export default {
  getAllOrder: () => api.get("/orders"),
  getPaymentStatus: () => api.get("/admin/pending-payments"),
  updateVerifyOrder: (payload: IStatusOrder, id: string) =>
    api.put(`/admin/orders/${id}/verify-payment`, payload),
  updateShippingOrder: (payload: IShippingOrder, id: string) =>
    api.put(`/admin/orders/${id}/shipping`, payload),
  bestSeller: () => api.get(`/payments/top-products`),
};
