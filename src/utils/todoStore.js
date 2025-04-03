const BUCKEY_SIZE = 100;
// eslint-disable-next-line array-callback-return
const taskStore = new Array(BUCKEY_SIZE).fill(null).map(() => {});

const hashFunction = (key) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * i) % BUCKEY_SIZE;
  }
  return hash;
};

export const addTask = (task) => {
  const index = hashFunction(task.id);

  if (!taskStore[index]) {
    taskStore[index] = [];
  }

  const bucket = taskStore[index];

  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i].id === task.id) {
      bucket[i] = task;
      return;
    }
  }

  bucket.push(task);
};

export const getTask = (taskId) => {
  const index = hashFunction(taskId);
  const bucket = taskStore[index] || [];

  for (let task of bucket) {
    if (task.id === taskId) return task;
  }

  return undefined;
};

export const getAllTasks = () => {
  const store = Array.isArray(taskStore) ? taskStore : [];

  return store
    .filter((bucket) => Array.isArray(bucket) && bucket.length)
    .flat();
};

export const updateTask = (updatedTask) => {
  const index = hashFunction(updatedTask.id);
  const bucket = taskStore[index];
  if (!bucket) return;

  taskStore[index] = bucket.map((task) =>
    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
  );
};

export const deleteTask = (taskId) => {
  const index = hashFunction(taskId);
  const bucket = taskStore[index];

  if (!bucket) return;

  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i].id === taskId) {
      bucket.splice(i, 1);
      return;
    }
  }
};

export const resetStore = () => {
  for (let i = 0; i < BUCKEY_SIZE; i++) {
    taskStore[i] = [];
  }
};
