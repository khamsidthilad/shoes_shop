import { Tabs, TabsProps } from "antd";
import OrderPage from "./OrderPage";
import Shipping from "./Shipping";
import {
  CaretRightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons/lib/icons";

const Status: React.FC = () => {
  const item: TabsProps["items"] = [
    {
      key: "1",
      label: "Verify",
      icon: <CaretRightOutlined />,
      children: <OrderPage />,
    },
    {
      key: "2",
      label: "Shipping",
      icon: <DoubleRightOutlined />,
      children: <Shipping />,
    },
  ];
  return (
    <div>
      <Tabs items={item}></Tabs>
    </div>
  );
};
export default Status;
