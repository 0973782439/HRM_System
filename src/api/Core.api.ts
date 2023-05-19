import http from "../utils/http";
import { PATH_API } from "../utils/path";

//
export const UpLoad = (documents: any) => {
  const formData = new FormData();
  // formData.append("employee_id", employee_id);
  formData.append("documents[]", documents);
  return http.post<string>(PATH_API.upload, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
