import type { ColumnsType } from "antd/es/table";
import {
  ICategory,
  ICategoryItem,
  IProductItem,
} from "../../../../types/admin/product/product";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { ISupplier } from "../../../../types/admin/supplier";

export const getCategoryHeader = (
  onEdit: (id: number) => void,
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
          onClick={() => onEdit(record.cate_id)}
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
  onEdit: (id: number) => void,
  onDelete: (record: IProductItem) => void
): ColumnsType<IProductItem> => [
  {
    title: "ID",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Image",
    key: "pro_image",
    render: (_: any, record: any) => {
      const BASE_URL = "http://localhost:3003";
      return (
        <Image
          className="z-99999"
          crossOrigin="anonymous"
          src={
            record.pro_image
              ? `${BASE_URL}${record.pro_image}`
              : "/src/assets/country/english.jpg"
          }
          alt="product"
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
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
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "pro_price",
    key: "pro_price",
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
          onClick={() => onEdit(record.pro_id)}
        />
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => onDelete(record)}
        />
      </div>
    ),
  },
];

export const getSupplierHeader = (
  onEdit: (id: string) => void,
  onDelete: (record: ISupplier) => void
): ColumnsType<ISupplier> => [
  {
    title: "ID",
    dataIndex: "supplier_id",
    key: "supplier_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Contract",
    dataIndex: "contact_info",
    key: "contact_info",
  },
  {
    title: "Address",
    dataIndex: "adresses",
    key: "adresses",
  },

  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: ISupplier) => (
      <div style={{ display: "flex", gap: 8 }}>
        <EditOutlined
          style={{ color: "blue" }}
          onClick={() => onEdit(record.supplier_id.toString())}
        />
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => onDelete(record)}
        />
      </div>
    ),
  },
];
