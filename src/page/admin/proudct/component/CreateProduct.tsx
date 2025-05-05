import { Button, Form, Input, message, Select } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import product from "../../../../api/product";
import {
  ICategory,
  ICreateProduct,
  IGetListBrand,
} from "../../../../types/admin/product/product";
import category from "../../../../api/category";
import { useNavigate, useParams } from "react-router-dom";
import brand from "../../../../api/brand";

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const navigate = useNavigate();
  const [categoryProduct, setCategoryProduct] = useState<ICategory[]>([]);
  const [brandProduct, setBrandProduct] = useState<IGetListBrand[]>([]);
  const param = useParams();
  const id = param.id;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchProduct = async () => {
        try {
          const res = await product.getProductById(id);
          form.setFieldsValue({
            pro_name: res.data.pro_name,
            pro_detail: res.data.pro_detail,
            pro_qty: res.data.pro_qty,
            pro_price: res.data.pro_price,
            cate_id: res.data.cate_id,
            brand_id: res.data.brand_id,
          });
        } catch (error) {
          console.error("Error fetching supplier data", error);
        }
      };
      fetchProduct();
    }
  }, [id, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await category.getCategory();
      setCategoryProduct(res.data);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBrand = async () => {
      const res = await brand.getAllBrand();
      setBrandProduct(res.data);
    };
    fetchBrand();
  }, []);

  const handleOnCreate = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("pro_name", data.pro_name);
      formData.append("pro_detail", data.pro_detail);
      formData.append("pro_qty", data.pro_qty);
      formData.append("pro_price", data.pro_price);
      formData.append("cate_id", data.cate_id);
      formData.append("brand_id", data.brand_id);
      formData.append("image", data.image);

      if (isEdit && id) {
        const response = product.updateProduct(formData, id);
        message.success("Product created successfully!");
        navigate(-1);
        return response;
      } else {
        const response = product.createProduct(formData);
        message.success("Product created successfully!");
        navigate(-1);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    beforeUpload: (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
      }

      setFileList([file]);

      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  return (
    <div className=" bg-white">
      <div className="p-6">
        <h1>{isEdit ? "Edit Product" : "Product"}</h1>
        <Form
          form={form}
          onFinish={handleOnCreate}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <div className="py-2">
            <Form.Item label="Name" name="pro_name">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Detail" name="pro_detail">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Quantity" name="pro_qty">
              <Input className="w-full" type="number" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Price" name="pro_price">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Category" name="cate_id">
              <Select
                defaultValue="select"
                style={{ width: 120 }}
                onChange={() => {}}
                options={categoryProduct.map((item) => ({
                  value: item.cate_id,
                  label: item.cate_name,
                }))}
              />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Brand" name="brand_id">
              <Select
                defaultValue="select"
                style={{ width: 120 }}
                onChange={() => {}}
                options={brandProduct.map((item) => ({
                  value: item.brand_id,
                  label: item.brand_name,
                }))}
              />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (e.target && e.target.files) {
                  return e.target.files[0];
                }
              }}
            >
              <Input type="file" />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
