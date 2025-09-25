import '../models/weather_data.dart';
import '../models/location.dart';

enum WeatherApiProvider {
  weatherApi('WeatherAPI.com', 'Comprehensive weather data with excellent European coverage'),
  openWeatherMap('OpenWeatherMap', 'Popular weather service with global coverage'),
  // Add more providers as needed
  ;

  const WeatherApiProvider(this.displayName, this.description);
  
  final String displayName;
  final String description;
}

abstract class IWeatherService {
  Future<WeatherData> getCurrentWeather(double lat, double lon);
  Future<WeatherData> getForecast(double lat, double lon, {int days = 7});
  Future<List<WeatherData>> getHistoricalData(double lat, double lon, DateTime startDate, DateTime endDate);
  Future<List<Location>> searchLocations(String query);
  
  // Provider identification
  WeatherApiProvider get provider;
  String get apiName;
  bool get isAvailable;
}