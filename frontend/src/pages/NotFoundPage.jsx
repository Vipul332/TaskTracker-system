import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">This page wandered off the list</h1>
      <p className="not-found__message">The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/" className="not-found__link">
        Back to tasks
      </Link>
    </div>
  );
};

export default NotFoundPage;
