import React from "react";
import { GoHome, GoTasklist, GoCalendar } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOut } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Menu items with icons
  const menuItems = [
    { name: "Dashboard", icon: <GoHome /> },
    { name: "Add Task", icon: <GoTasklist /> },
    { name: "Calendar", icon: <GoCalendar /> },
    { name: "Settings", icon: <HiOutlineCog6Tooth /> },
    { name: "Logout", icon: <PiSignOut /> },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-blue-600 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded focus:outline-none"
        >
          <CiMenuBurger size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="p-4 space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href="/"
              className="flex items-center text-white text-lg hover:bg-blue-700 p-2 rounded-md"
            >
              {/* Show icon always */}
              <span className="text-2xl">{item.icon}</span>

              {/* Show text only when sidebar is open */}
              {isOpen && <span className="ml-3">{item.name}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
