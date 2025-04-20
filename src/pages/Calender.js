import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllTasks } from "../utils/todoStore.js";
import { useOutletContext } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import TaskEditModal from "../components/TaskEditModal.js";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { isSidebarOpen } = useOutletContext() || {};
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("month");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const loadTasks = async () => {
      if (!user) return;
      try {
        const data = await getAllTasks();
        const filtered = data.filter((task) => task.userId === user.id);
        setTasks(filtered);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, [user]);

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true,
  }));

  const handleEventClick = (event) => {
    const task = tasks.find((t) => t.title === event.title);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const handleMonthChange = (e) => {
    setCurrentDate(moment(currentDate).month(e.target.value).toDate());
  };

  const handleYearChange = (e) => {
    setCurrentDate(moment(currentDate).year(e.target.value).toDate());
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen bg-gray-200 transition-all duration-300 ${
        isSidebarOpen ? "ml-0" : "ml-0"
      } p-4 md:p-8 lg:p-12`}
    >
      <h1 className="text-lg md:text-2xl font-semibold mb-3">Calendar</h1>

      {/* Compact Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          className="p-2 border border-gray-300 rounded bg-white w-full sm:w-auto"
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

        <select
          className="p-2 border border-gray-300 rounded bg-white w-full sm:w-auto"
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

      {/* Calendar */}
      <div className="rounded shadow bg-white p-2 md:p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["week", "month"]}
          view={view}
          onView={setView}
          onSelectEvent={handleEventClick}
          date={currentDate}
          onNavigate={setCurrentDate}
          style={{ height: 450 }}
        />
      </div>

      {/* Edit Modal */}
      {selectedTask && (
        <TaskEditModal
          isOpen={isModalOpen}
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedTask) => {
            setTasks((prev) =>
              prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
            );
          }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
