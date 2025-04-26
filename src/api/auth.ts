import { api } from "../lib/interceptor";
import { ILogin, IRegister } from "../types/admin/auth";

export default {
  login: (payload: ILogin) => api.post("/auth/login", payload),
  register: (payload: IRegister) => api.post("/auth/register", payload),
  getMe: () => api.get("/auth/me"),
  createAdmin: (payload: string) => api.post("/admin/register"),
};
