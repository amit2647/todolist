import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import { useUser } from "@clerk/clerk-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex h-screen bg-dark-gray">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* <Navbar isSidebarOpen={isSidebarOpen} /> */}

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          {/* Provide context to child components */}
          <Outlet context={{ isSidebarOpen, user }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
