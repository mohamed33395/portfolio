'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface ThemeData {
  icon_url?: string;
  contact_info?: {
    email?: string;
  };
}

interface ThemeContextType {
  data?: ThemeData;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  data: undefined,
  theme: 'light',
  toggleTheme: () => {},
});

export function useBE_Theme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ data: undefined, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
