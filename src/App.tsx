import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useTranslation } from "react-i18next";
import { IRoute } from "./types/route.type";
import { AUTH_ROUTES, ROUTES } from "./config/routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { useEffect } from "react";
import { TOKEN_KEY } from "./lib/interceptor";
import { IUser } from "./types/auth";

function App() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const me: IUser = {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, i18n]);
  const user = me as IUser;
  return (
    <div className={`${i18n.language === "la" ? "font-lao" : "font-pop"}`}>
      <Routes>
        <Route>
          {ROUTES.filter(
            (item) => !item.permissions || item.permissions.includes(user.role)
          ).map((item: IRoute, index: number) => (
            <Route
              key={index}
              path={item.path}
              element={<DefaultLayout>{item.component}</DefaultLayout>}
            />
          ))}
        </Route>
        {AUTH_ROUTES.map((item: IRoute, index: number) => (
          <Route
            key={index}
            path={item.path}
            element={<AuthRoute>{item.component}</AuthRoute>}
          />
        ))}
      </Routes>
    </div>
  );
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const { pathname } = useLocation();

  useEffect(() => {
    if (token && pathname.includes("/auth")) navigate("/");
  }, [token, pathname]);

  return children;
}

export default App;
