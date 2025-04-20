import { useState, useCallback } from "react";

const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggleSidebar, openSidebar, closeSidebar };
};

export default useSidebarToggle;
