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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        const allTasks = await getAllTasks(user.id);
        setTasks(allTasks);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]);

  const handleUpdateTask = async (task) => {
    if (!user || !task.id) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    );

    try {
      await updateTask(task, user.id);
    } catch (err) {
      console.error("[Update Task] Failed:", err);
      const allTasks = await getAllTasks(user.id);
      setTasks(allTasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!user || !taskId) return;

    const prev = tasks;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error("[Delete Task] Failed:", err);
      setTasks(prev);
    }
  };

  const handleFilterTasks = (filterType) => setFilter(filterType);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center bg-gray-200 min-h-screen">
        <div className="text-center p-6 flex flex-col items-center">
          <AiOutlineLoading className="animate-spin text-4xl text-indigo-600 mb-4" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 justify-center items-start bg-gray-200 pt-20 min-h-screen p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow max-w-md w-full text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Welcome to Your To-Do App!
          </h2>
          <p className="text-gray-600 mb-5">
            To organize tasks and stay focused, sign in to your account.
          </p>
          <SignInButton>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition w-full">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col flex-1 bg-gray-200 transition-all duration-300 min-h-screen ${
        isSidebarOpen ? "ml-0" : "ml-0"
      } p-4 md:p-8`}
    >
      <div className="flex justify-start mb-4">
        <img
          src={logo}
          alt="logo"
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div>

      <FilterButtons filterTasks={handleFilterTasks} currentFilter={filter} />

      <TodoList
        tasks={filteredTasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
        userId={user.id}
      />
    </div>
  );
};

export default Tasks;
