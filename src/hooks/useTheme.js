import { useState, useEffect } from 'react';

/**
 * Custom hook for dark/light theme with localStorage persistence.
 * Applies a 'light' class to <html> when in light mode.
 */
export default function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('efty-theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('efty-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
