import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:weatherwell/models/weather_data.dart';

class CurrentWeatherCard extends StatelessWidget {
  final WeatherData weather;

  const CurrentWeatherCard({
    required this.weather, super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${weather.current.temperature.round()}°',
                        style: Theme.of(context).textTheme.displayLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        weather.current.condition,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Feels like ${weather.current.feelsLike.round()}°',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurface.withOpacity(0.7),
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  children: [
                    // Weather icon would go here
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(40),
                      ),
                      child: Icon(
                        _getWeatherIcon(weather.current.condition),
                        size: 40,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      DateFormat('HH:mm').format(weather.current.lastUpdated),
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildQuickStat(
                  context,
                  Icons.water_drop,
                  '${weather.current.humidity}%',
                  'Humidity',
                ),
                _buildQuickStat(
                  context,
                  Icons.air,
                  '${weather.current.windSpeed.round()} km/h',
                  'Wind',
                ),
                _buildQuickStat(
                  context,
                  Icons.compress,
                  '${weather.current.pressure.round()} mb',
                  'Pressure',
                ),
                _buildQuickStat(
                  context,
                  Icons.wb_sunny,
                  weather.current.uvIndex.round().toString(),
                  'UV Index',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickStat(BuildContext context, IconData icon, String value, String label) {
    return Column(
      children: [
        Icon(
          icon,
          size: 20,
          color: Theme.of(context).colorScheme.primary,
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }

  IconData _getWeatherIcon(String condition) {
    final lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.contains('sun') || lowerCondition.contains('clear')) {
      return Icons.wb_sunny;
    } else if (lowerCondition.contains('cloud')) {
      return Icons.cloud;
    } else if (lowerCondition.contains('rain')) {
      return Icons.grain;
    } else if (lowerCondition.contains('storm') || lowerCondition.contains('thunder')) {
      return Icons.thunderstorm;
    } else if (lowerCondition.contains('snow')) {
      return Icons.ac_unit;
    } else if (lowerCondition.contains('fog') || lowerCondition.contains('mist')) {
      return Icons.foggy;
    } else {
      return Icons.wb_cloudy;
    }
  }
}