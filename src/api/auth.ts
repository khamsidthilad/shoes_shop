import { api } from "../lib/interceptor";
<<<<<<< Updated upstream
import { IChangePassword, ILogin } from "../types/admin/auth";
=======
import { ILogin, IRegister } from "../types/admin/auth";
>>>>>>> Stashed changes

export default {
  login: (payload: ILogin) => api.post("/auth/login", payload),
  register: (payload: IRegister) => api.post("/auth/register",payload),
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
