import React from "react";
import { MdDelete } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const TodoItem = ({ task, updateTask, deleteTask, onEditTask }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const priorities = {
    HIGH: "text-violet-500",
    NORMAL: "text-fuchsia-500",
    LOW: "text-teal-500",
    NONE: "text-gray-400",
  };

  return (
    <div className="todo-item flex flex-col bg-white p-4 rounded-lg shadow-md">
      {/* Top section: Title/Description + Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-2">
        {/* Task content */}
        <div
          className="flex-1 rounded-sm cursor-pointer"
          onClick={() => onEditTask(task)}
        >
          <h3
            className={`text-xl font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {/* <p className="text-gray-600 text-sm mt-2 ml-1">{task.description}</p> */}
        </div>

        {/* Right side: checkbox + status + delete */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-shrink-0 md:w-[320px] w-full">
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
            className="text-3xl text-zinc-400 cursor-pointer ml-10"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap gap-6 pl-2">
        <div className="group relative flex items-center gap-2 text-sm text-black/80 py-2 rounded-md">
          <MdDateRange className="text-2xl " />
          <span>{formatDate(task.deadline)}</span>

          {/* Tooltip / Hover label */}
          <span className="absolute -bottom-6 left-1 -translate-x-1 text-xs bg-gray-100 text-black px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
            Task Due
          </span>
        </div>
        {/* Priority section */}
        <div className="group relative flex items-center gap-2 text-sm text-black/80 py-2 rounded-md">
          <FaCircle className={`${priorities[task.priority]} text-md`} />
          <span>{task.priority ? task.priority : "None"}</span>

          {/* Tooltip / Hover label */}
          <span className="absolute -bottom-6 left-1 -translate-x-1 text-xs w-40 bg-gray-100 text-black px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
            Task Priority
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
