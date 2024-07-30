import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminEmail: "",
  adminPassword: "",
  isLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminEmail(state, action) {
      state.adminEmail = action.payload;
    },
  },
});

export const { updateAdminEmail } = adminSlice.actions;

export default adminSlice.reducer;
