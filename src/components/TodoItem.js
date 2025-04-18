import React from "react";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ task, updateTask, deleteTask, onEditTask }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="todo-item flex flex-col bg-white p-6 rounded-lg shadow-md">
      {/* Top section: Title/Description + Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Task content */}
        <div
          className="flex-1 bg-gray-200/90 p-4 rounded-sm cursor-pointer"
          onClick={() => onEditTask(task)}
        >
          <h3
            className={`text-xl font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 ml-1">{task.description}</p>
        </div>

        {/* Right side: checkbox + status + delete */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-shrink-0 md:w-[200px] w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask({ ...task, completed: !task.completed })
              }
              className="h-6 w-6 rounded-lg border-gray-300 checked:bg-blue-500"
            />
            <span
              className={`text-sm font-bold w-[80px] block ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
          <MdDelete
            onClick={() => deleteTask(task.id)}
            className="text-3xl text-zinc-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap gap-4 mt-4">
        <p className="text-sm text-black/80 bg-blue-400/90 py-2 px-4 rounded-md">
          <strong className="mr-2">Assigned:</strong>{" "}
          {formatDate(task.assignedDate)}
        </p>
        <p className="text-sm text-black/80 bg-blue-400/90 py-2 px-4 rounded-md">
          <strong className="mr-2">Deadline:</strong>{" "}
          {formatDate(task.deadline)}
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
