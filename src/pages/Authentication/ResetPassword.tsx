import React from "react";
import { Breadcrumb, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ChangePassword } from "../../api/Auth.api";
import { toast } from "react-toastify";
interface IReset {
  password: string;
  password_confirmation: string;
}
const ResetPassword = () => {
  const { t } = useTranslation();
  const handleResetPassword = (values: IReset) => {
    const json = ChangePassword(values);
    json
      .then((res: any) => {
        toast.success("Success");
      })
      .catch((errors: any) => {
        toast.error(errors.response.data.message);
      });
  };
  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: <> {t("COMMON.general")}</>,
          },
          {
            title: <> {t("COMMON.setting")}</>,
          },
        ]}
      />
      <h1 className="font-medium text-4xl mt-3">Settings</h1>
      <section className="container w-[1070px]">
        <h2 className="font-medium text-2xl mb-3">Change Password</h2>
        <hr />
        <div className="p-2">
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={handleResetPassword}
            className=" flex flex-col"
          >
            <Space wrap>
              <Form.Item
                className="text-base font-medium text-[#11181C]"
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input.Password className="bg-gray-100 text-black text-base rounded-lg py-3 px-3 outline-none w-[300px]" />
              </Form.Item>
            </Space>
            <Space wrap>
              <Form.Item
                className="text-base font-medium text-[#11181C]"
                name="password_confirmation"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm password",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("The passwords do not match");
                    },
                  }),
                ]}
              >
                <Input.Password className="bg-gray-100 text-black text-base rounded-lg py-3 px-3 outline-none w-[300px]" />
              </Form.Item>
            </Space>
            <button className=" w-[300px] flex justify-center text-white bg-blue-500 hover:bg-blue-600 font-normal rounded-lg text-base py-3 px-5">
              Confirm
            </button>{" "}
          </Form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
