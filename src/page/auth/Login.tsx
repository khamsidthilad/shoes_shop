import { Button, Form, Input } from "antd";
const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 px-4">
      <div className="bg-white px-6  py-10 w-full max-w-md rounded shadow-md">
        <div className="pb-10 text-center">
          <h1 className="font-bold text-2xl">Login</h1>
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

          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="pt-4 text-center text-sm">
          <span>
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
