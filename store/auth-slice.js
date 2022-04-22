import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    accountData: {},
    warningMessage: "",
    validation: { pwChecked: true },
  },
  reducers: {
    loginHandler(state, action) {
      localStorage.setItem("accountData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    autoLoginHandler(state) {
      state.accountData = JSON.parse(localStorage.getItem("accountData"));
      state.accountData
        ? (state.isLoggedIn = true)
        : (state.isLoggedIn = false);
    },
    logoutHandler(state) {
      localStorage.removeItem("accountData");
      state.isLoggedIn = false;
      state.accountData = {};
    },
    registerStateUpdates(state) {
      state.registerState = true;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
