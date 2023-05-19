import React from "react";
import { Form, Space, Input } from "antd";
interface Props {
  handleChangeSalary?: any;
}
const Salary: React.FC<Props> = ({ handleChangeSalary }) => {
  return (
    <section className="container">
      <div className="title_required flex justify-between">
        <h2 className="text-xl font-medium text-[#11181C]">Salary & Wages</h2>
        <p className="text-[#687076]">
          Required (<span className="text-[#E5484D]">*</span>)
        </p>
      </div>
      <hr className="hr_action" />
      <div className="w-1/2">
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Basic Salary"
              className="text-base font-medium text-[#11181C]"
              name="basic_salary"
              rules={[{ required: true, message: "Please input Salary" }]}
            >
              <Input
                prefix={
                  <div className="mr-2" style={{ color: "rgb(0, 106, 220)" }}>
                    Rp
                  </div>
                }
                onChange={handleChangeSalary}
                type="number"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Basic Salary (Audit)"
              className="text-base font-medium text-[#11181C]"
              name="audit_salary"
              rules={[
                { required: true, message: "Please input Salary (Audit)" },
              ]}
            >
              <Input
                prefix={
                  <div className="mr-2" style={{ color: "rgb(0, 106, 220)" }}>
                    Rp
                  </div>
                }
                type="number"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4 ">
          <Space wrap>
            <Form.Item
              label="Safety Insurance Amount"
              className="text-base font-medium text-[#11181C]"
              name="safety_insurance"
              rules={[
                {
                  required: true,
                  message: "Please input Safety Insurance Amount",
                },
              ]}
            >
              <Input
                prefix={
                  <div className="mr-2" style={{ color: "rgb(0, 106, 220)" }}>
                    Rp
                  </div>
                }
                type="number"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Healthy Insurance Amount"
              className="text-base font-medium text-[#11181C]"
              name="health_insurance"
            >
              <Input
                prefix={
                  <div className="mr-2" style={{ color: "rgb(0, 106, 220)" }}>
                    Rp
                  </div>
                }
                type="number"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Meal Allowance"
              className="text-base font-medium text-[#11181C]"
              name="meal_allowance"
              rules={[
                { required: true, message: "Please input  Meal Allowance" },
              ]}
            >
              <Input
                prefix={
                  <div className="mr-2" style={{ color: "rgb(0, 106, 220)" }}>
                    Rp
                  </div>
                }
                type="number"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
              />
            </Form.Item>
          </Space>
        </div>
      </div>
    </section>
  );
};

export default Salary;
