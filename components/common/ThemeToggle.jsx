import React from 'react';
import { useTheme } from 'context/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="theme-switch"
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      <span className="theme-switch__icon" aria-hidden="true">
        {isLight ? <HiOutlineMoon size={16} /> : <HiOutlineSun size={16} />}
      </span>
      <span className="theme-switch__label">
        {isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
