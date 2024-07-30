import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function StudentLayout() {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </main>
  );
}

export default StudentLayout;
