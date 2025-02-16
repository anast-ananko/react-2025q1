import { ReactNode, useEffect, useState } from 'react';

import { ThemeContext, Theme } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`${theme} min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
