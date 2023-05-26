import React, { useEffect, useState } from "react";
import { TabsProps, Tabs, Breadcrumb, Form } from "antd";
import "./employee.css";
import { useForm } from "antd/lib/form/Form";
import { GetDefaultSalary, PostEmployee } from "../../api/Employee.api";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import { toast } from "react-toastify";
import Other from "./Tabs/Other";
import Salary from "./Tabs/Salary";
import Details from "./Tabs/Details";
import Contract from "./Tabs/Contract";
import Information from "./Tabs/Information";
import { IMarriage } from "../../interfaces/Marriage";
import http from "../../utils/http";
import { IResponseApi } from "../../interfaces/Common";
import { IDepartment } from "../../interfaces/Department";
import { IPosition } from "../../interfaces/Position";
import { IGrade } from "../../interfaces/Grade";
import { IBenefits } from "../../interfaces/Benefits";
import dayjs from "dayjs";
import { UpLoad, UploadContract } from "../../api/Core.api";
import { IEmployee } from "../../interfaces/Employee";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const infomation = ["name", "gender", "dob", "ktp_no", "nc_id"];
  const contract = ["contract_start_date", "type"];
  const [defaultSalary, setDefaultSalary] = useState<any>();
  const [isEntitle, setIsEntitle] = useState<any>();
  // state render select option
  const [marriage, setMarriage] = useState<IMarriage[]>();
  const [department, setDepartment] = useState<IDepartment[]>();
  const [position, setPosition] = useState<IPosition[]>();
  const [grade, setGrade] = useState<IGrade[]>();
  const [benefits, setBenefits] = useState<IBenefits[]>();

  const [checkValidateInfomation, setCheckValidateInfomation] =
    useState<boolean>(false);
  const [checkValidateContract, setCheckValidateContract] =
    useState<boolean>(false);
  const [checkValidateSalary, setCheckValidateSalary] =
    useState<boolean>(false);
  const [checkAdd, setCheckAdd] = useState<boolean>(false);
  // state upload ảnh
  const [files, setFiles] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [deletedIdDocumnet, setDeletedIdDocumnet] = useState([]);
  // state upload contract
  const [formDataContract, setFormDataContract] = useState<any>([]); // mảng contract hiển thị table
  const [deletedIdContract, setDeletedIdContract] = useState([]);

  /**
   * fecth api lấy default salary
   */
  useEffect(() => {
    // default salary
    const getDefaultSalary = GetDefaultSalary();
    getDefaultSalary.then((res: any) => {
      const defaultSalary = res.data.data;
      form.setFieldsValue({
        safety_insurance: defaultSalary?.safety_insurance,
        health_insurance: defaultSalary?.health_insurance,
        basic_salary: defaultSalary?.basic_salary,
        meal_allowance: defaultSalary?.meal_allowance,
        audit_salary: defaultSalary?.audit_salary,
      });
    });
    // select option Marriage
    const getMarriage = http.get<IResponseApi<IMarriage>>("marriage");
    getMarriage.then((res: any) => {
      setMarriage(res.data.data);
    });
    // select option Department
    const getDepartment = http.get<IResponseApi<IDepartment>>("department");
    getDepartment.then((res: any) => {
      setDepartment(res.data.data);
    });
    // select option Position
    const getPosition = http.get<IResponseApi<IPosition>>("position");
    getPosition.then((res: any) => {
      setPosition(res.data.data);
    });
    // select option Grade
    const getGrade = http.get<IResponseApi<IGrade>>("grade");
    getGrade.then((res: any) => {
      setGrade(res.data.data);
    });
    // select option Benefits
    const getBenefits = http.get<IResponseApi<IBenefits>>("benefit");
    getBenefits.then((res: any) => {
      setBenefits(res.data.data);
    });
  }, []);
  /**
   * Thay đổi lương
   */
  const handleChangeSalary = (e: any) => {
    const basic_salary = e.target.value;
    const safetyInsuranceNew =
      basic_salary > 8000000 ? 240000 : Number((3 / 100) * basic_salary);
    const healthInsuranceNew = Number((1 / 100) * basic_salary);
    form.setFieldsValue({
      safety_insurance: safetyInsuranceNew,
      health_insurance: healthInsuranceNew,
    });
    setDefaultSalary((prev: any) => ({
      ...prev,
      safety_insurance: safetyInsuranceNew,
      health_insurance: healthInsuranceNew,
      basic_salary: basic_salary,
    }));
  };
  /**
   * Hàm thêm 1 employee
   */
  const handleAddEmployee = (values: IEmployee) => {
    const valueNew = {
      ...values,
      dob: dayjs(values?.dob).format("YYYY-MM-DD"),
      contract_start_date: dayjs(values?.contract_start_date).format(
        "YYYY-MM-DD"
      ),
      meal_allowance_paid: values.meal_allowance_paid,
      attendance_allowance_paid: !values.entitle_ot,
      operational_allowance_paid: !values.entitle_ot,
    };
    const json = PostEmployee(valueNew as any);
    json
      .then((res: any) => {
        navigate(ROUTER.home, {
          replace: true,
        });
        const empoloyee_id = res.data.data.id;
        if (files && files.length > 0) {
          UpLoad(empoloyee_id, files, []);
        }
        if (formDataContract && formDataContract.length > 0) {
          UploadContract(empoloyee_id, formDataContract, []);
        }
        toast.success("Record added");
      })
      .catch((errors: any) => {
        toast.error(errors.response.data.message);
      });
  };
  /**
   * Check validate tabs
   */
  const handleTabChange = (tabKey: string) => {
    form
      .validateFields(infomation)
      .then(() => {
        setCheckAdd(true);
        setCheckValidateInfomation(false);
        form
          .validateFields(contract)
          .then(() => {
            setCheckValidateContract(false);
          })
          .catch((error) => {
            if (error.errorFields && tabKey === "2") {
              setCheckValidateContract(true);
            }
          });
      })

      .catch(() => {
        setCheckValidateInfomation(true);
        if (tabKey === "2") {
          form
            .validateFields(contract)
            .then(() => {
              setCheckValidateContract(false);
            })
            .catch((error) => {
              if (error.errorFields && tabKey === "2") {
                setCheckValidateContract(true);
              }
            });
        }
      });
  };
  /**
   * Tabs
   */
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="flex py-[9px] rounded-md px-3 active"
          style={
            checkValidateInfomation
              ? { color: "red" }
              : { color: "rgb(0, 145, 255)" }
          }
        >
          Employee Infomation
          {checkValidateInfomation && (
            <span className="ml-2">
              <svg
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4998 18.3337C15.1022 18.3337 18.8332 14.6027 18.8332 10.0003C18.8332 5.39795 15.1022 1.66699 10.4998 1.66699C5.89746 1.66699 2.1665 5.39795 2.1665 10.0003C2.1665 14.6027 5.89746 18.3337 10.4998 18.3337Z"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 6.66699V10.0003"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 13.333H10.5083"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      ),
      children: <Information marriage={marriage}></Information>,
    },
    {
      key: "2",
      label: (
        <div
          className="flex py-[9px] rounded-md px-3 active"
          style={
            checkValidateContract
              ? { color: "red" }
              : { color: "rgb(0, 145, 255)" }
          }
        >
          Contract Information
          {checkValidateContract && (
            <span className="ml-2">
              <svg
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4998 18.3337C15.1022 18.3337 18.8332 14.6027 18.8332 10.0003C18.8332 5.39795 15.1022 1.66699 10.4998 1.66699C5.89746 1.66699 2.1665 5.39795 2.1665 10.0003C2.1665 14.6027 5.89746 18.3337 10.4998 18.3337Z"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 6.66699V10.0003"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 13.333H10.5083"
                  stroke="#FFB7B9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      ),
      children: (
        <Contract
          setDeletedIdContract={setDeletedIdContract}
          formDataContract={formDataContract}
          setFormDataContract={setFormDataContract}
        ></Contract>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="py-[9px] rounded-md px-3 active"
          style={{ color: "rgb(0, 145, 255)" }}
        >
          Employment Details
        </div>
      ),
      children: (
        <Details
          department={department}
          position={position}
          setIsEntitle={setIsEntitle}
          isEntitle={isEntitle}
        ></Details>
      ),
    },
    {
      key: "4",
      label: (
        <div
          className="py-[9px] rounded-md px-3 active"
          style={
            checkValidateSalary
              ? { color: "red" }
              : { color: "rgb(0, 145, 255)" }
          }
        >
          Salary & Wages
        </div>
      ),
      children: <Salary handleChangeSalary={handleChangeSalary}></Salary>,
    },
    {
      key: "5",
      label: (
        <div
          className="py-[9px] rounded-md px-3 active"
          style={{ color: "rgb(0, 145, 255)" }}
        >
          Others
        </div>
      ),
      children: (
        <Other
          setDeletedIdDocumnet={setDeletedIdDocumnet}
          setImages={setImages}
          images={images}
          setFiles={setFiles}
          grade={grade}
          benefits={benefits}
          setBenefits={setBenefits}
        ></Other>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "General",
          },
          {
            title: "Employee Management",
          },
          {
            title: "Add new employee",
          },
        ]}
      />
      <Form
        initialValues={defaultSalary}
        form={form}
        onFinish={handleAddEmployee}
      >
        <div className="flex justify-between">
          <h1 className="text-4xl font-medium mt-3">Employee Management</h1>
          <button
            type="submit"
            className="px-6 py-3 rounded-md text-[#F1F3F5]"
            style={
              checkAdd && !checkValidateContract
                ? { background: "rgb(0, 145, 255)" }
                : {
                    background: "rgba(193, 200, 205, 0.24)",
                    color: "rgba(193, 200, 205, 0.8)",
                  }
            }
          >
            Add
          </button>
        </div>
        <Tabs
          onChange={handleTabChange}
          type="card"
          tabBarStyle={{
            marginTop: "20px",
          }}
          defaultActiveKey="1"
          items={items}
        />
      </Form>
    </>
  );
};

export default CreateEmployee;
