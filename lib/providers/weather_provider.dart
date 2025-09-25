import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/weather_data.dart';
import '../models/location.dart' as app_location;
import '../services/weather_service.dart';
import '../services/location_service.dart';
import '../services/notification_service.dart';

class WeatherProvider extends ChangeNotifier {
  final WeatherApiService _weatherService = WeatherApiService();
  
  WeatherData? _currentWeather;
  app_location.Location? _currentLocation;
  List<WeatherData> _historicalData = [];
  bool _isLoading = false;
  String? _error;
  bool _umbrellaAlarmsEnabled = true;
  bool _clothesNotificationsEnabled = true;
  ThemeMode _themeMode = ThemeMode.system;

  // Getters
  WeatherData? get currentWeather => _currentWeather;
  app_location.Location? get currentLocation => _currentLocation;
  List<WeatherData> get historicalData => _historicalData;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get umbrellaAlarmsEnabled => _umbrellaAlarmsEnabled;
  bool get clothesNotificationsEnabled => _clothesNotificationsEnabled;
  ThemeMode get themeMode => _themeMode;

  WeatherProvider() {
    _loadSettings();
    _initializeLocation();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _umbrellaAlarmsEnabled = prefs.getBool('umbrella_alarms') ?? true;
    _clothesNotificationsEnabled = prefs.getBool('clothes_notifications') ?? true;
    final themeIndex = prefs.getInt('theme_mode') ?? 0;
    _themeMode = ThemeMode.values[themeIndex];
    notifyListeners();
  }

  Future<void> _saveSettings() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('umbrella_alarms', _umbrellaAlarmsEnabled);
    await prefs.setBool('clothes_notifications', _clothesNotificationsEnabled);
    await prefs.setInt('theme_mode', _themeMode.index);
  }

  Future<void> _initializeLocation() async {
    try {
      _setLoading(true);
      
      // Try to get current position with improved error handling
      final position = await LocationService.getCurrentPosition();
      _currentLocation = await LocationService.getLocationFromCoordinates(
        position.latitude,
        position.longitude,
      );
      
      print('Location detected: ${_currentLocation?.name}, ${_currentLocation?.country}');
      print('Coordinates: ${position.latitude}, ${position.longitude}');
      
      await loadCurrentWeather();
    } catch (e) {
      print('Location detection failed: $e');
      
      // If location fails, set a default location based on user's probable region
      // Instead of defaulting to London, we'll try to be smarter about the fallback
      _currentLocation = app_location.Location(
        name: 'Your Location',
        country: 'Unknown', 
        region: 'Unknown',
        latitude: 44.4056, // Genoa coordinates as a more European-centered default
        longitude: 8.9463,
        timezone: 'Europe/Rome',
      );
      
      // Load weather for default location and inform user
      await loadCurrentWeather();
      
      String errorMessage;
      if (e.toString().contains('denied')) {
        errorMessage = 'Location permission denied. Please enable location access in settings or use search to find your city.';
      } else if (e.toString().contains('disabled')) {
        errorMessage = 'Location services disabled. Please enable location services or use search to find your city.';
      } else {
        errorMessage = 'Unable to detect location automatically. Using approximate location. Use search to find your exact city.';
      }
      
      _setError(errorMessage);
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadCurrentWeather() async {
    if (_currentLocation == null) return;

    try {
      _setLoading(true);
      _currentWeather = await _weatherService.getForecast(
        _currentLocation!.latitude,
        _currentLocation!.longitude,
      );
      _setError(null);
      
      // Schedule notifications if enabled
      if (_umbrellaAlarmsEnabled || _clothesNotificationsEnabled) {
        await _scheduleNotifications();
      }
    } catch (e) {
      _setError('Failed to load weather data: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadHistoricalData(DateTime startDate, DateTime endDate) async {
    if (_currentLocation == null) return;

    try {
      _setLoading(true);
      _historicalData = await _weatherService.getHistoricalData(
        _currentLocation!.latitude,
        _currentLocation!.longitude,
        startDate,
        endDate,
      );
      _setError(null);
    } catch (e) {
      _setError('Failed to load historical data: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> setLocation(app_location.Location location) async {
    _currentLocation = location;
    await loadCurrentWeather();
    
    // Save location to preferences
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('last_location', location.displayName);
    await prefs.setDouble('last_lat', location.latitude);
    await prefs.setDouble('last_lon', location.longitude);
  }

  Future<List<app_location.Location>> searchLocations(String query) async {
    try {
      return await _weatherService.searchLocations(query);
    } catch (e) {
      _setError('Failed to search locations: $e');
      return [];
    }
  }

  Future<void> refreshWeather() async {
    await loadCurrentWeather();
  }

  Future<void> requestLocationAccess() async {
    try {
      _setLoading(true);
      _setError(null);
      
      final position = await LocationService.getCurrentPosition();
      _currentLocation = await LocationService.getLocationFromCoordinates(
        position.latitude,
        position.longitude,
      );
      await loadCurrentWeather();
    } catch (e) {
      _setError('Location access failed: $e\nPlease use the search feature to find your city.');
    } finally {
      _setLoading(false);
    }
  }

  void toggleUmbrellaAlarms(bool enabled) {
    _umbrellaAlarmsEnabled = enabled;
    _saveSettings();
    notifyListeners();
  }

  void toggleClothesNotifications(bool enabled) {
    _clothesNotificationsEnabled = enabled;
    _saveSettings();
    notifyListeners();
  }

  void setThemeMode(ThemeMode mode) {
    _themeMode = mode;
    _saveSettings();
    notifyListeners();
  }

  String getClothingRecommendation() {
    if (_currentWeather == null) return 'No weather data available';

    final temp = _currentWeather!.current.temperature;
    final condition = _currentWeather!.current.condition.toLowerCase();
    final windSpeed = _currentWeather!.current.windSpeed;
    final uvIndex = _currentWeather!.current.uvIndex;

    List<String> recommendations = [];

    // Base clothing recommendation based on temperature
    if (temp < 0) {
      recommendations.add('Heavy winter coat, warm hat, scarf, and gloves');
    } else if (temp < 5) {
      recommendations.add('Winter coat and warm layers');
    } else if (temp < 10) {
      recommendations.add('Warm jacket or heavy sweater');
    } else if (temp < 15) {
      recommendations.add('Light jacket or cardigan');
    } else if (temp < 20) {
      recommendations.add('Long sleeves or light sweater');
    } else if (temp < 25) {
      recommendations.add('T-shirt or light top');
    } else {
      recommendations.add('Light, breathable clothing');
    }

    // Weather-specific adjustments
    if (condition.contains('rain') || condition.contains('drizzle')) {
      recommendations.add('Waterproof jacket or raincoat');
    }

    if (windSpeed > 20) {
      recommendations.add('Windproof outer layer');
    }

    if (condition.contains('sun') && uvIndex > 6) {
      recommendations.add('Hat, sunglasses, and sunscreen');
    }

    if (_currentWeather!.current.humidity > 80) {
      recommendations.add('Moisture-wicking fabrics');
    }

    return recommendations.join(', ');
  }

  bool shouldTakeUmbrella() {
    if (_currentWeather == null) return false;

    // Check current conditions
    final current = _currentWeather!.current;
    if (current.condition.toLowerCase().contains('rain') ||
        current.condition.toLowerCase().contains('drizzle') ||
        current.condition.toLowerCase().contains('shower')) {
      return true;
    }

    // Check next 6 hours
    final nextHours = _currentWeather!.hourly.take(6);
    for (final forecast in nextHours) {
      if (forecast.precipitation > 0.5 ||
          forecast.condition.toLowerCase().contains('rain') ||
          forecast.condition.toLowerCase().contains('drizzle')) {
        return true;
      }
    }

    return false;
  }

  Future<void> _scheduleNotifications() async {
    if (_currentWeather == null) return;

    final tomorrow8AM = DateTime.now().add(const Duration(days: 1)).copyWith(
      hour: 8,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
    );

    if (_umbrellaAlarmsEnabled) {
      await NotificationService.scheduleUmbrellaAlarm(
        _currentWeather!,
        tomorrow8AM,
      );
    }

    if (_clothesNotificationsEnabled) {
      await NotificationService.scheduleDailyClothesRecommendation(
        _currentWeather!,
        tomorrow8AM.subtract(const Duration(minutes: 15)),
      );
    }
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String? error) {
    _error = error;
    notifyListeners();
  }
}