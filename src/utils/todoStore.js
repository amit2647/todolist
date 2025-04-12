// supabaseTaskStore.js
import { supabase }  from './superbase.js';

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

//  Add Task
export const addTask = async (task) => {
  saveToLocalMemory(task);

  const supabaseTask = {
    ...task,
    assignedDate: new Date(task.assignedDate).toISOString(),
    deadline: new Date(task.deadline).toISOString(),
  };

  const { error } = await supabase.from('tasks').insert([supabaseTask]);
  if (error) console.error('Error adding task to Supabase:', error);
};

//  Update Task
export const updateTask = async (task) => {
  const taskToUpdate = { ...task };
  delete taskToUpdate._id; // just in case

  saveToLocalMemory(taskToUpdate);

  const { error } = await supabase
    .from('tasks')
    .update({
      ...taskToUpdate,
      assignedDate: new Date(taskToUpdate.assignedDate).toISOString(),
      deadline: new Date(taskToUpdate.deadline).toISOString(),
    })
    .eq('id', taskToUpdate.id);

  if (error) console.error('Error updating task in Supabase:', error);

  return getAllTasks();
};

//  Delete Task
export const deleteTask = async (taskId) => {
  removeFromLocalMemory(taskId);

  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) console.error('Error deleting task in Supabase:', error);

  return getAllTasks();
};

//  Get Task
export const getTask = (taskId) => {
  const index = hashFunction(taskId);
  const bucket = taskStore[index] || [];

  return bucket.find((task) => task.id === taskId);
};

//  Get All Tasks
export const getAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    console.error('Error fetching tasks from Supabase:', error);
    return [];
  }

  // Update local memory store
  resetStore();
  data.forEach(saveToLocalMemory);

  return data;
};

//  Reset
export const resetStore = async () => {
  for (let i = 0; i < BUCKET_SIZE; i++) {
    taskStore[i] = [];
  }
};
