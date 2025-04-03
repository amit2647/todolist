import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  resetStore,
} from "../utils/todoStore";

describe("Todo Hash Table", () => {
  beforeEach(() => {
    resetStore();
  });

  test("should add a task to the hash table", () => {
    const task = { id: "task1", title: "Learn tdd", complete: false };
    addTask(task);
    expect(getTask("task1")).toEqual(task);
  });

  test("should delete the task from hash table", () => {
    const task = { id: "task1", title: "Learn tdd", complete: false };
    addTask(task);
    deleteTask("task1");
    expect(getTask("task1")).toBeUndefined();
  });

  test("should update the task in hash table", () => {
    const task = { id: "task1", title: "learn tdd", complete: false };
    addTask(task);
    const updatetask = { id: "task1", title: "learn tdd", complete: true };
    updateTask(updatetask);
    expect(getTask("task1")).toEqual(updatetask);
  });

  test("should get all tasks from the hash table", () => {
    const task1 = {
      id: "task4",
      title: "Practice Algorithms",
      completed: false,
    };
    const task2 = { id: "task5", title: "Learn TDD", completed: false };
    addTask(task1);
    addTask(task2);
    expect(getAllTasks()).toEqual([task1, task2]);
  });
});
