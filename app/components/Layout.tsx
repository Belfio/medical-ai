import Header from "./Header";
import ListNav from "./ListNav";
import { Outlet } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <div className="flex">
        {/* SideBar */}
        <div className="w-1/6 min-w-64">
          <ListNav />
        </div>
        <div className="w-5/6 bg-white p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
