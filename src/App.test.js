// src/__tests__/App.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import {
  getAllTasks,
  deleteTask,
} from "../src/utils/todoStore";

jest.mock("./utils/todoStore", () => ({
  getAllTasks: jest.fn(() => [
    { id: "1", title: "Practice Algorithms", completed: false },
    { id: "2", title: "Write Tests", completed: true },
  ]),
  addTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe("To-Do List App", () => {
  beforeEach(() => {
    // Reset mock functions before each test
    jest.clearAllMocks();
  });


  test("should delete a task", () => {
    const task = { id: "task2", title: "Build a project", completed: false };

    getAllTasks.mockImplementation(() => [task]);

    deleteTask.mockImplementation((taskId) => {
      getAllTasks.mockImplementation(() => []);
    });

    render(<App />);

    fireEvent.click(screen.getByText("Delete"));

    expect(deleteTask).toHaveBeenCalledWith("task2");

    expect(screen.queryByText("Build a project")).toBeNull();
  });

});
