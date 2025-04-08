import React from "react";
import { GoHome, GoTasklist, GoCalendar } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOut } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", icon: <GoHome />, href: "/" },
    { name: "Add Task", icon: <GoTasklist />, href: "/AddTask" },
    { name: "Calendar", icon: <GoCalendar />, href: "/" },
    { name: "Settings", icon: <HiOutlineCog6Tooth />, href: "/" },
    { name: "Logout", icon: <PiSignOut />, href: "/" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-gray-700 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="text-white p-2 rounded focus:outline-none"
        >
          <CiMenuBurger size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="p-4 space-y-6">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              className={`flex items-center text-white text-lg hover:bg-blue-700 pr-5 pl-5 pt-2 pb-2 rounded-md shadow-lg transition-all duration-200 ${
                isOpen
                  ? "justify-start bg-blue-600/40"
                  : "justify-center bg-blue-600/40"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
