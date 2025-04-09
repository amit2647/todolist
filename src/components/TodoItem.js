import React from "react";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ task, updateTask, deleteTask, onEditTask }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`todo-item bg-white p-6 rounded-lg shadow-md mb-4`}>
      <div className="flex justify-between items-start">
        {/* Left section: checkbox, title, description */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask({ ...task, completed: !task.completed })}
            className="h-6 w-6 mr-6 rounded-lg border-gray-300 checked:bg-blue-500"
          />
          <div className="flex-1">
            <h3
              className={`text-xl font-semibold ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
              onClick={() => onEditTask(task)}
              style={{ cursor: "pointer" }}
            >
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          </div>
        </div>

        {/* Right section: dates */}
        <div className="flex flex-row items-start space-y-1">
          <div>
            <p className="text-sm text-gray-500">
              <strong>Assigned:</strong> {formatDate(task.assignedDate)}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Deadline:</strong> {formatDate(task.deadline)}
            </p>
          </div>
          <div>
            <MdDelete
              onClick={() => deleteTask(task.id)}
              className="ml-6 text-3xl text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
