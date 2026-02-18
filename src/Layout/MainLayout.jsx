import React from "react";
import TopBar from "../Components/TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <React.Fragment>
    <TopBar />
    <div className="h-[95vh] overflow-auto bg-[#FAFAFA] dark:bg-[#111317] text-gray-900 dark:text-white transition-colors">
      <main className="p-4 border border-amber-50 ">
        <Outlet />
      </main>
    </div>
    </React.Fragment>
  );
};

export default MainLayout;
