import { IMenu } from "../types/route.type";

export const MENU = (t: any): Array<IMenu> => [
  {
    name: t("Dashboard"),
    path: "/dashboard",
    icon: "",
  },
  {
    name: t("List product"),
    path: "/product",
    icon: "",
    subs: [
      {
        name: "product all",
        path: "/product/all",
        icon: "",
      },
      {
        name: "category product",
        path: "/product/category",
        icon: "",
      },
      {
        name: "supplier product",
        path: "/product/supplier",
        icon: "",
      },
      {
        name: "bradnd product",
        path: "/product/brand",
        icon: "",
      },
    ],
  },
  {
    name: t("OrderStatus"),
    path: "/order/status",
    icon: "",
  },
  {
    name: t("History"),
    path: "/history",
    icon: "",
  },
];
