import {
  Button,
  Form,
  GetProp,
  Input,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICreateBrand } from "../../../../types/admin/product/product";
import brand from "../../../../api/brand";
import { PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";

const CreateBrand: React.FC = () => {
  const [form] = Form.useForm<ICreateBrand>();
  const param = useParams();
  const id = param.id;
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (file: FileType): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchSupplier = async () => {
        try {
          const res = await brand.getBrandById(id);
          form.setFieldsValue({
            brand_name: res.data.brand_name,
            brand_description: res.data.brand_description,
            logo: res.data.logo,
            brand_website: res.data.brand_website,
            brand_status: res.data.brand_status,
          });
        } catch (error) {
          console.error("Error fetching supplier data", error);
        }
      };
      fetchSupplier();
    }
  }, [id, form]);
  const formFields = [
    { name: "brand_name", label: "Brand Name" },
    { name: "brand_description", label: "Brand Description" },
    { name: "brand_website", label: "Brand Website" },
    { name: "brand_status", label: "Brand Status" },
  ];

  const handleOnCreate = async (data: ICreateBrand) => {
    try {
      console.log("data logo", data.logo);
      const formData = new FormData();
      formData.append("brand_name", data.brand_name);
      formData.append("brand_description", data.brand_description);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("logo", fileList[0].originFileObj);
      }

      formData.append("brand_website", data.brand_website);
      formData.append("brand_status", data.brand_status);
      if (id && isEdit) {
        const res = brand.updateBrand(id, formData);
        message.success("Product created successfully!");
        navigate(-1);
        return res;
      } else {
        const res = brand.createBrand(formData);
        message.success("Product created successfully!");
        navigate(-1);
        return res;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className=" bg-white">
      <div className="p-6">
        {" "}
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Brand" : "Create Brand"}
        </h1>
        <Form
          form={form}
          onFinish={handleOnCreate}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          {formFields.map(({ name, label }) => (
            <div className="py-2" key={name}>
              <Form.Item label={label} name={name}>
                <Input className="w-full" size="large" />
              </Form.Item>
            </div>
          ))}
          <div className="py-4">
            <Upload
              name="logo"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
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

export default CreateBrand;
