import { ReactNode, useEffect, useState } from "react";
import Header from "./Header/Header";
import { AUTH_ROUTES } from "../config/routes";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../lib/interceptor";
import { IUser } from "../types/admin/auth";
import auth from "../api/auth";

const ClientLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const token = localStorage.getItem(TOKEN_KEY);
  const initial = async () => {
    try {
      const response = await auth.getMe();

      if (response?.data) {
        setUser(response.data);

      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };
  const destroy = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    return null;
  };

  useEffect(() => {
    if (token) initial();
    else destroy();
  }, [token]);
  return (
    <div>
      <div className=" bg-white">
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isClient
              menuBarClient={AUTH_ROUTES.filter((item) => item.showInMenu).map(
                (item) => ({
                  key: item.path,
                  label: item.title,
                  onClick: () => navigate(item.path),
                })
              )}
            />
            <main>
              <div className="relative mx-auto max-w-screen-3xl ">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
