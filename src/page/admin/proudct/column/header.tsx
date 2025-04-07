import type { ColumnsType } from "antd/es/table";
import { CategoryItem } from "../../../../types/admin/product/product";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const getCategoryHeader = (
  onEdit: (record: CategoryItem) => void,
  onDelete: (record: CategoryItem) => void
): ColumnsType<CategoryItem> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Product ID",
    dataIndex: "product_id",
    key: "product_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: CategoryItem) => (
      <div style={{ display: "flex", gap: 8 }}>
        <EditOutlined
          style={{ color: "blue" }}
          onClick={() => onEdit(record)}
        />
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => onDelete(record)}
        />
      </div>
    ),
  },
];
