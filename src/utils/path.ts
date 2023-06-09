export const PATH_API = {
  login: "login",
  employee: "employee",
  forgot_password: "forgot-password",
  change_password: "change-password",
  logout: "logout",
  multiple_delete: "employee/multiple-delete",
  default_salary: "employee/get-default-salary",
  upload: "employee-document/upload",
  save_multiple: "contract/save-multiple",
  marriage: "marriage",
  department: "department",
  position: "position",
  grade: "grade",
  benefit: "benefit",
};
export const ROUTER = {
  home: "/employee",
  create_employee: "/employee/create-or-update",
  edit_employee: "/employee/create-or-update/:id",
  login: "/login",
  forgot_password: "/forgot-password",
  change_password: "/change-password",
  reset_password: "/settings/reset-password",
};
export const APIUrl = "https://api-training.hrm.div4.pgtest.co/api/v1/";
