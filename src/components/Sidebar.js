/* eslint-disable no-unused-vars */
import React from "react";
import { GoHome, GoTasklist, GoCalendar } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOut } from "react-icons/pi";
import { CiMenuBurger } from "react-icons/ci";
import logo from "../logo-icon-white.png";
import logoSmall from "../logoIcon.png";
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
      className={`h-full flex flex-col justify-between bg-mid-teal text-white transition-all duration-500 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-start p-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="text-white p-2 ml-3 mb-6 rounded focus:outline-none"
        >
          <CiMenuBurger size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="flex flex-col p-4 space-y-6">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.href}>
              <div
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isOpen ? "justify-start pl-4 pr-4" : "justify-center"
                } bg-light-teal rounded-md shadow-md hover:bg-teal-600 p-2`}
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
        <ul className="px-4 space-y-6 mt-2">
          {/* Settings */}
          <li>
            <button
              onClick={() => window.Clerk?.openUserProfile?.()}
              className={`flex items-center w-full text-white text-lg transition-all duration-300 ease-in-out bg-light-teal rounded-md shadow-md hover:bg-teal-600 p-2 ${
                isOpen ? "justify-start pl-4 pr-4" : "justify-center"
              }`}
            >
              <span className="text-2xl">
                <HiOutlineCog6Tooth />
              </span>
              <span
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                  isOpen
                    ? "opacity-100 max-w-[200px] scale-100 ml-3"
                    : "opacity-0 max-w-0 scale-90"
                }`}
              >
                Settings
              </span>
            </button>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={() => clerk.signOut()}
              className={`flex items-center w-full text-white text-lg transition-all duration-300 ease-in-out bg-light-teal rounded-md shadow-md hover:bg-teal-600 p-2 mt-1 ${
                isOpen ? "justify-start pl-4 pr-4" : "justify-center"
              }`}
            >
              <span className="text-2xl">
                <PiSignOut />
              </span>
              <span
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap ${
                  isOpen
                    ? "opacity-100 max-w-[200px] scale-100 ml-3"
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
        <ul className="px-4 mt-1 space-y-4">
          <li>
            <SignInButton mode="modal">
              <button
                className={`flex items-center w-full text-white text-lg transition-all duration-300 ease-in-out bg-light-teal rounded-md shadow-md hover:bg-teal-600 p-2 ${
                  isOpen ? "justify-start pl-4 pr-4" : "justify-center"
                }`}
              >
                <span className="text-2xl">
                  <PiSignOut />
                </span>
                <span
                  className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap  ${
                    isOpen
                      ? "opacity-100 max-w-[200px] scale-100 ml-3"
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
      <Link to="/" className="flex justify-center mb-20 mt-auto">
        {isOpen ? (
          <img src={logo} alt="logo" className="max-w-[120px] h-auto" />
        ) : (
          <img src={logoSmall} alt="logo" className="max-w-[50px] h-auto" />
        )}
      </Link>
    </div>
  );
};

export default Sidebar;
