import { useState } from 'react';
import StatusBadge from './StatusBadge';
import PriorityTag from './PriorityTag';
import './TaskCard.css';

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isOverdue = (dateStr, status) => {
  if (!dateStr || status === 'completed') return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
};

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isComplete = task.status === 'completed';
  const dueDateLabel = formatDate(task.dueDate);
  const overdue = isOverdue(task.dueDate, task.status);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggleComplete(task);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={`task-card ${isComplete ? 'task-card--complete' : ''}`}>
      <button
        className={`task-card__check ${isComplete ? 'task-card__check--on' : ''}`}
        onClick={handleToggle}
        disabled={isToggling}
        aria-pressed={isComplete}
        aria-label={isComplete ? 'Mark task as pending' : 'Mark task as complete'}
      >
        <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
          <path
            d="M3 8.5l3.2 3.2L13 4.8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="task-card__body" onClick={() => onEdit(task)} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onEdit(task); }}>
        <div className="task-card__top-row">
          <h3 className="task-card__title">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        <p className="task-card__description">{task.description}</p>
        <div className="task-card__meta">
          <PriorityTag priority={task.priority} />
          {dueDateLabel ? (
            <span className={`task-card__due ${overdue ? 'task-card__due--overdue' : ''}`}>
              {overdue ? 'Overdue · ' : 'Due '}
              {dueDateLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="task-card__actions">
        <button className="task-card__icon-btn" onClick={() => onEdit(task)} aria-label="Edit task">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.3 2.3a1.5 1.5 0 0 1 2.1 2.1L5 12.8l-3 .7.7-3 8.6-8.2z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="task-card__icon-btn task-card__icon-btn--danger" onClick={() => onDelete(task)} aria-label="Delete task">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 4.5h10M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5l.6 8a1 1 0 0 0 1 .9h3.8a1 1 0 0 0 1-.9l.6-8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
