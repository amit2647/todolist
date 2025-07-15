import React, { useState } from "react";
import { MdDelete, MdDateRange, MdExpandMore } from "react-icons/md";

// Utility function for date formatting
const formatDate = (date) => {
  if (!date) return "No due date";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Priority configuration
const priorities = {
  HIGH: {
    color: "bg-purple-100 text-purple-700 border-purple-300",
    label: "High",
  },
  NORMAL: {
    color: "bg-blue-100 text-blue-700 border-blue-300",
    label: "Normal",
  },
  LOW: { color: "bg-teal-100 text-teal-700 border-teal-300", label: "Low" },
  NONE: { color: "bg-gray-100 text-gray-600 border-gray-300", label: "None" },
};

const TodoItem = ({ task, updateTask, deleteTask, onEditTask }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const toggleDescription = (e) => {
    e.stopPropagation();
    setIsDescriptionOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-4 border border-gray-100 max-w-full">
      {/* Main Task Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title & Description */}
        <div
          className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          onClick={() => onEditTask(task)}
          onKeyDown={(e) => e.key === "Enter" && onEditTask(task)}
          role="button"
          tabIndex={0}
          aria-label={`Edit task: ${task.title}`}
        >
          <div className="flex items-center justify-between">
            <h3
              className={`text-lg sm:text-xl font-semibold ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <button
                onClick={toggleDescription}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                aria-expanded={isDescriptionOpen}
                aria-controls={`description-${task.id}`}
                aria-label={
                  isDescriptionOpen
                    ? "Collapse description"
                    : "Expand description"
                }
              >
                <MdExpandMore
                  className={`text-xl transform transition-transform duration-200 ${
                    isDescriptionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
          {task.description && isDescriptionOpen && (
            <p
              id={`description-${task.id}`}
              className="text-gray-600 text-sm sm:text-base mt-2 animate-slide-down"
            >
              {task.description}
            </p>
          )}
        </div>

        {/* Status & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask({ ...task, completed: !task.completed })
              }
              className="h-5 w-5 rounded-md border-gray-300 accent-blue-600 focus:ring-2 focus:ring-blue-300 transition-transform duration-150 hover:scale-110"
              aria-label={`Mark task ${task.title} as ${task.completed ? "incomplete" : "completed"}`}
            />
            <span
              className={`text-sm font-medium ${
                task.completed ? "text-green-600" : "text-gray-600"
              }`}
            >
              {task.completed ? "Done" : "Pending"}
            </span>
          </label>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-2xl text-gray-400 hover:text-red-600 focus:text-red-600 focus:ring-2 focus:ring-red-300 rounded-full p-1 transition-all duration-150 hover:scale-110"
            aria-label={`Delete task ${task.title}`}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {/* Metadata (Dates & Priority) */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <MdDateRange className="text-lg text-gray-500" />
          <span>{formatDate(task.deadline)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full border text-xs font-medium ${
              priorities[task.priority]?.color || priorities.NONE.color
            }`}
          >
            {priorities[task.priority]?.label || "None"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
