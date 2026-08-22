import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from './types';
import { t, ln } from '../i18n';

/**
 * Maps severe-condition identifiers (kept as English data/cooldown keys) to
 * their translatable display labels. Shared with BackgroundTaskService.
 */
export const SEVERE_TYPE_LABEL_KEYS: Record<string, string> = {
  'Thunderstorm': 'notif.severeType.thunderstorm',
  'Heavy Rain': 'notif.severeType.heavyRain',
  'Snow': 'notif.severeType.snow',
  'Hail': 'notif.severeType.hail',
  'Fog': 'notif.severeType.fog',
  'Strong Wind': 'notif.severeType.strongWind',
};

// Configure notification handling behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationSettings {
  enableNotifications: boolean;
  enableSevereWeatherAlerts: boolean;
  enableDailyForecast: boolean;
  enableHourlyForecast: boolean;
  enableTemperatureAlerts: boolean;
  enableUVAlerts: boolean;
  enableUmbrellaAlerts: boolean;
  enableAQIAlerts: boolean;
  aqiThreshold: number;
  enableWindAlerts: boolean;
  dailyForecastTime: string; // Format: "HH:MM"
  hourlyForecastTime: string; // Format: "HH:MM"
  temperatureThreshold: {
    high: number;
    low: number;
  };
  uvThreshold: number;
  rainThreshold: number; // Percentage chance
  windSpeedThreshold: number; // km/h
}

export const defaultNotificationSettings: NotificationSettings = {
  enableNotifications: true,
  enableSevereWeatherAlerts: true,
  enableDailyForecast: true,
  enableHourlyForecast: false, // Disabled by default
  enableTemperatureAlerts: true,
  enableUVAlerts: true,
  enableUmbrellaAlerts: true,
  enableAQIAlerts: true,
  aqiThreshold: 101,
  enableWindAlerts: true,
  dailyForecastTime: "19:00", // Evening daily forecast
  hourlyForecastTime: "08:00", // Morning hourly forecast
  temperatureThreshold: {
    high: 35, // Celsius
    low: 0,
  },
  uvThreshold: 8, // High UV index
  rainThreshold: 70, // Percentage chance
  windSpeedThreshold: 50, // km/h
};

class NotificationService {
  private notificationSettings: NotificationSettings = defaultNotificationSettings;

  /**
   * Initialize notification service and request permissions
   */
  async initialize(): Promise<boolean> {
    try {
      // Request permissions
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.warn('Notification permissions not granted');
        return false;
      }

      // Configure notification channels (all notifications are generated locally)
      await this.setupAndroidChannels();

      // Set up notification listeners
      this.setupNotificationListeners();

      console.log('✅ Notification service initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize notification service:', error);
      return false;
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      if (!Device.isDevice) {
        console.warn('Notifications only work on physical devices');
        return false;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Notification permissions denied');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * Configure Android notification channels
   */
  private async setupAndroidChannels(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('weather-alerts', {
          name: t('notif.channel.weatherAlerts'),
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4A90E2',
          sound: 'default',
        });

        await Notifications.setNotificationChannelAsync('daily-forecast', {
          name: t('notif.channel.dailyForecast'),
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: 'default',
        });
      }
    } catch (error) {
      console.error('Error configuring notification channels:', error);
    }
  }

  /**
   * Set up notification event listeners
   */
  private setupNotificationListeners(): void {
    // Handle notification received while app is in foreground
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('📨 Notification received:', notification);
    });

    // Handle notification tapped/opened
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('👆 Notification tapped:', response);
      this.handleNotificationResponse(response);
    });
  }

  /**
   * Handle notification tap/response
   */
  private handleNotificationResponse(response: Notifications.NotificationResponse): void {
    const data = response.notification.request.content.data;
    
    // Handle different notification types
    switch (data?.type) {
      case 'severe-weather':
        // Navigate to weather details or show alert
        console.log('Opening severe weather details');
        break;
      case 'daily-forecast':
        // Navigate to home screen
        console.log('Opening daily forecast');
        break;
      case 'temperature-alert':
        // Navigate to current weather
        console.log('Opening temperature alert');
        break;
      case 'uv-alert':
        // Navigate to UV details
        console.log('Opening UV alert');
        break;
      default:
        console.log('Opening app');
    }
  }

  /**
   * Update notification settings
   */
  updateSettings(settings: Partial<NotificationSettings>): void {
    this.notificationSettings = { ...this.notificationSettings, ...settings };
    
    // Reschedule notifications based on new settings
    this.rescheduleNotifications();
  }

  /**
   * Schedule daily forecast notification with real weather data.
   * Called from the app when weather data is available.
   */
  async scheduleDailyForecastWithData(weatherData: WeatherData): Promise<void> {
    if (!this.notificationSettings.enableDailyForecast) return;

    try {
      await Notifications.cancelScheduledNotificationAsync('daily-forecast').catch(() => {});

      const [hours, minutes] = this.notificationSettings.dailyForecastTime.split(':').map(Number);

      const current = weatherData.current;
      const today = weatherData.forecast.daily[0];
      const tomorrow = weatherData.forecast.daily[1];
      const location = weatherData.location.name;
      const highTemp = Math.round(today?.maxTemp || current.temperature);
      const lowTemp = Math.round(today?.minTemp || current.temperature);
      const rainChance = today?.precipitationChance || 0;

      let body = `📍 ${location}\n${t('notif.daily.today', { high: highTemp, low: lowTemp, condition: today?.condition || current.condition })}`;
      if (rainChance > 30) body += ` | ${t('notif.daily.rainChance', { chance: rainChance })}`;
      if (tomorrow) {
        body += `\n${t('notif.daily.tomorrow', { high: Math.round(tomorrow.maxTemp), low: Math.round(tomorrow.minTemp), condition: tomorrow.condition })}`;
        if ((tomorrow.precipitationChance || 0) > 30) body += ` | ${t('notif.daily.rainChance', { chance: tomorrow.precipitationChance })}`;
      }
      // Severe weather warnings
      const warnings: string[] = [];
      if (current.uvIndex >= 8) warnings.push(t('notif.daily.highUv', { uv: current.uvIndex }));
      if ((today?.windSpeed || 0) >= 40) warnings.push(t('notif.daily.strongWind', { speed: Math.round(today!.windSpeed) }));
      if ((today?.precipitationMm || 0) >= 10) warnings.push(t('notif.daily.heavyRain', { mm: Math.round(today!.precipitationMm) }));
      if (warnings.length > 0) body += `\n⚠️ ${warnings.join(' | ')}`;

      await Notifications.scheduleNotificationAsync({
        identifier: 'daily-forecast',
        content: {
          title: t('notif.daily.title'),
          body,
          data: { type: 'daily-forecast', location },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`📅 Daily forecast with data scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
    } catch (error) {
      console.error('Error scheduling daily forecast with data:', error);
    }
  }

  /**
   * Schedule daily forecast notification (fallback with no weather data).
   * Only used if no weather data is available.
   */
  async scheduleDailyForecast(): Promise<void> {
    if (!this.notificationSettings.enableDailyForecast) return;

    try {
      await Notifications.cancelScheduledNotificationAsync('daily-forecast').catch(() => {});

      const [hours, minutes] = this.notificationSettings.dailyForecastTime.split(':').map(Number);

      await Notifications.scheduleNotificationAsync({
        identifier: 'daily-forecast',
        content: {
          title: t('notif.daily.fallbackTitle'),
          body: t('notif.daily.fallbackBody'),
          data: { type: 'daily-forecast-trigger' },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`📅 Daily forecast fallback scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
    } catch (error) {
      console.error('Error scheduling daily forecast:', error);
    }
  }

  /**
   * Send severe weather alert
   */
  async sendSevereWeatherAlert(weatherData: WeatherData, alertType: string, message: string): Promise<void> {
    if (!this.notificationSettings.enableSevereWeatherAlerts) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: t('notif.severe.title', { type: t(SEVERE_TYPE_LABEL_KEYS[alertType] || alertType) }),
          body: message,
          data: { 
            type: 'severe-weather',
            alertType,
            location: weatherData.location.name 
          },
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Send immediately
      });

      console.log(`⚠️ Severe weather alert sent: ${alertType}`);
    } catch (error) {
      console.error('Error sending severe weather alert:', error);
    }
  }

  /**
   * Send temperature alert
   */
  async sendTemperatureAlert(temperature: number, isHigh: boolean): Promise<void> {
    if (!this.notificationSettings.enableTemperatureAlerts) return;

    const threshold = isHigh 
      ? this.notificationSettings.temperatureThreshold.high
      : this.notificationSettings.temperatureThreshold.low;

    if ((isHigh && temperature < threshold) || (!isHigh && temperature > threshold)) {
      return;
    }

    try {
      const title = isHigh ? t('notif.temp.highTitle') : t('notif.temp.lowTitle');
      const body = isHigh
        ? t('notif.temp.highBody', { temp: temperature, threshold })
        : t('notif.temp.lowBody', { temp: temperature, threshold });

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { 
            type: 'temperature-alert',
            temperature,
            threshold,
            isHigh 
          },
          sound: true,
        },
        trigger: null,
      });

      console.log(`🌡️ Temperature alert sent: ${temperature}°C`);
    } catch (error) {
      console.error('Error sending temperature alert:', error);
    }
  }

  /**
   * Send UV index alert
   */
  async sendUVAlert(uvIndex: number): Promise<void> {
    if (!this.notificationSettings.enableUVAlerts || uvIndex < this.notificationSettings.uvThreshold) {
      return;
    }

    try {
      const title = t('notif.uv.title');
      const body = t('notif.uv.body', { uv: uvIndex });

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { 
            type: 'uv-alert',
            uvIndex 
          },
          sound: true,
        },
        trigger: null,
      });

      console.log(`☀️ UV alert sent: UV Index ${uvIndex}`);
    } catch (error) {
      console.error('Error sending UV alert:', error);
    }
  }

  /**
   * Schedule hourly forecast notification with real weather data.
   * Called from the app when weather data is available.
   */
  async scheduleHourlyForecastWithData(weatherData: WeatherData): Promise<void> {
    if (!this.notificationSettings.enableHourlyForecast) return;

    try {
      await Notifications.cancelScheduledNotificationAsync('hourly-forecast').catch(() => {});

      const [hours, minutes] = this.notificationSettings.hourlyForecastTime.split(':').map(Number);

      // Filter hours based on notification fire time, not current time
      // The notification content is set now but fires at the scheduled time
      const fireTime = new Date();
      fireTime.setHours(hours, minutes, 0, 0);
      // If fire time already passed today, it fires tomorrow
      if (fireTime <= new Date()) {
        fireTime.setDate(fireTime.getDate() + 1);
      }
      const hourlyData = weatherData.forecast.hourly.filter(h => new Date(h.time) >= fireTime).slice(0, 6);
      const location = weatherData.location.name;

      let body = `📍 ${location}`;
      if (hourlyData.length > 0) {
        // Hour-by-hour temperature trend
        const tempTrend = hourlyData.map(h => {
          const hour = new Date(h.time).getHours();
          const ampm = hour >= 12 ? t('notif.time.pm') : t('notif.time.am');
          const h12 = hour % 12 || 12;
          return `${ln(h12)}${ampm} ${ln(Math.round(h.temperature))}°`;
        }).join(' → ');
        body += `\n${tempTrend}`;

        // Rain windows
        const rainHours = hourlyData.filter(h => h.precipitationChance > 30);
        if (rainHours.length > 0) {
          const rainTimes = rainHours.map(h => {
            const hour = new Date(h.time).getHours();
            const ampm = hour >= 12 ? t('notif.time.pm') : t('notif.time.am');
            return `${ln(hour % 12 || 12)}${ampm}`;
          }).join(', ');
          body += `\n${t('notif.hourly.rainAt', { times: rainTimes })}`;
        }

        // Wind if notable
        const maxWind = Math.max(...hourlyData.map(h => h.windSpeed));
        if (maxWind >= 25) body += ` | ${t('notif.hourly.windUpTo', { speed: Math.round(maxWind) })}`;
      }

      await Notifications.scheduleNotificationAsync({
        identifier: 'hourly-forecast',
        content: {
          title: t('notif.hourly.title'),
          body,
          data: { type: 'hourly-forecast', location },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`⏰ Hourly forecast with data scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
    } catch (error) {
      console.error('Error scheduling hourly forecast with data:', error);
    }
  }

  /**
   * Schedule hourly forecast notification (fallback with no weather data).
   * Only used if no weather data is available.
   */
  async scheduleHourlyForecast(): Promise<void> {
    if (!this.notificationSettings.enableHourlyForecast) return;

    try {
      await Notifications.cancelScheduledNotificationAsync('hourly-forecast').catch(() => {});

      const [hours, minutes] = this.notificationSettings.hourlyForecastTime.split(':').map(Number);

      await Notifications.scheduleNotificationAsync({
        identifier: 'hourly-forecast',
        content: {
          title: t('notif.hourly.updateTitle'),
          body: t('notif.hourly.fallbackBody'),
          data: { type: 'hourly-forecast-trigger' },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`⏰ Hourly forecast fallback scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
    } catch (error) {
      console.error('Error scheduling hourly forecast:', error);
    }
  }

  /**
   * Send umbrella alert for rain
   */
  async sendUmbrellaAlert(rainChance: number, weatherCondition: string): Promise<void> {
    if (!this.notificationSettings.enableUmbrellaAlerts || rainChance < this.notificationSettings.rainThreshold) {
      return;
    }

    try {
      const title = t('notif.umbrella.title');
      const body = t('notif.umbrella.body', { chance: rainChance });

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { 
            type: 'umbrella-alert',
            rainChance,
            condition: weatherCondition
          },
          sound: 'default',
        },
        trigger: null,
      });

      console.log(`☂️ Umbrella alert sent: ${rainChance}% rain chance`);
    } catch (error) {
      console.error('Error sending umbrella alert:', error);
    }
  }

  /**
   * Send wind speed alert
   */
  async sendWindAlert(windSpeed: number): Promise<void> {
    if (!this.notificationSettings.enableWindAlerts || windSpeed < this.notificationSettings.windSpeedThreshold) {
      return;
    }

    try {
      const title = t('notif.wind.title');
      const body = t('notif.wind.body', { speed: Math.round(windSpeed) });

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { 
            type: 'wind-alert',
            windSpeed: Math.round(windSpeed)
          },
          sound: 'default',
        },
        trigger: null,
      });

      console.log(`💨 Wind alert sent: ${windSpeed} km/h`);
    } catch (error) {
      console.error('Error sending wind alert:', error);
    }
  }

  /**
   * Check weather data for alerts
   */
  async checkWeatherAlerts(weatherData: WeatherData): Promise<void> {
    if (!this.notificationSettings.enableNotifications) return;

    try {
      const current = weatherData.current;

      // Check for severe weather conditions
      await this.checkSevereWeatherConditions(weatherData);

      // Check temperature alerts
      if (this.notificationSettings.enableTemperatureAlerts) {
        await this.sendTemperatureAlert(current.temperature, current.temperature >= this.notificationSettings.temperatureThreshold.high);
        await this.sendTemperatureAlert(current.temperature, current.temperature <= this.notificationSettings.temperatureThreshold.low);
      }

      // Check UV alerts
      if (this.notificationSettings.enableUVAlerts) {
        await this.sendUVAlert(current.uvIndex);
      }

      // Check umbrella alerts - use max rain chance from FUTURE hours only
      if (this.notificationSettings.enableUmbrellaAlerts && weatherData.forecast.daily.length > 0) {
        const todayForecast = weatherData.forecast.daily[0];
        const now = new Date();
        const futureHourly = weatherData.forecast.hourly.filter(h => new Date(h.time) > now);
        const futureRainChance = futureHourly.length > 0
          ? Math.max(...futureHourly.map(h => h.precipitationChance))
          : todayForecast.precipitationChance;
        await this.sendUmbrellaAlert(futureRainChance, todayForecast.condition);
      }

      // Check wind alerts
      if (this.notificationSettings.enableWindAlerts) {
        await this.sendWindAlert(current.windSpeed);
      }

    } catch (error) {
      console.error('Error checking weather alerts:', error);
    }
  }

  /**
   * Check for severe weather conditions
   */
  private async checkSevereWeatherConditions(weatherData: WeatherData): Promise<void> {
    const current = weatherData.current;
    const condition = current.condition.toLowerCase();

    // Severe weather conditions
    const severeConditions = [
      { keywords: ['thunderstorm', 'thunder', 'lightning'], type: 'Thunderstorm', emoji: '⛈️' },
      { keywords: ['heavy rain', 'torrential'], type: 'Heavy Rain', emoji: '🌧️' },
      { keywords: ['snow', 'blizzard', 'snowstorm'], type: 'Snow', emoji: '❄️' },
      { keywords: ['hail'], type: 'Hail', emoji: '🧊' },
      { keywords: ['fog', 'mist'], type: 'Fog', emoji: '🌫️' },
      { keywords: ['wind', 'gale'], type: 'Strong Wind', emoji: '💨' },
    ];

    // Check wind speed for alerts
    if (current.windSpeed > 50) { // Strong wind threshold
      await this.sendSevereWeatherAlert(
        weatherData,
        'Strong Wind',
        t('notif.severe.windDetected', { speed: current.windSpeed })
      );
    }

    // Check for severe weather conditions
    for (const severeCondition of severeConditions) {
      if (severeCondition.keywords.some(keyword => condition.includes(keyword))) {
        await this.sendSevereWeatherAlert(
          weatherData,
          severeCondition.type,
          t('notif.severe.conditionsDetected', {
            emoji: severeCondition.emoji,
            type: t(SEVERE_TYPE_LABEL_KEYS[severeCondition.type] || severeCondition.type),
            location: weatherData.location.name,
          })
        );
        break; // Only send one severe weather alert at a time
      }
    }
  }

  /**
   * Reschedule all notifications based on current settings.
   * Reads cached weather data to include real data in notifications.
   */
  private async rescheduleNotifications(): Promise<void> {
    try {
      // Cancel all scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Reschedule based on current settings
      if (this.notificationSettings.enableNotifications) {
        // Try to read cached weather data for rich notifications
        const cachedDataStr = await AsyncStorage.getItem('weatherwell_last_weather').catch(() => null);
        const cachedData: WeatherData | null = cachedDataStr ? JSON.parse(cachedDataStr) : null;

        if (cachedData) {
          await this.scheduleDailyForecastWithData(cachedData);
          await this.scheduleHourlyForecastWithData(cachedData);
        } else {
          await this.scheduleDailyForecast();
          await this.scheduleHourlyForecast();
        }
      }

      console.log('🔄 Notifications rescheduled');
    } catch (error) {
      console.error('Error rescheduling notifications:', error);
    }
  }

}

// Export singleton instance
export const notificationService = new NotificationService();