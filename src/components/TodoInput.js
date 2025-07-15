import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Dropdown animation variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const TodoInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("NONE");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();

  const priorities = [
    { label: "High", value: "HIGH", color: "text-violet-500" },
    { label: "Normal", value: "NORMAL", color: "text-fuchsia-500" },
    { label: "Low", value: "LOW", color: "text-teal-500" },
    { label: "None", value: "NONE", color: "text-gray-400" },
  ];

  const selected = priorities.find((p) => p.value === priority);

  const validateForm = () => {
    const newErrors = {};
    if (!taskTitle.trim()) newErrors.taskTitle = "Title is required";
    if (!assignedDate) newErrors.assignedDate = "Start Date is required";
    if (!deadline) newErrors.deadline = "End Date is required";
    if (priority === "NONE") newErrors.priority = "Please select a priority";
    return newErrors;
  };

  const handleAddTask = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription, // Optional, can be empty
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
    setPriority("NONE");
    setErrors({});

    navigate("/tasks");
  };

  return (
    <div className="flex justify-center items-start w-full p-4 sm:p-6 lg:p-8">
      <motion.div
        className="w-full max-w-2xl bg-gradient-to-b from-gray-50 to-gray-100 p-6 sm:p-8 rounded-xl shadow-lg flex flex-col space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-start">
          Add a New Task
        </h2>

        {/* Title Input */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-lg font-medium text-gray-700"
            htmlFor="task-title"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
              setErrors((prev) => ({ ...prev, taskTitle: "" }));
            }}
            placeholder="Task Title..."
            className={`p-3 rounded-lg border ${
              errors.taskTitle ? "border-red-500" : "border-gray-300"
            } bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 w-full`}
            aria-label="Enter task title"
            aria-invalid={!!errors.taskTitle}
            aria-describedby={errors.taskTitle ? "task-title-error" : undefined}
          />
          {errors.taskTitle && (
            <p id="task-title-error" className="text-red-500 text-sm">
              {errors.taskTitle}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-lg font-medium text-gray-700"
            htmlFor="task-description"
          >
            Description (Optional)
          </label>
          <textarea
            id="task-description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description..."
            className="p-3 min-h-[100px] sm:min-h-[120px] rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 w-full resize-none"
            aria-label="Enter task description"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="relative w-full">
          <label
            className="text-lg font-medium text-gray-700"
            htmlFor="priority-select"
          >
            Priority
          </label>
          <motion.div
            className={`flex items-center justify-between p-3 border ${
              errors.priority ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-all duration-200`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            aria-label={`Select priority, currently ${selected.label}`}
            aria-expanded={isOpen}
            aria-controls="priority-dropdown"
            aria-invalid={!!errors.priority}
            aria-describedby={errors.priority ? "priority-error" : undefined}
          >
            <div className="flex items-center gap-2">
              <FaCircle className={`${selected.color} text-sm`} />
              <span className="ml-2">{selected.label}</span>
            </div>
            <span className="text-gray-400">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </motion.div>
          {errors.priority && (
            <p id="priority-error" className="text-red-500 text-sm mt-1">
              {errors.priority}
            </p>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="priority-dropdown"
                className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-auto z-10"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {priorities.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                    onClick={() => {
                      setPriority(option.value);
                      setIsOpen(false);
                      setErrors((prev) => ({ ...prev, priority: "" }));
                    }}
                    role="option"
                    aria-selected={priority === option.value}
                  >
                    <FaCircle className={`${option.color} text-sm`} />
                    <span>{option.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label
              className="text-lg font-medium text-gray-700"
              htmlFor="start-date"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={assignedDate}
              onChange={(e) => {
                setAssignedDate(e.target.value);
                setErrors((prev) => ({ ...prev, assignedDate: "" }));
              }}
              className={`p-3 rounded-lg border ${
                errors.assignedDate ? "border-red-500" : "border-gray-300"
              } bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 w-full`}
              aria-label="Select start date"
              aria-invalid={!!errors.assignedDate}
              aria-describedby={
                errors.assignedDate ? "start-date-error" : undefined
              }
            />
            {errors.assignedDate && (
              <p id="start-date-error" className="text-red-500 text-sm">
                {errors.assignedDate}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="text-lg font-medium text-gray-700"
              htmlFor="end-date"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                setErrors((prev) => ({ ...prev, deadline: "" }));
              }}
              className={`p-3 rounded-lg border ${
                errors.deadline ? "border-red-500" : "border-gray-300"
              } bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 w-full`}
              aria-label="Select end date"
              aria-invalid={!!errors.deadline}
              aria-describedby={errors.deadline ? "end-date-error" : undefined}
            />
            {errors.deadline && (
              <p id="end-date-error" className="text-red-500 text-sm">
                {errors.deadline}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddTask}
          className="w-full sm:w-auto bg-blue-600 text-white py-3 text-lg rounded-lg hover:bg-blue-700 transition font-semibold shadow"
        >
          Add Task
        </button>
      </motion.div>
    </div>
  );
};

export default TodoInput;
