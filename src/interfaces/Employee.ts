import { EGender } from "./Common";

type IContract = {
  id: string;
  contract_date: string;
  name: string;
  employee_id: number;
  document: string;
};
type IBenefit = {
  id: number;
  code: string;
  name: string;
  type: number;
  value: string;
};
export interface IEmployee {
  attendance_allowance_paid: string; // Trợ cấp tham dự được trả
  audit_salary: number; //Mức lương kiểm toán
  bank_account_no: number; //Số tài khoản ngân hàng
  bank_name: string; //Tên ngân hàng
  basic_salary: number; //Lương cơ bản
  card_number: number; //Số thẻ
  company_id: number; //Công ty đăng nhập
  contracts: IContract[]; //   contract_start_date:;/Định dạng ngày bắt đầu hợp đồng: yyyy-mm-dd)
  contract_start_date: string;
  department_id: string; //Phòng
  dob: string; //Ngày sinh
  entitle_ot: string; //Cho phép OT
  family_card_number: number; //Số thẻ gia đình
  gender: EGender;
  grade_id: number; //Cấp
  health_insurance: number; //Số tiền Bảo hiểm Y tế
  health_insurance_no: number; //Bảo hiểm y tế Không
  home_address_1: string; //Địa chỉ nhà 1
  home_address_2: string; //
  ktp_no: number; //
  marriage_id: number; //Tình trạng hôn nhân
  meal_allowance: number; //meal_allowance
  meal_allowance_paid: string; //Trợ cấp bữa ăn được trả
  mobile_no: number; //Điện thoại di động Không
  mother_name: string; //Tên mẹ
  name: string; // Tên
  nc_id: number; //ID thẻ quốc gia
  operational_allowance_paid: string; //Phụ cấp hoạt động được trả
  pob: string; //Nơi sinh
  position_id: number; // Chức vụ
  remark: string; // Nhận xét
  safety_insurance: number; //Số tiền bảo hiểm an toàn
  safety_insurance_no: number; //Bảo hiểm an toàn Không
  shift: string; //Sự thay đổi
  tel_no: number; //Số điện thoại
  type: number; //Loại nhân viên
  id: number; //
  department_name: string; //
  marriage_code: string; //
  position_name: string;
  grade_name: string; //
  staff_id: string;
  old_staff_id: string;
  benefits: IBenefit[];
  document_upload: [];
  //   grade_prefix; //
  //   manager_id; //
  //   manager_name; //
  //   minimum_salary_used:;//
}
export interface ILinks {
  url: string | null;
  label: string;
  active: boolean;
}
export interface IPagination {
  current_page: number;
  from?: number;
  to?: number;
  total?: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: ILinks[];
  path: string;
  per_page: number;
  prev_page_url: string | null;
}
export interface IEmployeeList {
  data: IEmployee[] | [];
  current_page: number;
  from?: number;
  to?: number;
  total?: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  links: ILinks[];
  path: string;
  per_page?: number;
  prev_page_url: string | null;
}

export interface IFilter {
  page?: string | null;
  search?: string | null;
}
