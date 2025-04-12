import { TOKEN_KEY } from "../lib/interceptor";

export function isAdminAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  const role = localStorage.getItem("USER_ROLE");

  return !!token && role === "admin";
}
