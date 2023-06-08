import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAccesTokenLST } from "../../utils/token";
import { ILogIn } from "../../interfaces/Authentication";

interface AuthState {
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccesTokenLST()),
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<ILogIn>) => {},
    loginSucces: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state, actions: PayloadAction) => {
      state.isAuthenticated = false;
    },
  },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
