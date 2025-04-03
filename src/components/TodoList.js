// src/components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="todo-list space-y-3 p-4 bg-gray-100 rounded-b-lg shadow-md">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
