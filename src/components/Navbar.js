import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { GoHome, GoTasklist, GoCalendar } from "react-icons/go";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PiSignOut, PiUser } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../logo-icon-white.png";
import logoSmall from "../logoIcon.png";

// Dropdown animation variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const Navbar = () => {
  const clerk = useClerk();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <GoHome className="text-xl" />, href: "/tasks" },
    {
      name: "Add Task",
      icon: <GoTasklist className="text-xl" />,
      href: "/AddTask",
    },
    {
      name: "Calendar",
      icon: <GoCalendar className="text-xl" />,
      href: "/calendar",
    },
  ];

  const currentSection =
    menuItems.find((item) => item.href === location.pathname)?.name || "Menu";

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-black to-[#03002e] shadow-lg p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0"
          aria-label="Navigate to home page"
        >
          {/* Regular logo for larger screens */}
          <motion.img
            src={logo}
            alt="App Logo"
            className="w-36 sm:w-40 h-auto hidden sm:block" // Hidden on mobile, visible on sm and above
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          {/* Small logo for mobile screens */}
          <motion.img
            src={logoSmall}
            alt="App Logo"
            className="w-16 h-auto block sm:hidden" // Visible on mobile, hidden on sm and above
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Menu (visible on md and larger) */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center text-white font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.href
                  ? "bg-[#010048] text-white underline underline-offset-4"
                  : "hover:bg-[#010057]"
              }`}
              aria-current={
                location.pathname === item.href ? "page" : undefined
              }
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          {/* Dropdown for Account */}
          <div className="relative">
            <motion.button
              onClick={toggleDropdown}
              className="flex items-center text-white font-semibold text-lg bg-[#010048] px-4 py-2 rounded-lg hover:bg-[#010057] focus:ring-2 focus:ring-[#02006c] transition-all duration-200"
              aria-label="Toggle account menu"
              aria-expanded={isDropdownOpen}
              aria-controls="account-dropdown"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PiUser className="text-xl mr-2" />
              <span>Account</span>
              <svg
                className={`w-5 h-5 ml-2 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  id="account-dropdown"
                  className="absolute right-0 mt-2 w-56 bg-[#010048] rounded-lg shadow-xl z-10 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ul className="py-2">
                    <SignedIn>
                      <li>
                        <button
                          onClick={() => {
                            window.Clerk?.openUserProfile?.();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                          aria-label="Open user profile settings"
                        >
                          <HiOutlineCog6Tooth className="text-xl mr-2" />
                          <span>Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            clerk.signOut();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                          aria-label="Sign out"
                        >
                          <PiSignOut className="text-xl mr-2" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </SignedIn>
                    <SignedOut>
                      <li>
                        <SignInButton mode="modal">
                          <button
                            className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                            aria-label="Sign in"
                          >
                            <PiSignOut className="text-xl mr-2" />
                            <span>Sign In</span>
                          </button>
                        </SignInButton>
                      </li>
                    </SignedOut>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu (visible on smaller screens) */}
        <div className="md:hidden relative">
          <motion.button
            onClick={toggleDropdown}
            className="flex items-center text-white font-semibold text-lg bg-[#010048] px-4 py-2 rounded-lg hover:bg-[#010057] focus:ring-2 focus:ring-[#02006c] transition-all duration-200"
            aria-label={`Toggle ${currentSection} menu`}
            aria-expanded={isDropdownOpen}
            aria-controls="mobile-dropdown"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentSection === "Menu" ? (
              <PiUser className="text-xl mr-2" />
            ) : (
              menuItems.find((item) => item.href === location.pathname)?.icon
            )}
            <span className="ml-2">{currentSection}</span>
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                id="mobile-dropdown"
                className="absolute right-0 mt-2 w-56 bg-[#010048] rounded-lg shadow-xl z-10 overflow-hidden"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ul className="py-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-4 py-2 text-white font-medium ${
                          location.pathname === item.href
                            ? "bg-[#010057] text-white"
                            : "hover:bg-[#010057]"
                        } transition-colors duration-150`}
                        onClick={() => setIsDropdownOpen(false)}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.icon}
                        <span className="mr-2 ml-2">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <SignedIn>
                    <li>
                      <button
                        onClick={() => {
                          window.Clerk?.openUserProfile?.();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                        aria-label="Open user profile settings"
                      >
                        <HiOutlineCog6Tooth className="text-xl mr-2" />
                        <span>Settings</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          clerk.signOut();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                        aria-label="Sign out"
                      >
                        <PiSignOut className="text-xl mr-2" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </SignedIn>
                  <SignedOut>
                    <li>
                      <SignInButton mode="modal">
                        <button
                          className="flex items-center w-full text-left px-4 py-2 text-white font-medium hover:bg-[#010057] transition-colors duration-150"
                          aria-label="Sign in"
                        >
                          <PiSignOut className="text-xl mr-2" />
                          <span>Sign In</span>
                        </button>
                      </SignInButton>
                    </li>
                  </SignedOut>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
