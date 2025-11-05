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

// Neutral Paradise Color Palette
const lightTheme: ThemeColors = {
  primary: '#A17F66',        // Warm brown from palette
  secondary: '#5F758E',      // Muted blue-grey
  background: '#F0F0F0',     // Light neutral background
  surface: '#FFFFFF',        // Clean white surface
  text: '#758793',           // Dark grey-blue for text
  textSecondary: '#8A9299',  // Darker grey for better visibility on white
  accent: '#CB936A',         // Warm terracotta accent
  error: '#CD9C8B',          // Muted rose for errors
  border: '#E7E7E7',         // Very light grey border
  gradient: ['#E7CFC1', '#D3B19A'] // Warm neutral gradient
};

const darkTheme: ThemeColors = {
  primary: '#CB936A',        // Warm terracotta
  secondary: '#5E6D74',      // Dark grey-blue
  background: '#1A1A1A',     // Darker background (was #2D2D2D)
  surface: '#2A2A2A',        // Darker surface (was #3A3A3A)
  text: '#E7E7E7',           // Light grey text
  textSecondary: '#B6BCBE',  // Muted grey for secondary
  accent: '#CFAE95',         // Light neutral accent
  error: '#D6AD9D',          // Soft rose for errors
  border: '#5E6D74',         // Dark grey-blue border
  gradient: ['#3A4A54', '#1A1A1A'] // Darker cool gradient (was #5E6D74, #3A3A3A)
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