import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "./Redux/Auth.slice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import CommonReducer from "./Redux/Common.slice";
import EmployeeReducer from "./Redux/Employee.slice";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    common: CommonReducer,
    employee: EmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
sagaMiddleware.run(rootSaga);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
