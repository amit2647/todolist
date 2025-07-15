import React from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdFileDownloadDone } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";

const FilterButtons = ({ filterTasks, currentFilter }) => {
  const navigate = useNavigate();

  const getButtonClass = (type) => {
    return `px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out ${
      currentFilter === type
        ? "bg-dark-gray text-white transform scale-105 shadow-lg"
        : "bg-gray-300 text-black hover:bg-teal-600 hover:text-white transform hover:scale-105 shadow-md"
    }`;
  };

  return (
    <div className="filter-buttons flex flex-wrap items-center justify-start gap-4 mb-6 px-4 ">
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
        <MdFileDownloadDone className="size-6" />
      </button>
      <button
        onClick={() => filterTasks("pending")}
        className={getButtonClass("pending")}
      >
        <LuClock3 className="size-6" />
      </button>
      <button
        onClick={() => navigate("/AddTask")}
        className={getButtonClass("add")}
      >
        <IoAdd className="size-6" />
      </button>
    </div>
  );
};

export default FilterButtons;
