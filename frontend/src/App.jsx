import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import TasksPage from './pages/TasksPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--color-paper-raised)',
            color: 'var(--color-ink)',
            border: '1px solid var(--color-border)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            boxShadow: 'var(--shadow-md)',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
