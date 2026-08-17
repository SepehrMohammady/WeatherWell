import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  error: string;
  border: string;
  card: string;
  gradient: string[];
}

// Neutral Paradise palette — modern minimal pass:
// light theme gets real text contrast, dark theme gets a true dark ground,
// both keep the warm sand/copper brand accents.
const lightTheme: ThemeColors = {
  primary: '#9C7355',        // Warm brown, deepened for contrast on white
  background: '#F6F5F3',     // Soft warm off-white
  surface: '#FFFFFF',        // Clean white surface
  text: '#22272C',           // Near-black (was grey-blue, hard to read)
  textSecondary: '#6B7378',  // Legible mid-grey for secondary text
  accent: '#CB936A',         // Warm terracotta accent
  error: '#C0604E',          // Clear but muted error red
  border: '#E9E7E4',         // Hairline warm border
  card: '#F1EFEC',           // Subtle chip/button background
  gradient: ['#D9B99F', '#C29873'] // Warm header gradient, deep enough for white text
};

const darkTheme: ThemeColors = {
  primary: '#CB936A',        // Warm terracotta
  background: '#101214',     // True dark ground (was #1A1A1A)
  surface: '#1B1E21',        // Elevated surface
  text: '#ECEDEE',           // High-contrast light text
  textSecondary: '#A6ADB3',  // Muted grey for secondary
  accent: '#CFAE95',         // Light neutral accent
  error: '#D98E77',          // Soft but visible error
  border: '#30343A',         // Subtle border (was light blue-grey)
  card: '#26292D',           // Chip/button background
  gradient: ['#23282D', '#101214'] // Near-monochrome deep header gradient
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
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
  // Initialize with device system theme
  const systemTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const [theme, setThemeState] = useState<Theme>(systemTheme);

  useEffect(() => {
    loadTheme();
    
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only auto-switch if user hasn't explicitly set a theme
      AsyncStorage.getItem('theme').then(savedTheme => {
        if (!savedTheme) {
          setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
        }
      });
    });
    
    return () => subscription.remove();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        // No saved preference - use system theme
        setThemeState(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
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
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};