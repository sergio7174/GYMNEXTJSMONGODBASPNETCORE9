import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

/** Define Initial State */
const initialState = {
  accessToken: undefined, // initial accessToken state defined to undefined
  user: undefined, // initial user state defined to undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined; // set the access.Token state to undefined
      state.user = undefined; // set user state to undefined
      Cookies.remove('userInfo'); // delete cookie
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;