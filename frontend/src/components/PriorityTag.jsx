import './PriorityTag.css';

const PriorityTag = ({ priority }) => {
  return (
    <span className={`priority-tag priority-tag--${priority}`}>
      <span className="priority-tag__dot" aria-hidden="true" />
      {priority}
    </span>
  );
};

export default PriorityTag;
