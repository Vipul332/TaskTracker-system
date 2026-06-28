import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as taskService from '../services/taskService';

/**
 * Encapsulates all task data fetching, filtering, sorting, and CRUD logic.
 * Keeps page components thin and free of API plumbing.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await taskService.fetchTasks({
        status: statusFilter,
        search,
        sortBy,
        order,
      });
      setTasks(result.tasks);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, search, sortBy, order]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData) => {
    const newTask = await taskService.createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
    toast.success('Task created');
    return newTask;
  };

  const editTask = async (id, taskData) => {
    const updated = await taskService.updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    toast.success('Task updated');
    return updated;
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    toast.success('Task deleted');
  };

  const toggleComplete = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    await editTask(task._id, { status: nextStatus });
  };

  return {
    tasks,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
    addTask,
    editTask,
    removeTask,
    toggleComplete,
    refetch: loadTasks,
  };
};
