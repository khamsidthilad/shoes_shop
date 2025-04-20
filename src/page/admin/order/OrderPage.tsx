import { Button, Modal, Select, Table, Form } from "antd";
import React, { useEffect, useState } from "react";
import { IGetAllOrder } from "../../../types/admin/history/history";
import { getOrderHeader } from "./header/headder";
import { useNavigate } from "react-router-dom";
import order from "../../../api/order";
import { IStatusOrder } from "../../../types/admin/order/order";
import FormItem from "antd/es/form/FormItem";
import { PaymentStatus } from "../../../constant/status";

const OrderPage: React.FC = () => {
  const [form] = Form.useForm();
  const [getAllProduct, setGetAllProduct] = useState<IGetAllOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean);
  const [selectId, setSelectId] = useState<string>("");
  const navigate = useNavigate();

  const fectData = async () => {
    try {
      const response = await order.getPaymentStatus();
      setGetAllProduct(response.data);
      if (response.data) {
        console.log("***********************", response.data.sell_id);
        setSelectId(response.data[0].sell_id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const onVerify = async (data: IStatusOrder, id: string) => {
    try {
      setIsLoading(true);
      console.log("ID : ", selectId);
      const response = await order.updateVerifyOrder(data, id);
      setSelectId(response.data);
      fectData();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fectData();
  }, []);

  const columns = getOrderHeader((record: IGetAllOrder) => {
    setSelectId(record.sell_id);
    setIsModalOpen(true);
  });

  return (
    <div>
      <Table
        className="bg-white rounded-lg"
        title={() => {
          return (
            <div className="flex justify-between">
              <div className="font-bold text-xl">Order Status</div>
            </div>
          );
        }}
        columns={columns}
        dataSource={getAllProduct}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Verify Payment"
        open={isModalOpen}
        onClose={handleCancel}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          onFinish={(values) => onVerify(values, selectId)}
          initialValues={{ status: "select" }}
        >
          <FormItem
            initialValue={{ status: "select" }}
            label="Status"
            name="status"
          >
            <Select
              defaultValue="select"
              style={{ width: 120 }}
              onChange={() => {}}
              options={[{ value: PaymentStatus.VERIFIED, label: "verified" }]}
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderPage;
