import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:weatherwell/models/weather_data.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();

  static Future<void> initialize() async {
    const androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const iosSettings =
        DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );

    const settings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _notifications.initialize(
      settings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );

    // Request notification permissions
    await _requestPermissions();
  }

  static Future<void> _requestPermissions() async {
    await Permission.notification.request();
  }

  static void _onNotificationTapped(NotificationResponse response) {
    // Handle notification tap
    print('Notification tapped: ${response.payload}');
  }

  static Future<void> scheduleUmbrellaAlarm(
    WeatherData weatherData,
    DateTime scheduledTime,
  ) async {
    // Check if umbrella is needed based on weather conditions
    var needsUmbrella = _shouldTakeUmbrella(weatherData);

    if (needsUmbrella) {
      const androidDetails =
          AndroidNotificationDetails(
        'umbrella_alarm',
        'Umbrella Alarms',
        channelDescription: 'Notifications to remind you to take an umbrella',
        importance: Importance.high,
        priority: Priority.high,
        icon: '@mipmap/ic_launcher',
      );

      const iosDetails = DarwinNotificationDetails(
        presentAlert: true,
        presentBadge: true,
        presentSound: true,
      );

      const details = NotificationDetails(
        android: androidDetails,
        iOS: iosDetails,
      );

      await _notifications.zonedSchedule(
        1, // Notification ID
        '☂️ Don\'t forget your umbrella!',
        _getUmbrellaMessage(weatherData),
        tz.TZDateTime.from(scheduledTime, tz.local),
        details,
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
        payload: 'umbrella_alarm',
      );
    }
  }

  static Future<void> scheduleDailyClothesRecommendation(
    WeatherData weatherData,
    DateTime scheduledTime,
  ) async {
    const androidDetails =
        AndroidNotificationDetails(
      'clothes_recommendation',
      'Clothing Suggestions',
      channelDescription: 'Daily clothing recommendations based on weather',
      importance: Importance.defaultImportance,
      priority: Priority.defaultPriority,
      icon: '@mipmap/ic_launcher',
    );

    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await _notifications.zonedSchedule(
      2, // Notification ID
      '👕 Today\'s clothing suggestion',
      _getClothingRecommendation(weatherData),
      tz.TZDateTime.from(scheduledTime, tz.local),
      details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
      payload: 'clothes_recommendation',
    );
  }

  static bool _shouldTakeUmbrella(WeatherData weatherData) {
    // Check current and upcoming conditions
    final current = weatherData.current;
    final hourlyForecasts = weatherData.hourly.take(6).toList(); // Next 6 hours

    // Check current conditions
    if (current.condition.toLowerCase().contains('rain') ||
        current.condition.toLowerCase().contains('drizzle') ||
        current.condition.toLowerCase().contains('shower')) {
      return true;
    }

    // Check upcoming hourly forecasts
    for (final forecast in hourlyForecasts) {
      if (forecast.precipitation > 0.5 || // More than 0.5mm precipitation
          forecast.condition.toLowerCase().contains('rain') ||
          forecast.condition.toLowerCase().contains('drizzle') ||
          forecast.condition.toLowerCase().contains('shower')) {
        return true;
      }
    }

    return false;
  }

  static String _getUmbrellaMessage(WeatherData weatherData) {
    final current = weatherData.current;
    final nextHours = weatherData.hourly.take(3).toList();

    if (current.condition.toLowerCase().contains('rain')) {
      return 'It\'s currently raining. Take your umbrella!';
    }

    for (final forecast in nextHours) {
      if (forecast.precipitation > 0) {
        return 'Rain expected in the next few hours. Better bring an umbrella!';
      }
    }

    return 'Looks like rain is possible today. Consider taking an umbrella!';
  }

  static String _getClothingRecommendation(WeatherData weatherData) {
    final temp = weatherData.current.temperature;
    final condition = weatherData.current.condition.toLowerCase();
    final windSpeed = weatherData.current.windSpeed;

    var recommendations = <String>[];

    // Temperature-based recommendations
    if (temp < 0) {
      recommendations.add('Heavy winter coat, scarf, and gloves');
    } else if (temp < 10) {
      recommendations.add('Warm jacket or coat');
    } else if (temp < 20) {
      recommendations.add('Light jacket or sweater');
    } else if (temp < 25) {
      recommendations.add('Long sleeves or light top');
    } else {
      recommendations.add('T-shirt and light clothing');
    }

    // Weather condition adjustments
    if (condition.contains('rain') || condition.contains('drizzle')) {
      recommendations.add('waterproof jacket');
    }

    if (windSpeed > 20) {
      recommendations.add('windproof layer');
    }

    if (condition.contains('sun') && weatherData.current.uvIndex > 6) {
      recommendations.add('hat and sunglasses');
    }

    return 'Today: ${temp.round()}°C, ${weatherData.current.condition}. '
        'Suggested clothing: ${recommendations.join(', ')}.';
  }

  static Future<void> cancelAllNotifications() async {
    await _notifications.cancelAll();
  }

  static Future<void> cancelNotification(int id) async {
    await _notifications.cancel(id);
  }
}