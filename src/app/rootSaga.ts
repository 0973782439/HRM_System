import { all } from "redux-saga/effects";
import { AuthSaga } from "./Saga/Auth.saga";
import { EmployeeSaga } from "./Saga/Employee.saga";

export function* rootSaga() {
  yield all([AuthSaga(), EmployeeSaga()]);
}
