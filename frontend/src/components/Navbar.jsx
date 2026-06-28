import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <svg className="navbar__mark" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6.5 11l2.5 2.5L15.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="navbar__title">Ledger</span>
        </div>

        <button
          className="navbar__theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M8.5 1.5v2M8.5 13.5v2M1.5 8.5h2M13.5 8.5h2M3.6 3.6l1.4 1.4M12 12l1.4 1.4M3.6 13.4L5 12M12 5l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M14.5 9.8A6 6 0 1 1 7.2 2.5a6.8 6.8 0 0 0 7.3 7.3z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
