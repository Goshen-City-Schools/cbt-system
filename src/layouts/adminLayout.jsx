import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header.component";
import AdminSideBar from "../components/admin/SideBar";
// import AdminSideBar from "../components/user/SideBar";

export default function AdminLayout() {
  return (
    <div className="relative">
      <AdminSideBar />
      <main className="ml-[240px] overflow-x-hidden bg-[#F1F1F1]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
