import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:geocoding/geocoding.dart' as geocoding;
import '../models/weather_data.dart';
import '../models/location.dart';
import 'i_weather_service.dart';

class OpenWeatherMapService implements IWeatherService {
  static const String _baseUrl = 'https://api.openweathermap.org/data/2.5';
  static const String _geoUrl = 'https://api.openweathermap.org/geo/1.0';
  static const String _apiKey = '2f16c38d61c17ac94d944a5a66ca0e96';
  
  @override
  Future<WeatherData> getCurrentWeather(double lat, double lon) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/weather?lat=$lat&lon=$lon&appid=$_apiKey&units=metric'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return _parseOpenWeatherMapCurrent(data);
      } else {
        throw Exception('Failed to load current weather from OpenWeatherMap');
      }
    } catch (e) {
      throw Exception('Error fetching current weather: $e');
    }
  }

  @override
  Future<WeatherData> getForecast(double lat, double lon, {int days = 7}) async {
    try {
      // OpenWeatherMap One Call API provides 7-day forecast
      final response = await http.get(
        Uri.parse('$_baseUrl/onecall?lat=$lat&lon=$lon&appid=$_apiKey&units=metric&exclude=minutely'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return _parseOpenWeatherMapForecast(data);
      } else {
        throw Exception('Failed to load forecast from OpenWeatherMap');
      }
    } catch (e) {
      throw Exception('Error fetching forecast: $e');
    }
  }

  @override
  Future<List<WeatherData>> getHistoricalData(
    double lat, 
    double lon, 
    DateTime startDate, 
    DateTime endDate,
  ) async {
    // OpenWeatherMap historical data requires subscription
    throw Exception('Historical data requires OpenWeatherMap subscription');
  }

  @override
  Future<List<Location>> searchLocations(String query) async {
    try {
      final response = await http.get(
        Uri.parse('$_geoUrl/direct?q=$query&limit=5&appid=$_apiKey'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => _parseOpenWeatherMapLocation(json)).toList();
      } else {
        // Fallback to geocoding service
        return await _searchUsingGeocoding(query);
      }
    } catch (e) {
      throw Exception('Error searching locations: $e');
    }
  }

  WeatherData _parseOpenWeatherMapCurrent(Map<String, dynamic> data) {
    final main = data['main'];
    final weather = data['weather'][0];
    final wind = data['wind'] ?? {};
    final sys = data['sys'] ?? {};
    
    return WeatherData(
      current: CurrentWeather(
        temperature: main['temp'].toDouble(),
        feelsLike: main['feels_like'].toDouble(),
        humidity: main['humidity'],
        pressure: main['pressure'].toDouble(),
        windSpeed: (wind['speed'] ?? 0).toDouble() * 3.6, // Convert m/s to km/h
        windDirection: wind['deg'] ?? 0,
        visibility: (data['visibility'] ?? 10000).toDouble() / 1000, // Convert m to km
        uvIndex: 0.0, // Not available in current weather endpoint
        condition: weather['description'] ?? '',
        icon: weather['icon'] ?? '',
        lastUpdated: DateTime.fromMillisecondsSinceEpoch(data['dt'] * 1000),
      ),
      daily: [], // Will be populated from forecast data
      hourly: [], // Will be populated from forecast data
      astronomy: Astronomy(
        sunrise: DateTime.fromMillisecondsSinceEpoch((sys['sunrise'] ?? 0) * 1000),
        sunset: DateTime.fromMillisecondsSinceEpoch((sys['sunset'] ?? 0) * 1000),
        moonPhase: 0.0, // Not available
        moonrise: DateTime.now(), // Not available
        moonset: DateTime.now(), // Not available
      ),
    );
  }

  WeatherData _parseOpenWeatherMapForecast(Map<String, dynamic> data) {
    // Parse the full forecast response from One Call API
    final current = data['current'];
    final dailyData = data['daily'] as List<dynamic>? ?? [];
    final hourlyData = data['hourly'] as List<dynamic>? ?? [];

    return WeatherData(
      current: CurrentWeather(
        temperature: current['temp'].toDouble(),
        feelsLike: current['feels_like'].toDouble(),
        humidity: current['humidity'],
        pressure: current['pressure'].toDouble(),
        windSpeed: current['wind_speed'].toDouble() * 3.6,
        windDirection: current['wind_deg'] ?? 0,
        visibility: (current['visibility'] ?? 10000).toDouble() / 1000,
        uvIndex: current['uvi'].toDouble(),
        condition: current['weather'][0]['description'],
        icon: current['weather'][0]['icon'],
        lastUpdated: DateTime.fromMillisecondsSinceEpoch(current['dt'] * 1000),
      ),
      daily: dailyData.take(7).map((day) => _parseDailyForecast(day)).toList(),
      hourly: hourlyData.take(24).map((hour) => _parseHourlyForecast(hour)).toList(),
      astronomy: _parseAstronomy(data),
    );
  }

  DailyForecast _parseDailyForecast(Map<String, dynamic> day) {
    final temp = day['temp'];
    final weather = day['weather'][0];
    
    return DailyForecast(
      date: DateTime.fromMillisecondsSinceEpoch(day['dt'] * 1000),
      maxTemp: temp['max'].toDouble(),
      minTemp: temp['min'].toDouble(),
      condition: weather['description'],
      icon: weather['icon'],
      chanceOfRain: ((day['pop'] ?? 0) * 100).round(),
    );
  }

  HourlyForecast _parseHourlyForecast(Map<String, dynamic> hour) {
    final weather = hour['weather'][0];
    
    return HourlyForecast(
      time: DateTime.fromMillisecondsSinceEpoch(hour['dt'] * 1000),
      temperature: hour['temp'].toDouble(),
      condition: weather['description'],
      icon: weather['icon'],
      chanceOfRain: ((hour['pop'] ?? 0) * 100).round(),
    );
  }

  Astronomy _parseAstronomy(Map<String, dynamic> data) {
    final daily = data['daily'][0];
    return Astronomy(
      sunrise: DateTime.fromMillisecondsSinceEpoch(daily['sunrise'] * 1000),
      sunset: DateTime.fromMillisecondsSinceEpoch(daily['sunset'] * 1000),
      moonPhase: daily['moon_phase'].toDouble(),
      moonrise: DateTime.fromMillisecondsSinceEpoch((daily['moonrise'] ?? daily['sunrise']) * 1000),
      moonset: DateTime.fromMillisecondsSinceEpoch((daily['moonset'] ?? daily['sunset']) * 1000),
    );
  }

  Location _parseOpenWeatherMapLocation(Map<String, dynamic> json) {
    return Location(
      name: json['name'],
      region: json['state'] ?? '',
      country: json['country'],
      latitude: json['lat'].toDouble(),
      longitude: json['lon'].toDouble(),
      timezone: 'UTC', // OpenWeatherMap doesn't provide timezone info
    );
  }

  Future<List<Location>> _searchUsingGeocoding(String query) async {
    try {
      final List<geocoding.Location> geocodingLocations = await geocoding.locationFromAddress(query);
      
      List<Location> results = [];
      
      for (var geocodingLocation in geocodingLocations.take(5)) {
        try {
          final List<geocoding.Placemark> placemarks = 
              await geocoding.placemarkFromCoordinates(geocodingLocation.latitude, geocodingLocation.longitude);
          
          if (placemarks.isNotEmpty) {
            final placemark = placemarks.first;
            final locationName = placemark.locality ?? 
                               placemark.subAdministrativeArea ?? 
                               placemark.administrativeArea ?? 
                               'Unknown';
            
            results.add(Location(
              name: locationName,
              region: placemark.administrativeArea ?? placemark.subAdministrativeArea ?? '',
              country: placemark.country ?? '',
              latitude: geocodingLocation.latitude,
              longitude: geocodingLocation.longitude,
              timezone: 'UTC',
            ));
          }
        } catch (e) {
          continue;
        }
      }
      
      return results;
    } catch (e) {
      throw Exception('Geocoding search failed: $e');
    }
  }

  @override
  WeatherApiProvider get provider => WeatherApiProvider.openWeatherMap;

  @override
  String get apiName => 'OpenWeatherMap';

  @override
  bool get isAvailable => true;
}