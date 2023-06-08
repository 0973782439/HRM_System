import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import { ForgotPass } from "../../api/Auth.api";
import { toast } from "react-toastify";
import { IForgotPass } from "../../interfaces/Authentication";
import { Form, Input, Space } from "antd";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onSubmit = (values: IForgotPass) => {
    const json = ForgotPass(values);
    json
      .then((res: any) => {
        navigate(ROUTER.login);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="main mt-[85px] w-full max-w-[348px]">
      <h3 className="text-4xl text-center leading-tight mb-5">
        Forgot Password
      </h3>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <Form layout="vertical" autoComplete="off" onFinish={onSubmit}>
            <Space wrap>
              <Form.Item
                label="Your work email"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                  {
                    validator: (_, value) => {
                      if (value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        return Promise.reject(
                          new Error("Please enter a valid email")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                // rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input className="bg-gray-100 text-black text-base rounded-lg py-3 px-3 outline-none w-[300px]" />
              </Form.Item>
            </Space>
            <button
              type="submit"
              className="w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 font-normal rounded-lg text-base py-3 px-5 mt-1 mb-4"
            >
              Confirm & Send OTP
            </button>
            <Link
              to={ROUTER.login}
              className="block text-sm text-center font-medium text-blue-400 hover:underline"
            >
              Back to Sing-In
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
