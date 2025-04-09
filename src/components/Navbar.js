import React from "react";
import logo from "../logo.png";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <nav
      className={`fixed top-0 bg-gray-300/60 shadow-md z-10 p-4 transition-all duration-500 ${
        isSidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
      }`}
    >
      <div className="container mx-auto px-6 text-center text-2xl font-bold text-gray-800 flex justify-center items-center">
        <img 
          src={logo} 
          alt="logo" 
          className="max-w-[150px] h-auto"
        />
      </div>
    </nav>
  );
};

export default Navbar;
