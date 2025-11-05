import React, { createContext, useContext, useEffect, useState } from 'react';
import { notificationService, NotificationSettings } from '../services/NotificationService';
import { useSettings } from './SettingsContext';
import { WeatherData } from '../services/types';

interface NotificationContextType {
  isInitialized: boolean;
  pushToken: string | null;
  initializeNotifications: () => Promise<boolean>;
  checkWeatherAlerts: (weatherData: WeatherData) => Promise<void>;
  sendTestNotification: () => Promise<void>;
  sendWeatherUpdate: (weatherData: WeatherData, type?: 'daily' | 'hourly') => Promise<void>;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { settings } = useSettings();
  const [isInitialized, setIsInitialized] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    initializeNotifications();
  }, []);

  useEffect(() => {
    // Update notification service when settings change
    if (isInitialized) {
      updateNotificationSettings({
        enableNotifications: settings.enableNotifications,
        enableSevereWeatherAlerts: settings.enableSevereWeatherAlerts,
        enableDailyForecast: settings.enableDailyForecast,
        enableHourlyForecast: settings.enableHourlyForecast,
        enableTemperatureAlerts: settings.enableTemperatureAlerts,
        enableUVAlerts: settings.enableUVAlerts,
        enableUmbrellaAlerts: settings.enableUmbrellaAlerts,
        enableAQIAlerts: settings.enableAQIAlerts,
        enableWindAlerts: settings.enableWindAlerts,
        dailyForecastTime: settings.dailyForecastTime,
        hourlyForecastTime: settings.hourlyForecastTime,
        temperatureThreshold: {
          high: settings.temperatureThresholdHigh,
          low: settings.temperatureThresholdLow,
        },
        uvThreshold: settings.uvThreshold,
        rainThreshold: settings.rainThreshold,
        windSpeedThreshold: settings.windSpeedThreshold,
      });
    }
  }, [
    settings.enableNotifications,
    settings.enableSevereWeatherAlerts,
    settings.enableDailyForecast,
    settings.enableHourlyForecast,
    settings.enableTemperatureAlerts,
    settings.enableUVAlerts,
    settings.enableUmbrellaAlerts,
    settings.enableAQIAlerts,
    settings.enableWindAlerts,
    settings.dailyForecastTime,
    settings.hourlyForecastTime,
    settings.temperatureThresholdHigh,
    settings.temperatureThresholdLow,
    settings.uvThreshold,
    settings.rainThreshold,
    settings.windSpeedThreshold,
    isInitialized,
  ]);

  const initializeNotifications = async (): Promise<boolean> => {
    try {
      const success = await notificationService.initialize();
      setIsInitialized(success);
      
      if (success) {
        const token = notificationService.getPushToken();
        setPushToken(token);
        console.log('🔔 Notification service initialized successfully');
      }
      
      return success;
    } catch (error) {
      console.error('❌ Failed to initialize notifications:', error);
      return false;
    }
  };

  const checkWeatherAlerts = async (weatherData: WeatherData): Promise<void> => {
    if (!isInitialized || !settings.enableNotifications) return;
    
    try {
      await notificationService.checkWeatherAlerts(weatherData);
    } catch (error) {
      console.error('Error checking weather alerts:', error);
    }
  };

  const sendTestNotification = async (): Promise<void> => {
    if (!isInitialized) return;
    
    try {
      await notificationService.sendTestNotification();
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>): void => {
    notificationService.updateSettings(settings);
  };

  const sendWeatherUpdate = async (weatherData: WeatherData, type: 'daily' | 'hourly' = 'daily'): Promise<void> => {
    return notificationService.sendWeatherUpdateNotification(weatherData, type);
  };

  const contextValue: NotificationContextType = {
    isInitialized,
    pushToken,
    initializeNotifications,
    checkWeatherAlerts,
    sendTestNotification,
    sendWeatherUpdate,
    updateNotificationSettings,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;