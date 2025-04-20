import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TodoInput from "../components/TodoInput.js";
import { addTask, getAllTasks } from "../utils/todoStore.js";

const Tasks = () => {
  const { isSidebarOpen } = useOutletContext() || {};
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState(getAllTasks());

  const handleAddTask = (task) => {
    addTask(task);
    setTasks(getAllTasks());
  };

  return (
    <div
      className={`flex flex-col flex-1 transition-all duration-300 min-h-screen bg-gray-200 p-20 ${
        isSidebarOpen ? "ml-0" : "ml-0"
      }`}
    >
      <TodoInput addTask={handleAddTask} />
    </div>
  );
};

export default Tasks;
