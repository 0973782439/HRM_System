import React, { useEffect, useState } from "react";
import { IGrade } from "../../../interfaces/Grade";
import { IResponseApi } from "../../../interfaces/Common";
import http from "../../../utils/http";
import { Space, Select, Form, Button, Input } from "antd";
import { IBenefits } from "../../../interfaces/Benefits";
import "../employee.css";
import dayjs from "dayjs";

const { TextArea } = Input;
interface Props {
  grade?: IGrade[];
  benefits?: IBenefits[];
  setBenefits?: any;
  setFiles?: any;
  images?: any;
  setImages?: any;
  setDeletedIdDocumnet?: any;
  id?: string;
}
const Other: React.FC<Props> = ({
  grade,
  benefits,
  setBenefits,
  setFiles,
  images,
  setImages,
  setDeletedIdDocumnet,
  id,
}) => {
  const [nameGrade, setNameGrade] = useState<any>([]);
  // Thay đổi grade
  const handleChangeGrade = (value: any) => {
    const gradeNew = grade?.filter((item: any) => item.id == value);
    const benefitsGrade = gradeNew?.map((item: any) => {
      const nameBenefits = item.benefits.map((item: any) => {
        return item.name;
      });
      return nameBenefits;
    });
    setNameGrade(benefitsGrade);
    const getBenefits = http.get<IResponseApi<IBenefits>>(
      `benefit?grade_id=${value}`
    );
    getBenefits.then((res: any) => {
      setBenefits(res.data.data);
    });
  };
  // Xoá document upload
  function handleDeleteDocumentUpload(index: number, id: number) {
    setDeletedIdDocumnet((prev: any) => [...prev, id]);
    setImages((prevImages: any) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  }
  // handleChangeUpload
  useEffect(() => {
    // if (images.length < 1) return;
    const newImageUrls: any = [];

    images?.forEach((image: any) => {
      return newImageUrls.push(image.file);
    });

    setFiles(newImageUrls);
  }, [images]);

  const handleChangeUpload = (e: any) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const updatedImages = Array.from(selectedFiles).map((file: any) => ({
        file,
        created_at: new Date(),
      }));
      setImages((prevImages: any) => [...prevImages, ...updatedImages]);
    }
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
      <div className="w-1/2">
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Grade"
              className="text-base font-medium text-[#11181C] mb-[10px] "
              name="grade_id"
            >
              <Select
                onChange={handleChangeGrade}
                options={grade?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="ml-[180px] p-1 max-w-[300px]">
          {nameGrade.map((name: any) => {
            return name.map((item: any) => {
              return (
                <span
                  key={item}
                  style={{ background: "rgb(230, 232, 235)" }}
                  className="px-2 rounded-md mr-2"
                >
                  {item}
                </span>
              );
            });
          })}
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Benefit"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="benefits"
            >
              <Select
                size="large"
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
                options={benefits?.map((benefit) => ({
                  label: benefit.name,
                  value: benefit.id,
                }))}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="Remark"
              className="text-base font-medium text-[#11181C] mb-[10px]"
              name="remark"
            >
              <TextArea
                className="bg-[#F1F3F5]"
                rows={3}
                style={{ resize: "none" }}
              />
            </Form.Item>
          </Space>
        </div>
        <div className="flex items-center gap-4">
          <Space wrap>
            <Form.Item
              label="HRM User Account"
              className="text-base font-medium text-[#11181C] mb-[10px]"
            >
              <Select
                disabled
                size="large"
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
                options={benefits?.map((benefit) => ({
                  label: benefit.name,
                  value: benefit.id,
                }))}
              />
            </Form.Item>
          </Space>
        </div>
      </div>
      <div
        className="w-full mt-[10px] rounded-md px-5 py-3"
        style={{ border: "1px solid rgb(223, 227, 230)" }}
      >
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] mt-3">
            <label className="block text-base font-medium text-[#11181C] w-[162px]">
              Document
            </label>
            <label
              className="flex items-center justify-center min-w-[98px] rounded-md px-3 py-2 h-8 border-dotted border-2 border-indigo-400 text-sm cursor-pointer"
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
                  style={{
                    color: "rgb(0, 145, 255)",
                  }}
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
              <Space wrap style={{ display: "none" }}>
                <Form.Item name="document_upload">
                  <Input
                    multiple
                    onChange={handleChangeUpload}
                    accept="image/*,.pdf,.csv,.xlsx,.docx"
                    type="file"
                  />
                </Form.Item>
              </Space>
            </label>
          </div>
        </div>
        <div className="relative overflow-x-auto  sm:rounded-lg table-wrapper mt-3 min-h-[225px] max-h-[225px]">
          <table className="w-full text-left border-separate ">
            <thead className="text-sm bg-[#ECEEF0] sticky top-0">
              <tr className="text-center">
                <th className="py-[3px] px-[10px] rounded-tl-lg">No</th>
                <th className="py-[3px] px-[10px]">Document Name</th>
                <th className="py-[3px] px-[10px]">Created At</th>
                <th className="py-[3px] px-[10px] rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {images &&
                images?.map((file: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      style={{ background: "rgb(248, 249, 250)" }}
                    >
                      <td className="text-center">{index}</td>
                      <td className="px-[10px] uppercase">
                        {file.name
                          ? file.name?.substring(file.name.lastIndexOf("/") + 1)
                          : null || file.file.name}
                      </td>
                      <td className="px-[10px]">
                        {dayjs(file.created_at).format("YYYY/MM/DD")}
                      </td>
                      <td className="flex justify-center items-center px-[10px]">
                        {id && (
                          <a
                            href={file.name}
                            target="_blank"
                            className="px-3 py-2 rounded-md mx-[2px]"
                            style={{ background: "rgb(233, 249, 238)" }}
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
                          type="button"
                          onClick={() =>
                            handleDeleteDocumentUpload(index, file.id)
                          }
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
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Other;
