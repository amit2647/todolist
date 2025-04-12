import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import logo from "../logo.png";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <nav
      className={`fixed top-0 bg-gray-300/60 shadow-md z-10 p-4 transition-all duration-500 ${
        isSidebarOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
      }`}
    >
      <div className="container mx-auto px-6 text-center text-2xl font-bold text-gray-800 flex justify-center items-center">
        <Link to="/"> {/* Wrap logo with Link to enable navigation */}
          <img 
            src={logo} 
            alt="logo" 
            className="max-w-[150px] h-auto"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
