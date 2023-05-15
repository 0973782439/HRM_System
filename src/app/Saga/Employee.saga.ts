import { put, call, fork, take, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { CommonActions } from "../Redux/Common.slice";
import { RESPONSE_STATUS_SUCCESS } from "../../utils/httpResponseCode";
import { toast } from "react-toastify";
import { IFilter } from "../../interfaces/Employee";
import { EmployeeActions } from "../Redux/Employee.slice";
import { GetEmployee } from "../../api/Employee.api";
import { clearAccesTokenLST } from "../../utils/token";
function* handleFetchEmployee(filter: IFilter) {
  yield put(CommonActions.displayLoading());
  yield delay(500);
  try {
    const { data, status } = yield call(GetEmployee, filter);
    const { data: employeeList } = data;
    if (status === RESPONSE_STATUS_SUCCESS) {
      yield put(EmployeeActions.fetchEmployeeSuccess(employeeList));
      yield put(CommonActions.hideLoading());
    }
  } catch (error: any) {
    yield call(clearAccesTokenLST);
    yield put(EmployeeActions.fetchEmployee(filter));
  }
}
function* watchFetchEmployee() {
  while (true) {
    const actions: PayloadAction<IFilter> = yield take(
      EmployeeActions.fetchEmployee.type
    );
    yield call(handleFetchEmployee, actions.payload);
  }
}

export function* EmployeeSaga() {
  yield fork(watchFetchEmployee);
}
