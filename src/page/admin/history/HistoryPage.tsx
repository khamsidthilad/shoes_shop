import { Button, Image, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getHistoryHeader } from "./column/column";
import { useEffect, useState } from "react";
import order from "../../../api/order";
import { IGetAllOrder } from "../../../types/admin/history/history";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [getAllOrder, setGetAllOrder] = useState<IGetAllOrder[]>([]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  const fectData = async () => {
    try {
      const res = await order.getAllOrder();
      setGetAllOrder(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fectData();
  }, []);

  const columns = getHistoryHeader(handleEdit, handleDelete);
  return (
    <div>
      <Table
        className="bg-white rounded-lg"
        title={() => {
          return (
            <div className="flex justify-between">
              <div className="font-bold text-xl">Report order</div>
            </div>
          );
        }}
        columns={columns}
        dataSource={getAllOrder}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 55 * 5 }}
      />
    </div>
  );
};

export default HistoryPage;
