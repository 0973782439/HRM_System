import React, { useState } from "react";
import { Space, Select, Form, Input, DatePicker } from "antd";
import "../employee.css";
import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
import { IFormDataContractResponse } from "../../../interfaces/Contract";
const typeState = [
  { value: 0, label: "Permanent" },
  { value: 1, label: "Part-time" },
  { value: 2, label: "Contract" },
];
interface Props {
  id?: string;
  setFormDataContract?: any;
  formDataContract?: any;
  setDeletedIdContract?: any;
  setIsApiContract?: any;
}

const Contract: React.FC<Props> = ({
  id,
  formDataContract,
  setFormDataContract,
  setDeletedIdContract,
  setIsApiContract,
}) => {
  const [contract, setContract] = useState<any>(); //đối tượng contract
  const [selectFileContract, setSelectFileContract] = useState<any>(); // chọn file để hiển thị
  const [errorMessageContract, setErrorMessageContract] = useState<any>({
    contract_date: false,
    name: false,
    document: "",
  }); // thông báo lỗi
  /**
   * Huỷ chọn file
   */
  const handleCloseSelectContract = () => {
    setContract((prev: any) => ({ ...prev, document: undefined }));
    setSelectFileContract(undefined);
  };
  /**
   * Add file của contract vào table
   */
  const handleAddContract = () => {
    if (formDataContract) {
      if (
        contract?.name !== undefined &&
        contract?.contract_date !== undefined &&
        contract?.document !== undefined &&
        contract?.name !== "" &&
        contract?.contract_date !== "" &&
        contract?.document !== ""
      ) {
        setFormDataContract((prev: any) => [...prev, contract]);
        setSelectFileContract(undefined);
        setContract({
          name: "",
          contract_date: "",
          document: "",
        });
        setErrorMessageContract({
          name: false,
          contract_date: false,
          document: "",
        });
      } else {
        setErrorMessageContract({
          name: contract?.name ? false : true,
          contract_date: contract?.contract_date ? false : true,
          document: contract?.document ? "" : "No file chosen",
        });
      }
    }
  };
  /**
   * Thay đổi các trường dữ liệu của contract
   */
  const handleChangeContractName = (e: any) => {
    const { name, value } = e.target;
    setErrorMessageContract((prev: any) => ({ ...prev, name: false }));
    setContract((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleChangeContractFile = (e: any) => {
    const { name, files } = e.target;
    setErrorMessageContract((prev: any) => ({ ...prev, document: "" }));
    setSelectFileContract(files[0]);
    setContract((prev: any) => ({ ...prev, [name]: files[0] }));
  };
  const handleChangeContractDate: DatePickerProps["onChange"] = (date) => {
    setErrorMessageContract((prev: any) => ({ ...prev, contract_date: false }));
    setContract((prev: any) => ({
      ...prev,
      contract_date: date,
    }));
  };
  /**
   * Xoá file
   */
  const handleDeleteFileContract = (index: number, id: number) => {
    setDeletedIdContract((prev: any) => [...prev, id]);
    setFormDataContract((prev: any) => {
      const fileNew = [...prev];
      fileNew.splice(index, 1);
      return fileNew;
    });
    setIsApiContract(true);
  };
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
              <DatePicker
                format="YYYY/MM/DD"
                className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
              />
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
                    // name="contract_date"
                  >
                    <DatePicker
                      value={contract?.contract_date}
                      onChange={handleChangeContractDate}
                      format="YYYY/MM/DD"
                      className={`${
                        errorMessageContract?.contract_date
                          ? "bg-[#FFEFEF] border-solid border-2 border-red-200"
                          : "bg-[#F1F3F5]"
                      } text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]`}
                    />
                  </Form.Item>
                </Space>
              </div>
              <div className="flex items-center">
                <Space wrap>
                  <Form.Item
                    label="Contract Name"
                    className="text-base font-medium text-[#11181C] mb-[10px]"
                  >
                    <Input
                      value={contract?.name}
                      name="name"
                      onChange={handleChangeContractName}
                      className={`${
                        errorMessageContract?.name
                          ? "bg-[#FFEFEF] border-solid border-2 border-red-200"
                          : "bg-[#F1F3F5]"
                      } text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]`}
                    />
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
                  <Input
                    name="document"
                    style={{ display: "none" }}
                    onChange={handleChangeContractFile}
                    type="file"
                  />
                </label>
                <button
                  onClick={handleAddContract}
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
              {errorMessageContract?.document && (
                <p className="text-red-500 italic">
                  {errorMessageContract?.document}
                </p>
              )}
              {selectFileContract && (
                <div
                  className="p-2 inline-flex justify-between items-center min-w-[170px] mt-3 rounded-md"
                  style={{ background: "rgb(241, 243, 245)" }}
                >
                  <p>{selectFileContract.name}</p>
                  <button
                    className="m-1"
                    onClick={handleCloseSelectContract}
                    type="button"
                  >
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.7814 4.03157C12.0059 3.80702 12.0059 3.44295 11.7814 3.2184C11.5568 2.99385 11.1928 2.99385 10.9682 3.2184L7.4998 6.68682L4.03139 3.2184C3.80684 2.99385 3.44277 2.99385 3.21822 3.2184C2.99367 3.44295 2.99367 3.80702 3.21822 4.03157L6.68663 7.49999L3.21822 10.9684C2.99367 11.193 2.99367 11.557 3.21822 11.7816C3.44277 12.0061 3.80684 12.0061 4.03139 11.7816L7.4998 8.31316L10.9682 11.7816C11.1928 12.0061 11.5568 12.0061 11.7814 11.7816C12.0059 11.557 12.0059 11.193 11.7814 10.9684L8.31298 7.49999L11.7814 4.03157Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <hr
              style={{
                height: "auto",
                display: "block",
                borderColor: "rgba(193, 200, 205, 0.24)",
                borderWidth: "0px thin 0px 0px",
              }}
            />
            <div className="relative overflow-x-auto  sm:rounded-lg table-wrapper min-h-[225px] max-h-[225px]">
              <table className="w-full text-left border-separate">
                <thead className="text-sm bg-[#ECEEF0] sticky top-0">
                  <tr className="text-center">
                    <th className="py-[3px] px-[10px] rounded-tl-lg">No</th>
                    <th className="py-[3px] px-[10px]">Contract Name</th>
                    <th className="py-[3px] px-[10px]">Sign Date</th>
                    <th className="py-[3px] px-[10px] rounded-tr-lg min-w-[294px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody style={{ background: "rgb(248, 249, 250)" }}>
                  {formDataContract &&
                    formDataContract?.map(
                      (file: IFormDataContractResponse, index: number) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{index}</td>
                            <td className="text-center">{file?.name}</td>
                            <td className="text-center">
                              {dayjs(file?.contract_date).format("YYYY/MM/DD")}
                            </td>
                            <td className="flex justify-center items-center px-[10px]">
                              {id && (
                                <a
                                  href={file.document}
                                  target="_blank"
                                  className="px-3 py-2 rounded-md mx-[2px]"
                                  style={{
                                    background: "rgb(233, 249, 238)",
                                    color: "rgb(48, 164, 108)",
                                  }}
                                >
                                  <svg
                                    width={15}
                                    height={16}
                                    viewBox="0 0 15 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M13.5002 14.4502C13.7487 14.4502 13.9502 14.2487 13.9502 14.0002C13.9502 13.7517 13.7487 13.5502 13.5002 13.5502L1.5002 13.5502C1.25167 13.5502 1.05019 13.7517 1.05019 14.0002C1.05019 14.2487 1.25167 14.4502 1.50019 14.4502L13.5002 14.4502ZM11.0684 8.06855C11.2441 7.89281 11.2441 7.60789 11.0684 7.43215C10.8926 7.25642 10.6077 7.25642 10.432 7.43215L7.95017 9.91395L7.95017 2.00023C7.95017 1.7517 7.7487 1.55023 7.50017 1.55023C7.25164 1.55023 7.05017 1.7517 7.05017 2.00023L7.05017 9.91395L4.56837 7.43215C4.39263 7.25642 4.10771 7.25642 3.93197 7.43215C3.75624 7.60789 3.75624 7.89281 3.93197 8.06855L7.18197 11.3185C7.35771 11.4943 7.64263 11.4943 7.81837 11.3185L11.0684 8.06855Z"
                                      fill="#30A46C"
                                    />
                                  </svg>
                                </a>
                              )}
                              <button
                                onClick={() =>
                                  handleDeleteFileContract(index, file?.id)
                                }
                                type="button"
                                className="px-3 py-2 rounded-md mx-[2px]"
                                style={{ background: "rgb(255, 239, 239)" }}
                              >
                                <svg
                                  width={15}
                                  height={15}
                                  viewBox="0 0 15 15"
                                  fill="#E5484D"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-fill-all"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                                    fill="rgb(229, 72, 77)"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contract;
