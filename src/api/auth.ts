import { api } from "../lib/interceptor";
import { ILogin } from "../types/admin/auth";

export default {
  login: (payload: ILogin) => api.post("/auth/login", payload),
  register: (payload: string) => api.post("/auth/register"),
  getMe: () => api.get("/auth/me"),
  createAdmin: (payload: string) => api.post("/admin/register"),
};
