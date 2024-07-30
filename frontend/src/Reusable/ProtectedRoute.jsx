/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  updateEmail,
  updateId,
  updateName,
} from "../features/Student/StudentSlice";

const ProtectedRoute = ({ to }) => {
  const passedUser = to === "/" ? "user" : "admin";
  const passedToken = to === "/" ? "token" : "adminToken";
  const userString = localStorage.getItem(passedUser);
  const token = localStorage.getItem(passedToken);

  const user = JSON.parse(userString);
  const dispatch = useDispatch();
  if (user) {
    dispatch(updateName(user.name));
    dispatch(updateEmail(user.email));
    dispatch(updateId(user._id));
  }

  return user && token ? <Outlet /> : <Navigate to={to} />;
};

export default ProtectedRoute;
