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
  }),
});

export interface NotificationSettings {
  enableNotifications: boolean;
  enableSevereWeatherAlerts: boolean;
  enableDailyForecast: boolean;
  enableTemperatureAlerts: boolean;
  enableUVAlerts: boolean;
  dailyForecastTime: string; // Format: "HH:MM"
  temperatureThreshold: {
    high: number;
    low: number;
  };
  uvThreshold: number;
}

export const defaultNotificationSettings: NotificationSettings = {
  enableNotifications: true,
  enableSevereWeatherAlerts: true,
  enableDailyForecast: true,
  enableTemperatureAlerts: false,
  enableUVAlerts: true,
  dailyForecastTime: "08:00",
  temperatureThreshold: {
    high: 35, // Celsius
    low: 0,
  },
  uvThreshold: 8, // High UV index
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
          sound: true,
        });

        await Notifications.setNotificationChannelAsync('daily-forecast', {
          name: 'Daily Forecast',
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: true,
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
   * Schedule daily forecast notification
   */
  async scheduleDailyForecast(): Promise<void> {
    if (!this.notificationSettings.enableDailyForecast) return;

    try {
      // Cancel existing daily forecast notifications
      await Notifications.cancelScheduledNotificationAsync('daily-forecast');

      const [hours, minutes] = this.notificationSettings.dailyForecastTime.split(':').map(Number);
      
      await Notifications.scheduleNotificationAsync({
        identifier: 'daily-forecast',
        content: {
          title: '🌤️ Daily Weather Forecast',
          body: 'Check today\'s weather conditions and plan your day!',
          data: { type: 'daily-forecast' },
          sound: true,
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
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
        await this.sendTemperatureAlert(current.temp_c, current.temp_c >= this.notificationSettings.temperatureThreshold.high);
        await this.sendTemperatureAlert(current.temp_c, current.temp_c <= this.notificationSettings.temperatureThreshold.low);
      }

      // Check UV alerts
      if (this.notificationSettings.enableUVAlerts) {
        await this.sendUVAlert(current.uv);
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
    const condition = current.condition.text.toLowerCase();

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
    if (current.wind_kph > 50) { // Strong wind threshold
      await this.sendSevereWeatherAlert(
        weatherData,
        'Strong Wind',
        `💨 Strong winds detected: ${current.wind_kph} km/h. Take precautions when outdoors.`
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
   * Test notification (for development)
   */
  async sendTestNotification(): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧪 Test Notification',
          body: 'WeatherWell notifications are working correctly!',
          data: { type: 'test' },
          sound: true,
        },
        trigger: { seconds: 1 },
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