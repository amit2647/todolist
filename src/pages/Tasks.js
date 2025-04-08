import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FilterButtons from "../components/FilterButtons.js";
import TodoList from "../components/TodoList.js";
import { getAllTasks, updateTask, deleteTask } from "../utils/todoStore.js";

const Tasks = () => {
  const { isSidebarOpen = false } = useOutletContext() || {}; // default to false
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    };

    loadTasks();
  }, []);

  const handleUpdateTask = async (task) => {
    // 1. Optimistically update UI
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
    );

    try {
      // 2. Perform actual update
      await updateTask(task);
    } catch (err) {
      console.error("[Update Task] Failed:", err);

      // Optional: Rollback or show toast
      // You could refetch or notify the user
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
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

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "mr-64" : "mr-16"
      } p-6 mt-20 bg-gray-200 rounded-lg shadow-md`}
    >
      <FilterButtons filterTasks={handleFilterTasks} />
      <TodoList
        tasks={filteredTasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Tasks;
