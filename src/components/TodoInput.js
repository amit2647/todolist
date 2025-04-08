// src/components/TodoInput.js
import React, { useState } from "react";

const TodoInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = async () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
      };
      await fetch("/api/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      setTaskTitle(""); 
      setTaskDescription(""); 
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md m-20 mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Add a New Task</h2>
      
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title..."
        className="w-full p-3 mb-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description..."
        className="w-full p-3 mb-3 h-24 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <button
        onClick={handleAddTask}
        className="w-full bg-blue-500 text-white py-3 text-lg rounded-md hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoInput;
