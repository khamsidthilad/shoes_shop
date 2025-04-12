import { Button, Divider, Modal, Table } from "antd";
import { getCategoryHeader } from "./column/header";
import { ICategory, ICategoryItem } from "../../../types/admin/product/product";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import category from "../../../api/category";

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [getAllCategory, setGetAllCategory] = useState<ICategory[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isOpenModal, setIsSelectModal] = useState(false);

  const fectData = async () => {
    try {
      const res = await category.getCategory();
      setGetAllCategory(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fectData();
  }, []);

  const onDelete = async (id: string) => {
    try {
      const res = await category.deleteCategory(id);
      fectData();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = () => {
    navigate("/product/create/category");
  };

  const handleDelete = (record: ICategory) => {
    setSelectedProductId(record.cate_id.toString());
    setIsSelectModal(true);
  };

  const columns = getCategoryHeader(handleEdit, handleDelete);
  return (
    <div className="">
      <Table
        className="bg-white rounded-lg"
        title={() => {
          return (
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
        dataSource={getAllCategory}
        pagination={{ pageSize: 4 }}
        scroll={{ y: 55 * 5 }}
      />
      <Modal
        title="Do you want to delete Product?"
        centered
        open={isOpenModal}
        onOk={() => {
          if (selectedProductId) {
            onDelete(selectedProductId);
          }
          setIsSelectModal(false);
        }}
        onCancel={() => setIsSelectModal(false)}
      >
        <p>Are you sure to delete?</p>
      </Modal>
    </div>
  );
};

export default CategoryPage;
