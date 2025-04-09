import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} />

        {/* Main Content (Pass isSidebarOpen to Outlet) */}
        <div
          className={`transition-all duration-500 ${
            isSidebarOpen ? "mr-16" : "mr-16"
          } p-6 mt-16 ml-10`}
        >
          <Outlet context={{ isSidebarOpen }} /> {/* Pass state to child */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
