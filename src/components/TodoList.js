import React, { useState } from "react";
import TodoItem from "./TodoItem.js";
import TaskEditModal from "./TaskEditModal.js"; // Import TaskEditModal here

const TodoList = ({ tasks, updateTask, deleteTask, userId }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => task.userId === userId);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
    handleCloseModal();
  };

  return (
    <div className="todo-list flex flex-col gap-4 p-4 w-full overflow-x-hidden">
      <div className="flex flex-row text-md bg-white rounded-md shadow-md font-semibold text-gray-600 p-2 items-center w-full">
        <span className="basis-[70%] pl-6">Title</span>
        <div className="basis-[10%] h-5 border-l-2 border-solid border-gray-400 flex justify-center"></div>
        <span className="basis-[20%] pl-3 hidden sm:block">Status</span>
      </div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onEditTask={handleEditTask}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">No tasks</div>
      )}

      {selectedTask && (
        <TaskEditModal
          isOpen={isModalOpen}
          task={selectedTask}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TodoList;
