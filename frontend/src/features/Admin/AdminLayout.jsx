import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

function AdminLayout() {
  return (
    <main className="flex">
      <SidebarAdmin />
      <div className="flex-grow">
        <Outlet />
      </div>
    </main>
  );
}

export default AdminLayout;
