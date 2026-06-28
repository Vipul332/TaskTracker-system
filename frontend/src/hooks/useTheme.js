import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ledger-theme';

/**
 * Manages light/dark theme preference, persisted to localStorage
 * and reflected on the document root via a class.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'auto';
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    root.classList.add(`theme-${theme}`);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
};
