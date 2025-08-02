import { useState, type ReactNode } from 'react';
import type { Theme } from './types';
import { ThemeContext } from './useTheme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} className="app">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
