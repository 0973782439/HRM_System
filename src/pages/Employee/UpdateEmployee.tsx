import { Breadcrumb, Form, Tabs, TabsProps } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Information from "./Tabs/Information";
import Contract from "./Tabs/Contract";
import Details from "./Tabs/Details";
import Salary from "./Tabs/Salary";
import Other from "./Tabs/Other";
import { useForm } from "antd/lib/form/Form";
import { EditEmployee, GetEmployeeById } from "../../api/Employee.api";
import { IEmployee } from "../../interfaces/Employee";
import moment from "moment";
import { toast } from "react-toastify";
import { ROUTER } from "../../utils/path";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  // const [defaultSalary, setDefaultSalary] = useState<any>();
  const [form] = useForm();
  const { id } = useParams();
  const handleUpdateEmployee = (values: any) => {
    const valueNew = {
      ...values,
      dob: moment(values?.dob?.$d).format("YYYY-MM-DD"),
      contract_start_date: moment(values?.contract_start_date?.$d).format(
        "YYYY-MM-DD"
      ),
    };
    const json = EditEmployee(id, valueNew);
    json
      .then((res: any) => {
        navigate(ROUTER.home, {
          replace: true,
        });
        toast.success("Change saved");
      })
      .catch((errors: any) => {
        toast.error(errors.response.data.message);
      });
  };
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
  useEffect(() => {
    const getEmployeeById = GetEmployeeById(Number(id));
    getEmployeeById.then((res: any) => {
      const employee_detail: IEmployee = res.data.data;
      const name_benefits = employee_detail.benefits.map((item: any) => {
        {
          return { value: item.id, label: item.name };
        }
      });

      form.setFieldsValue({
        name: employee_detail.name,
        gender: employee_detail.gender,
        mother_name: employee_detail.mother_name,
        pob: employee_detail.pob,
        ktp_no: employee_detail.ktp_no,
        nc_id: employee_detail.nc_id,
        home_address_1: employee_detail.home_address_1,
        home_address_2: employee_detail.home_address_2,
        mobile_no: employee_detail.mobile_no,
        tel_no: employee_detail.tel_no,
        marriage_id: employee_detail.marriage_id,
        card_number: employee_detail.card_number,
        bank_account_no: employee_detail.bank_account_no,
        bank_name: employee_detail.bank_name,
        family_card_number: employee_detail.family_card_number,
        safety_insurance_no: employee_detail.safety_insurance_no,
        health_insurance_no: employee_detail.health_insurance_no,
        department_id: employee_detail.department_id,
        position_id: employee_detail.position_id,
        grade_id: employee_detail.grade_id,
        remark: employee_detail.remark,
        basic_salary: employee_detail.basic_salary,
        audit_salary: employee_detail.audit_salary,
        safety_insurance: employee_detail.safety_insurance,
        health_insurance: employee_detail.health_insurance,
        meal_allowance: employee_detail.meal_allowance,
        entitle_ot: employee_detail.entitle_ot,
        meal_allowance_paid: employee_detail.meal_allowance_paid,
        operational_allowance_paid: employee_detail.operational_allowance_paid,
        attendance_allowance_paid: employee_detail.attendance_allowance_paid,
        staff_id: employee_detail.staff_id,
        dob: moment(employee_detail.dob, "YYYY-MM-DD"),
        contract_start_date: moment(
          employee_detail.contract_start_date,
          "YYYY-MM-DD"
        ),
        type: Number(employee_detail.type),
        benefits: name_benefits,
      });
      console.log(res.data.data);
      console.log(employee_detail.attendance_allowance_paid);
    });
  }, []);
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
      children: <Information id={id}></Information>,
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
      children: <Contract id={id}></Contract>,
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
            title: "Edit employee",
          },
        ]}
      />
      <Form
        // initialValues={defaultSalary}
        form={form}
        onFinish={handleUpdateEmployee}
      >
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
