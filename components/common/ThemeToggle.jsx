import React from 'react';
import { useTheme } from 'context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-link text-reset p-0 d-flex align-items-center opacity-75 toggle-hover"
      style={{ textDecoration: 'none' }}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
      <span className="ms-2 small">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
