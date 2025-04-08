import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.js";
import Tasks from "./pages/Tasks.js";
import AddTask from "./pages/AddTask.js";

const App = () => {
  return (
    <Routes>
      {/* Layout wraps all pages to keep Navbar & Sidebar constant */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Tasks />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="AddTask" element={<AddTask />} />
      </Route>
    </Routes>
  );
};

export default App;
