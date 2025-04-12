import React from "react";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ task, updateTask, deleteTask, onEditTask }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="todo-item bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        {/* Title + Description */}
        <div className="task-content flex-1 bg-gray-200/90 p-4 rounded-sm mr-4">
          <h3
            className={`text-xl font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
            onClick={() => onEditTask(task)}
            style={{ cursor: "pointer" }}
          >
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 ml-1">{task.description}</p>
        </div>
  
        {/* Right section with fixed width to prevent layout shift */}
        <div className="w-[200px] flex-shrink-0 flex items-center space-x-4 mt-1">
          <div className="flex items-center space-x-2 mr-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask({ ...task, completed: !task.completed })}
              className="h-6 w-6 rounded-lg border-gray-300 checked:bg-blue-500"
            />
            {/* Set a fixed width to prevent text from shifting layout */}
            <span className={`text-sm font-bold w-[80px] block ${task.completed ? "text-green-500" : "text-slate-500"}`}>
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
          <MdDelete
            onClick={() => deleteTask(task.id)}
            className="text-3xl text-zinc-400 cursor-pointer mr-2"
          />
        </div>
      </div>
  
      {/* Dates, still matching task-content width */}
      <div className="task-content mt-4">
        <div className="flex space-x-5">
          <p className="text-sm text-black/80 bg-blue-400/90 pt-2 pb-2 pr-4 pl-4  rounded-md">
            <strong className="mr-2">Assigned:</strong> {formatDate(task.assignedDate)}
          </p>
          <p className="text-sm text-black/80 bg-blue-400/90 pt-2 pb-2 pr-4 pl-4 rounded-md">
            <strong className="mr-2">Deadline:</strong> {formatDate(task.deadline)}
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default TodoItem;
