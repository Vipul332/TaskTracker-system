import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <svg className="error-message__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 6v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="13.6" r="0.9" fill="currentColor" />
      </svg>
      <span className="error-message__text">{message}</span>
      {onRetry ? (
        <button className="error-message__retry" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
