import { ReactNode, useState } from "react";
import Header from "./Header/Header";
import { AUTH_ROUTES } from "../config/routes";
import { useNavigate } from "react-router-dom";

const ClientLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className=" bg-white">
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isClient
              menuBarClient={AUTH_ROUTES.filter(
                (item) => item.path !== "/login" && item.path !== "/register"
              ).map((item) => ({
                key: item.path,
                label: item.title,
                onClick: () => navigate(item.path),
              }))}
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
