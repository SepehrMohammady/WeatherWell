import 'package:share_plus/share_plus.dart';
import '../models/weather_data.dart';

class ShareService {
  static Future<void> shareWeatherBasic(WeatherData weather, String locationName) async {
    final String message = 
        '🌤️ Weather in $locationName\n'
        '${weather.current.temperature.round()}°C - ${weather.current.condition}\n'
        'Feels like ${weather.current.feelsLike.round()}°C\n'
        '\n'
        'Shared from WeatherWell';
    
    await Share.share(message);
  }

  static Future<void> shareWeatherDetailed(WeatherData weather, String locationName) async {
    final String message = 
        '🌤️ Detailed Weather Report for $locationName\n'
        '\n'
        '🌡️ Temperature: ${weather.current.temperature.round()}°C\n'
        '🤏 Feels like: ${weather.current.feelsLike.round()}°C\n'
        '☁️ Condition: ${weather.current.condition}\n'
        '💧 Humidity: ${weather.current.humidity}%\n'
        '💨 Wind: ${weather.current.windSpeed.round()} km/h\n'
        '👁️ Visibility: ${weather.current.visibility.round()} km\n'
        '📊 Pressure: ${weather.current.pressure.round()} mb\n'
        '☀️ UV Index: ${weather.current.uvIndex.round()}\n'
        '\n'
        'Get accurate weather updates with WeatherWell';
    
    await Share.share(message);
  }

  static Future<void> shareWeatherForecast(WeatherData weather, String locationName) async {
    String forecastText = '';
    
    // Add 3-day forecast
    if (weather.daily.isNotEmpty) {
      forecastText = '\n\n📅 3-Day Forecast:\n';
      for (int i = 0; i < (weather.daily.length > 3 ? 3 : weather.daily.length); i++) {
        final day = weather.daily[i];
        final dayName = i == 0 ? 'Today' : 
                       i == 1 ? 'Tomorrow' : 
                       _getDayName(i);
        forecastText += '$dayName: ${day.maxTemp.round()}°/${day.minTemp.round()}° - ${day.condition}\n';
      }
    }
    
    final String message = 
        '🌤️ Weather Forecast for $locationName\n'
        '\n'
        '🌡️ Current: ${weather.current.temperature.round()}°C - ${weather.current.condition}\n'
        '$forecastText'
        '\n'
        'Stay prepared with WeatherWell';
    
    await Share.share(message);
  }

  static Future<void> showShareOptions(WeatherData weather, String locationName) async {
    // This will show a bottom sheet with sharing options
    // The implementation would depend on the context, 
    // so we'll handle this in the UI components
  }

  static String _getDayName(int dayOffset) {
    final now = DateTime.now();
    final targetDate = now.add(Duration(days: dayOffset));
    final weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return weekdays[targetDate.weekday - 1];
  }
}