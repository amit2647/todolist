/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.js";
// import Sidebar from "./Sidebar.js";
import { useUser } from "@clerk/clerk-react";

const Layout = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};
export default Layout;
