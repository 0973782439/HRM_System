import React, { useEffect, useState } from "react";
import { TabsProps, Tabs, Breadcrumb, Form } from "antd";
import "./employee.css";
import { useForm } from "antd/lib/form/Form";
import { GetDefaultSalary, PostEmployee } from "../../api/Employee.api";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import { toast } from "react-toastify";
import moment from "moment";
import Other from "./Tabs/Other";
import Salary from "./Tabs/Salary";
import Details from "./Tabs/Details";
import Contract from "./Tabs/Contract";
import Information from "./Tabs/Information";
const CreateEmployee = () => {
  const [defaultSalary, setDefaultSalary] = useState<any>();
  const navigate = useNavigate();
  const [form] = useForm();
  /**
   * fecth api lấy default salary
   */
  useEffect(() => {
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
  }, []);
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
   * Thêm employee
   */
  const handleAddEmployee = (values: any) => {
    const valueNew = {
      ...values,
      dob: moment(values?.dob?.$d).format("YYYY-MM-DD"),
      contract_start_date: moment(values?.contract_start_date?.$d).format(
        "YYYY-MM-DD"
      ),
    };
    const json = PostEmployee(valueNew);
    json
      .then((res: any) => {
        navigate(ROUTER.home, {
          replace: true,
        });
        toast.success("Record added");
      })
      .catch((errors: any) => {
        toast.error(errors.response.data.message);
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
          className="py-[9px] rounded-md px-3 active"
          style={{ color: "rgb(0, 145, 255)" }}
        >
          Employee Infomation
        </div>
      ),
      children: <Information></Information>,
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
      children: <Contract></Contract>,
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
      children: <Details></Details>,
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
      children: <Other></Other>,
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
            style={{ background: "rgb(0, 145, 255)" }}
          >
            Add
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

export default CreateEmployee;
