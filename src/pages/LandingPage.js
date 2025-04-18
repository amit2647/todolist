import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useOutletContext } from "react-router-dom";
import { FaRocket, FaCalendarAlt, FaSync } from "react-icons/fa";

const LandingPage = () => {
  const { isSidebarOpen } = useOutletContext() || {};
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col flex-1 transition-all duration-300 p-6 ${
        isSidebarOpen ? "ml-0" : "ml-0"}`}>
      <div className="max-w-4xl mx-auto text-center text-gray-600">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
          Stay Organized. <br />
          <span className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
            Stay Focused.
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-600/90">
          Manage your tasks easily with a minimal, fast, and secure to-do app
          built for you.
        </p>

        <SignedOut>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <SignUpButton>
              <button className="bg-gray-600 text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition shadow-lg">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton>
              <button className="border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 hover:text-gray-200 transition shadow-lg">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <button
            onClick={() => navigate("/tasks")}
            className="mt-6 bg-gray-600 text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition shadow-lg"
          >
            Go to Dashboard
          </button>
        </SignedIn>
      </div>

      {/* Floating Feature Cards with Flex Layout */}
      <div className="max-w-6xl mx-auto mt-20 flex flex-wrap justify-center gap-6 px-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 w-full sm:w-80">
          <div className="text-indigo-600 text-3xl mb-4">
            <FaRocket />
          </div>
          <h3 className="text-xl font-semibold mb-2">Quick Add Tasks</h3>
          <p className="text-gray-600">
            Add tasks instantly with a minimal and intuitive interface.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 w-full sm:w-80">
          <div className="text-purple-600 text-3xl mb-4">
            <FaCalendarAlt />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Deadline View</h3>
          <p className="text-gray-600">
            See your tasks mapped on a calendar to stay ahead of deadlines.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 w-full sm:w-80">
          <div className="text-pink-600 text-3xl mb-4">
            <FaSync />
          </div>
          <h3 className="text-xl font-semibold mb-2">Sync Across Devices</h3>
          <p className="text-gray-600">
            Your to-do list stays updated everywhere you go—automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
