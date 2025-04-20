import { Table, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllProductHeader } from "./column/header";
import { useEffect, useState } from "react";
import product from "../../../api/product";
import { IProductItem } from "../../../types/admin/product/product";
import { useTranslation } from "react-i18next";

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [getAllProduct, setGetAllProduct] = useState<IProductItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isOpenModal, setIsSelectModal] = useState(false);
  const { t } = useTranslation();
  const handleEdit = (id: number) => {
    navigate(`/product/edit/${id}`);
  };

  const fectData = async () => {
    const res = await product.getProduct();
    setGetAllProduct(res.data);
    setSelectedProductId(res.data.id);
    return res;
  };
  useEffect(() => {
    fectData();
  }, []);

  const onDelete = async (id: string) => {
    try {
      const res = await product.deleteProduct(id);
      fectData();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = (record: IProductItem) => {
    setSelectedProductId(record.pro_id.toString());
    setIsSelectModal(true);
  };
  const columns = getAllProductHeader(handleEdit, handleDelete);
  return (
    <div>
      <Table
        className="bg-white rounded-lg"
        title={() => {
          return (
            <div className="flex justify-between">
              <div className="font-bold text-xl">
                {t("product.title_product")}
              </div>
              <Button
                onClick={() => {
                  navigate("/product/create");
                }}
                type="primary"
              >
                Create product
              </Button>
            </div>
          );
        }}
        columns={columns}
        dataSource={getAllProduct}
        pagination={{ pageSize: 10 }}
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

export default ProductPage;
