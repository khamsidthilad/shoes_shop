import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { IUser } from "../types/admin/auth";
import { TOKEN_KEY } from "../lib/interceptor";

const DefaultLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const token = localStorage.getItem(TOKEN_KEY);
  const navigate = useNavigate();
  const initial = async () => {
    try {
      const response = await auth.getMe();

      if (response?.data) {
        setUser(response.data);
        if (response.data.role === "admin") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      navigate("/");
    }
  };
  const destroy = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    return navigate("/");
  };

  useEffect(() => {
    if (token) initial();
    else destroy();
  }, [token]);

  return (
    <div>
      <div className=" bg-gray-200">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="relative mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
