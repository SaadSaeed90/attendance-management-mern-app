import { useDispatch } from "react-redux";
import { updateAdminEmail } from "./AdminSlice";
import { NavLink, useNavigate } from "react-router-dom";

function SidebarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(updateAdminEmail(""));
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin");
  }
  return (
    <div className="h-screen w-64 bg-indigo-600 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Portal</h2>
      </div>
      <nav className="flex flex-col flex-grow p-4">
        <NavLink
          to="/admin/dashboard"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/students-list"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Student Records
        </NavLink>
        <NavLink
          to="/admin/leave-approval"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Leave Requests
        </NavLink>
        <NavLink
          to="/admin/grading"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Grading System
        </NavLink>
        <NavLink
          to="/admin/reports"
          className="mb-2 py-2 px-4 rounded-lg hover:bg-indigo-500"
        >
          Reports
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
}

export default SidebarAdmin;
