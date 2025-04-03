// src/components/FilterButtons.js
import React from "react";

const FilterButtons = ({ filterTasks }) => {
  return (
    <div className="filter-buttons mb-4 space-x-4 p-4">
      <button
        onClick={() => filterTasks("all")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        All
      </button>
      <button
        onClick={() => filterTasks("completed")}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Completed
      </button>
      <button
        onClick={() => filterTasks("pending")}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
      >
        Pending
      </button>
    </div>
  );
};

export default FilterButtons;
