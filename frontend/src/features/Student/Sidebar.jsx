import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateEmail, updateName } from "./StudentSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(updateName(""));
    dispatch(updateEmail(""));
    navigate("/");
  }
  return (
    <div className="h-screen w-64 bg-indigo-600 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Student Portal</h2>
      </div>
      <nav className="flex flex-col flex-grow p-4">
        <NavLink
          to="/dashboard"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/mark-attendance"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Mark Attendance
        </NavLink>
        <NavLink
          to="/mark-leave"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Mark Leave
        </NavLink>
        <NavLink
          to="/view-attendance"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          View Attendance
        </NavLink>
        <NavLink
          to="/edit-profile"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Edit Profile
        </NavLink>
        <button
          className="mt-auto py-2 px-4 rounded-lg bg-orange-600 hover:bg-orange-700"
          onClick={() => handleClick()}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
