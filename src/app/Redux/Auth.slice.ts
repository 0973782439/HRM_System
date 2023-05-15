import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAccesTokenLST } from "../../utils/token";
import { ILogIn } from "../../interfaces/Authentication";

interface AuthState {
  // user?: IUser;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccesTokenLST()),
  // user: undefined,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<ILogIn>) => {},
    loginSucces: (state) => {
      state.isAuthenticated = true;
    },
    // getUser: (state, actions: PayloadAction<IUser>) => {
    //   state.user = actions.payload;
    // },
    logout: (state, actions: PayloadAction) => {
      state.isAuthenticated = false;
    },
  },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
