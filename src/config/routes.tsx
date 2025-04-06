import LoginPage from "../page/auth/Login";
import RegisterPage from "../page/auth/register";
import HomePage from "../page/admin/home/Home";
import ProductPage from "../page/admin/proudct";
import SupplierPage from "../page/admin/proudct/Subplier";
import { IRoute } from "../types/route.type";
import ProductClientPage from "../page/client/product/ProductList";
export const ROUTES: IRoute[] = [
  {
    path: "/Dashboard",
    title: "Dashboard",
    component: <HomePage />,
  },
  {
    path: "/product/all",
    title: "Shop product ",
    component: <ProductPage />,
  },
  {
    path: "/product/supplier",
    title: "Shop supplier",
    component: <SupplierPage />,
  },
];

export const AUTH_ROUTES: IRoute[] = [
  {
    path: "/",
    title: "Shop",
    component: <ProductClientPage />,
  },
  {
    path: "/login",
    title: "Login",
    component: <LoginPage />,
  },
  {
    path: "/register",
    title: "Register",
    component: <RegisterPage />,
  },
];
