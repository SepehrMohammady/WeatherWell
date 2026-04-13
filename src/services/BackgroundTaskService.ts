import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherServiceFactory } from './WeatherServiceFactory';
import { defaultNotificationSettings, NotificationSettings } from './NotificationService';
import { WeatherData } from './types';
import { WIDGET_DATA_KEY } from '../widgets/widget-task-handler';

// Task names
export const BACKGROUND_WEATHER_TASK = 'BACKGROUND_WEATHER_ALERT_TASK';

// Storage keys
const LAST_LOCATION_KEY = 'weatherwell_last_location';
const NOTIFICATION_SETTINGS_KEY = 'notification_settings';
const SETTINGS_KEY = 'weatherwell_settings';
const LAST_ALERTS_KEY = 'weatherwell_last_alerts';
const ALERT_COOLDOWN_MS = 3 * 60 * 60 * 1000; // 3 hour cooldown per alert type
const LAST_DAILY_FORECAST_KEY = 'weatherwell_last_daily_forecast';
const LAST_HOURLY_FORECAST_KEY = 'weatherwell_last_hourly_forecast';

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

    // Cache weather data for widget display
    await cacheWidgetData(weatherData);

    // Check for alerts and send notifications
    await checkAndSendAlerts(weatherData, notificationSettings);

    // Check upcoming hourly conditions and warn 1 hour ahead
    await checkUpcomingConditions(weatherData, notificationSettings);

    // Send scheduled daily/hourly forecast notifications with real weather data
    await checkAndSendScheduledNotifications(weatherData, notificationSettings);

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

  // Note: Rain/umbrella alerts are handled by checkUpcomingConditions()
  // which includes specific timing info and cooldown protection

  // Check wind alert
  if (settings.enableWindAlerts) {
    const windSpeed = current.windSpeed;
    if (windSpeed >= settings.windSpeedThreshold) {
      if (await shouldSendAlert('current-wind')) {
        await sendBackgroundNotification(
          '💨 Strong Wind Alert',
          `Wind speed is ${Math.round(windSpeed)} km/h. Take precautions when outdoors.`,
          { type: 'wind-alert', windSpeed }
        );
        await markAlertSent('current-wind');
        console.log(`💨 Background wind alert sent: ${windSpeed} km/h`);
      }
    }
  }

  // Check UV alert
  if (settings.enableUVAlerts) {
    const uvIndex = current.uvIndex;
    if (uvIndex >= settings.uvThreshold) {
      if (await shouldSendAlert('current-uv')) {
        const uvLevel = uvIndex >= 11 ? 'Extreme' : uvIndex >= 8 ? 'Very High' : 'High';
        await sendBackgroundNotification(
          '☀️ UV Index Alert',
          `UV Index is ${uvIndex} (${uvLevel}). Wear sunscreen and protective clothing!`,
          { type: 'uv-alert', uvIndex }
        );
        await markAlertSent('current-uv');
        console.log(`☀️ Background UV alert sent: ${uvIndex}`);
      }
    }
  }

  // Check temperature alerts
  if (settings.enableTemperatureAlerts) {
    const temp = current.temperature;
    if (temp >= settings.temperatureThreshold.high) {
      if (await shouldSendAlert('current-temp-high')) {
        await sendBackgroundNotification(
          '🔥 High Temperature Alert',
          `Temperature is ${Math.round(temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
          { type: 'temp-high-alert', temperature: temp }
        );
        await markAlertSent('current-temp-high');
        console.log(`🔥 Background high temp alert sent: ${temp}°C`);
      }
    } else if (temp <= settings.temperatureThreshold.low) {
      if (await shouldSendAlert('current-temp-low')) {
        await sendBackgroundNotification(
          '❄️ Low Temperature Alert',
          `Temperature is ${Math.round(temp)}°C. Bundle up and stay warm!`,
          { type: 'temp-low-alert', temperature: temp }
        );
        await markAlertSent('current-temp-low');
        console.log(`❄️ Background low temp alert sent: ${temp}°C`);
      }
    }
  }

  // Check AQI alert
  if (settings.enableAQIAlerts && weatherData.airQuality) {
    const aqi = weatherData.airQuality.aqi;
    const aqiThreshold = (settings as any).aqiThreshold || 101;
    if (aqi >= aqiThreshold) {
      if (await shouldSendAlert('current-aqi')) {
        const aqiLevel = aqi >= 301 ? 'Hazardous' : 
                         aqi >= 201 ? 'Very Unhealthy' : 
                         aqi >= 151 ? 'Unhealthy' : 'Unhealthy for Sensitive Groups';
        await sendBackgroundNotification(
          '🌫️ Air Quality Alert',
          `AQI is ${aqi} (${aqiLevel}). Consider limiting outdoor activities.`,
          { type: 'aqi-alert', aqi }
        );
        await markAlertSent('current-aqi');
        console.log(`🌫️ Background AQI alert sent: ${aqi}`);
      }
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
        if (await shouldSendAlert(`current-severe-${severe.type}`)) {
          await sendBackgroundNotification(
            `${severe.emoji} Severe Weather: ${severe.type}`,
            `${severe.type} detected in your area. Take necessary precautions.`,
            { type: 'severe-weather', condition: severe.type }
          );
          await markAlertSent(`current-severe-${severe.type}`);
          console.log(`${severe.emoji} Background severe weather alert: ${severe.type}`);
        }
        break;
      }
    }
  }
}

/**
 * Helper to check alert cooldown - prevents sending the same alert type repeatedly
 */
async function shouldSendAlert(alertType: string): Promise<boolean> {
  try {
    const lastAlertsData = await AsyncStorage.getItem(LAST_ALERTS_KEY);
    const lastAlerts: Record<string, number> = lastAlertsData ? JSON.parse(lastAlertsData) : {};
    const lastSent = lastAlerts[alertType] || 0;
    return (Date.now() - lastSent) > ALERT_COOLDOWN_MS;
  } catch {
    return true;
  }
}

/**
 * Mark an alert type as sent (for cooldown tracking)
 */
async function markAlertSent(alertType: string): Promise<void> {
  try {
    const lastAlertsData = await AsyncStorage.getItem(LAST_ALERTS_KEY);
    const lastAlerts: Record<string, number> = lastAlertsData ? JSON.parse(lastAlertsData) : {};
    lastAlerts[alertType] = Date.now();
    // Clean up entries older than 24 hours
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    for (const key in lastAlerts) {
      if (lastAlerts[key] < cutoff) delete lastAlerts[key];
    }
    await AsyncStorage.setItem(LAST_ALERTS_KEY, JSON.stringify(lastAlerts));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Check upcoming hourly forecasts and warn ~1 hour before bad conditions
 */
async function checkUpcomingConditions(
  weatherData: WeatherData,
  settings: NotificationSettings
): Promise<void> {
  const now = new Date();
  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // Get hourly forecasts for the next 1-2 hours
  const upcomingHours = weatherData.forecast.hourly.filter(h => {
    const hourTime = new Date(h.time);
    return hourTime > now && hourTime <= twoHoursFromNow;
  });

  if (upcomingHours.length === 0) return;

  for (const hour of upcomingHours) {
    const hourTime = new Date(hour.time);
    const timeStr = hourTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check for upcoming rain (umbrella alert with timing)
    if (settings.enableUmbrellaAlerts && hour.precipitationChance >= settings.rainThreshold) {
      if (await shouldSendAlert('upcoming-rain')) {
        await sendBackgroundNotification(
          '☂️ Umbrella Alert',
          `${hour.precipitationChance}% chance of rain around ${timeStr}. Don't forget your umbrella!`,
          { type: 'upcoming-rain', time: timeStr }
        );
        await markAlertSent('upcoming-rain');
        console.log(`☂️ Umbrella alert: ${hour.precipitationChance}% at ${timeStr}`);
      }
    }

    // Check for upcoming high temperature
    if (settings.enableTemperatureAlerts) {
      if (hour.temperature >= settings.temperatureThreshold.high) {
        if (await shouldSendAlert('upcoming-temp-high')) {
          await sendBackgroundNotification(
            '🔥 High Temperature Ahead',
            `Expected ${Math.round(hour.temperature)}°C around ${timeStr}. Stay hydrated!`,
            { type: 'upcoming-temp-high', time: timeStr }
          );
          await markAlertSent('upcoming-temp-high');
        }
      } else if (hour.temperature <= settings.temperatureThreshold.low) {
        if (await shouldSendAlert('upcoming-temp-low')) {
          await sendBackgroundNotification(
            '❄️ Cold Temperature Ahead',
            `Expected ${Math.round(hour.temperature)}°C around ${timeStr}. Dress warmly!`,
            { type: 'upcoming-temp-low', time: timeStr }
          );
          await markAlertSent('upcoming-temp-low');
        }
      }
    }

    // Check for upcoming strong wind
    if (settings.enableWindAlerts && hour.windSpeed >= settings.windSpeedThreshold) {
      if (await shouldSendAlert('upcoming-wind')) {
        await sendBackgroundNotification(
          '💨 Strong Wind Expected',
          `Wind speeds up to ${Math.round(hour.windSpeed)} km/h expected around ${timeStr}.`,
          { type: 'upcoming-wind', time: timeStr }
        );
        await markAlertSent('upcoming-wind');
        console.log(`💨 Upcoming wind alert: ${Math.round(hour.windSpeed)} km/h at ${timeStr}`);
      }
    }

    // Check for upcoming high UV
    if (settings.enableUVAlerts && hour.uvIndex && hour.uvIndex >= settings.uvThreshold) {
      if (await shouldSendAlert('upcoming-uv')) {
        await sendBackgroundNotification(
          '☀️ High UV Expected',
          `UV index of ${hour.uvIndex} expected around ${timeStr}. Apply sunscreen!`,
          { type: 'upcoming-uv', time: timeStr }
        );
        await markAlertSent('upcoming-uv');
      }
    }

    // Check for upcoming severe weather
    if (settings.enableSevereWeatherAlerts) {
      const condition = hour.condition.toLowerCase();
      const severeConditions = [
        { keywords: ['thunderstorm', 'thunder', 'lightning'], type: 'Thunderstorm', emoji: '⛈️' },
        { keywords: ['heavy rain', 'torrential'], type: 'Heavy Rain', emoji: '🌧️' },
        { keywords: ['snow', 'blizzard', 'snowstorm'], type: 'Snow', emoji: '❄️' },
        { keywords: ['hail'], type: 'Hail', emoji: '🧊' },
      ];
      for (const severe of severeConditions) {
        if (severe.keywords.some(kw => condition.includes(kw))) {
          if (await shouldSendAlert(`upcoming-severe-${severe.type}`)) {
            await sendBackgroundNotification(
              `${severe.emoji} ${severe.type} Expected Soon`,
              `${severe.type} forecast around ${timeStr}. Take precautions.`,
              { type: 'upcoming-severe', condition: severe.type, time: timeStr }
            );
            await markAlertSent(`upcoming-severe-${severe.type}`);
          }
          break;
        }
      }
    }
  }
}

/**
 * Check if it's time to send scheduled daily/hourly forecast notifications with real weather data
 */
async function checkAndSendScheduledNotifications(
  weatherData: WeatherData,
  settings: NotificationSettings
): Promise<void> {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  // Check daily forecast
  if (settings.enableDailyForecast) {
    const [targetHour, targetMinute] = settings.dailyForecastTime.split(':').map(Number);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutes = targetHour * 60 + targetMinute;

    if (currentMinutes >= targetMinutes) {
      const lastSent = await AsyncStorage.getItem(LAST_DAILY_FORECAST_KEY);
      if (lastSent !== today) {
        await sendRichDailyForecast(weatherData);
        await AsyncStorage.setItem(LAST_DAILY_FORECAST_KEY, today);
        // Reschedule with real weather data for tomorrow
        await rescheduleWithData('daily-forecast', targetHour, targetMinute, weatherData);
        console.log(`📅 Rich daily forecast sent for ${today}`);
      }
    }
  }

  // Check hourly forecast
  if (settings.enableHourlyForecast) {
    const [targetHour, targetMinute] = settings.hourlyForecastTime.split(':').map(Number);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutes = targetHour * 60 + targetMinute;

    if (currentMinutes >= targetMinutes) {
      const lastSent = await AsyncStorage.getItem(LAST_HOURLY_FORECAST_KEY);
      if (lastSent !== today) {
        await sendRichHourlyForecast(weatherData);
        await AsyncStorage.setItem(LAST_HOURLY_FORECAST_KEY, today);
        // Reschedule with real weather data for tomorrow
        await rescheduleWithData('hourly-forecast', targetHour, targetMinute, weatherData);
        console.log(`⏰ Rich hourly forecast sent for ${today}`);
      }
    }
  }
}

/**
 * Send rich daily forecast notification with actual weather data
 */
async function sendRichDailyForecast(weatherData: WeatherData): Promise<void> {
  const current = weatherData.current;
  const today = weatherData.forecast.daily[0];
  const location = weatherData.location.name;

  const temperature = Math.round(current.temperature);
  const condition = current.condition;
  const highTemp = Math.round(today?.maxTemp || current.temperature);
  const lowTemp = Math.round(today?.minTemp || current.temperature);
  const rainChance = today?.precipitationChance || 0;

  let body = `${location}: ${temperature}°C, ${condition}. High ${highTemp}°C, Low ${lowTemp}°C`;
  
  if (rainChance > 30) {
    body += `. ${rainChance}% chance of rain`;
  }
  if (current.uvIndex >= 8) {
    body += `. High UV - wear sunscreen!`;
  }

  await sendBackgroundNotification(
    '🌤️ Today\'s Weather',
    body,
    { type: 'daily-forecast', temperature, condition, location, rainChance }
  );
}

/**
 * Send rich hourly forecast notification with actual weather data
 */
async function sendRichHourlyForecast(weatherData: WeatherData): Promise<void> {
  const now = new Date();
  const hourlyData = weatherData.forecast.hourly.filter(h => new Date(h.time) > now).slice(0, 6);
  const location = weatherData.location.name;
  
  if (hourlyData.length === 0) return;

  const temps = hourlyData.map(h => Math.round(h.temperature));
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  let body = `${location} next ${hourlyData.length}h: ${minTemp}-${maxTemp}°C. `;
  
  const rainHours = hourlyData.filter(h => h.precipitationChance > 30);
  if (rainHours.length > 0) {
    body += `Rain expected in ${rainHours.length} hour(s). `;
  }

  body += `Currently ${Math.round(hourlyData[0].temperature)}°C, ${hourlyData[0].condition}`;

  await sendBackgroundNotification(
    '⏰ Next Hours Weather',
    body,
    { type: 'hourly-forecast', location, minTemp, maxTemp, rainHours: rainHours.length }
  );
}

/**
 * Reschedule a daily trigger notification with real weather data (for next day)
 */
async function rescheduleWithData(
  identifier: string,
  hour: number,
  minute: number,
  weatherData: WeatherData
): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => {});

    const current = weatherData.current;
    const today = weatherData.forecast.daily[0];
    const location = weatherData.location.name;
    const temperature = Math.round(current.temperature);
    const condition = current.condition;
    const highTemp = Math.round(today?.maxTemp || current.temperature);
    const lowTemp = Math.round(today?.minTemp || current.temperature);
    const rainChance = today?.precipitationChance || 0;

    let title = '🌤️ Today\'s Weather';
    let body = `${location}: ${temperature}°C, ${condition}. High ${highTemp}°C, Low ${lowTemp}°C`;
    if (rainChance > 30) body += `. ${rainChance}% chance of rain`;

    if (identifier === 'hourly-forecast') {
      title = '⏰ Next Hours Weather';
      const hourlyData = weatherData.forecast.hourly.slice(0, 6);
      if (hourlyData.length > 0) {
        const temps = hourlyData.map(h => Math.round(h.temperature));
        body = `${location} next ${hourlyData.length}h: ${Math.min(...temps)}-${Math.max(...temps)}°C. Now ${Math.round(hourlyData[0].temperature)}°C`;
      }
    }

    await Notifications.scheduleNotificationAsync({
      identifier,
      content: { title, body, data: { type: identifier }, sound: 'default' },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  } catch {}
}

/**
 * Cache weather data for widget display
 */
async function cacheWidgetData(weatherData: WeatherData): Promise<void> {
  try {
    const current = weatherData.current;
    const today = weatherData.forecast.daily[0];
    const rainChance = today?.precipitationChance || 0;

    // Read widget settings from app settings
    const settingsData = await AsyncStorage.getItem('appSettings');
    const appSettings = settingsData ? JSON.parse(settingsData) : {};

    const widgetData = {
      temperature: `${Math.round(current.temperature)}°`,
      location: weatherData.location.name,
      conditions: current.condition,
      high: `${Math.round(today?.maxTemp || current.temperature)}°`,
      low: `${Math.round(today?.minTemp || current.temperature)}°`,
      rainChance: rainChance > 0 ? `${rainChance}%` : undefined,
      feelsLike: current.feelsLike !== undefined ? `${Math.round(current.feelsLike)}°` : undefined,
      opacity: appSettings.widgetOpacity ?? 0.85,
      showFeelsLike: appSettings.widgetShowFeelsLike ?? true,
      showHighLow: appSettings.widgetShowHighLow ?? true,
      showRainChance: appSettings.widgetShowRainChance ?? true,
      showConditions: appSettings.widgetShowConditions ?? true,
    };

    await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));
    console.log('📱 Widget data cached');
  } catch (error) {
    console.log('Widget cache skipped:', error instanceof Error ? error.message : 'unknown');
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
  async registerBackgroundTask(refreshIntervalMinutes?: number): Promise<boolean> {
    try {
      // Check if background fetch is available
      const status = await BackgroundFetch.getStatusAsync();
      
      if (status === BackgroundFetch.BackgroundFetchStatus.Restricted || 
          status === BackgroundFetch.BackgroundFetchStatus.Denied) {
        console.warn('⚠️ Background fetch is restricted or denied by the system');
        return false;
      }

      // Unregister existing task first to update interval
      const isAlreadyRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_WEATHER_TASK);
      if (isAlreadyRegistered) {
        await BackgroundFetch.unregisterTaskAsync(BACKGROUND_WEATHER_TASK);
      }

      const intervalMinutes = refreshIntervalMinutes || 60;

      // Register the background fetch task
      await BackgroundFetch.registerTaskAsync(BACKGROUND_WEATHER_TASK, {
        minimumInterval: intervalMinutes * 60, // Convert to seconds
        stopOnTerminate: false, // Continue after app is closed
        startOnBoot: true, // Start after device reboot
      });

      this.isRegistered = true;
      console.log(`✅ Background weather task registered (interval: ~${intervalMinutes}min)`);
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
    status: BackgroundFetch.BackgroundFetchStatus | null;
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
