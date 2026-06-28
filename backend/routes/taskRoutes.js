import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import {
  validateCreateTask,
  validateUpdateTask,
  validateObjectId,
} from '../middleware/validateTask.js';

const router = express.Router();

router.route('/').post(validateCreateTask, createTask).get(getTasks);

router
  .route('/:id')
  .get(validateObjectId, getTaskById)
  .put(validateObjectId, validateUpdateTask, updateTask)
  .delete(validateObjectId, deleteTask);

export default router;
