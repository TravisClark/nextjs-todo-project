import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: {status: '', message: ''} }, // status: error or success
  reducers: {
    updateNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      }
      console.log(state.notification)
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
