import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FilterButtons from "../components/FilterButtons.js";
import TodoList from "../components/TodoList.js";
import { useUser } from "@clerk/clerk-react"; // Import the Clerk hook
import { getAllTasks, updateTask, deleteTask } from "../utils/todoStore.js";

const Tasks = () => {
  const { isSidebarOpen = false } = useOutletContext() || {};
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Track loading state

  // Ensure user is loaded before fetching tasks
  useEffect(() => {
    if (!user) {
      console.log("User not loaded yet"); // Debug log
      setLoading(true); // Set loading to true while the user data is being fetched
      return;
    }

    console.log("User loaded:", user); // Debug log

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
      prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
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

  // Render loading state if the user is not loaded
  if (loading || !user) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "mr-64" : "mr-16"
      } p-6 mt-20 bg-gray-200 rounded-lg shadow-md`}
    >
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
