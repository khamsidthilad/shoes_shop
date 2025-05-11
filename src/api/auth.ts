import { api } from "../lib/interceptor";
import { IChangePassword, ILogin } from "../types/admin/auth";

export default {
  login: (payload: ILogin) => api.post("/auth/login", payload),
  register: (payload: string) => api.post("/auth/register"),
  getMe: () => api.get("/auth/me"),
  createAdmin: (payload: string) => api.post("/admin/register"),
  changePassword: (payload: IChangePassword) => {
    const token = localStorage.getItem("token");
    return api.put("/auth/change-password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
