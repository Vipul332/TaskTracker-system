import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [5, 'Description must be at least 5 characters long'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: 'Status must be one of: pending, in-progress, completed',
      },
      default: 'pending',
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be one of: low, medium, high',
      },
      default: 'medium',
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          // Allow null/undefined (optional field) but disallow past dates when set
          if (!value) return true;
          return value instanceof Date && !isNaN(value);
        },
        message: 'Due date must be a valid date',
      },
      default: null,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Index to speed up common queries (status filter + sorting by date)
taskSchema.index({ status: 1, createdAt: -1 });
taskSchema.index({ title: 'text' });

const Task = mongoose.model('Task', taskSchema);

export default Task;
