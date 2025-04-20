import { Line } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
import dashboard from "../../../api/dashboard";
import { getCategoryHeader, getInventoryHeader } from "./column/column";
import order from "../../../api/order";
import { IDashBoard } from "../../../types/admin/dashboard";

const Dashboard: React.FC = () => {
  const [dashbaordOrder, setDashboardOrder] = useState<IDashBoard[]>([]);
  const [dataChart, setDatachart] = useState<any[]>([]);
  const fetchDashboard = async () => {
    try {
      const response = await dashboard.getDashboard();
      const orders = response.data.orders;
      const inventory = response.data.inventory;

      setDashboardOrder([
        { orders, revenue: response.data.revenue, inventory },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };
  const fetchChart = async () => {
    try {
      const response = await dashboard.getDashboard();
      const orders = response.data.orders;
      const formattedOrders = Object.keys(orders).map((key) => ({
        status: key,
        count: orders[key],
      }));
      setDatachart(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  console.log("###############", dashbaordOrder);

  const fectBestSeller = async () => {
    try {
      const response = await order.bestSeller();
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchDashboard();
    fectBestSeller();
    fetchChart();
  }, []);
  const config = {
    data: dataChart,
    xField: "status",
    yField: "count",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    xAxis: {
      title: {
        text: "Product Name",
      },
    },
    yAxis: {
      title: {
        text: "Total Sold",
      },
    },
  };

  const column = getCategoryHeader();
  const inventory = getInventoryHeader();

  return (
    <div className=" bg-white">
      <div className="py-10">
        <div className="p-4">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Revenue" variant="borderless">
                {dashbaordOrder.map((item) => {
                  return <div>{item.revenue} Kip</div>;
                })}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" variant="borderless">
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" variant="borderless">
                Card content
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Line {...config} />
        </div>
        <div className="flex w-full gap-4">
          <div className="flex  w-[70%]">
            <Table
              className="bg-white rounded-lg"
              title={() => {
                return (
                  <div className="flex justify-between">
                    <div className="font-bold text-xl">Payment</div>
                  </div>
                );
              }}
              columns={column}
              dataSource={dashbaordOrder}
              scroll={{ x: "calc(400px + 50%)", y: 47 * 5 }}
              pagination={false}
            />
          </div>
          <div className="flex w-[30%]">
            <Table
              className="bg-white rounded-lg"
              title={() => {
                return (
                  <div className="flex justify-between">
                    <div className="font-bold text-xl">Stock</div>
                  </div>
                );
              }}
              columns={inventory}
              dataSource={dashbaordOrder}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
