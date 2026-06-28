import { useState, useEffect } from 'react';
import Button from './Button';
import './TaskForm.css';

const initialState = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

const TaskForm = ({ initialTask, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        status: initialTask.status || 'pending',
        priority: initialTask.priority || 'medium',
        dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [initialTask]);

  const validate = () => {
    const next = {};
    const title = form.title.trim();
    const description = form.description.trim();

    if (!title) next.title = 'Title is required';
    else if (title.length < 3) next.title = 'Must be at least 3 characters';
    else if (title.length > 100) next.title = 'Must be under 100 characters';

    if (!description) next.description = 'Description is required';
    else if (description.length < 5) next.description = 'Must be at least 5 characters';
    else if (description.length > 1000) next.description = 'Must be under 1000 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          placeholder="e.g. Finish onboarding flow"
          maxLength={100}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title ? (
          <span className="task-form__error" id="title-error">
            {errors.title}
          </span>
        ) : null}
      </div>

      <div className="task-form__field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={form.description}
          onChange={handleChange('description')}
          placeholder="What needs to get done?"
          rows={3}
          maxLength={1000}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description ? (
          <span className="task-form__error" id="description-error">
            {errors.description}
          </span>
        ) : null}
      </div>

      <div className="task-form__row">
        <div className="task-form__field">
          <label htmlFor="status">Status</label>
          <select id="status" value={form.status} onChange={handleChange('status')}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-form__field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={form.priority} onChange={handleChange('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="task-form__field">
        <label htmlFor="dueDate">Due date (optional)</label>
        <input id="dueDate" type="date" value={form.dueDate} onChange={handleChange('dueDate')} />
      </div>

      <div className="task-form__actions">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSubmitting}>
          {initialTask ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
