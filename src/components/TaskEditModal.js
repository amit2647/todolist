import React, { useState, useEffect } from "react";

const TaskEditModal = ({ isOpen, task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const formatDateForInput = (date) => {
    if (!date) return ""; // Return an empty string if the date is invalid
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0]; // Validate the date
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedDate(formatDateForInput(task.assignedDate));
      setDeadline(formatDateForInput(task.deadline));
    }
  }, [task]);  

  const handleUpdate = async () => {
    const updatedTask = {
      ...task,
      title,
      description,
      deadline: new Date(deadline) || null, // Use `null` if the deadline is invalid
    };

    await fetch(`/api/tasks/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    onUpdate(updatedTask);
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
        />
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
