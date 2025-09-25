import '../services/weather_service.dart';
import '../services/i_weather_service.dart';

class WeatherServiceFactory {
  static IWeatherService createService(WeatherApiProvider provider) {
    switch (provider) {
      case WeatherApiProvider.weatherApi:
        return WeatherApiService();
      case WeatherApiProvider.openWeatherMap:
        // For now, fallback to WeatherAPI since OpenWeatherMap implementation is complex
        // In a real app, this would return OpenWeatherMapService()
        return WeatherApiService();
    }
  }

  static List<WeatherApiProvider> getAvailableProviders() {
    return [
      WeatherApiProvider.weatherApi,
      // WeatherApiProvider.openWeatherMap, // Commented out until fully implemented
    ];
  }
}