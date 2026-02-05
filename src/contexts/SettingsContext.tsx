import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WeatherProvider = 'weatherapi' | 'openweathermap' | 'visualcrossing' | 'openmeteo' | 'qweather' | 'meteostat';
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface AppSettings {
  weatherProvider: WeatherProvider;
  temperatureUnit: TemperatureUnit;
  enableNotifications: boolean;
  enableSevereWeatherAlerts: boolean;
  enableDailyForecast: boolean;
  enableHourlyForecast: boolean;
  enableTemperatureAlerts: boolean;
  enableUVAlerts: boolean;
  enableUmbrellaAlerts: boolean;
  enableAQIAlerts: boolean;
  enableWindAlerts: boolean;
  dailyForecastTime: string;
  hourlyForecastTime: string;
  temperatureThresholdHigh: number;
  temperatureThresholdLow: number;
  uvThreshold: number;
  rainThreshold: number;
  windSpeedThreshold: number;
  weatherApiKey: string | null;
  openWeatherMapApiKey: string | null;
  visualCrossingApiKey: string | null;
  qweatherApiKey: string | null;
  meteostatApiKey: string | null;
  refreshInterval: number; // in minutes
  showFeelsLike: boolean;
  showHumidity: boolean;
  showPressure: boolean;
  showVisibility: boolean;
  showUVIndex: boolean;
  showWindSpeed: boolean;
  showWindDirection: boolean;
  showAirQuality: boolean;
  enableShareLocation: boolean;
}

const defaultSettings: AppSettings = {
  weatherProvider: 'weatherapi',
  temperatureUnit: 'celsius',
  enableNotifications: true,
  enableSevereWeatherAlerts: true,
  enableDailyForecast: true,
  enableHourlyForecast: true,
  enableTemperatureAlerts: true,
  enableUVAlerts: true,
  enableUmbrellaAlerts: true,
  enableAQIAlerts: true,
  enableWindAlerts: true,
  dailyForecastTime: '19:00',
  hourlyForecastTime: '08:00',
  temperatureThresholdHigh: 35,
  temperatureThresholdLow: 0,
  uvThreshold: 8,
  rainThreshold: 70,
  windSpeedThreshold: 50,
  weatherApiKey: null,
  openWeatherMapApiKey: null,
  visualCrossingApiKey: null,
  qweatherApiKey: 'b196010778a24af19765ed70af849801',
  meteostatApiKey: '93d3a5f1d3msh36569bf37d01a27p1c06ecjsna9f86b114ae8',
  refreshInterval: 60,
  showFeelsLike: true,
  showHumidity: true,
  showPressure: true,
  showVisibility: true,
  showUVIndex: true,
  showWindSpeed: true,
  showWindDirection: true,
  showAirQuality: true,
  enableShareLocation: true
};

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
  resetSettings: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => Promise<boolean>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('appSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    await saveSettings(newSettings);
  };

  const resetSettings = async () => {
    await saveSettings(defaultSettings);
  };

  const exportSettings = () => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = async (settingsJson: string): Promise<boolean> => {
    try {
      const importedSettings = JSON.parse(settingsJson);
      const validatedSettings = { ...defaultSettings, ...importedSettings };
      await saveSettings(validatedSettings);
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        exportSettings,
        importSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};