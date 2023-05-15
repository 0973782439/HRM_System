import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface CommonState {
  isLoading: boolean;
}
const initialState: CommonState = {
  isLoading: false,
};
export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    displayLoading: (state, actions: PayloadAction) => {
      state.isLoading = true;
    },
    hideLoading: (state, actions: PayloadAction) => {
      state.isLoading = false;
    },
  },
});
export const CommonActions = CommonSlice.actions;
export default CommonSlice.reducer;
