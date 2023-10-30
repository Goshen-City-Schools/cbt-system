import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/SideBar";
import AdminHeader from "../components/admin/Header.component";
// import AdminSideBar from "../components/user/SideBar";

export default function AdminLayout() {
  return (
    <div className="relative">
      <AdminSideBar />
      <main className="ml-[280px] overflow-x-hidden bg-[#F1F1F1]">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
}
