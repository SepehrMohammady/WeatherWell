import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherServiceFactory } from './WeatherServiceFactory';
import { defaultNotificationSettings, NotificationSettings } from './NotificationService';
import { WeatherData } from './types';

// Task names
export const BACKGROUND_WEATHER_TASK = 'BACKGROUND_WEATHER_ALERT_TASK';

// Storage keys
const LAST_LOCATION_KEY = 'weatherwell_last_location';
const NOTIFICATION_SETTINGS_KEY = 'notification_settings';
const SETTINGS_KEY = 'weatherwell_settings';

interface StoredLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
}

/**
 * Define the background task that will run periodically
 * This task fetches weather data and sends alerts if conditions meet thresholds
 */
TaskManager.defineTask(BACKGROUND_WEATHER_TASK, async () => {
  try {
    console.log('🔄 Background weather task started');
    
    // Get stored location
    const locationData = await AsyncStorage.getItem(LAST_LOCATION_KEY);
    if (!locationData) {
      console.log('❌ No stored location found for background task');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    const location: StoredLocation = JSON.parse(locationData);
    
    // Check if location is not too old (max 24 hours)
    const locationAge = Date.now() - location.timestamp;
    if (locationAge > 24 * 60 * 60 * 1000) {
      console.log('⚠️ Stored location is too old, skipping background fetch');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Get notification settings
    const notificationSettingsData = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    const notificationSettings: NotificationSettings = notificationSettingsData 
      ? JSON.parse(notificationSettingsData) 
      : defaultNotificationSettings;

    // Check if notifications are enabled
    if (!notificationSettings.enableNotifications) {
      console.log('⏸️ Notifications disabled, skipping background task');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Get weather provider settings
    const settingsData = await AsyncStorage.getItem(SETTINGS_KEY);
    const settings = settingsData ? JSON.parse(settingsData) : {};

    // Fetch weather data
    console.log('📡 Fetching weather data in background...');
    const result = await WeatherServiceFactory.getWeatherWithFallback(
      location.latitude,
      location.longitude,
      settings.weatherProvider || 'weatherapi',
      settings.weatherApiKey,
      settings.openWeatherMapApiKey,
      settings.visualCrossingApiKey,
      settings.qweatherApiKey,
      settings.meteostatApiKey
    );

    const weatherData = result.data;
    console.log(`✅ Background weather data fetched from ${result.source}`);

    // Check for alerts and send notifications
    await checkAndSendAlerts(weatherData, notificationSettings);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('❌ Background weather task failed:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

/**
 * Check weather conditions and send alert notifications
 */
async function checkAndSendAlerts(
  weatherData: WeatherData, 
  settings: NotificationSettings
): Promise<void> {
  const current = weatherData.current;
  const today = weatherData.forecast.daily[0];

  // Check umbrella alert - use max rain chance from FUTURE hours only
  if (settings.enableUmbrellaAlerts && today) {
    const now = new Date();
    const futureHourly = weatherData.forecast.hourly.filter(h => new Date(h.time) > now);
    const rainChance = futureHourly.length > 0
      ? Math.max(...futureHourly.map(h => h.precipitationChance))
      : today.precipitationChance;
    if (rainChance >= settings.rainThreshold) {
      await sendBackgroundNotification(
        '☂️ Umbrella Alert',
        `${rainChance}% chance of rain upcoming. Don't forget your umbrella!`,
        { type: 'umbrella-alert', rainChance }
      );
      console.log(`☂️ Background umbrella alert sent: ${rainChance}%`);
    }
  }

  // Check wind alert
  if (settings.enableWindAlerts) {
    const windSpeed = current.windSpeed;
    if (windSpeed >= settings.windSpeedThreshold) {
      await sendBackgroundNotification(
        '💨 Strong Wind Alert',
        `Wind speed is ${Math.round(windSpeed)} km/h. Take precautions when outdoors.`,
        { type: 'wind-alert', windSpeed }
      );
      console.log(`💨 Background wind alert sent: ${windSpeed} km/h`);
    }
  }

  // Check UV alert
  if (settings.enableUVAlerts) {
    const uvIndex = current.uvIndex;
    if (uvIndex >= settings.uvThreshold) {
      const uvLevel = uvIndex >= 11 ? 'Extreme' : uvIndex >= 8 ? 'Very High' : 'High';
      await sendBackgroundNotification(
        '☀️ UV Index Alert',
        `UV Index is ${uvIndex} (${uvLevel}). Wear sunscreen and protective clothing!`,
        { type: 'uv-alert', uvIndex }
      );
      console.log(`☀️ Background UV alert sent: ${uvIndex}`);
    }
  }

  // Check temperature alerts
  if (settings.enableTemperatureAlerts) {
    const temp = current.temperature;
    if (temp >= settings.temperatureThreshold.high) {
      await sendBackgroundNotification(
        '🔥 High Temperature Alert',
        `Temperature is ${Math.round(temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
        { type: 'temp-high-alert', temperature: temp }
      );
      console.log(`🔥 Background high temp alert sent: ${temp}°C`);
    } else if (temp <= settings.temperatureThreshold.low) {
      await sendBackgroundNotification(
        '❄️ Low Temperature Alert',
        `Temperature is ${Math.round(temp)}°C. Bundle up and stay warm!`,
        { type: 'temp-low-alert', temperature: temp }
      );
      console.log(`❄️ Background low temp alert sent: ${temp}°C`);
    }
  }

  // Check AQI alert
  if (settings.enableAQIAlerts && weatherData.airQuality) {
    const aqi = weatherData.airQuality.aqi;
    if (aqi >= 101) { // Unhealthy for sensitive groups
      const aqiLevel = aqi >= 301 ? 'Hazardous' : 
                       aqi >= 201 ? 'Very Unhealthy' : 
                       aqi >= 151 ? 'Unhealthy' : 'Unhealthy for Sensitive Groups';
      await sendBackgroundNotification(
        '🌫️ Air Quality Alert',
        `AQI is ${aqi} (${aqiLevel}). Consider limiting outdoor activities.`,
        { type: 'aqi-alert', aqi }
      );
      console.log(`🌫️ Background AQI alert sent: ${aqi}`);
    }
  }

  // Check severe weather conditions
  if (settings.enableSevereWeatherAlerts) {
    const condition = current.condition.toLowerCase();
    const severeConditions = [
      { keywords: ['thunderstorm', 'thunder', 'lightning'], type: 'Thunderstorm', emoji: '⛈️' },
      { keywords: ['heavy rain', 'torrential'], type: 'Heavy Rain', emoji: '🌧️' },
      { keywords: ['snow', 'blizzard', 'snowstorm'], type: 'Snow', emoji: '❄️' },
      { keywords: ['hail'], type: 'Hail', emoji: '🧊' },
    ];

    for (const severe of severeConditions) {
      if (severe.keywords.some(keyword => condition.includes(keyword))) {
        await sendBackgroundNotification(
          `${severe.emoji} Severe Weather: ${severe.type}`,
          `${severe.type} detected in your area. Take necessary precautions.`,
          { type: 'severe-weather', condition: severe.type }
        );
        console.log(`${severe.emoji} Background severe weather alert: ${severe.type}`);
        break;
      }
    }
  }
}

/**
 * Send a notification from background task
 */
async function sendBackgroundNotification(
  title: string, 
  body: string, 
  data: Record<string, any>
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: 'default',
    },
    trigger: null, // Immediate
  });
}

/**
 * Background Task Service for managing background weather fetches
 */
class BackgroundTaskService {
  private isRegistered: boolean = false;

  /**
   * Register the background fetch task
   * Should be called once when the app starts
   */
  async registerBackgroundTask(): Promise<boolean> {
    try {
      // Check if background fetch is available
      const status = await BackgroundFetch.getStatusAsync();
      
      if (status === BackgroundFetch.BackgroundFetchStatus.Restricted || 
          status === BackgroundFetch.BackgroundFetchStatus.Denied) {
        console.warn('⚠️ Background fetch is restricted or denied by the system');
        return false;
      }

      // Check if already registered
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_WEATHER_TASK);
      if (isRegistered) {
        console.log('✅ Background weather task already registered');
        this.isRegistered = true;
        return true;
      }

      // Register the background fetch task
      await BackgroundFetch.registerTaskAsync(BACKGROUND_WEATHER_TASK, {
        minimumInterval: 60 * 60, // 60 minutes (1 hour)
        stopOnTerminate: false, // Continue after app is closed
        startOnBoot: true, // Start after device reboot
      });

      this.isRegistered = true;
      console.log('✅ Background weather task registered successfully');
      console.log('📋 Task will run approximately every 60 minutes depending on system');
      return true;
    } catch (error) {
      console.error('❌ Failed to register background task:', error);
      return false;
    }
  }

  /**
   * Unregister the background fetch task
   */
  async unregisterBackgroundTask(): Promise<void> {
    try {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_WEATHER_TASK);
      if (isRegistered) {
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_WEATHER_TASK);
        this.isRegistered = false;
        console.log('✅ Background weather task unregistered');
      }
    } catch (error) {
      console.error('❌ Failed to unregister background task:', error);
    }
  }

  /**
   * Save the current location for background task to use
   */
  async saveLocationForBackground(latitude: number, longitude: number): Promise<void> {
    const locationData: StoredLocation = {
      latitude,
      longitude,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(locationData));
    console.log('📍 Location saved for background task');
  }

  /**
   * Check the status of background fetch
   */
  async getBackgroundFetchStatus(): Promise<{
    status: BackgroundFetch.BackgroundFetchStatus;
    isRegistered: boolean;
    statusText: string;
  }> {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_WEATHER_TASK);
    
    let statusText = 'Unknown';
    switch (status) {
      case BackgroundFetch.BackgroundFetchStatus.Available:
        statusText = 'Available';
        break;
      case BackgroundFetch.BackgroundFetchStatus.Restricted:
        statusText = 'Restricted by system';
        break;
      case BackgroundFetch.BackgroundFetchStatus.Denied:
        statusText = 'Denied by user';
        break;
    }

    return { status, isRegistered, statusText };
  }

  /**
   * Get whether the task is registered
   */
  getIsRegistered(): boolean {
    return this.isRegistered;
  }
}

// Export singleton instance
export const backgroundTaskService = new BackgroundTaskService();
export default backgroundTaskService;
