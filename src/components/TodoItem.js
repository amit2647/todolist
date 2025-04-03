// src/components/TodoItem.js
import React from "react";

const TodoItem = ({ task, updateTask, deleteTask }) => {
  return (
    <div className="todo-item bg-white p-4 rounded-lg shadow-md mb-3">
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask({ ...task, completed: !task.completed })}
            className="mr-3 h-5 w-5"
          />
          <div>
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </div>
        </div>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
