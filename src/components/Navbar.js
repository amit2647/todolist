import React from "react";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <nav
      className={`fixed top-0 bg-neutral-700 shadow-md z-10 p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
      }`}
    >
      <div className="container mx-auto px-6 text-center text-2xl font-bold text-blue-600 dark:text-sky-400">
        To-Do List Manager
      </div>
    </nav>
  );
};

export default Navbar;
