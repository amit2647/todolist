// supabaseTaskStore.js
import { supabase } from './superbase.js';

// Add Task
export const addTask = async (task) => {
  const supabaseTask = {
    ...task,
    assignedDate: new Date(task.assignedDate).toISOString(),
    deadline: new Date(task.deadline).toISOString(),
  };

  const { data, error } = await supabase.from('tasks').insert([supabaseTask]);
  if (error) {
    console.error('Error adding task to Supabase:', error);
  } else {
    console.log('Task added successfully:', data);
  }
};

// Update Task
export const updateTask = async (task) => {
  const taskToUpdate = { ...task };
  delete taskToUpdate._id; // just in case

  const { data, error } = await supabase
    .from('tasks')
    .update({
      ...taskToUpdate,
      assignedDate: new Date(taskToUpdate.assignedDate).toISOString(),
      deadline: new Date(taskToUpdate.deadline).toISOString(),
    })
    .eq('id', taskToUpdate.id);

  if (error) {
    console.error('Error updating task in Supabase:', error);
  } else {
    console.log('Task updated successfully:', data);
  }

  return getAllTasks();
};

// Delete Task
export const deleteTask = async (taskId) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) {
    console.error('Error deleting task in Supabase:', error);
  } else {
    console.log('Task deleted successfully:', data);
  }

  return getAllTasks();
};

// Get Task
export const getTask = async (taskId) => {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', taskId).single();
  if (error) {
    console.error('Error fetching task from Supabase:', error);
    return null;
  }

  console.log('Fetched task from Supabase:', data);
  return data;
};

// Get All Tasks
export const getAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    console.error('Error fetching tasks from Supabase:', error);
    return [];
  }

  console.log('Fetched tasks from Supabase:', data);
  return data;
};
