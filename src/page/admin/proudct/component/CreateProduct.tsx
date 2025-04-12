import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import product from "../../../../api/product";
import {
  ICategory,
  ICreateProduct,
} from "../../../../types/admin/product/product";
import category from "../../../../api/category";

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [categoryProduct, setCategoryProduct] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await category.getCategory();
      setCategoryProduct(res.data);
    };
    fetchCategories();
  }, []);

  const handleOnCreate = async (data: ICreateProduct) => {
    try {
      const formData = new FormData();
      formData.append("pro_name", data.pro_name);
      formData.append("pro_detail", data.pro_detail);
      formData.append("pro_qty", data.pro_qty);
      formData.append("cate_id", data.cate_id);
      formData.append("image", data.image);

      const response = product.createProduct(formData);
      message.success("Product created successfully!");
      form.resetFields();
      return response;
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
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={() => fileList}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Please upload an image file.
                </p>
              </Dragger>
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
