import { Outlet } from "react-router-dom";
import UserSideBar from "../components/user/SideBar";
import Header from "../components/shared/Header.component";

export default function UserLayout() {
  return (
    <div className="relative">
      <UserSideBar />
      <main className="ml-[260px] overflow-x-hidden bg-[#F1F1F1]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
