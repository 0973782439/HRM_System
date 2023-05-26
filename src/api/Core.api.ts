import http from "../utils/http";
import { PATH_API } from "../utils/path";

//
export const UpLoad = (employee_id: any, documents: any, deleted_ids?: any) => {
  const formData = new FormData();
  formData.append("employee_id", employee_id);
  deleted_ids.map((id: any) => formData.append("deleted_ids[]", id));
  documents.map((file: any) => formData.append("documents[]", file));
  return http.post<string>(PATH_API.upload, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const UploadContract = (
  employee_id: any,
  files: any,
  deletedIdContract: any
) => {
  const formData = new FormData();
  formData.append("employee_id", employee_id);
  files.map((file: any) => {
    formData.append("names[]", file.name);
    formData.append("contract_dates[]", file.contract_date);
    formData.append("documents[]", file.document);
    formData.append("modified_contracts[]", "");
  });
  deletedIdContract.map((id: any) => {
    formData.append("deleted_contracts[]", id);
  });
  return http.post<string>(PATH_API.save_multiple, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
