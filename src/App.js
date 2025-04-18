import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.js";
import Tasks from "./pages/Tasks.js";
import AddTask from "./pages/AddTask.js";
import CalendarPage from "./pages/Calender.js";
import RequireAuth from "./components/RequireAuth.js";
import LandingPage from "./pages/LandingPage.js";

import { SignIn, SignUp } from "@clerk/clerk-react";

const App = () => {
  return (
    <Routes>
      {/* Clerk Auth Pages */}
      <Route
        path="/sign-in"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up"
        element={<SignUp routing="path" path="/sign-up" />}
      />

      {/* Shared Layout for all pages */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="LandingPage" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route
          path="AddTask"
          element={
            <RequireAuth>
              <AddTask />
            </RequireAuth>
          }
        />
        <Route
          path="calendar"
          element={
            <RequireAuth>
              <CalendarPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
