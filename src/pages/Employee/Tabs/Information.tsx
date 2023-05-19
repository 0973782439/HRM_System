import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Select, Space } from "antd";
import { IMarriage } from "../../../interfaces/Marriage";
import http from "../../../utils/http";
import { IResponseApi } from "../../../interfaces/Common";
const genderState = [
  { value: 0, label: "Male" },
  { value: 1, label: "Female" },
];
interface Props {
  id?: string;
}
const Information: React.FC<Props> = ({ id }) => {
  const [marriage, setMarriage] = useState<IMarriage[]>();
  useEffect(() => {
    const getMarriage = http.get<IResponseApi<IMarriage>>("marriage");
    getMarriage.then((res: any) => {
      setMarriage(res.data.data);
    });
  }, []);
  // hàm chỉ nhận số
  const onlyGetNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <section className="container">
      <div className="title_required flex justify-between">
        <h2 className="text-xl font-medium text-[#11181C]">
          Personal Information
        </h2>
        <p className="text-[#687076]">
          Required (<span className="text-[#E5484D]">*</span>)
        </p>
      </div>
      <hr className="hr_action" />
      <div className="w-full flex px-[20px]">
        <div className="w-1/2">
          {id && (
            <div className="flex items-center gap-4">
              <Space wrap>
                <Form.Item
                  label="NIK"
                  className="text-base font-medium text-[#11181C] mb-[10px]"
                  name="staff_id"
                >
                  <Input
                    disabled
                    className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                  />
                </Form.Item>
              </Space>
            </div>
          )}
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Name"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="name"
                rules={[{ required: true, message: "Please input Name" }]}
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Gender"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="gender"
                rules={[{ required: true, message: "Please choose Gender" }]}
              >
                <Select placeholder="Choose Gender" options={genderState} />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Mother Name"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="mother_name"
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Date of birth"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="dob"
                rules={[{ required: true, message: "" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Place of birth"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="pob"
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="KTP No."
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="ktp_no"
                rules={[{ required: true, message: "Please input KTP No" }]}
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="National Card ID"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="nc_id"
                rules={[
                  { required: true, message: "Please input National Card ID" },
                ]}
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Home Address 1"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="home_address_1"
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Home Address 2"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="home_address_2"
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Mobile No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="mobile_no"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Tel No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="tel_no"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Marriage Status"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="marriage_id"
              >
                <Select
                  placeholder="Choose Marriage Status"
                  options={marriage?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Bank Card No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="card_number"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Bank Account No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="bank_account_no"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Bank Name"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="bank_name"
              >
                <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]" />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Family Card Number"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="family_card_number"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Safety Insurance No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="safety_insurance_no"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex items-center gap-4">
            <Space wrap>
              <Form.Item
                label="Health Insurance No"
                className="text-base font-medium text-[#11181C] mb-[10px]"
                name="health_insurance_no"
              >
                <Input
                  onKeyPress={onlyGetNumber}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                />
              </Form.Item>
            </Space>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
