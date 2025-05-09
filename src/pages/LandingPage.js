import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useOutletContext } from "react-router-dom";
import logo from "../logo-icon-white.png";
import { FaRocket, FaCalendarAlt, FaSync, FaExclamation } from "react-icons/fa";

const LandingPage = () => {
  const { isSidebarOpen } = useOutletContext() || {};
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen transition-all duration-300 bg-gray-950 ${
        isSidebarOpen ? "ml-0" : "ml-0"
      }`}
    >
      {/* Left Section */}
      <div className="flex flex-col max-w-4xl mx-auto text-center text-white/95 p-8 sm:p-12 md:p-20 lg:p-40">
        <div className="flex justify-center items-center mb-12 sm:mb-16">
          <img
            src={logo}
            alt="logo"
            className="max-w-[180px] sm:max-w-[220px] lg:max-w-[250px] h-auto"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
          Stay Organized. <br />
          <span className="bg-gradient-to-br from-blue-teal via-teal-600 to-green-teal text-transparent bg-clip-text mt-2">
            Stay Focused.
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-10 text-white/90">
          Manage your tasks easily with a minimal, fast, and secure{" "}
          <br className="hidden sm:block" />
          to-do app built for you.
        </p>

        <SignedOut>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <SignUpButton>
              <button className="w-full md:w-auto bg-gradient-to-br from-blue-teal via-teal-600 to-green-teal text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition shadow-lg">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton>
              <button className="w-full md:w-auto border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 hover:text-gray-900 transition shadow-lg">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/tasks")}
              className="w-full md:w-auto max-w-xs mt-6 bg-gradient-to-br from-blue-teal via-teal-600 to-green-teal text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition shadow-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </SignedIn>
      </div>

      {/* Feature Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-6 py-12 md:py-20 lg:p-40">
        {/* Card 1 */}
        <div className="bg-mid-teal p-8 sm:p-10 rounded-2xl shadow-md transition transform hover:-translate-y-2 shadow-teal-400">
          <div className="text-indigo-600 text-3xl mb-4">
            <FaRocket />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Quick Add Tasks
          </h3>
          <p className="text-white text-sm sm:text-base">
            Add tasks instantly with a minimal and intuitive interface.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-mid-teal p-8 sm:p-10 rounded-2xl shadow-md transition transform hover:-translate-y-2 shadow-teal-400">
          <div className="text-purple-600 text-3xl mb-4">
            <FaCalendarAlt />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Smart Deadline View
          </h3>
          <p className="text-white text-sm sm:text-base">
            See your tasks mapped on a calendar to stay ahead of deadlines.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-mid-teal p-8 sm:p-10 rounded-2xl shadow-md transition transform hover:-translate-y-2 shadow-teal-400">
          <div className="text-pink-600 text-3xl mb-4">
            <FaSync />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Sync Across Devices
          </h3>
          <p className="text-white text-sm sm:text-base">
            Your to-do list stays updated everywhere you go—automatically.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-mid-teal p-8 sm:p-10 rounded-2xl shadow-md transition transform hover:-translate-y-2 shadow-teal-400">
          <div className="text-yellow-500 text-3xl mb-4">
            <FaExclamation />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
            Prioritize the task
          </h3>
          <div className="text-white text-sm sm:text-base">
            Set to priority level to your tasks for prioritization
            <br />
            <br />
            <div className="flex flex-row space-x-4 text-sm sm:text-lg font-bold">
              <div className="text-violet-500">High</div>
              <div className="text-fuchsia-400">Normal</div>
              <div className="text-teal-500">Low</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
