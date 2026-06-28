import ApiError from '../utils/ApiError.js';

const VALID_STATUSES = ['pending', 'in-progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

/**
 * Validates the request body when creating a task.
 * Required fields: title, description.
 */
export const validateCreateTask = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.trim().length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required');
  } else if (description.trim().length < 5) {
    errors.push('Description must be at least 5 characters long');
  } else if (description.trim().length > 1000) {
    errors.push('Description cannot exceed 1000 characters');
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    errors.push('Due date must be a valid date');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

/**
 * Validates the request body when updating a task.
 * All fields optional, but must be valid if provided.
 */
export const validateUpdateTask = (req, res, next) => {
  const { title, description, status, priority, dueDate } = req.body;
  const errors = [];

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Request body cannot be empty'));
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title cannot be empty');
    } else if (title.trim().length < 3 || title.trim().length > 100) {
      errors.push('Title must be between 3 and 100 characters');
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Description cannot be empty');
    } else if (description.trim().length < 5 || description.trim().length > 1000) {
      errors.push('Description must be between 5 and 1000 characters');
    }
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (dueDate !== undefined && dueDate !== null && isNaN(new Date(dueDate).getTime())) {
    errors.push('Due date must be a valid date');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

/**
 * Validates that the :id param is a well-formed MongoDB ObjectId.
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValidObjectId) {
    return next(new ApiError(400, `Invalid task ID: ${id}`));
  }

  next();
};
