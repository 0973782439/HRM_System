import { put, call, fork, take, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Login } from "../../api/Auth.api";
import { ILogIn } from "../../interfaces/Authentication";
import { CommonActions } from "../Redux/Common.slice";
import { RESPONSE_STATUS_SUCCESS } from "../../utils/httpResponseCode";
import { AuthActions } from "../Redux/Auth.slice";
import { toast } from "react-toastify";
function* handleLogIn(value: ILogIn) {
  yield put(CommonActions.displayLoading());
  try {
    const { data, status } = yield call(Login, value);
    if (status === RESPONSE_STATUS_SUCCESS) {
      yield delay(1000);
      yield put(AuthActions.loginSucces());
      yield put(CommonActions.hideLoading());
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield delay(1000);
    yield put(CommonActions.hideLoading());
  }
}

function* watchLogin() {
  while (true) {
    const actions: PayloadAction<ILogIn> = yield take(AuthActions.login.type);
    yield fork(handleLogIn, actions.payload);
  }
}

export function* AuthSaga() {
  yield fork(watchLogin);
}
