import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { FaRocket, FaCalendarAlt, FaSync, FaExclamation } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../logo-icon-white.png";
import bgimage from "../v1016-b-09.png";

// Animation variants for hero section
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation variants for feature cards
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-gray-900 bg-black text-white">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[80vh] px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgimage})` }}
        />
        <motion.div
          className="relative text-center max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <img
            src={logo}
            alt="App Logo"
            className="mx-auto mb-6 w-32 sm:w-40"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            Master Your Tasks
            <br />
            <span className="text-teal-400">With Ease</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Organize your life with a sleek, secure, and intuitive to-do app
            designed for productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton>
                <button
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 transition-all duration-300 shadow-lg"
                  aria-label="Sign up for the app"
                >
                  Get Started
                </button>
              </SignUpButton>
              <SignInButton>
                <button
                  className="border-2 border-teal-400 text-teal-400 px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-400 hover:text-gray-900 focus:ring-4 focus:ring-teal-300 transition-all duration-300 shadow-lg"
                  aria-label="Sign in to the app"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => navigate("/tasks")}
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 transition-all duration-300 shadow-lg"
                aria-label="Go to dashboard"
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </div>
        </motion.div>
      </div>

      {/* Feature Section */}
      <div className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-teal-300">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1: Quick Add Tasks */}
            <motion.div
              className="bg-gradient-to-br from-teal-700 to-teal-900 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaRocket className="text-4xl text-teal-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quick Add Tasks
              </h3>
              <p className="text-gray-200 text-sm">
                Instantly add tasks with a clean, user-friendly interface.
              </p>
            </motion.div>

            {/* Card 2: Smart Deadline View */}
            <motion.div
              className="bg-gradient-to-br from-purple-700 to-purple-900 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaCalendarAlt className="text-4xl text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Smart Deadlines
              </h3>
              <p className="text-gray-200 text-sm">
                Visualize tasks on a calendar to never miss a deadline.
              </p>
            </motion.div>

            {/* Card 3: Sync Across Devices */}
            <motion.div
              className="bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaSync className="text-4xl text-blue-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Device Sync
              </h3>
              <p className="text-gray-200 text-sm">
                Access your tasks anywhere with seamless syncing.
              </p>
            </motion.div>

            {/* Card 4: Prioritize Tasks */}
            <motion.div
              className="bg-gradient-to-br from-gray-700 to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <FaExclamation className="text-4xl text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Task Prioritization
              </h3>
              <p className="text-gray-200 text-sm">
                Set High, Normal, or Low priority with clear visual cues.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
