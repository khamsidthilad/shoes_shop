import { Form, Input, message } from "antd";
import { IChangePassword } from "../../types/admin/auth";
import auth from "../../api/auth";

const ChangePassword = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [form] = Form.useForm();
  
    const onSubmit = async (data: IChangePassword) => {
      try {
        const response: any = await auth.changePassword(data);
        console.log("Log data" , response)
  
        if (response?.status === 200) {
          message.success("Password changed successfully!");
          form.resetFields();
          onSuccess?.(); 
        } else {
          message.error(response?.message || "Something went wrong!");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Current password is incorrect!";
        message.error(errorMessage);
      }
    };
  
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: "Please input your current password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
  
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please input your new password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>
  
        <Form.Item>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Change Password
          </button>
        </Form.Item>
      </Form>
    );
  };
  

export default ChangePassword;
