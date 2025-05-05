import React, { useEffect, useState } from "react";
import { IGetListBrand } from "../../../types/admin/product/product";
import brand from "../../../api/brand";
import { Button, Input, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllBrandHeader } from "./column/Column";
import { SearchOutlined } from "@ant-design/icons";

const BrandPage: React.FC = () => {
  const [getBrand, setGetBrand] = useState<IGetListBrand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isOpenModal, setIsSelectModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<IGetListBrand[]>([]);

  const fetchBrandData = async () => {
    setIsLoading(true);
    try {
      const res = await brand.getAllBrand();
      setGetBrand(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value.trim()) {
      setFilteredData(getBrand);
      return;
    }
    const filtered = getBrand.filter(
      (item) =>
        item.brand_name.toLowerCase().includes(value.toLowerCase()) ||
        (item.brand_description?.toLowerCase().includes(value.toLowerCase()) || false) ||
        (item.brand_website?.toLowerCase().includes(value.toLowerCase()) || false)
    );

    setFilteredData(filtered);
  };

  const onDelete = async (id: string) => {
    try {
      await brand.deleteBrand(id);
      fetchBrandData(); 
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/product/update/brand/${id}`);
  };

  const handleDelete = (record: IGetListBrand) => {
    setSelectedProductId(record.brand_id.toString());
    setIsSelectModal(true);
  };

  const columns = getAllBrandHeader(handleEdit, handleDelete);

  return (
    <div className="bg-white">
      <Table
        title={() => {
          return (
            <div>
              <div className="w-[40%] py-4">
                <Input
                  placeholder="Search brands"
                  value={searchText}
                  onChange={handleSearch}
                  prefix={<SearchOutlined />}
                  className="w-64"
                />
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-xl">Brand</div>
                <Button
                  onClick={() => {
                    navigate("/product/create/brand");
                  }}
                  type="primary"
                >
                  Create brand
                </Button>
              </div>
            </div>
          );
        }}
        loading={isLoading}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        rowKey="brand_id" 
      />
      
      <Modal
        title="Do you want to delete Brand?"
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

export default BrandPage;