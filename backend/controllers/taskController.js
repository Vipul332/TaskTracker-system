import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';
import sendResponse from '../utils/sendResponse.js';

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    priority,
    dueDate: dueDate || null,
  });

  sendResponse(res, 201, 'Task created successfully', task);
});

/**
 * @desc    Get all tasks (supports filtering, search, sorting, pagination)
 * @route   GET /api/tasks
 * @query   status, search, sortBy, order, page, limit
 * @access  Public
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { status, search, sortBy, order, page, limit } = req.query;

  const query = {};

  // Filter by status (pending | in-progress | completed)
  if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
    query.status = status;
  }

  // Search by title (case-insensitive partial match)
  if (search && search.trim().length > 0) {
    query.title = { $regex: search.trim(), $options: 'i' };
  }

  // Sorting
  const sortOptions = {};
  const sortField =
    sortBy === 'priority'
      ? 'priority'
      : sortBy === 'title'
      ? 'title'
      : 'createdAt'; // default: newest/oldest by creation date

  const sortOrder = order === 'asc' ? 1 : -1;
  sortOptions[sortField] = sortOrder;

  // Pagination (optional — defaults return everything if not provided)
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 0; // 0 = no limit in Mongoose

  const skip = limitNum ? (pageNum - 1) * limitNum : 0;

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortOptions).skip(skip).limit(limitNum),
    Task.countDocuments(query),
  ]);

  sendResponse(res, 200, 'Tasks fetched successfully', {
    tasks,
    total,
    page: pageNum,
    pages: limitNum ? Math.ceil(total / limitNum) : 1,
  });
});

/**
 * @desc    Get a single task by ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, `Task not found with id: ${req.params.id}`);
  }

  sendResponse(res, 200, 'Task fetched successfully', task);
});

/**
 * @desc    Update a task by ID
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, `Task not found with id: ${req.params.id}`);
  }

  const { title, description, status, priority, dueDate } = req.body;

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate || null;

  const updatedTask = await task.save();

  sendResponse(res, 200, 'Task updated successfully', updatedTask);
});

/**
 * @desc    Delete a task by ID
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, `Task not found with id: ${req.params.id}`);
  }

  await task.deleteOne();

  sendResponse(res, 200, 'Task deleted successfully', { id: req.params.id });
});
