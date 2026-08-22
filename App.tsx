import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Theme wraps Language so the language restart dialog can be themed app UI */}
      <ThemeProvider>
        <LanguageProvider>
          <SettingsProvider>
            <NotificationProvider>
              <FavoritesProvider>
                <HomeScreen />
              </FavoritesProvider>
            </NotificationProvider>
          </SettingsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
