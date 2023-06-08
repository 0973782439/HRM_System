import { Breadcrumb, Form, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Information from "./Tabs/Information";
import Contract from "./Tabs/Contract";
import Details from "./Tabs/Details";
import Salary from "./Tabs/Salary";
import Other from "./Tabs/Other";
import { useForm } from "antd/lib/form/Form";
import { EditEmployee, GetEmployeeById } from "../../api/Employee.api";
import { toast } from "react-toastify";
import { PATH_API, ROUTER } from "../../utils/path";
import { IBenefits } from "../../interfaces/Benefits";
import dayjs from "dayjs";
import { UpLoad, UploadContract } from "../../api/Core.api";
import { IEmployee } from "../../interfaces/Employee";
import { IFormDataContractResponse } from "../../interfaces/Contract";
import useFetchSelect from "../../hooks/useFetchSelect";

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
  const [dataEdit, setDataEdit] = useState<IEmployee>();
  // state upload ảnh
  const [images, setImages] = useState();
  const [files, setFiles] = useState([]);
  const [deletedIdDocumnet, setDeletedIdDocumnet] = useState([]);
  // state upload contract
  const [formDataContract, setFormDataContract] = useState<any>([]); // mảng contract hiển thị table
  const [deletedIdContract, setDeletedIdContract] = useState([]);
  const [isApiContract, setIsApiContract] = useState(false);
  // state render select option
  const [marriage] = useFetchSelect(PATH_API.marriage);
  const [department] = useFetchSelect(PATH_API.department);
  const [position] = useFetchSelect(PATH_API.position);
  const [grade] = useFetchSelect(PATH_API.grade);
  const [benefits, setBenefits] = useFetchSelect(PATH_API.benefit);
  /**
   * Hàm update employee
   */
  const handleUpdateEmployee = async (values: IEmployee) => {
    const valueNew = await {
      ...values,
      dob: dayjs(values?.dob).format("YYYY-MM-DD"),
      type: values.type ? values.type : dataEdit?.type,
      department_id: values.department_id ? values.department_id : dataEdit?.department_id,
      position_id: values.position_id ? values.position_id : dataEdit?.position_id,
      grade_id: values.grade_id ? values.grade_id : dataEdit?.grade_id,
      benefits: values.benefits ? values.benefits : dataEdit?.benefits,
      remark: values.remark ? values.remark : dataEdit?.remark,
      entitle_ot: values.entitle_ot != undefined ? values.entitle_ot : (dataEdit?.entitle_ot == '1' ? true : false),
      meal_allowance_paid: values.meal_allowance_paid != undefined ? values.meal_allowance_paid : (dataEdit?.meal_allowance_paid == '1' ? true : false),
      basic_salary: values.basic_salary
        ? values.basic_salary
        : dataEdit?.basic_salary,
      audit_salary: values.basic_salary
        ? values.audit_salary
        : dataEdit?.audit_salary,
      health_insurance: values.basic_salary
        ? values.health_insurance
        : dataEdit?.health_insurance,
      meal_allowance: values.basic_salary
        ? values.meal_allowance
        : dataEdit?.meal_allowance,
      safety_insurance: values.basic_salary
        ? values.safety_insurance
        : dataEdit?.safety_insurance,
      contract_start_date: values.contract_start_date
        ? dayjs(values?.contract_start_date).format("YYYY-MM-DD")
        : dayjs(dataEdit?.contract_start_date).format("YYYY-MM-DD"),
      attendance_allowance_paid: values.attendance_allowance_paid ? !values.entitle_ot : dataEdit?.attendance_allowance_paid,
      operational_allowance_paid: values.operational_allowance_paid ? !values.entitle_ot : dataEdit?.operational_allowance_paid,
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
        setDataEdit(employee_detail);
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
            title: <Link to={ROUTER.home}>Employee Management</Link>,
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
