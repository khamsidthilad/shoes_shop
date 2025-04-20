import { ColumnsType } from "antd/es/table";
import { IDashBoard } from "../../../../types/admin/dashboard";

export const getCategoryHeader = (): ColumnsType<IDashBoard> => [
  {
    title: "Pending ",
    dataIndex: "orders",
    key: "orders",
    render: (orders: { pendingPayment: number }) => orders?.pendingPayment,
  },
  {
    title: "Verify ",
    dataIndex: "orders",
    key: "orders",
    render: (orders: { verifiedPayment: number }) => orders?.verifiedPayment,
  },
  {
    title: "Process ",
    dataIndex: "orders",
    key: "orders",
    render: (orders: { processing: number }) => orders?.processing,
  },
  {
    title: "Shipped ",
    dataIndex: "orders",
    key: "orders",
    render: (orders: { shipped: number }) => orders?.shipped,
  },
  {
    title: "Delivery ",
    dataIndex: "orders",
    key: "orders",
    render: (orders: { delivered: number }) => orders?.delivered,
  },
];

export const getInventoryHeader = (): ColumnsType<IDashBoard> => [
  {
    title: "Low Stock",
    dataIndex: "inventory",
    key: "inventory",
    render: (inventory: { lowStock: number }) => inventory?.lowStock,
  },
  {
    title: "Out of Stock",
    dataIndex: "inventory",
    key: "inventory",
    render: (inventory: { outOfStock: number }) => inventory?.outOfStock,
  },
];
