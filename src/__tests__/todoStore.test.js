import {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  resetStore,
} from "../utils/todoStore";

global.fetch = jest.fn();

describe("Todo Hash Table", () => {
  beforeEach(async () => {
    fetch.mockClear();

    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => [],
      })
    );

    await resetStore();
  });

  test("should add a task to the hash table", async () => {
    const task = { id: "task1", title: "Learn TDD", completed: false };

    fetch.mockResolvedValueOnce({ ok: true });

    await addTask(task);

    const retrievedTask = getTask("task1");
    expect(retrievedTask).toEqual(task);
  });

  test("should delete the task from hash table", async () => {
    const task = { id: "task1", title: "Learn TDD", completed: false };

    fetch
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });

    await addTask(task);
    await deleteTask("task1");

    expect(getTask("task1")).toBeUndefined();
  });

  test("should update the task in hash table", async () => {
    const task = { id: "task1", title: "Learn TDD", completed: false };
    const updatedTask = { ...task, completed: true };

    fetch
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [updatedTask],
      });

    await addTask(task);
    const allTasks = await updateTask(updatedTask);

    expect(getTask("task1")).toEqual(updatedTask);
    expect(allTasks).toContainEqual(updatedTask);
  });

  test("should get all tasks from the hash table", async () => {
    const task1 = {
      id: "task4",
      title: "Practice Algorithms",
      completed: false,
    };
    const task2 = { id: "task5", title: "Learn TDD", completed: false };

    fetch
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [task1, task2],
      });

    await addTask(task1);
    await addTask(task2);

    const allTasks = await getAllTasks();
    expect(allTasks).toEqual([task1, task2]);
  });
});
