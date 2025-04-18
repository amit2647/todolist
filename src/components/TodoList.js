import React, { useState } from "react";
import TodoItem from "./TodoItem.js";
import TaskEditModal from "./TaskEditModal.js"; // Import TaskEditModal here

const TodoList = ({ tasks, updateTask, deleteTask, userId }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tasks based on the userId
  const filteredTasks = tasks.filter((task) => task.userId === userId);

  // Handle opening the modal and setting the task
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
    <div className="todo-list flex flex-col gap-4 p-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onEditTask={handleEditTask} // Pass the edit handler to TodoItem
          />
        ))
      ) : (
        // No tasks component or message
        <div className="text-center text-gray-500">No tasks</div>
      )}

      {/* Task Edit Modal */}
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
