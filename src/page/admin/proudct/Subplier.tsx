import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getSupplierHeader } from "./column/header";
import { ISupplier } from "../../../types/admin/supplier";
import supplier from "../../../api/supplier";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SupplierPage: React.FC = () => {
  const navigate = useNavigate();
  const [getAllProduct, setGetAllProduct] = useState<ISupplier[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isOpenModal, setIsSelectModal] = useState(false);
  const { t } = useTranslation();
  const handleEdit = (id: string) => {
    navigate(`/product/edit/supplier/${id}`);
  };

  const fectData = async () => {
    const res = await supplier.getAllSupplier();
    setGetAllProduct(res.data);
    setSelectedProductId(res.data.id);
    return res;
  };
  useEffect(() => {
    fectData();
  }, []);

  const onDelete = async (id: string) => {
    try {
      const res = await supplier.deleteSupplier(id);
      fectData();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = (record: ISupplier) => {
    setSelectedProductId(record.supplier_id.toString());
    setIsSelectModal(true);
  };
  const columns = getSupplierHeader(handleEdit, handleDelete);
  return (
    <div className="">
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
                  navigate("/product/create/supplier");
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

export default SupplierPage;
