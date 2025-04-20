import React from "react";
import { MdDelete, MdDateRange } from "react-icons/md";
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
    <div className="todo-item flex flex-col bg-white p-3 rounded-lg shadow-sm">
      {/* Task Row */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        {/* Title & Description */}
        <div className="flex-1 cursor-pointer" onClick={() => onEditTask(task)}>
          <h3
            className={`text-base md:text-lg font-semibold ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {/* <p className="text-gray-600 text-sm mt-1">{task.description}</p> */}
        </div>

        {/* Status & Controls */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center md:w-[280px] w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask({ ...task, completed: !task.completed })
              }
              className="h-5 w-5 rounded-md border-gray-300 accent-blue-500"
            />
            <span
              className={`text-sm font-medium w-[80px] ${
                task.completed ? "text-green-500" : "text-slate-500"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <MdDelete
            onClick={() => deleteTask(task.id)}
            className="text-2xl text-zinc-400 hover:text-red-500 cursor-pointer ml-1 md:ml-4"
          />
        </div>
      </div>

      {/* Dates & Priority */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-black/80 pl-1">
        <div className="group relative flex items-center gap-2">
          <MdDateRange className="text-xl" />
          <span>{formatDate(task.deadline)}</span>
          <span className="absolute -bottom-6 left-0 text-xs bg-gray-100 text-black px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
            Task Due
          </span>
        </div>

        <div className="group relative flex items-center gap-2">
          <FaCircle className={`${priorities[task.priority]} text-sm`} />
          <span>{task.priority || "None"}</span>
          <span className="absolute -bottom-6 left-0 text-xs bg-gray-100 text-black px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
            Task Priority
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
