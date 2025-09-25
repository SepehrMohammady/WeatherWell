import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:geocoding/geocoding.dart' as geocoding;
import '../models/weather_data.dart';
import '../models/location.dart';
import 'i_weather_service.dart';

class WeatherApiService implements IWeatherService {
  static const String _baseUrl = 'https://api.weatherapi.com/v1';
  static const String _apiKey = '725bd54f9a1b458884f85421252509';
  
  // WeatherAPI.com provides excellent European coverage and all required features
  // Free tier includes: current weather, 3-day forecast, hourly data, AQI, astronomy
  // For historical data, you may need a paid plan

  Future<WeatherData> getCurrentWeather(double lat, double lon) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/current.json?key=$_apiKey&q=$lat,$lon&aqi=yes'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return _parseCurrentWeather(data);
      } else {
        throw Exception('Failed to load current weather');
      }
    } catch (e) {
      throw Exception('Error fetching current weather: $e');
    }
  }

  Future<WeatherData> getForecast(double lat, double lon, {int days = 7}) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/forecast.json?key=$_apiKey&q=$lat,$lon&days=$days&aqi=yes&alerts=no'),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return _parseForecastData(data);
      } else {
        throw Exception('Failed to load forecast');
      }
    } catch (e) {
      throw Exception('Error fetching forecast: $e');
    }
  }

  Future<List<WeatherData>> getHistoricalData(
    double lat, 
    double lon, 
    DateTime startDate, 
    DateTime endDate,
  ) async {
    try {
      List<WeatherData> historicalData = [];
      
      DateTime currentDate = startDate;
      while (currentDate.isBefore(endDate) || currentDate.isAtSameMomentAs(endDate)) {
        final dateString = '${currentDate.year}-${currentDate.month.toString().padLeft(2, '0')}-${currentDate.day.toString().padLeft(2, '0')}';
        
        final response = await http.get(
          Uri.parse('$_baseUrl/history.json?key=$_apiKey&q=$lat,$lon&dt=$dateString'),
        );

        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          historicalData.add(_parseHistoricalData(data));
        }
        
        currentDate = currentDate.add(const Duration(days: 1));
      }
      
      return historicalData;
    } catch (e) {
      throw Exception('Error fetching historical data: $e');
    }
  }

  Future<List<Location>> searchLocations(String query) async {
    try {
      // First try WeatherAPI.com search
      final response = await http.get(
        Uri.parse('$_baseUrl/search.json?key=$_apiKey&q=$query'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        List<Location> results = data.map((json) => Location.fromJson(json)).toList();
        
        // If WeatherAPI.com returns results, use them
        if (results.isNotEmpty) {
          return results;
        }
      }
      
      // If WeatherAPI.com search fails or returns no results, 
      // fallback to geocoding service for better location coverage
      print('WeatherAPI search returned no results for "$query", trying geocoding...');
      
      try {
        final geocodingResults = await _searchUsingGeocoding(query);
        return geocodingResults;
      } catch (geocodingError) {
        print('Geocoding search also failed: $geocodingError');
        throw Exception('No locations found for "$query". Try different spelling or include country name.');
      }
      
    } catch (e) {
      throw Exception('Error searching locations: $e');
    }
  }

  Future<List<Location>> _searchUsingGeocoding(String query) async {
    try {
      final List<geocoding.Location> geocodingLocations = await geocoding.locationFromAddress(query);
      
      List<Location> results = [];
      
      for (var geocodingLocation in geocodingLocations.take(5)) { // Limit to 5 results
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
              timezone: _getTimezoneFromCountry(placemark.country ?? ''),
            ));
          }
        } catch (e) {
          print('Error processing geocoding result: $e');
          continue;
        }
      }
      
      return results;
    } catch (e) {
      throw Exception('Geocoding search failed: $e');
    }
  }

  String _getTimezoneFromCountry(String country) {
    // Enhanced timezone mapping for better European coverage
    const Map<String, String> countryTimezones = {
      'United Kingdom': 'Europe/London',
      'France': 'Europe/Paris',
      'Germany': 'Europe/Berlin',
      'Italy': 'Europe/Rome',
      'Spain': 'Europe/Madrid',
      'Netherlands': 'Europe/Amsterdam',
      'Belgium': 'Europe/Brussels',
      'Switzerland': 'Europe/Zurich',
      'Austria': 'Europe/Vienna',
      'Poland': 'Europe/Warsaw',
      'Czech Republic': 'Europe/Prague',
      'Hungary': 'Europe/Budapest',
      'Romania': 'Europe/Bucharest',
      'Bulgaria': 'Europe/Sofia',
      'Greece': 'Europe/Athens',
      'Portugal': 'Europe/Lisbon',
      'Sweden': 'Europe/Stockholm',
      'Norway': 'Europe/Oslo',
      'Denmark': 'Europe/Copenhagen',
      'Finland': 'Europe/Helsinki',
      'United States': 'America/New_York',
      'Canada': 'America/Toronto',
    };

    return countryTimezones[country] ?? 'Europe/London';
  }

  WeatherData _parseCurrentWeather(Map<String, dynamic> data) {
    final location = data['location'];
    final current = data['current'];
    final airQuality = data['current']['air_quality'];

    return WeatherData(
      current: CurrentWeather(
        temperature: current['temp_c'].toDouble(),
        feelsLike: current['feelslike_c'].toDouble(),
        humidity: current['humidity'],
        pressure: current['pressure_mb'].toDouble(),
        windSpeed: current['wind_kph'].toDouble(),
        windDirection: current['wind_degree'],
        visibility: current['vis_km'].toDouble(),
        uvIndex: current['uv'].toDouble(),
        condition: current['condition']['text'],
        icon: current['condition']['icon'],
        lastUpdated: DateTime.parse(current['last_updated']),
      ),
      daily: [],
      hourly: [],
      airQuality: AirQuality(
        aqi: airQuality['us-epa-index'] ?? 1,
        co: airQuality['co'].toDouble(),
        no2: airQuality['no2'].toDouble(),
        o3: airQuality['o3'].toDouble(),
        so2: airQuality['so2'].toDouble(),
        pm25: airQuality['pm2_5'].toDouble(),
        pm10: airQuality['pm10'].toDouble(),
      ),
      astronomy: Astronomy(
        sunrise: DateTime.now(), // Will be updated with forecast data
        sunset: DateTime.now(),
        moonPhase: const MoonPhase(phase: 'Unknown', illumination: 0),
      ),
    );
  }

  WeatherData _parseForecastData(Map<String, dynamic> data) {
    final current = data['current'];
    final forecast = data['forecast'];
    final airQuality = data['current']['air_quality'];

    // Parse daily forecasts
    final List<DailyForecast> dailyForecasts = [];
    for (var day in forecast['forecastday']) {
      final dayData = day['day'];
      dailyForecasts.add(DailyForecast(
        date: DateTime.parse(day['date']),
        maxTemp: dayData['maxtemp_c'].toDouble(),
        minTemp: dayData['mintemp_c'].toDouble(),
        condition: dayData['condition']['text'],
        icon: dayData['condition']['icon'],
        humidity: dayData['avghumidity'],
        windSpeed: dayData['maxwind_kph'].toDouble(),
        precipitation: dayData['totalprecip_mm'].toDouble(),
        uvIndex: dayData['uv'].toDouble(),
      ));
    }

    // Parse hourly forecasts
    final List<HourlyForecast> hourlyForecasts = [];
    for (var day in forecast['forecastday']) {
      for (var hour in day['hour']) {
        hourlyForecasts.add(HourlyForecast(
          time: DateTime.parse(hour['time']),
          temperature: hour['temp_c'].toDouble(),
          condition: hour['condition']['text'],
          icon: hour['condition']['icon'],
          precipitation: hour['precip_mm'].toDouble(),
          windSpeed: hour['wind_kph'].toDouble(),
          humidity: hour['humidity'],
        ));
      }
    }

    // Parse astronomy data
    final astro = forecast['forecastday'][0]['astro'];
    final astronomy = Astronomy(
      sunrise: _parseTime(astro['sunrise']),
      sunset: _parseTime(astro['sunset']),
      moonPhase: MoonPhase(
        phase: astro['moon_phase'],
        illumination: double.parse(astro['moon_illumination'].toString()),
      ),
    );

    return WeatherData(
      current: CurrentWeather(
        temperature: current['temp_c'].toDouble(),
        feelsLike: current['feelslike_c'].toDouble(),
        humidity: current['humidity'],
        pressure: current['pressure_mb'].toDouble(),
        windSpeed: current['wind_kph'].toDouble(),
        windDirection: current['wind_degree'],
        visibility: current['vis_km'].toDouble(),
        uvIndex: current['uv'].toDouble(),
        condition: current['condition']['text'],
        icon: current['condition']['icon'],
        lastUpdated: DateTime.parse(current['last_updated']),
      ),
      daily: dailyForecasts,
      hourly: hourlyForecasts,
      airQuality: AirQuality(
        aqi: airQuality['us-epa-index'] ?? 1,
        co: airQuality['co'].toDouble(),
        no2: airQuality['no2'].toDouble(),
        o3: airQuality['o3'].toDouble(),
        so2: airQuality['so2'].toDouble(),
        pm25: airQuality['pm2_5'].toDouble(),
        pm10: airQuality['pm10'].toDouble(),
      ),
      astronomy: astronomy,
    );
  }

  WeatherData _parseHistoricalData(Map<String, dynamic> data) {
    // Similar parsing logic for historical data
    // Implementation would be similar to _parseForecastData
    // but adapted for historical data structure
    throw UnimplementedError('Historical data parsing not yet implemented');
  }

  DateTime _parseTime(String timeString) {
    // Parse time strings like "06:30 AM" to DateTime
    final now = DateTime.now();
    final parts = timeString.split(' ');
    final timeParts = parts[0].split(':');
    final hour = int.parse(timeParts[0]);
    final minute = int.parse(timeParts[1]);
    final isPM = parts[1] == 'PM';
    
    int adjustedHour = hour;
    if (isPM && hour != 12) {
      adjustedHour += 12;
    } else if (!isPM && hour == 12) {
      adjustedHour = 0;
    }
    
    return DateTime(now.year, now.month, now.day, adjustedHour, minute);
  }

  @override
  WeatherApiProvider get provider => WeatherApiProvider.weatherApi;

  @override
  String get apiName => 'WeatherAPI.com';

  @override
  bool get isAvailable => true; // WeatherAPI.com is always available
}