import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';
export type ThemeMode = 'system' | 'light' | 'dark';
export type ThemeColorName = 'beige' | 'sage' | 'sky' | 'lavender' | 'rose';

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

// Neutral base — shared by every color theme
const lightBase = {
  background: '#F6F5F3',
  surface: '#FFFFFF',
  text: '#22272C',
  textSecondary: '#6B7378',
  error: '#C0604E',
  border: '#E9E7E4',
  card: '#F1EFEC',
};

const darkBase = {
  background: '#101214',
  surface: '#1B1E21',
  text: '#ECEDEE',
  textSecondary: '#A6ADB3',
  error: '#D98E77',
  border: '#30343A',
  card: '#26292D',
};

interface AccentSet {
  primary: string;
  accent: string;
  gradient: string[];
}

// Accent palettes — same family as ThinkWell / FeedWell theme colors
const ACCENTS: Record<ThemeColorName, { light: AccentSet; dark: AccentSet }> = {
  beige: {
    light: { primary: '#9C7355', accent: '#CB936A', gradient: ['#D9B99F', '#C29873'] },
    dark: { primary: '#CB936A', accent: '#CFAE95', gradient: ['#23282D', '#101214'] },
  },
  sage: {
    light: { primary: '#5E7A5B', accent: '#84A67E', gradient: ['#BCD0B4', '#94B28A'] },
    dark: { primary: '#94BA8C', accent: '#AFCCA6', gradient: ['#1F2823', '#101412'] },
  },
  sky: {
    light: { primary: '#47749B', accent: '#6E9EC4', gradient: ['#AFCBDF', '#7FA9C9'] },
    dark: { primary: '#82AFD3', accent: '#A3C6E0', gradient: ['#1D262E', '#0F1316'] },
  },
  lavender: {
    light: { primary: '#71619B', accent: '#9787C0', gradient: ['#C8BEDF', '#A594CB'] },
    dark: { primary: '#A797D0', accent: '#C2B4E0', gradient: ['#242030', '#121016'] },
  },
  rose: {
    light: { primary: '#9B5C70', accent: '#C0839A', gradient: ['#DFBCC9', '#C795A8'] },
    dark: { primary: '#CF93A8', accent: '#DFB2C2', gradient: ['#2C2026', '#151013'] },
  },
};

export const THEME_COLOR_SWATCHES: Record<ThemeColorName, string> = {
  beige: '#C6A184',
  sage: '#94B28A',
  sky: '#7FA9C9',
  lavender: '#A594CB',
  rose: '#C795A8',
};

function buildColors(theme: Theme, colorName: ThemeColorName): ThemeColors {
  const base = theme === 'light' ? lightBase : darkBase;
  const accent = ACCENTS[colorName]?.[theme] || ACCENTS.beige[theme];
  return { ...base, ...accent };
}

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  themeColor: ThemeColorName;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeColor: (color: ThemeColorName) => void;
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
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [themeColor, setThemeColorState] = useState<ThemeColorName>('beige');
  const [systemScheme, setSystemScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    loadPreferences();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const loadPreferences = async () => {
    try {
      const [savedMode, savedColor, legacyTheme] = await Promise.all([
        AsyncStorage.getItem('themeMode'),
        AsyncStorage.getItem('themeColor'),
        AsyncStorage.getItem('theme'), // pre-1.1 releases stored 'light'/'dark' here
      ]);
      if (savedMode === 'system' || savedMode === 'light' || savedMode === 'dark') {
        setThemeModeState(savedMode);
      } else if (legacyTheme === 'light' || legacyTheme === 'dark') {
        setThemeModeState(legacyTheme);
      }
      if (savedColor && savedColor in ACCENTS) {
        setThemeColorState(savedColor as ThemeColorName);
      }
    } catch (error) {
      console.error('Error loading theme preferences:', error);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem('themeMode', mode).catch(() => {});
  };

  const setThemeColor = (color: ThemeColorName) => {
    setThemeColorState(color);
    AsyncStorage.setItem('themeColor', color).catch(() => {});
  };

  const theme: Theme =
    themeMode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themeMode;
  const colors = buildColors(theme, themeColor);

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, themeColor, colors, setThemeMode, setThemeColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
