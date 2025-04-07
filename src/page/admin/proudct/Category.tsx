import { Button, Divider, Table } from "antd";
import { getCategoryHeader } from "./column/header";
import { CategoryItem } from "../../../types/admin/product/product";
import { useNavigate } from "react-router-dom";

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const mockData = [
    {
      id: 1,
      product_id: "SHOE-001",
      name: "Nike Air Max",
      price: 120.0,
      quantity: 25,
    },
    {
      id: 2,
      product_id: "SHOE-002",
      name: "Adidas Ultraboost",
      price: 140.0,
      quantity: 30,
    },
    {
      id: 3,
      product_id: "SHOE-003",
      name: "Puma RS-X",
      price: 110.0,
      quantity: 15,
    },
    {
      id: 4,
      product_id: "SHOE-004",
      name: "New Balance 574",
      price: 90.0,
      quantity: 20,
    },
    {
      id: 5,
      product_id: "SHOE-005",
      name: "Converse Chuck Taylor",
      price: 65.0,
      quantity: 50,
    },
  ];

  const handleEdit = () => {
    navigate("/product/create/category");
  };

  const handleDelete = () => {};
  const columns = getCategoryHeader(handleEdit, handleDelete);
  return (
    <div className="">
      <Table
        className="bg-white rounded-lg"
        title={() => {
          return (console.log("CategoryPage component rendered");
console.log("Mock data:", mockData);
console.log("Columns:", columns);
            <div className="flex justify-between">
              <div> Creategory</div>
              <Button
                onClick={() => {
                  navigate("/product/create/category");
                }}
                type="primary"
              >
                Create category
              </Button>
            </div>
          );
        }}
        columns={columns}
        dataSource={mockData}
        pagination={{ pageSize: 4 }}
        scroll={{ y: 55 * 5 }}
      />
    </div>
  );
};

export default CategoryPage;
