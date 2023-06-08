import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ILogIn } from "../../interfaces/Authentication";
import http from "../../utils/http";
import { IResponseApi } from "../../interfaces/Common";
import { ICompany } from "../../interfaces/Company";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthActions } from "../../app/Redux/Auth.slice";
import { RootState } from "../../app/store";
import { ROUTER } from "../../utils/path";
import { Form, Input, Select, Space } from "antd";
import "./authentication.css";
const Login = () => {
  const [factoryState, setFactoryState] = useState([]);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: RootState) => state.common.isLoading
  );
  // api để select company
  useEffect(() => {
    const data = http.get<IResponseApi<ICompany>>("company");
    data.then((res: any) => {
      setFactoryState(res.data.data);
    });
  }, []);
  //
  const handleNoSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/\s/g.test(e.key)) {
      e.preventDefault();
    }
  };
  // Login
  const onSubmit = (values: ILogIn) => {
    const dataNew = {
      ...values,
      company_id: Number(values.company_id),
    };
    dispatch(AuthActions.login(dataNew));
  };

  return (
    <div className="main mt-8 w-full max-w-[348px]">
      <h3 className="text-4xl text-center leading-tight mb-5">Sign In</h3>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <Form layout="vertical" autoComplete="off" onFinish={onSubmit}>
            <Space wrap>
              <Form.Item
                label="Username"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="username"
                rules={[
                  { required: true, message: "Please enter password" },
                  {
                    max: 30,
                    message: "Username must be maximum 30 characters",
                  },
                ]}
              >
                <Input
                  onKeyPress={handleNoSpace}
                  className="bg-gray-100 text-black text-base rounded-lg py-3 px-3 outline-none w-[300px]"
                />
              </Form.Item>
            </Space>
            <Space wrap>
              <Form.Item
                label="Password"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input.Password
                  onKeyPress={handleNoSpace}
                  className="bg-gray-100 text-black text-base rounded-lg py-3 px-3 outline-none w-[300px]"
                />
              </Form.Item>
            </Space>
            {/* <Space wrap> */}
            <Form.Item
              label="Factory"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="company_id"
              rules={[{ required: true, message: "Please choose factory" }]}
            >
              <Select
                placeholder="Select Factory"
                options={factoryState?.map((item: ICompany) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
            {/* </Space> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 font-normal rounded-lg text-base py-3 px-5 mt-6 mb-4"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 mr-1 text-gray-200 animate-spin "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
            <Link
              to={ROUTER.forgot_password}
              className="block text-sm text-center font-medium text-blue-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
