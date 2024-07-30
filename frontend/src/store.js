import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./features/Student/StudentSlice";
import adminReducer from "./features/Admin/AdminSlice";

const store = configureStore({
  reducer: { student: studentReducer, admin: adminReducer },
});

export default store;
