import React from "react";
import { Space, Select, Form, Checkbox } from "antd";
import "../employee.css";
import { IDepartment } from "../../../interfaces/Department";
import { IPosition } from "../../../interfaces/Position";
interface Props {
  isEntitle?: boolean;
  setIsEntitle?: any;
  position?: IPosition[];
  department?: IDepartment[];
}
const Details: React.FC<Props> = ({
  isEntitle,
  setIsEntitle,
  position,
  department,
}) => {
  return (
    <section className="container">
      <div className="title_required flex justify-between">
        <h2 className="text-xl font-medium text-[#11181C]">Others</h2>
        <p className="text-[#687076]">
          Required (<span className="text-[#E5484D]">*</span>)
        </p>
      </div>
      <hr className="hr_action" />
      <div className="w-1/2">
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Department"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="department_id"
            >
              <Select
                placeholder="Choose Department"
                options={department?.map((item: IDepartment) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Position"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="position_id"
            >
              <Select
                placeholder="Choose Position"
                options={position?.map((item: IPosition) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              valuePropName="checked"
              name="entitle_ot"
              className="mb-[10px]"
            >
              <Checkbox
                onChange={(e) => setIsEntitle(e.target.checked)}
                className="text-base font-medium text-[#11181C]"
              >
                Entitled OT
              </Checkbox>
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              valuePropName="checked"
              name="meal_allowance_paid"
              className="mb-[10px]"
            >
              <Checkbox className="text-base font-medium text-[#11181C]">
                Meal Allowance Paid
              </Checkbox>
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item name="operational_allowance_paid" className="mb-[10px]">
              <Checkbox
                checked={!isEntitle}
                disabled
                className="text-base font-medium text-[#11181C]"
              >
                Operational Allowance Paid
              </Checkbox>
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item name="attendance_allowance_paid" className="mb-[10px]">
              <Checkbox
                checked={!isEntitle}
                disabled
                className="text-base font-medium text-[#11181C]"
              >
                Attendance Allowance Paid
              </Checkbox>
            </Form.Item>
          </Space>
        </div>
      </div>
    </section>
  );
};

export default Details;
