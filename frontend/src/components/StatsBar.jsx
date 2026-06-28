import './StatsBar.css';

const StatsBar = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;

  if (total === 0) return null;

  return (
    <div className="stats-bar">
      <span>
        <strong>{total}</strong> task{total !== 1 ? 's' : ''}
      </span>
      <span className="stats-bar__divider">·</span>
      <span>
        <strong>{inProgress}</strong> in progress
      </span>
      <span className="stats-bar__divider">·</span>
      <span>
        <strong>{completed}</strong> completed
      </span>
    </div>
  );
};

export default StatsBar;
