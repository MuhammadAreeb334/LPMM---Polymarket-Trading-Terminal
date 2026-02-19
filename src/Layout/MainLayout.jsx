import React from "react";
import TopBar from "../Components/TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <React.Fragment>
    <div className="flex flex-col h-screen bg-[#FAFAFA] dark:bg-[#111317] text-gray-900 dark:text-white transition-colors">
      <TopBar />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
    </React.Fragment>
  );
};

export default MainLayout;
{/* <div className="flex flex-col h-screen bg-[#FAFAFA] dark:bg-[#111317] text-gray-900 dark:text-white transition-colors">
      <TopBar />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div> */}