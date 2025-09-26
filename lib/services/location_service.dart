import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:weatherwell/models/location.dart' as app_location;

class LocationService {
  static Future<bool> isLocationServiceEnabled() async {
    return await Geolocator.isLocationServiceEnabled();
  }

  static Future<LocationPermission> checkPermission() async {
    return await Geolocator.checkPermission();
  }

  static Future<LocationPermission> requestPermission() async {
    return await Geolocator.requestPermission();
  }

  static Future<Position> getCurrentPosition() async {
    var serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception('Location services are disabled.');
    }

    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw Exception('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      throw Exception('Location permissions are permanently denied');
    }

    // Try multiple location sources for better accuracy
    try {
      // First try with high accuracy
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: const Duration(seconds: 10),
      );
    } catch (e) {
      // If high accuracy fails, try with medium accuracy and longer timeout
      try {
        return await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.medium,
          timeLimit: const Duration(seconds: 15),
        );
      } catch (e2) {
        // Final fallback with low accuracy
        return await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.low,
          timeLimit: const Duration(seconds: 20),
        );
      }
    }
  }

  static Future<app_location.Location> getLocationFromCoordinates(
    double latitude,
    double longitude,
  ) async {
    try {
      var placemarks = await placemarkFromCoordinates(
        latitude,
        longitude,
      );

      if (placemarks.isNotEmpty) {
        final placemark = placemarks.first;
        return app_location.Location(
          name: placemark.locality ?? placemark.subAdministrativeArea ?? 'Unknown',
          country: placemark.country ?? 'Unknown',
          region: placemark.administrativeArea ?? 'Unknown',
          latitude: latitude,
          longitude: longitude,
          timezone: 'Europe/London', // Default, should be determined based on coordinates
        );
      } else {
        throw Exception('No location information found');
      }
    } catch (e) {
      throw Exception('Error getting location information: $e');
    }
  }

  static Future<List<app_location.Location>> searchLocationsByName(
    String locationName,
  ) async {
    try {
      var locations = await locationFromAddress(locationName);
      var results = <app_location.Location>[];

      for (var location in locations) {
        var placemarks = await placemarkFromCoordinates(
          location.latitude,
          location.longitude,
        );

        if (placemarks.isNotEmpty) {
          final placemark = placemarks.first;
          results.add(app_location.Location(
            name: placemark.locality ?? placemark.subAdministrativeArea ?? locationName,
            country: placemark.country ?? 'Unknown',
            region: placemark.administrativeArea ?? 'Unknown',
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: _getTimezoneFromCountry(placemark.country ?? ''),
          ));
        }
      }

      return results;
    } catch (e) {
      throw Exception('Error searching locations: $e');
    }
  }

  static String _getTimezoneFromCountry(String country) {
    // Simple mapping for European countries
    const countryTimezones = <String, String>{
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
    };

    return countryTimezones[country] ?? 'Europe/London';
  }
}