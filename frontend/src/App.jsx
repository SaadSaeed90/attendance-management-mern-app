import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/Student/Login";
import Dashboard from "./features/Student/Dashboard";
import MarkAttendance from "./features/Student/MarkAttendance";
import MarkLeave from "./features/Student/MarkLeave";
import ViewAttendance from "./features/Student/ViewAttendance";
import EditProfile from "./features/Student/EditProfile";
import RegisterPage from "./features/Student/RegisterPage";
import AdminLogin from "./features/Admin/AdminLogin";
import AdminDashboard from "./features/Admin/AdminDashboard";
import ManageAttendance from "./features/Admin/ManageAttendance";
import Reports from "./features/Admin/Reports";
import LeaveApproval from "./features/Admin/LeaveApproval";
import GradingSystem from "./features/Admin/GradingSystem";
import StudentLayout from "./features/Student/StudentLayout";
import StudentList from "./features/Admin/StudentsList";
import ProtectedRoute from "./Reusable/ProtectedRoute";
import AdminLayout from "./features/Admin/AdminLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <RegisterPage />,
      path: "/register",
    },
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <ProtectedRoute to="/" />,
      children: [
        {
          element: <StudentLayout />,
          children: [
            {
              element: <Dashboard />,
              path: "/dashboard",
            },
            {
              element: <MarkAttendance />,
              path: "/mark-attendance",
            },
            {
              element: <MarkLeave />,
              path: "/mark-leave",
            },
            {
              element: <ViewAttendance />,
              path: "/view-attendance",
            },
            {
              element: <EditProfile />,
              path: "/edit-profile",
            },
          ],
        },
      ],
    },
    {
      element: <AdminLogin />,
      path: "/admin/",
    },
    {
      element: <ProtectedRoute to="/admin" />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              element: <AdminDashboard />,
              path: "/admin/dashboard",
            },
            {
              element: <ManageAttendance />,
              path: "/admin/manage-attendance/:_id",
            },
            {
              element: <StudentList />,
              path: "/admin/students-list",
            },
            {
              element: <Reports />,
              path: "/admin/reports",
            },
            {
              element: <LeaveApproval />,
              path: "/admin/leave-approval",
            },
            {
              element: <GradingSystem />,
              path: "/admin/grading",
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
