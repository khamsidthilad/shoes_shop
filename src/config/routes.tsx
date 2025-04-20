import LoginPage from "../page/auth/Login";
import RegisterPage from "../page/auth/register";
import Dashboard from "../page/admin/home/Home";
import SupplierPage from "../page/admin/proudct/Subplier";
import { IRoute } from "../types/route.type";
import ProductClientPage from "../page/client/product/ProductList";
import CategoryPage from "../page/admin/proudct/Category";
import CreateCategory from "../page/admin/proudct/component/CreateCategory";
import CreateProduct from "../page/admin/proudct/component/CreateProduct";
import HistoryPage from "../page/admin/history/HistoryPage";
import Status from "../page/admin/order";
import CreateSupplier from "../page/admin/proudct/component/CreateSupplier";
import ProductPage from "../page/admin/proudct/product";
export const ROUTES: IRoute[] = [
  {
    path: "/Dashboard",
    title: "Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/product/all",
    title: "Admin product ",
    component: <ProductPage />,
  },
  {
    path: "/product/create",
    title: "Admin create product ",
    component: <CreateProduct />,
  },
  {
    path: "/product/edit/:id",
    title: "Admin edit product ",
    component: <CreateProduct />,
  },
  {
    path: "/product/category",
    title: "Admin category",
    component: <CategoryPage />,
  },
  {
    path: "/product/create/category",
    title: "Admin create category",
    component: <CreateCategory />,
  },
  {
    path: "/product/edit/category/:id",
    title: "Admin update category",
    component: <CreateCategory />,
  },
  {
    path: "/product/supplier",
    title: "Admin supplier",
    component: <SupplierPage />,
  },
  {
    path: "/product/create/supplier",
    title: "Admin supplier",
    component: <CreateSupplier />,
  },
  {
    path: "/product/edit/supplier/:id",
    title: "Admin supplier",
    component: <CreateSupplier />,
  },
  {
    path: "/history",
    title: "Admin supplier",
    component: <HistoryPage />,
  },
  {
    path: "/order/status",
    title: "Admin supplier",
    component: <Status />,
  },
];

export const AUTH_ROUTES: IRoute[] = [
  {
    path: "/",
    title: "Shop",
    component: <ProductClientPage />,
  },
  {
    path: "/product",
    title: "product",
    component: <ProductClientPage />,
  },
  {
    path: "/cart",
    title: "cart",
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
