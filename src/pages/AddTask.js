import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import TodoInput from "../components/TodoInput.js";
import { addTask, getAllTasks } from "../utils/todoStore.js";

const Tasks = () => {
  const { isSidebarOpen } = useOutletContext();
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState(getAllTasks());

  const handleAddTask = (task) => {
    addTask(task);
    setTasks(getAllTasks());
  };

  return (
    <div
      className={`transition-all duration-500 ${
        isSidebarOpen ? "mr-64" : "mr-16"
      } p-6 mt-6 bg-gray-200 rounded-lg shadow-md`}
    >
      <TodoInput addTask={handleAddTask} />
    </div>
  );
};

export default Tasks;
