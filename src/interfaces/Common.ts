export interface IResponseApi<Data> {
  message?: string;
  data: Data;
  result?: boolean;
}
export type AuthResponse = IResponseApi<{ token: string; user: string }>;
export interface IDataResponse {
  data: [];
}
export enum Language {
  vi = "vi",
  en = "en",
}
export enum EGender {
  Male = 0,
  Female = 1,
}
export enum EEmployeeType {
  Permanent = 0,
  PartTime = 1,
  ContractWorker = 2,
}
export enum EEntitleOT {
  Checked = 1,
  UnChecked = 0,
}
export enum EMealAllowancePaid {
  Checked = 1,
  UnChecked = 0,
}
