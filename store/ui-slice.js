import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: {status: '', message: ''}, wrongPwWarning: false }, // status: error or success
  reducers: {
    updateNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      }
      console.log(state.notification)
    },
    wrongPwWarningNotification: (state, action) => {
      state.wrongPwWarning = action.payload;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
