import { Button, Form, Input } from "antd";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 px-4">
      <div className="bg-white px-6  py-10 w-full max-w-md rounded shadow-md">
        <div className="pb-10 text-center">
          <h1 className="font-bold text-2xl">Register</h1>
        </div>

        <Form
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="User name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>
          <Form.Item
            label="Sur name"
            name="sname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>
          <Form.Item label="Date of birth" name="dateOfBirth">
            <Input className="w-full" size="large" type="date" />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="w-full" size="large" />
          </Form.Item>
          <Form.Item
            label="Telephone"
            name="tel"
            rules={[
              { required: true, message: "Please input your Phone number" },
            ]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="pt-4 text-center text-sm">
          <span>
            Don't have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
