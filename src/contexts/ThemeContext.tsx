import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  error: string;
  border: string;
  gradient: string[];
}

const lightTheme: ThemeColors = {
  primary: '#74b9ff',
  secondary: '#0984e3',
  background: '#ffffff',
  surface: 'rgba(255, 255, 255, 0.95)',
  text: '#2d3436',
  textSecondary: 'rgba(45, 52, 54, 0.7)',
  accent: '#00b894',
  error: '#d63031',
  border: 'rgba(45, 52, 54, 0.2)',
  gradient: ['#74b9ff', '#0984e3']
};

const darkTheme: ThemeColors = {
  primary: '#74b9ff',
  secondary: '#0984e3',
  background: '#2d3436',
  surface: 'rgba(116, 185, 255, 0.1)',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  accent: '#00b894',
  error: '#d63031',
  border: 'rgba(255, 255, 255, 0.2)',
  gradient: ['#2d3436', '#636e72']
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};