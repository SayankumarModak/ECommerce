import { useState } from "react";
import AdminSidebar from "./admin-sidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "./admin-header";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-screen">
      {/* admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col px-6">
        <AdminHeader setOpen={setOpenSidebar} />
        <main children="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
