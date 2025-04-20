import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IGetAllOrder } from "../../../../types/admin/history/history";
import { ColumnsType } from "antd/es/table";

export const getHistoryHeader = (
  onEdit: (record: IGetAllOrder) => void,
  onDelete: (record: IGetAllOrder) => void
): ColumnsType<IGetAllOrder> => [
  {
    title: "ID",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Image",
    dataIndex: "payment_image",
    key: "payment_image",
    render: (url: string) => {
      if (!url) return null;
      return (
        <img
          src={`${url}`}
          alt="payment"
          width={40}
          height={40}
          style={{ objectFit: "cover" }}
        />
      );
    },
  },
  {
    title: "Customer name",
    dataIndex: "customer",
    key: "customer",
    render: (customer: { cus_name: string }) => customer?.cus_name,
  },
  {
    title: "phone number",
    dataIndex: "customer",
    key: "customer",
    render: (customer: { tel: string }) => customer?.tel,
  },
  {
    title: "Address",
    dataIndex: "customer",
    key: "customer",
    render: (customer: { address: string }) => customer?.address,
  },
];
