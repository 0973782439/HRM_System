import { IResponseApi } from "../interfaces/Common";
import { IEmployee, IEmployeeList, IFilter } from "../interfaces/Employee";
import http from "../utils/http";
import { PATH_API } from "../utils/path";
export const GetEmployee = (filter?: IFilter) =>
  http.get<IResponseApi<IEmployeeList>>(PATH_API.employee, {
    params: { page: filter?.page, search: filter?.search },
  });
export const DeleteMultipleEmployee = (record_ids: any) =>
  http.delete(PATH_API.multiple_delete, { data: record_ids });

export const PostEmployee = (data: IEmployee) =>
  http.post(PATH_API.employee, data);

export const GetDefaultSalary = () => http.get(PATH_API.default_salary);
