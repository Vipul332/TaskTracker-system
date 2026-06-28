import './StatusBadge.css';

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In progress',
  completed: 'Completed',
};

const StatusBadge = ({ status }) => {
  return <span className={`status-badge status-badge--${status}`}>{STATUS_LABELS[status] || status}</span>;
};

export default StatusBadge;
