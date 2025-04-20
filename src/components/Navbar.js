import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../logo-icon-white.png";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <nav className="bg-dark-blue to-green-teal shadow-md p-4">
      <div className="flex justify-center items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="max-w-[150px] h-auto" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
