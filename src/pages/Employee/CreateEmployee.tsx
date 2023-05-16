import React, { useEffect, useState } from "react";
import { Breadcrumb, DatePicker, Space, message } from "antd";
import type { DatePickerProps } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./employee.css";
import { useForm } from "react-hook-form";
import { IEmployee } from "../../interfaces/Employee";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { Checkboxsingle } from "../../components/Input/Checkbox";
import { IMarriage } from "../../interfaces/Marriage";
import { IResponseApi } from "../../interfaces/Common";
import http from "../../utils/http";
import { IDepartment } from "../../interfaces/Department";
import { IPosition } from "../../interfaces/Position";
import { GetDefaultSalary, PostEmployee } from "../../api/Employee.api";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import { toast } from "react-toastify";
import { rules as Rules } from "../../utils/rules";
import { IGrade } from "../../interfaces/Grade";
import { IBenefits } from "../../interfaces/Benefits";
// type employee
const typeState = [
  { id: 0, name: "Permanent" },
  { id: 1, name: "Part-time" },
  { id: 2, name: "Contract" },
];
const CreateEmployee = () => {
  const [marriage, setMarriage] = useState<IMarriage[]>();
  const [department, setDepartment] = useState<IDepartment[]>();
  const [position, setPosition] = useState<IPosition[]>();
  const [type, setType] = useState(typeState);
  const [grade, setGrade] = useState<IGrade[]>();
  const [benefits, setBenefits] = useState<IBenefits[]>();
  const [defaultSalary, setDefaultSalary] = useState<any>();
  const navigate = useNavigate();
  const rules = Rules();
  // date time
  const [isDobEmpty, setIsDobEmpty] = useState(false);
  const [isDateStart, setIsDateStart] = useState(false);
  const [dob, setDob] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  // Use hook form
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>();
  // khi các values thay đổi
  const [entitle_ot, basic_salary, grade_id] = watch([
    "entitle_ot",
    "basic_salary",
    "grade_id",
  ]);
  // Thay đổi tiền lương (tab4)
  useEffect(() => {
    const safetyInsuranceNew = Number((3 / 100) * basic_salary);
    const healthInsuranceNew = Number((1 / 100) * basic_salary);
    setValue("health_insurance", healthInsuranceNew);
    setValue("safety_insurance", safetyInsuranceNew);
    setDefaultSalary((prev: any) => ({
      ...prev,
      safety_insurance: safetyInsuranceNew,
      health_insurance: healthInsuranceNew,
      basic_salary: basic_salary,
    }));
  }, [basic_salary]);
  // Thay đổi grade
  useEffect(() => {
    const getBenefits = http.get<IResponseApi<IMarriage>>(
      `benefit?grade_id=${grade_id}`
    );
    getBenefits.then((res: any) => {
      setBenefits(res.data.data);
    });
    // const gradeName = grade?.filter((item) => item.id == e.target.value);
    // setBenefits(gradeName as any);
  }, [grade_id]);
  // fecth api lấy default salary
  useEffect(() => {
    const getDefaultSalary = GetDefaultSalary();
    getDefaultSalary.then((res: any) => {
      setDefaultSalary(res.data.data);
      setValue("basic_salary", defaultSalary?.basic_salary | 0);
      setValue("audit_salary", defaultSalary?.audit_salary | 0);
      setValue("safety_insurance", defaultSalary?.safety_insurance | 0);
      setValue("health_insurance", defaultSalary?.health_insurance | 0);
      setValue("meal_allowance", defaultSalary?.meal_allowance | 0);
    });
  }, []);
  // fecth api
  useEffect(() => {
    const getBenefits = http.get<IResponseApi<IMarriage>>("benefit");
    getBenefits.then((res: any) => {
      setBenefits(res.data.data);
    });
    const getMarriage = http.get<IResponseApi<IMarriage>>("marriage");
    getMarriage.then((res: any) => {
      setMarriage(res.data.data);
    });
    const getDepartment = http.get<IResponseApi<IDepartment>>("department");
    getDepartment.then((res: any) => {
      setDepartment(res.data.data);
    });
    const getPosition = http.get<IResponseApi<IPosition>>("position");
    getPosition.then((res: any) => {
      setPosition(res.data.data);
    });
    const getGrade = http.get<IResponseApi<IGrade>>("grade");
    getGrade.then((res: any) => {
      setGrade(res.data.data);
    });
  }, []);
  // DatePicker
  const onChangeDob: DatePickerProps["onChange"] = (date, dateString) => {
    if (!date) {
      setIsDobEmpty(true);
    } else {
      setIsDobEmpty(false);
      setDob(dateString);
    }
  };
  const onChangeDateStart: DatePickerProps["onChange"] = (date, dateString) => {
    if (!date) {
      setIsDateStart(true);
    } else {
      setIsDateStart(false);
      setDateStart(dateString);
    }
  };
  // Create EMployee
  const handleCreateEmployee = (values: IEmployee) => {
    const valueNew = {
      ...values,
      dob: dob,
      contract_start_date: dateStart,
      position_id: Number(values.position_id),
    };
    const json = PostEmployee(valueNew);
    json
      .then((res: any) => {
        navigate(ROUTER.home, {
          replace: true,
        });
        toast.success("Record added");
      })
      .catch();
  };
  // render option
  const renderMarriageStatus = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Marriage Status
      </option>,
    ];
    marriage?.map((item: IMarriage) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  const renderGrade = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Grade
      </option>,
    ];
    grade?.map((item: IGrade) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  const renderBenefit = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Benefits
      </option>,
    ];
    benefits?.map((item: IBenefits) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  const renderMDepartment = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Department
      </option>,
    ];
    department?.map((item: IDepartment) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  const renderPosition = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Position
      </option>,
    ];
    position?.map((item: IPosition) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  const renderTypeEmployee = () => {
    const arr: JSX.Element[] = [
      <option disabled value={""} key={""}>
        Choose Type
      </option>,
    ];
    type?.map((item: any) => {
      arr.push(
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });
    return arr;
  };
  // hàm chỉ nhận số
  const onlyGetNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  // Tab
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <button className="py-[9px] rounded-md px-3">
          Employee Infomation
        </button>
      ),
      children: (
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
          <form className="w-full flex px-[20px]">
            <div className="w-1/2">
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("name", rules.isRequired) }}
                  name="name"
                  type="text"
                  label="Name"
                  id="name"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  errorMessage={errors.name?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  value=""
                  register={{ ...register("gender", rules.isRequired) }}
                  id="gender"
                  isRequired={true}
                  label="Gender"
                  errorMessage={errors.gender?.message}
                >
                  <option value="" disabled>
                    Choose Gender
                  </option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </Select>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("mother_name") }}
                  name="mother_name"
                  type="text"
                  label="Mother Name"
                  id="mother_name"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <label
                  htmlFor="dob"
                  className="block text-base font-medium text-[#11181C] w-[162px]"
                >
                  Date of birth
                  <span className="text-[#E5484D]">*</span>
                </label>
                <div className="flex flex-col">
                  <Space direction="vertical">
                    <DatePicker
                      className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                      onChange={onChangeDob}
                    />
                  </Space>
                  {isDobEmpty && (
                    <p className="text-red-600 bg-white text-xs italic">
                      Please input date of birth
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("pob") }}
                  name="pob"
                  type="text"
                  label="Place of birth"
                  id="pob"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("ktp_no", rules.isRequired) }}
                  name="ktp_no"
                  type="text"
                  label="KTP No."
                  id="ktp_no"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  errorMessage={errors.ktp_no?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("nc_id", rules.isRequired) }}
                  name="nc_id"
                  type="text"
                  label="National Card ID"
                  id="nc_id"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  errorMessage={errors.nc_id?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("home_address_1") }}
                  name="home_address_1"
                  type="text"
                  label="Home Address 1"
                  id="home_address_1"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("home_address_2") }}
                  name="home_address_2"
                  type="text"
                  label="Home Address 2"
                  id="home_address_2"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("mobile_no") }}
                  name="mobile_no"
                  type="text"
                  label="Mobile No."
                  id="mobile_no"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("tel_no") }}
                  name="tel_no"
                  type="text"
                  label="Tel No."
                  id="tel_no"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  value=""
                  register={{ ...register("marriage_id") }}
                  id="marriage_id"
                  label="Marriage Status"
                >
                  {renderMarriageStatus()}
                </Select>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("card_number") }}
                  name="card_number"
                  type="text"
                  label="Bank Card No."
                  id="card_number"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("bank_account_no") }}
                  name="bank_account_no"
                  type="text"
                  label="Bank Account No."
                  id="bank_account_no"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  register={{ ...register("bank_name") }}
                  name="bank_name"
                  type="text"
                  label="Bank Name"
                  id="bank_name"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("family_card_number") }}
                  name="family_card_number"
                  type="text"
                  label="Family Card Number"
                  id="family_card_number"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("safety_insurance_no") }}
                  name="safety_insurance_no"
                  type="text"
                  label="Safety Insurance No."
                  id="safety_insurance_no"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
              <div className="flex items-center justify-end gap-4 mb-[10px]">
                <Input
                  onlyGetNumber={onlyGetNumber}
                  register={{ ...register("health_insurance_no") }}
                  name="health_insurance_no"
                  type="text"
                  label="Health Insurance No."
                  id="health_insurance_no"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                ></Input>
              </div>
            </div>
          </form>
        </section>
      ),
    },
    {
      key: "2",
      label: (
        <button className="py-[9px] rounded-md px-3">
          Contract Information
        </button>
      ),
      children: (
        <section className="container">
          <div className="title_required flex justify-between">
            <h2 className="text-xl font-medium text-[#11181C]">
              Contract Information
            </h2>
            <p className="text-[#687076]">
              Required (<span className="text-[#E5484D]">*</span>)
            </p>
          </div>
          <hr className="hr_action" />
          <form className="w-full flex flex-col px-[20px]">
            <div className="w-1/2">
              <div className="flex items-center gap-4 mb-[10px]">
                <label
                  htmlFor="contract_start_date"
                  className="block text-base font-medium text-[#11181C] w-[162px]"
                >
                  Date Start
                  <span className="text-[#E5484D]">*</span>
                </label>
                <div className="flex flex-col">
                  <Space direction="vertical">
                    <DatePicker
                      className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                      onChange={onChangeDateStart}
                    />
                  </Space>
                  {isDateStart && (
                    <p className="text-red-600 bg-white text-xs italic">
                      Please input Date Start
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                  value=""
                  register={{ ...register("type", rules.isRequired) }}
                  id="type"
                  label="Employee Type"
                  isRequired={true}
                  errorMessage={errors.type?.message}
                >
                  {renderTypeEmployee()}
                </Select>
              </div>
            </div>
          </form>
          <div
            className="w-full mt-[10px] rounded-md "
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
              <form className="flex flex-col gap-[10px] max-w-[400px]">
                <div className="flex items-center gap-4 mb-[10px]">
                  <label
                    htmlFor="contract_start_date"
                    className="block text-base font-medium text-[#11181C] w-[162px]"
                  >
                    Contract Date
                  </label>
                  <div className="flex flex-col">
                    <Space direction="vertical">
                      <DatePicker
                        className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                        onChange={onChangeDateStart}
                      />
                    </Space>
                    {isDateStart && (
                      <p className="text-red-600 bg-white text-xs italic">
                        Please input Contract Date
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 mb-[10px]">
                  <Input
                    register={{ ...register("contracts") }}
                    name="contracts"
                    type="text"
                    label="Contract Name"
                    id="contracts"
                    className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                    errorMessage={errors.contracts?.message}
                  ></Input>
                </div>
                <div className="flex items-center gap-[10px] mt-3">
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
                        style={{
                          color: "rgb(0, 145, 255)",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.81825 1.18191C7.64251 1.00618 7.35759 1.00618 7.18185 1.18191L4.18185 4.18191C4.00611 4.35765 4.00611 4.64257 4.18185 4.81831C4.35759 4.99404 4.64251 4.99404 4.81825 4.81831L7.05005 2.58651V9.49999C7.05005 9.74852 7.25152 9.94999 7.50005 9.94999C7.74858 9.94999 7.95005 9.74852 7.95005 9.49999V2.58651L10.1819 4.81831C10.3576 4.99404 10.6425 4.99404 10.8182 4.81831C10.9944.64257 10.994 4.35765 10.8182 4.18191L7.81825 1.18191ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    Upload File
                    <input type="file" className="hidden" />
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
              </form>
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
                      <th className="py-[3px] px-[10px] rounded-tr-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      key: "3",
      label: (
        <button className="py-[9px] rounded-md px-3">Employment Details</button>
      ),
      children: (
        <section className="container">
          <div className="title_required flex justify-between">
            <h2 className="text-xl font-medium text-[#11181C]">
              Employment Details
            </h2>
            <p className="text-[#687076]">
              Required (<span className="text-[#E5484D]">*</span>)
            </p>
          </div>
          <hr className="hr_action" />
          <form className="w-full flex flex-col px-[20px]">
            <div className="w-1/2">
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  value=""
                  register={{ ...register("department_id") }}
                  id="department_id"
                  label="Department"
                >
                  {renderMDepartment()}
                </Select>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[342px]"
                  value=""
                  register={{ ...register("position_id") }}
                  id="position_id"
                  label="Position"
                >
                  {renderPosition()}
                </Select>
              </div>
            </div>
            <div className="w-full mt-[10px]">
              <Checkboxsingle
                register={{ ...register("entitle_ot") }}
                id="entitle_ot"
                name="entitle_ot"
                label="Entitled OT"
              ></Checkboxsingle>
              <Checkboxsingle
                register={{ ...register("meal_allowance_paid") }}
                id="meal_allowance_paid"
                name="meal_allowance_paid"
                label="Meal Allowance Paid"
              ></Checkboxsingle>
              <Checkboxsingle
                register={{ ...register("operational_allowance_paid") }}
                id="operational_allowance_paid"
                name="operational_allowance_paid"
                label="Operational Allowance Paid"
                isChecked={!entitle_ot}
                isDisabled={true}
              ></Checkboxsingle>
              <Checkboxsingle
                register={{ ...register("attendance_allowance_paid") }}
                id="attendance_allowance_paid"
                name="attendance_allowance_paid"
                label="Attendance Allowance Paid"
                isChecked={!entitle_ot}
                isDisabled={true}
              ></Checkboxsingle>
            </div>
          </form>
        </section>
      ),
    },
    {
      key: "4",
      label: (
        <button className="py-[9px] rounded-md px-3">Salary & Wages</button>
      ),
      children: (
        <section className="container">
          <div className="title_required flex justify-between">
            <h2 className="text-xl font-medium text-[#11181C]">
              Salary & Wages
            </h2>
            <p className="text-[#687076]">
              Required (<span className="text-[#E5484D]">*</span>)
            </p>
          </div>
          <hr className="hr_action" />
          <form className="w-full flex px-[20px]">
            <div className="w-1/2">
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("basic_salary", rules.isRequired) }}
                  name="basic_salary"
                  type="number"
                  label="Basic Salary"
                  id="basic_salary"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                  errorMessage={errors.basic_salary?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("audit_salary", rules.isRequired) }}
                  name="audit_salary"
                  type="number"
                  label="Basic Salary (Audit)"
                  id="audit_salary"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                  errorMessage={errors.audit_salary?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{
                    ...register("safety_insurance", rules.isRequired),
                  }}
                  name="safety_insurance"
                  type="number"
                  label="Safety Insurance Amount"
                  id="safety_insurance"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                  errorMessage={errors.safety_insurance?.message}
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("health_insurance") }}
                  name="health_insurance"
                  type="number"
                  label="Healthy Insurance Amount"
                  id="health_insurance"
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                ></Input>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Input
                  register={{ ...register("meal_allowance", rules.isRequired) }}
                  name="meal_allowance"
                  type="number"
                  label="Meal Allowance"
                  id="meal_allowance"
                  isRequired={true}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[316px]"
                  errorMessage={errors.meal_allowance?.message}
                ></Input>
              </div>
            </div>
          </form>
        </section>
      ),
    },
    {
      key: "5 ",
      label: <button className="py-[9px] rounded-md px-3">Others</button>,
      children: (
        <section className="container">
          <div className="title_required flex justify-between">
            <h2 className="text-xl font-medium text-[#11181C]">Others</h2>
            <p className="text-[#687076]">
              Required (<span className="text-[#E5484D]">*</span>)
            </p>
          </div>
          <hr className="hr_action" />
          <form className="w-full flex flex-col px-[20px]">
            <div className="w-1/2">
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                  value=""
                  register={{ ...register("grade_id") }}
                  id="grade"
                  label="Grade"
                >
                  {renderGrade()}
                </Select>
                <div>
                  {/* {benefits?.benefits?.map((benefit: any) => {
                    return <span key={benefit.id}>{benefit.name}</span>;
                  })} */}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <Select
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                  value=""
                  register={{ ...register("benefit") }}
                  id="benefit"
                  label="Benefit"
                >
                  {renderBenefit()}
                </Select>
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <label
                  htmlFor="remark"
                  className="block text-base font-medium text-[#11181C] w-[162px]"
                >
                  Remark
                </label>

                <textarea
                  {...register("remark")}
                  name="remark"
                  id="remark"
                  rows={2}
                  defaultValue={""}
                  className="bg-[#F1F3F5] text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px] resize-none"
                />
              </div>
              <div className="flex items-center gap-4 mb-[10px]">
                <label className="block text-base font-medium text-[#11181C] w-[162px]">
                  HRM User Account
                </label>
                <select
                  disabled
                  className="text-[#11181C] text-base rounded-lg py-3 px-3 outline-none w-[260px]"
                  style={{ background: "rgba(0, 0, 0, 0.12)" }}
                ></select>
              </div>
            </div>
          </form>
          <div
            className="w-full mt-[10px] rounded-md px-5 py-3"
            style={{ border: "1px solid rgb(223, 227, 230)" }}
          >
            <form className="flex flex-col gap-[10px]">
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
                        fill="black"
                      />
                    </svg>
                  </span>
                  Upload File
                  <input type="file" className="hidden" />
                </label>
              </div>
            </form>
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
              </table>
            </div>
          </div>
        </section>
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
      <div className="flex justify-between">
        <h1 className="text-4xl font-medium mt-3">Employee Management</h1>
        <button
          onClick={handleSubmit(handleCreateEmployee)}
          type="submit"
          className="px-6 py-3 bg-[#C1C8CD] rounded-md text-[#F1F3F5]"
        >
          Add
        </button>
      </div>
      <Tabs
        type="card"
        tabBarStyle={{ marginTop: "20px" }}
        defaultActiveKey="1"
        items={items}
      />
    </>
  );
};

export default CreateEmployee;
