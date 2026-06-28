import './SkeletonRow.css';

const SkeletonRow = () => {
  return (
    <div className="skeleton-row" aria-hidden="true">
      <div className="skeleton-row__rail" />
      <div className="skeleton-row__body">
        <div className="skeleton-row__line skeleton-row__line--title" />
        <div className="skeleton-row__line skeleton-row__line--desc" />
      </div>
      <div className="skeleton-row__tag" />
    </div>
  );
};

export default SkeletonRow;
