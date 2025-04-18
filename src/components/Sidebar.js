/* eslint-disable no-unused-vars */
import React from "react";
import { GoHome, GoTasklist, GoCalendar } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOut } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  const clerk = useClerk();

  const menuItems = [
    { name: "Dashboard", icon: <GoHome />, href: "/tasks" },
    { name: "Add Task", icon: <GoTasklist />, href: "/AddTask" },
    { name: "Calendar", icon: <GoCalendar />, href: "/calendar" },
  ];

  return (
    <div
      className={`h-full bg-gray-600 text-white transition-all duration-500 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-start p-2 mt-3">
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
      <ul className="flex flex-col p-4 space-y-6">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Link
              to={item.href}
              className={`flex items-center text-white text-lg pt-2 pb-2 transition-all duration-200 ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div
                className={`flex items-center transition-all duration-500 ease-in-out ${
                  isOpen ? "" : "justify-center w-full"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                    isOpen
                      ? "opacity-100 max-w-[200px] scale-100 ml-3"
                      : "opacity-0 max-w-0 scale-90"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Only show for signed-in users */}
      <SignedIn>
        <ul>
          {/* Settings */}
          <li className="flex items-center space-x-3">
            <button
              onClick={() => window.Clerk?.openUserProfile?.()}
              className={`flex items-center text-white text-lg pt-2 pb-2 w-full mt-2 ${
                isOpen ? "justify-start ml-4" : "justify-center mr-2"
              }`}
            >
              <span className="text-2xl">
                <HiOutlineCog6Tooth />
              </span>
              <span
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                  isOpen
                    ? "ml-3 opacity-100 max-w-[200px] scale-100 ml-3"
                    : "opacity-0 max-w-0 scale-90"
                }`}
              >
                Settings
              </span>
            </button>
          </li>

          {/* Logout */}
          <li className="flex items-center space-x-3">
            <button
              onClick={() => clerk.signOut()}
              className={`flex items-center text-white text-lg pt-2 pb-2 w-full mt-5 ${
                isOpen ? "justify-start ml-4" : "justify-center mr-2"
              }`}
            >
              <span className="text-2xl">
                <PiSignOut />
              </span>
              <span
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                  isOpen
                    ? "ml-3 opacity-100 max-w-[200px] scale-100 ml-3"
                    : "opacity-0 max-w-0 scale-90"
                }`}
              >
                Logout
              </span>
            </button>
          </li>
        </ul>
      </SignedIn>

      {/* If not signed in, show Sign In button */}
      <SignedOut>
        <ul>
          <li className="flex items-center space-x-3 mt-1">
            <SignInButton mode="modal">
              <button
                className={`flex items-center text-white text-lg pt-2 pb-2 w-full ${
                  isOpen ? "justify-start ml-4" : "justify-center mr-2"
                }`}
              >
                <span className="text-2xl">
                  <PiSignOut />
                </span>
                <span
                  className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                    isOpen
                      ? "ml-3 opacity-100 max-w-[200px] scale-100"
                      : "opacity-0 max-w-0 scale-90"
                  }`}
                >
                  Sign In
                </span>
              </button>
            </SignInButton>
          </li>
        </ul>
      </SignedOut>
    </div>
  );
};

export default Sidebar;
