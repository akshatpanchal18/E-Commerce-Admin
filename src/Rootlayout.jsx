import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";

function RootLayout() {
  return (
    <div className="flex flex-col  min-h-screen">
      <div className="z-50">
        <SideBar />
      </div>

      <div className="flex-1  sm:ml-64 p-6 overflow-hidden max-sm:p-0">
        <div className="p-2 z-10 max-sm:p-0">
          <Header />
        </div>

        <div className=" z-0 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
