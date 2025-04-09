import React from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FilterButtons = ({ filterTasks, currentFilter }) => {
  const navigate = useNavigate();

  const getButtonClass = (type) => {
    return `px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${
      currentFilter === type
        ? "bg-blue-800 text-white transform scale-105 shadow-lg"
        : "bg-blue-400 text-white hover:bg-blue-600 transform hover:scale-105 shadow-md"
    }`;
  };

  return (
    <div className="filter-buttons mb-4 p-4 flex items-start gap-4">
      <button
        onClick={() => filterTasks("all")}
        className={getButtonClass("all")}
      >
        All
      </button>
      <button
        onClick={() => filterTasks("completed")}
        className={getButtonClass("completed")}
      >
        Completed
      </button>
      <button
        onClick={() => filterTasks("pending")}
        className={getButtonClass("pending")}
      >
        Pending
      </button>
      <button
        onClick={() => navigate("/AddTask")}
        className={getButtonClass("add")}
      >
        <IoAdd className="text-2xl" />
      </button>
    </div>
  );
};

export default FilterButtons;
