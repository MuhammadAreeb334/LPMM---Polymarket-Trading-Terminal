import React from "react";
import TopBar from "../Components/TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#111317] text-gray-900 dark:text-white transition-colors">
      <TopBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;