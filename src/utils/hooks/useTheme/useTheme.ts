import { createContext, useContext } from 'react';
import type { ThemeContextProps } from './types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
};
