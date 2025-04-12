import type { ColumnsType } from "antd/es/table";
import {
  ICategory,
  ICategoryItem,
  IProductItem,
} from "../../../../types/admin/product/product";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const getCategoryHeader = (
  onEdit: (record: ICategory) => void,
  onDelete: (record: ICategory) => void
): ColumnsType<ICategory> => [
  {
    title: "ID",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "cate_name",
    key: "cate_name",
  },
  {
    title: "Remark",
    dataIndex: "cate_remark",
    key: "cate_remark",
  },

  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: ICategory) => (
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

export const getAllProductHeader = (
  onEdit: (record: IProductItem) => void,
  onDelete: (record: IProductItem) => void
): ColumnsType<IProductItem> => [
  {
    title: "ID",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },

  {
    title: "Image",
    dataIndex: "pro_image",
    key: "pro_image",
    render: (url: string | null) => {
      console.log("Image URL:", url);
      return (
        <Image
          src={url ? url : "/src/assets/country/english.jpg"}
          alt="product"
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
          preview={false}
        />
      );
    },
  },

  {
    title: "Name",
    dataIndex: "pro_name",
    key: "pro_name",
  },
  {
    title: "Detail",
    dataIndex: "pro_detail",
    key: "pro_detail",
  },
  {
    title: "Quantity",
    dataIndex: "pro_qty",
    key: "pro_qty",
  },
  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: IProductItem) => (
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
