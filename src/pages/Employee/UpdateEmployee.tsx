import { Breadcrumb, Form, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Information from "./Tabs/Information";
import Contract from "./Tabs/Contract";
import Details from "./Tabs/Details";
import Salary from "./Tabs/Salary";
import Other from "./Tabs/Other";
import { useForm } from "antd/lib/form/Form";
import { EditEmployee, GetEmployeeById } from "../../api/Employee.api";
import { toast } from "react-toastify";
import { ROUTER } from "../../utils/path";
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
import { IFormDataContractResponse } from "../../interfaces/Contract";

interface IFileUpload {
  id: number;
  document: string;
  created_at: string;
}
const UpdateEmployee = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { id } = useParams();
  const [isEntitle, setIsEntitle] = useState<any>();
  // state render select option
  const [marriage, setMarriage] = useState<IMarriage[]>();
  const [department, setDepartment] = useState<IDepartment[]>();
  const [position, setPosition] = useState<IPosition[]>();
  const [grade, setGrade] = useState<IGrade[]>();
  const [benefits, setBenefits] = useState<IBenefits[]>();
  // state upload ảnh
  const [images, setImages] = useState();
  const [files, setFiles] = useState([]);
  const [deletedIdDocumnet, setDeletedIdDocumnet] = useState([]);
  // state upload contract
  const [formDataContract, setFormDataContract] = useState<any>([]); // mảng contract hiển thị table
  const [deletedIdContract, setDeletedIdContract] = useState([]);
  const [isApiContract, setIsApiContract] = useState(false);

  /**
   * Hàm update employee
   */
  const handleUpdateEmployee = async (values: IEmployee) => {
    const valueNew = await {
      ...values,
      dob: dayjs(values?.dob).format("YYYY-MM-DD"),
      contract_start_date: dayjs(values?.contract_start_date).format(
        "YYYY-MM-DD"
      ),
      meal_allowance_paid: values.meal_allowance_paid,
      attendance_allowance_paid: !values.entitle_ot,
      operational_allowance_paid: !values.entitle_ot,
      benefits: values.benefits,
    };
    const check = formDataContract.every((item: any) =>
      item.hasOwnProperty("id")
    );
    const json = EditEmployee(id, valueNew as any);
    json
      .then((res: any) => {
        navigate(ROUTER.home, {
          replace: true,
        });
        const contractNew = formDataContract
          .map((item: any) => {
            return {
              ...item,
              contract_date: dayjs(item.contract_date).format("YYYY-MM-DD"),
            };
          })
          .filter((item: any) => typeof item.document === "object");

        if (files) {
          const fileNew = files.filter((file: any) => file != undefined);
          UpLoad(id, fileNew, deletedIdDocumnet);
        }
        if (!check) {
          UploadContract(id, contractNew, deletedIdContract);
        } else if (isApiContract) {
          UploadContract(id, [], deletedIdContract);
          setIsApiContract(false);
        }
        toast.success("Change saved");
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };
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
  };
  // Fetch api
  useEffect(() => {
    // Lấy ra thông tin của 1 employee
    const getEmployeeById = GetEmployeeById(Number(id));
    getEmployeeById
      .then((res: any) => {
        const employee_detail = res.data.data;
        const documents = employee_detail.documents.map(
          (document: IFileUpload) => {
            return {
              id: document.id,
              name: document.document,
              created_at: document.created_at,
            };
          }
        );
        const contracts = employee_detail.contracts.map(
          (contract: IFormDataContractResponse) => {
            return {
              id: contract.id,
              name: contract.name,
              document: contract.document,
              contract_date: contract.contract_date,
            };
          }
        );

        setIsEntitle(employee_detail.entitle_ot);
        setImages(documents);
        setFormDataContract(contracts);
        employee_detail.benefits = employee_detail.benefits.map(
          (item: IBenefits) => item.id
        );
        employee_detail.type = Number(employee_detail.type);
        employee_detail.dob = dayjs(employee_detail.dob);
        employee_detail.contract_start_date = dayjs(
          employee_detail.contract_start_date
        );
        form.setFieldsValue(employee_detail);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
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
   * Tabs
   */
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="py-[9px] rounded-md px-3 active"
          style={{ color: "rgb(0, 145, 255)" }}
        >
          Employee Infomation
        </div>
      ),
      children: <Information id={id} marriage={marriage}></Information>,
    },
    {
      key: "2",
      label: (
        <div
          className="py-[9px] rounded-md px-3 active"
          style={{ color: "rgb(0, 145, 255)" }}
        >
          Contract Information
        </div>
      ),
      children: (
        <Contract
          setIsApiContract={setIsApiContract}
          id={id}
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
          style={{ color: "rgb(0, 145, 255)" }}
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
          id={id}
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
            title: "Edit employee",
          },
        ]}
      />
      <Form form={form} onFinish={handleUpdateEmployee}>
        <div className="flex justify-between">
          <h1 className="text-4xl font-medium mt-3">Employee Management</h1>
          <button
            type="submit"
            className="px-6 py-3 rounded-md text-[#F1F3F5]"
            style={{ background: "rgb(0, 145, 255)" }}
          >
            Save Change
          </button>
        </div>
        <Tabs
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

export default UpdateEmployee;
