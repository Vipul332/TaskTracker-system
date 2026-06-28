import './FilterBar.css';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Newest first' },
  { value: 'createdAt-asc', label: 'Oldest first' },
  { value: 'priority-desc', label: 'Priority' },
  { value: 'title-asc', label: 'Alphabetical' },
];

const FilterBar = ({ statusFilter, onStatusChange, sortBy, order, onSortChange }) => {
  const sortValue = `${sortBy}-${order}`;

  const handleSortChange = (e) => {
    const [field, dir] = e.target.value.split('-');
    onSortChange(field, dir);
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__statuses" role="tablist" aria-label="Filter by status">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            role="tab"
            aria-selected={statusFilter === opt.value}
            className={`filter-bar__pill ${statusFilter === opt.value ? 'filter-bar__pill--active' : ''}`}
            onClick={() => onStatusChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="filter-bar__sort">
        <label htmlFor="sort-select" className="visually-hidden">
          Sort tasks
        </label>
        <select id="sort-select" value={sortValue} onChange={handleSortChange}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
