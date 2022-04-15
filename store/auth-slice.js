import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    email: "",
    password: "",
    confirmPassword: "",
    warningMessage: "",
    validation: {pwChecked: true},
  },
  reducers: {
    registerPwChecked(state, action) {
      action.payload.password !== action.payload.confirmPassword
        ? (state.pwChecked = false)
        : (state.pwChecked = true);
    },
    loginHandler(state, action) {
      localStorage.setItem('accountData', JSON.stringify(action.payload));
      state.isLoggedIn = true;

    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
