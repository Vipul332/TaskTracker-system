import './Button.css';

/**
 * Reusable button with variants for primary/secondary/danger/ghost actions.
 * @param {'primary'|'secondary'|'danger'|'ghost'} variant
 * @param {'sm'|'md'} size
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      <span className={isLoading ? 'btn__label--loading' : ''}>{children}</span>
    </button>
  );
};

export default Button;
