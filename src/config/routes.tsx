import LoginPage from "../page/auth/Login";
import HomePage from "../page/home/Home";
import ProductPage from "../page/proudct";
import SupplierPage from "../page/proudct/Subplier";
import { IRoute } from "../types/route.type";
export const ROUTES: IRoute[] = [
  {
    path: "/",
    title: "Shop",
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
    path: "/login",
    title: "Login",
    component: <LoginPage />,
  },
];
