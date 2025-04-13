// Layout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import { useUser } from "@clerk/clerk-react"; // Import Clerk hook

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useUser(); // Get user once here

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

        {/* Main Content (Pass isSidebarOpen and user to Outlet) */}
        <div
          className={`transition-all duration-500 ${
            isSidebarOpen ? "mr-16" : "mr-16"
          } p-6 mt-16 ml-10`}
        >
          <Outlet context={{ isSidebarOpen, user }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
