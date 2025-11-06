import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SettingsProvider>
          <NotificationProvider>
            <FavoritesProvider>
              <HomeScreen />
            </FavoritesProvider>
          </NotificationProvider>
        </SettingsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
