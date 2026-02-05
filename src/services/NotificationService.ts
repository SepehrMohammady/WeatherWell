import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { WeatherData } from './types';

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
  enableHourlyForecast: false, // Disabled by default - 18:00 hourly update is not useful
  enableTemperatureAlerts: true,
  enableUVAlerts: true,
  enableUmbrellaAlerts: true,
  enableAQIAlerts: true,
  enableWindAlerts: true,
  dailyForecastTime: "08:00",
  hourlyForecastTime: "19:00", // Evening forecast
  temperatureThreshold: {
    high: 35, // Celsius
    low: 0,
  },
  uvThreshold: 8, // High UV index
  rainThreshold: 70, // Percentage chance
  windSpeedThreshold: 50, // km/h
};

class NotificationService {
  private expoPushToken: string | null = null;
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

      // Get push token for remote notifications
      await this.registerForPushNotifications();
      
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
   * Register for push notifications and get Expo push token
   */
  async registerForPushNotifications(): Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.warn('Push notifications only work on physical devices');
        return null;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      this.expoPushToken = token.data;
      console.log('📱 Expo push token:', this.expoPushToken);

      // Configure Android notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('weather-alerts', {
          name: 'Weather Alerts',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4A90E2',
          sound: 'default',
        });

        await Notifications.setNotificationChannelAsync('daily-forecast', {
          name: 'Daily Forecast',
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: 'default',
        });
      }

      return this.expoPushToken;
    } catch (error) {
      console.error('Error registering for push notifications:', error);
      return null;
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
   * Send daily forecast notification with actual weather data
   */
  async sendDailyForecastNotification(weatherData: WeatherData): Promise<void> {
    if (!this.notificationSettings.enableDailyForecast) return;

    try {
      const current = weatherData.current;
      const today = weatherData.forecast.daily[0];
      const location = weatherData.location.name;

      // Create detailed weather message
      const temperature = Math.round(current.temperature);
      const condition = current.condition;
      const highTemp = Math.round(today?.maxTemp || current.temperature);
      const lowTemp = Math.round(today?.minTemp || current.temperature);
      const rainChance = today?.precipitationChance || 0;

      let body = `${location}: ${temperature}°C, ${condition}. High ${highTemp}°C, Low ${lowTemp}°C`;
      
      if (rainChance > 30) {
        body += `. ${rainChance}% chance of rain`;
      }

      // Add UV warning if high
      if (current.uvIndex >= 8) {
        body += `. High UV - wear sunscreen!`;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🌤️ Today\'s Weather',
          body: body,
          data: { 
            type: 'daily-forecast',
            temperature,
            condition,
            location: location,
            rainChance
          },
          sound: 'default',
        },
        trigger: null, // Send immediately
      });

      console.log(`📅 Daily forecast sent: ${location} - ${temperature}°C`);
    } catch (error) {
      console.error('Error sending daily forecast:', error);
    }
  }

  /**
   * Schedule daily forecast notification (placeholder scheduler)
   * Note: This schedules a generic notification. When user opens app, real weather data is sent.
   * For background weather alerts, the app needs to be periodically opened or use background fetch.
   */
  async scheduleDailyForecast(): Promise<void> {
    if (!this.notificationSettings.enableDailyForecast) return;

    try {
      // Cancel existing daily forecast notifications
      await Notifications.cancelScheduledNotificationAsync('daily-forecast');

      const [hours, minutes] = this.notificationSettings.dailyForecastTime.split(':').map(Number);
      
      // Schedule a notification that reminds user to check weather
      // The actual weather data will be shown when they open the app
      await Notifications.scheduleNotificationAsync({
        identifier: 'daily-forecast',
        content: {
          title: '🌤️ Daily Weather Forecast',
          body: 'Good morning! Tap to check today\'s weather, rain chances, and get your daily recommendations.',
          data: { type: 'daily-forecast-trigger' },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`📅 Daily forecast scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
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
          title: `🚨 ${alertType} Alert`,
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
      const emoji = isHigh ? '🔥' : '🥶';
      const title = `${emoji} Temperature ${isHigh ? 'High' : 'Low'} Alert`;
      const body = `Temperature is ${temperature}°C, ${isHigh ? 'above' : 'below'} your ${threshold}°C threshold`;

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
      const title = '☀️ High UV Alert';
      const body = `UV Index is ${uvIndex} - Wear sunscreen and protective clothing!`;

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
   * Send hourly forecast notification with actual weather data
   */
  async sendHourlyForecastNotification(weatherData: WeatherData): Promise<void> {
    if (!this.notificationSettings.enableHourlyForecast) return;

    try {
      const hourlyData = weatherData.forecast.hourly.slice(0, 6); // Next 6 hours
      const location = weatherData.location.name;
      
      if (hourlyData.length === 0) return;

      // Create summary of next few hours
      const nextHour = hourlyData[0];
      const temps = hourlyData.map(h => Math.round(h.temperature));
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);

      let body = `${location} next 6h: ${minTemp}-${maxTemp}°C. `;
      
      // Check for rain in next hours
      const rainHours = hourlyData.filter(h => h.precipitationChance > 30);
      if (rainHours.length > 0) {
        body += `Rain expected in ${rainHours.length} hour(s). `;
      }

      body += `Currently ${Math.round(nextHour.temperature)}°C, ${nextHour.condition}`;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Next 6 Hours Weather',
          body: body,
          data: { 
            type: 'hourly-forecast',
            location: location,
            minTemp,
            maxTemp,
            rainHours: rainHours.length
          },
          sound: 'default',
        },
        trigger: null, // Send immediately
      });

      console.log(`⏰ Hourly forecast sent: ${location} - ${minTemp}-${maxTemp}°C`);
    } catch (error) {
      console.error('Error sending hourly forecast:', error);
    }
  }

  /**
   * Schedule hourly forecast notification (placeholder scheduler)
   */
  async scheduleHourlyForecast(): Promise<void> {
    if (!this.notificationSettings.enableHourlyForecast) return;

    try {
      await Notifications.cancelScheduledNotificationAsync('hourly-forecast');

      const [hours, minutes] = this.notificationSettings.hourlyForecastTime.split(':').map(Number);
      
      await Notifications.scheduleNotificationAsync({
        identifier: 'hourly-forecast',
        content: {
          title: '🌤️ Hourly Weather Update',
          body: 'Tap to check the next few hours weather forecast!',
          data: { type: 'hourly-forecast-trigger' },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });

      console.log(`⏰ Hourly forecast scheduled for ${hours}:${minutes.toString().padStart(2, '0')}`);
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
      const title = '☂️ Umbrella Alert';
      const body = `${rainChance}% chance of rain today. Don't forget your umbrella!`;

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
   * Send AQI alert for air quality
   */
  async sendAQIAlert(aqi: number, aqiDescription: string): Promise<void> {
    if (!this.notificationSettings.enableAQIAlerts || aqi < 101) { // Only alert for unhealthy levels
      return;
    }

    try {
      const title = '🌫️ Air Quality Alert';
      const body = `Air Quality Index is ${aqi} (${aqiDescription}). Consider limiting outdoor activities.`;

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { 
            type: 'aqi-alert',
            aqi,
            description: aqiDescription
          },
          sound: 'default',
        },
        trigger: null,
      });

      console.log(`🌫️ AQI alert sent: ${aqi} (${aqiDescription})`);
    } catch (error) {
      console.error('Error sending AQI alert:', error);
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
      const title = '💨 Strong Wind Alert';
      const body = `Wind speed is ${Math.round(windSpeed)} km/h. Take precautions when outdoors.`;

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

      // Check umbrella alerts
      if (this.notificationSettings.enableUmbrellaAlerts && weatherData.forecast.daily.length > 0) {
        const todayForecast = weatherData.forecast.daily[0];
        await this.sendUmbrellaAlert(todayForecast.precipitationChance, todayForecast.condition);
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
        `💨 Strong winds detected: ${current.windSpeed} km/h. Take precautions when outdoors.`
      );
    }

    // Check for severe weather conditions
    for (const severeCondition of severeConditions) {
      if (severeCondition.keywords.some(keyword => condition.includes(keyword))) {
        await this.sendSevereWeatherAlert(
          weatherData,
          severeCondition.type,
          `${severeCondition.emoji} ${severeCondition.type} conditions detected in ${weatherData.location.name}. Stay safe!`
        );
        break; // Only send one severe weather alert at a time
      }
    }
  }

  /**
   * Reschedule all notifications based on current settings
   */
  private async rescheduleNotifications(): Promise<void> {
    try {
      // Cancel all scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Reschedule based on current settings
      if (this.notificationSettings.enableNotifications) {
        await this.scheduleDailyForecast();
        await this.scheduleHourlyForecast();
      }

      console.log('🔄 Notifications rescheduled');
    } catch (error) {
      console.error('Error rescheduling notifications:', error);
    }
  }

  /**
   * Cancel all notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('🚫 All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  }

  /**
   * Get notification settings
   */
  getSettings(): NotificationSettings {
    return { ...this.notificationSettings };
  }

  /**
   * Get push token
   */
  getPushToken(): string | null {
    return this.expoPushToken;
  }

  /**
   * Send immediate weather update notification
   */
  async sendWeatherUpdateNotification(weatherData: WeatherData, type: 'daily' | 'hourly' = 'daily'): Promise<void> {
    if (!this.notificationSettings.enableNotifications) return;

    try {
      if (type === 'daily' && this.notificationSettings.enableDailyForecast) {
        await this.sendDailyForecastNotification(weatherData);
      } else if (type === 'hourly' && this.notificationSettings.enableHourlyForecast) {
        await this.sendHourlyForecastNotification(weatherData);
      }
    } catch (error) {
      console.error('Error sending weather update notification:', error);
    }
  }

  /**
   * Test notification (for development)
   */
  async sendTestNotification(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧪 Test Notification',
          body: 'WeatherWell notifications are working! Real weather data will be sent at scheduled times and when you open the app.',
          data: { type: 'test' },
          sound: 'default',
        },
        trigger: null,
      });

      console.log('🧪 Test notification sent');
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
export default NotificationService;