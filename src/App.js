// src/App.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import FilterButtons from "./components/FilterButtons";
import {
  getAllTasks,
  updateTask,
  deleteTask,
  addTask,
} from "./utils/todoStore";

const App = () => {
  const [tasks, setTasks] = useState(getAllTasks());
  const [filter, setFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const task1 = {
      id: "task1",
      title: "Learn tdd",
      description: "Start learning the test driven development",
      complete: false,
    };
    const task2 = {
      id: "task2",
      title: "Learn SOLID Principals",
      description: "Start learning the SOLID Principals",
      complete: false,
    };
    addTask(task1);
    addTask(task2);
    setTasks(getAllTasks());
  }, []);

  // const handleAddTask = (task) => {
  //   addTask(task);
  //   setTasks(getAllTasks()); // Refresh tasks
  // };

  const handleUpdateTask = (task) => {
    updateTask(task);
    setTasks(getAllTasks()); // Refresh tasks
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks(getAllTasks()); // Refresh tasks
  };

  const handleFilterTasks = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Main Section (Navbar + Content) */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "mr-64" : "mr-16"
        } flex-1`}
      >
        {/* Navbar (Aligned with Main Content) */}
        <Navbar isSidebarOpen={isSidebarOpen} />

        {/* Content (Starts After Navbar) */}
        <div className="container mx-auto bg-gray-300 rounded-lg shadow-md p-6 mt-20">
          <FilterButtons filterTasks={handleFilterTasks} />
          <TodoList
            tasks={filteredTasks}
            updateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
};

export default App;
