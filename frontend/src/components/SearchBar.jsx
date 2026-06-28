import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search tasks by title…' }) => {
  return (
    <div className="search-bar">
      <svg className="search-bar__icon" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search tasks by title"
      />
      {value ? (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
