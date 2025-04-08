const BUCKET_SIZE = 100;
const taskStore = new Array(BUCKET_SIZE).fill(null).map(() => []);

const hashFunction = (key) => {
  if (typeof key !== "string") {
    console.warn("Invalid key for hashing:", key);
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * i) % BUCKET_SIZE;
  }
  return hash;
};

const saveToLocalMemory = (task) => {
  if (!task || !task.id) {
    console.warn("Skipping invalid task:", task);
    return;
  }

  const index = hashFunction(task.id);
  const bucket = taskStore[index] || [];

  const existingIndex = bucket.findIndex((t) => t.id === task.id);
  if (existingIndex !== -1) {
    bucket[existingIndex] = task;
  } else {
    bucket.push(task);
  }

  taskStore[index] = bucket;
};


const removeFromLocalMemory = (taskId) => {
  const index = hashFunction(taskId);
  const bucket = taskStore[index];

  if (!bucket) return;

  const idx = bucket.findIndex((task) => task.id === taskId);
  if (idx !== -1) {
    bucket.splice(idx, 1);
  }
};

export const addTask = async (task) => {
  await fetch("/api/tasks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  saveToLocalMemory(task);
};

export const updateTask = async (task) => {
  const taskToUpdate = { ...task };
  delete taskToUpdate._id;

  await fetch("/api/tasks/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskToUpdate),
  });

  saveToLocalMemory(taskToUpdate);
  return getAllTasks();
};


export const deleteTask = async (taskId) => {
  await fetch(`/api/tasks/delete/${taskId}`, {
    method: "DELETE",
  });

  removeFromLocalMemory(taskId);
  return getAllTasks();
};

export const getTask = (taskId) => {
  const index = hashFunction(taskId);
  const bucket = taskStore[index] || [];

  return bucket.find((task) => task.id === taskId);
};

export const getAllTasks = async () => {
  try {
    const res = await fetch("/api/tasks");
    const tasks = await res.json();

    const cleanTasks = tasks.map(({ _id, ...t }) => t);

    for (let task of cleanTasks) {
      saveToLocalMemory(task);
    }

    return cleanTasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
};


export const resetStore = async () => {
  for (let i = 0; i < BUCKET_SIZE; i++) {
    taskStore[i] = [];
  }

  await fetch("/api/tasks/reset", {
    method: "POST",
  });
};
// Remove MongoDB _id