import React, { useState, useEffect } from "react";
import { FaCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";

const priorities = [
  { value: "HIGH", label: "High", color: "text-violet-500" },
  { value: "NORMAL", label: "Normal", color: "text-fuchsia-500" },
  { value: "LOW", label: "Low", color: "text-teal-500" },
  { value: "NONE", label: "None", color: "text-gray-400" },
];

const TaskEditModal = ({ isOpen, task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(task?.priority || "NONE");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedDate(formatDateForInput(task.assignedDate));
      setDeadline(formatDateForInput(task.deadline));
      setPriority(task.priority || "NONE");
    }
  }, [task]);

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      assignedDate: new Date(assignedDate) || null,
      deadline: new Date(deadline) || null,
      priority,
    };
    onUpdate(updatedTask);
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md shadow-lg flex flex-col gap-3">
        <h2 className="text-lg md:text-xl font-semibold">Edit Task</h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            className="p-2 text-sm border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="p-2 text-sm border rounded resize-none"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="p-2 text-sm border rounded"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="date"
            className="p-2 text-sm border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Priority Dropdown */}
        <div className="relative w-full">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Priority
          </label>
          <div
            className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer text-sm"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            <div className="flex items-center gap-2">
              <FaCircle
                className={`${priorities.find((p) => p.value === priority)?.color} text-xs`}
              />
              <span>{priorities.find((p) => p.value === priority)?.label}</span>
            </div>
            <span className="text-gray-400">
              {isOpenDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {isOpenDropdown && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-auto z-10">
              {priorities.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setPriority(option.value);
                    setIsOpenDropdown(false);
                  }}
                >
                  <FaCircle className={`${option.color} text-xs`} />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            className="bg-gray-300 text-sm text-white px-3 py-1.5 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-sm text-white px-3 py-1.5 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
