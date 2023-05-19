import React, { useEffect } from "react";
import { Space, Select, Form, Input, DatePicker } from "antd";
import "../employee.css";
const typeState = [
  { value: 0, label: "Permanent" },
  { value: 1, label: "Part-time" },
  { value: 2, label: "Contract" },
];
interface Props {
  id?: string;
}
const Contract: React.FC<Props> = ({ id }) => {
  // fecth api
  useEffect(() => {}, []);
  return (
    <section className="container">
      <div className="title_required flex justify-between">
        <h2 className="text-xl font-medium text-[#11181C]">Others</h2>
        <p className="text-[#687076]">
          Required (<span className="text-[#E5484D]">*</span>)
        </p>
      </div>
      <hr className="hr_action" />
      <div className="">
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Date Start"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="contract_start_date"
              rules={[{ required: true, message: "" }]}
            >
              <DatePicker className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]" />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Employee Type"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="type"
              rules={[
                { required: true, message: "Please choose Employee Type" },
              ]}
            >
              <Select
                disabled={id ? true : false}
                placeholder="Choose Type"
                options={typeState}
              />
            </Form.Item>
          </Space>
        </div>
        <div
          className="w-full mt-[10px] rounded-md"
          style={{ border: "1px solid rgb(223, 227, 230)" }}
        >
          <h3
            className="uppercase py-[5px] text-xs font-semibold px-5"
            style={{
              background: "rgb(241, 243, 245)",
              color: "rgb(104, 112, 118)",
            }}
          >
            Contract:
          </h3>
          <p className="py-[10px] px-5 font-normal text-sm">
            Please upload pdf, png, xlsx, docx file format!
          </p>
          <hr />
          <div className="flex p-5 gap-5">
            <div className="flex flex-col min-w-[450px]">
              <div className="flex items-center">
                <Space wrap>
                  <Form.Item
                    label="Contract Date"
                    className="text-base font-medium text-[#11181C] mb-[10px]"
                    name="contracts"
                  >
                    <DatePicker className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]" />
                  </Form.Item>
                </Space>
              </div>
              <div className="flex items-center">
                <Space wrap>
                  <Form.Item
                    label="Contract Name"
                    className="text-base font-medium text-[#11181C] mb-[10px]"
                    name="contracts_name"
                  >
                    <Input className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]" />
                  </Form.Item>
                </Space>
              </div>
              <div className="flex items-center gap-[10px]">
                <label
                  className="flex items-center justify-center min-w-[195px] rounded-md px-[22px] py-2 h-12 border-dotted border-2 border-indigo-400 text-base cursor-pointer"
                  style={{
                    background: "rgb(237, 246, 255)",
                    color: "rgb(0, 145, 255)",
                  }}
                >
                  <span>
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-fill-all"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.81825 1.18191C7.64251 1.00618 7.35759 1.00618 7.18185 1.18191L4.18185 4.18191C4.00611 4.35765 4.00611 4.64257 4.18185 4.81831C4.35759 4.99404 4.64251 4.99404 4.81825 4.81831L7.05005 2.58651V9.49999C7.05005 9.74852 7.25152 9.94999 7.50005 9.94999C7.74858 9.94999 7.95005 9.74852 7.95005 9.49999V2.58651L10.1819 4.81831C10.3576 4.99404 10.6425 4.99404 10.8182 4.81831C10.9944.64257 10.994 4.35765 10.8182 4.18191L7.81825 1.18191ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                        fill="rgb(0, 145, 255)"
                      />
                    </svg>
                  </span>
                  Upload File
                  <input type="file" style={{ display: "none" }} />
                </label>
                <button
                  type="button"
                  className="min-w-[195px] rounded-md px-[22px] py-2 h-12 text-base"
                  style={{
                    background: "rgb(105, 217, 193)",
                    color: "rgb(234, 251, 246)",
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <hr
              style={{
                height: "auto",
                display: "block",
                borderColor: "rgba(193, 200, 205, 0.24)",
                borderWidth: "0px thin 0px 0px",
              }}
            />
            <div className="relative overflow-x-auto  sm:rounded-lg table-wrapper ">
              <table className="w-full text-left border-separate">
                <thead className="text-sm bg-[#ECEEF0] sticky top-0">
                  <tr className="text-center">
                    <th className="py-[3px] px-[10px] rounded-tl-lg">No</th>
                    <th className="py-[3px] px-[10px]">Contract Name</th>
                    <th className="py-[3px] px-[10px]">Sign Date</th>
                    <th className="py-[3px] px-[10px] rounded-tr-lg">Action</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contract;
