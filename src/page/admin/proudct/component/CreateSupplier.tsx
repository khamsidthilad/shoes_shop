import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ISupplier } from "../../../../types/admin/supplier";
import supplier from "../../../../api/supplier";
import { useEffect, useState } from "react";

const CreateSupplier: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [isEdit, setIsEdit] = useState(false);

  const handleOnCreate = async (data: ISupplier) => {
    try {
      if (isEdit && id) {
        await supplier.updateSupplier(data, id);
        navigate(-1);
      } else {
        await supplier.createSupplier(data);
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchSupplier = async () => {
        try {
          const res = await supplier.getSupplierById(id);
          form.setFieldsValue({
            name: res.data.name,
            adresses: res.data.adresses,
            contact_info: res.data.contact_info,
          });
        } catch (error) {
          console.error("Error fetching supplier data", error);
        }
      };
      fetchSupplier();
    }
  }, [id, form]);

  return (
    <div className="bg-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Supplier" : "Create Supplier"}
        </h1>
        <Form
          form={form}
          onFinish={handleOnCreate}
          autoComplete="off"
          layout="vertical"
        >
          <div className="py-2">
            <Form.Item label="Name" name="name">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Address" name="adresses">
              <Input className="w-full" size="large" />
            </Form.Item>
          </div>
          <div className="py-2">
            <Form.Item label="Contact" name="contact_info">
              <Input className="w-full" size="large" />
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

export default CreateSupplier;
