import api from './api';

/**
 * Fetches tasks with optional filtering, search, and sorting params.
 * @param {Object} params - { status, search, sortBy, order }
 */
export const fetchTasks = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null)
  );
  const { data } = await api.get('/tasks', { params: cleanParams });
  return data.data; // { tasks, total, page, pages }
};

export const fetchTaskById = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data.data;
};

export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data.data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await api.put(`/tasks/${id}`, taskData);
  return data.data;
};

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data.data;
};
