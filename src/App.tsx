import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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


// function AuthRoute({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem(TOKEN_KEY);
//   const { pathname } = useLocation();
//   const isAuthPage = pathname === "/login" || pathname === "/register";

//   useEffect(() => {
//     If trying to access login/register while logged in, redirect to appropriate page
//     if (token && isAuthPage) {
//       You would need a function to decode the token or get user data
//       const userData = getUserDataFromToken(token);
//       navigate(userData.role === 'admin' ? "/Dashboard" : "/");
//     }
//   }, [token, pathname, navigate]);

//   return children;
// }

// Helper function to get user data from token (implement this)
// function getUserDataFromToken(token) {
//   This is pseudocode - implement your actual token decoding
//   You might use JWT decode or similar
//   return { role: 'admin' }; // Replace with actual implementation
// }