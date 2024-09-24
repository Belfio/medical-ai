import AddModelSheet from "./AddModelSheet";
import Header from "./Header";
import ListNav from "./ListNav";
import { Outlet } from "@remix-run/react";
import { SheetProvider } from "./providers/SheetProvider";

// create context add model sheet and add dataset sheet open or close

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <SheetProvider>
        <div className="flex">
          {/* SideBar */}
          <div className="w-1/6 min-w-64">
            <AddModelSheet />
            <ListNav />
          </div>
          <div className="w-5/6 bg-white p-4">
            <Outlet />
          </div>
        </div>
      </SheetProvider>
    </>
  );
}
