import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllTasks } from "../utils/todoStore.js";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import TaskEditModal from "../components/TaskEditModal.js";

const localizer = momentLocalizer(moment);

// Animation variants for the page
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CalendarPage = () => {
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
    priority: task.priority,
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

  if (!user) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#03002e] to-[#010057]"
        aria-live="polite"
      >
        <span className="text-[#010057] text-base font-medium">Loading...</span>
      </div>
    );
  }

  // Custom event styling based on priority
  const eventPropGetter = (event) => {
    const priorityStyles = {
      HIGH: { backgroundColor: "#8b5cf6", borderColor: "#7c3aed" }, // violet-500
      NORMAL: { backgroundColor: "#d946ef", borderColor: "#c026d3" }, // fuchsia-500
      LOW: { backgroundColor: "#14b8a6", borderColor: "#0d9488" }, // teal-500
      NONE: { backgroundColor: "#9ca3af", borderColor: "#6b7280" }, // gray-400
    };
    const style = priorityStyles[event.priority] || priorityStyles.NONE;
    return {
      style: {
        ...style,
        color: "white",
        borderRadius: "4px",
        fontSize: "0.85rem",
        padding: "6px",
        cursor: "pointer",
        touchAction: "manipulation",
      },
    };
  };

  return (
    <motion.div
      className="flex flex-col flex-1 min-h-screen bg-white p-2 sm:p-4 lg:p-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#010057] mb-4">
        Task Calendar
      </h1>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 gap-2 mb-4 max-w-full">
        <motion.select
          className="p-2 rounded-lg bg-white text-[#010057] border border-[#010057] focus:ring-2 focus:ring-[#02006c] transition-all duration-200 text-sm"
          value={moment(currentDate).year()}
          onChange={handleYearChange}
          aria-label="Select year"
          whileHover={{ scale: 1.02 }}
        >
          {Array.from({ length: 20 }, (_, i) => moment().year() - 10 + i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ),
          )}
        </motion.select>
        <motion.select
          className="p-2 rounded-lg bg-white text-[#010057] border border-[#010057] focus:ring-2 focus:ring-[#02006c] transition-all duration-200 text-sm"
          value={moment(currentDate).month()}
          onChange={handleMonthChange}
          aria-label="Select month"
          whileHover={{ scale: 1.02 }}
        >
          {moment.months().map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </motion.select>
      </div>

      {/* Calendar */}
      <motion.div
        className="rounded-lg shadow-lg bg-white p-2 sm:p-4"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week"]}
          view={view}
          onView={setView}
          onSelectEvent={handleEventClick}
          date={currentDate}
          onNavigate={setCurrentDate}
          eventPropGetter={eventPropGetter}
          className="custom-calendar"
          style={{ minHeight: "350px", sm: "500px", lg: "600px" }}
          aria-label="Task calendar"
        />
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </motion.div>
  );
};

export default CalendarPage;
