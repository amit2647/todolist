import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import logo from "../logo.png";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <nav className="bg-gray-300/60 shadow-md p-4">
      <div className="flex justify-center items-center">
        <Link to="/">
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
