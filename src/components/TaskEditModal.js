import React, { useState, useEffect } from "react";

const TaskEditModal = ({ isOpen, task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
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
      deadline: new Date(deadline) || null,
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Edit Task</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            className="p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="p-2 border rounded resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
