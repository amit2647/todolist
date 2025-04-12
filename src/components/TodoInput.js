import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const TodoInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const { user } = useUser(); // Get the current logged-in user
  const navigate = useNavigate(); // Hook for navigation

  const handleAddTask = async () => {
    if (taskTitle && taskDescription && assignedDate && deadline) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        assignedDate: new Date(assignedDate),
        deadline: new Date(deadline),
        completed: false,
        userId: user.id, // Store the userId in the task
      };
  
      // Add the task to local memory store
      await addTask(newTask);
  
      // Reset fields
      setTaskTitle("");
      setTaskDescription("");
      setAssignedDate("");
      setDeadline("");
  
      // Redirect to the /tasks page
      navigate("/tasks");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md m-20 mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Add a New Task
      </h2>

      <p className="text-l font-semibold text-gray-700 mb-1 ml-2">Title</p>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title..."
        className="w-full p-3 mb-3 rounded-md border border-gray-300"
      />
      <p className="text-l font-semibold text-gray-700 mb-1 ml-2">
        Description
      </p>
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description..."
        className="w-full p-3 mb-3 h-24 rounded-md border border-gray-300"
      ></textarea>
      <p className="text-l font-semibold text-gray-700 mb-1 ml-2">Start Date</p>
      <input
        type="date"
        value={assignedDate}
        onChange={(e) => setAssignedDate(e.target.value)}
        className="w-full p-3 mb-3 rounded-md border border-gray-300"
      />
      <p className="text-l font-semibold text-gray-700 mb-1 ml-2">End Date</p>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-3 mb-3 rounded-md border border-gray-300"
      />

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
