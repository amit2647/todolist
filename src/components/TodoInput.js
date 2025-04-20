import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaCircle } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const TodoInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("NONE");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const priorities = [
    { label: "High", value: "HIGH", color: "text-violet-500" },
    { label: "Normal", value: "NORMAL", color: "text-fuchsia-500" },
    { label: "Low", value: "LOW", color: "text-teal-500" },
    { label: "None", value: "NONE", color: "text-gray-400" },
  ];

  const selected = priorities.find((p) => p.value === priority);

  const handleAddTask = async () => {
    if (taskTitle && taskDescription && assignedDate && deadline) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription,
        assignedDate: new Date(assignedDate),
        deadline: new Date(deadline),
        completed: false,
        userId: user.id,
        priority: priority,
      };

      await addTask(newTask);

      setTaskTitle("");
      setTaskDescription("");
      setAssignedDate("");
      setDeadline("");

      navigate("/tasks");
    }
  };
  return (
    <div className="flex justify-start items-start p-4">
      <div className="w-full bg-white p-8 rounded-xl shadow-xl flex flex-col space-y-5">
        <h2 className="text-2xl font-bold text-gray-700 text-start">
          Add a New Task
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700 ml-1">
            Title
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title..."
            className="p-3 rounded-md border border-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700 ml-1">
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description..."
            className="p-3 h-28 rounded-md border border-gray-300 resize-none"
          ></textarea>
        </div>

        <div className="relative w-full">
          <label className="text-lg font-medium text-gray-700 ml-1">
            Priority
          </label>

          {/* Button for triggering dropdown */}
          <div
            className="flex items-center justify-between p-3 border border-gray-300 rounded-md cursor-pointer w-full md:w-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <FaCircle className={`${selected.color} text-sm`} />
              <span className="ml-2">{selected.label}</span>
            </div>
            {/* Toggle icon for dropdown */}
            <span className="text-gray-400">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
              {priorities.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPriority(option.value);
                    setIsOpen(false); // Close dropdown after selection
                  }}
                >
                  <FaCircle className={`${option.color} text-sm`} />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col flex-1 space-y-2">
            <label className="text-lg font-medium text-gray-700 ml-1">
              Start Date
            </label>
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
              className="p-3 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className="text-lg font-medium text-gray-700 ml-1">
              End Date
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-3 rounded-md border border-gray-300"
            />
          </div>
        </div>

        <button
          onClick={handleAddTask}
          className="w-full max-w-xs bg-blue-600 text-white py-3 text-lg rounded-lg hover:bg-blue-700 transition font-semibold shadow"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
