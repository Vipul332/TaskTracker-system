import './EmptyState.css';

const EmptyState = ({
  title = 'Nothing here yet',
  message = 'Add your first task to get started.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      <svg
        className="empty-state__icon"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <rect x="10" y="8" width="44" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M20 22h24M20 32h24M20 42h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M44 44l6 6m0-6l-6 6"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {actionLabel && onAction ? (
        <button className="empty-state__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
