import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEmployeeList, IFilter } from "../../interfaces/Employee";
interface EmployeeState {
  EmployeeList?: IEmployeeList;
}
const initialState: EmployeeState = {
  EmployeeList: undefined,
};
export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fetchEmployee: (state, actions: PayloadAction<IFilter>) => {},
    fetchEmployeeSuccess: (state, actions: PayloadAction<IEmployeeList>) => {
      state.EmployeeList = actions.payload;
    },
    fetchEmployeeFailed: (state, actions: PayloadAction) => {},
  },
});
export const EmployeeActions = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
