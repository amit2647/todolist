import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FilterButtons from "../components/FilterButtons.js";
import TodoList from "../components/TodoList.js";
import { getAllTasks, updateTask, deleteTask } from "../utils/todoStore.js";
import { SignInButton } from "@clerk/clerk-react";
import { AiOutlineLoading } from "react-icons/ai";
import logo from "../logo.png";

const Tasks = () => {
  const { user, isSidebarOpen } = useOutletContext() || {};
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Track loading state

  // Ensure user is loaded before fetching tasks
  useEffect(() => {
    if (user === undefined) {
      // still waiting for user context to load
      setLoading(true);
      return;
    }

    if (!user) {
      // user is confirmed to be signed out
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        const allTasks = await getAllTasks(user.id); // Use user.id when available
        setTasks(allTasks);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]); // Re-fetch tasks when user changes

  const handleUpdateTask = async (task) => {
    if (!user || !task.id) {
      console.error("Invalid task or user not loaded");
      return;
    }

    // 1. Optimistically update UI
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    );

    try {
      // 2. Perform actual update
      await updateTask(task, user.id);
    } catch (err) {
      console.error("[Update Task] Failed:", err);

      // Optional: Rollback or show toast
      const allTasks = await getAllTasks(user.id);
      setTasks(allTasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!user || !taskId) {
      console.error("Invalid task ID or user not loaded");
      return;
    }

    // 1. Optimistically remove task from UI
    const previousTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    try {
      // 2. Perform actual delete
      await deleteTask(taskId);
    } catch (err) {
      console.error("[Delete Task] Failed:", err);

      // 3. Rollback if delete failed
      setTasks(previousTasks);
    }
  };

  const handleFilterTasks = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // covers "all" and any fallback
  });

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center bg-gray-200 pt-50 min-h-screen ">
        <div className="text-center p-8 flex flex-col items-center justify-center">
          <AiOutlineLoading className="animate-spin text-4xl text-indigo-600 mb-4" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 justify-center items-start bg-gray-200 pt-20 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Your To-Do'S App!
          </h2>
          <p className="text-gray-600 mb-6">
            To start organizing your tasks and staying focused, please sign in
            to your account.
          </p>
          <SignInButton>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col flex-1 transition-all duration-300 p-12 bg-gray-200 min-h-screen ${
        isSidebarOpen ? "ml-0" : "ml-0"
      }`}
    >
      <div className="flex justify-start items-start mb-6 ml-4">
        <img src={logo} alt="logo" className="max-w-[120px] h-auto" />
      </div>
      {/* Display tasks for both signed-in and signed-out users */}
      <FilterButtons filterTasks={handleFilterTasks} currentFilter={filter} />
      <TodoList
        tasks={filteredTasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
        userId={user.id} // Pass the user.id to TodoList
      />
    </div>
  );
};

export default Tasks;
