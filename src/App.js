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
      <Route
        path="/sign-in"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up"
        element={<SignUp routing="path" path="/sign-up" />}
      />

      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} /> {/* Tasks page is public */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="LandingPage" element={<LandingPage/>}/>
      </Route>

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="AddTask" element={<AddTask />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default App;
