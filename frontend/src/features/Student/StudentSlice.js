import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  _id: "",
  isLoading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updateId(state, action) {
      state._id = action.payload;
    },
  },
});

export const { updateName, updateEmail, updateId } = studentSlice.actions;

export default studentSlice.reducer;
