import { ColumnsType } from "antd/es/table";
import { IGetListBrand } from "../../../../types/admin/product/product";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const getAllBrandHeader = (
  onEdit: (id: number) => void,
  onDelete: (record: IGetListBrand) => void
): ColumnsType<IGetListBrand> => [
  {
    title: "ID",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Image",
    key: "brand_logo",
    render: (_: any, record: IGetListBrand) => {
      const BASE_URL = "http://localhost:3003";
      return (
        <Image
          className="z-99999"
          crossOrigin="anonymous"
          src={
            record.brand_logo
              ? `${BASE_URL}${record.brand_logo}`
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
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "Description",
    dataIndex: "brand_description",
    key: "brand_description",
    ellipsis: true,
  },
  {
    title: "Brand Website",
    dataIndex: "brand_website",
    key: "brand_website",
  },
  {
    title: "Status",
    dataIndex: "brand_status",
    key: "brand_status",
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: IGetListBrand) => (
      <div style={{ display: "flex", gap: 8 }}>
        <EditOutlined
          style={{ color: "blue" }}
          onClick={() => onEdit(record.brand_id)}
        />
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => onDelete(record)}
        />
      </div>
    ),
  },
];
