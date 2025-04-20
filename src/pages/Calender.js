import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllTasks } from "../utils/todoStore.js";
import { useOutletContext } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Import useUser hook from Clerk
import TaskEditModal from "../components/TaskEditModal.js"; // Import the modal component

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { isSidebarOpen } = useOutletContext() || {};
  const { user } = useUser(); // Get the current user from Clerk
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("month"); // Default view
  const [selectedTask, setSelectedTask] = useState(null); // Store the selected task
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [currentDate, setCurrentDate] = useState(new Date()); // Track current date for navigation

  // Fetch and filter tasks based on the current user
  useEffect(() => {
    const loadTasks = async () => {
      if (!user) {
        console.log("User not loaded yet"); // Debugging user loading
        return;
      }

      try {
        const data = await getAllTasks(); // Get all tasks
        const filteredTasks = data.filter((task) => task.userId === user.id); // Filter tasks by userId
        setTasks(filteredTasks); // Set filtered tasks
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, [user]); // Re-fetch tasks whenever user changes

  // Map tasks to events
  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true,
  }));

  // Handle event click
  const handleEventClick = async (event) => {
    const taskTitle = event.title;
    const task = tasks.find((t) => t.title === taskTitle); // Find task by title

    if (task) {
      setSelectedTask(task); // Set the selected task
      setIsModalOpen(true); // Open the modal
    }
  };

  // Handle change of month and year
  const handleMonthChange = (e) => {
    const newDate = moment(currentDate).month(e.target.value).toDate();
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = moment(currentDate).year(e.target.value).toDate();
    setCurrentDate(newDate);
  };

  // Render loading state if the user is not loaded
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex flex-col flex-1 transition-all duration-300 shadow-md min-h-screen bg-gray-200 p-20 ${
        isSidebarOpen ? "ml-0" : "ml-0"
      }`}
    >
      <h1 className="text-2xl font-semibold mb-4">Calendar</h1>

      {/* Custom Month and Year Selection */}
      <div className="flex items-center mb-4">
        {/* Year Dropdown */}
        <select
          className="p-2 border rounded mr-4 border-gray-900 bg-white"
          value={moment(currentDate).year()}
          onChange={handleYearChange}
        >
          {Array.from({ length: 20 }, (_, i) => moment().year() - 10 + i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ),
          )}
        </select>

        {/* Month Dropdown */}
        <select
          className="p-2 border rounded border-gray-900 bg-white"
          value={moment(currentDate).month()}
          onChange={handleMonthChange}
        >
          {moment.months().map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["week", "month"]}
        view={view}
        onView={(newView) => setView(newView)}
        onSelectEvent={handleEventClick} // Set the click handler for events
        date={currentDate} // Use the current date for rendering
        onNavigate={(date) => setCurrentDate(date)} // Update the current date when navigating
        style={{ height: 500 }}
        className="rounded-lg shadow-md p-10 bg-white"
      />

      {/* Task Edit Modal */}
      {selectedTask && (
        <TaskEditModal
          isOpen={isModalOpen}
          task={selectedTask}
          onClose={() => setIsModalOpen(false)} // Close the modal
          onUpdate={(updatedTask) => {
            // Handle task update (e.g., update tasks state, etc.)
            setTasks((prevTasks) =>
              prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
            );
          }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
