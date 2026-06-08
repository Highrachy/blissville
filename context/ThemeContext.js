import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // default theme

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Check local storage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
          document.documentElement.setAttribute('data-bs-theme', savedTheme);
        } else {
          // Check system preference
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = prefersDark ? 'dark' : 'light';
          setTheme(initialTheme);
          document.documentElement.setAttribute('data-bs-theme', initialTheme);
        }
      } catch (e) {
        console.warn('Theme preference access not allowed or supported:', e);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
      } catch (e) {
        console.warn('Failed to save theme preference:', e);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
