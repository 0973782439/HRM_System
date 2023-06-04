import { IForgotPass, ILogIn } from "../interfaces/Authentication";
import { IResponseApi } from "../interfaces/Common";
import http from "../utils/http";
import { PATH_API } from "../utils/path";

export const Login = (value: ILogIn) =>
  http.post<IResponseApi<ILogIn>>(PATH_API.login, value);
export const ForgotPass = (value: IForgotPass) =>
  http.post(PATH_API.forgot_password, value);
export const Logout = () => http.post(PATH_API.logout);
export const ChangePassword = (value: any) =>
  http.post(PATH_API.change_password, value);
