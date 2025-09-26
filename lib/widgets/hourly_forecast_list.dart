import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:weatherwell/models/weather_data.dart';

class HourlyForecastList extends StatelessWidget {
  final List<HourlyForecast> forecasts;
  final bool showAllHours;

  const HourlyForecastList({
    required this.forecasts, super.key,
    this.showAllHours = false,
  });

  @override
  Widget build(BuildContext context) {
    final displayForecasts = showAllHours ? forecasts : forecasts.take(12).toList();
    
    return SizedBox(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: displayForecasts.length,
        itemBuilder: (context, index) {
          final forecast = displayForecasts[index];
          final isNow = index == 0 && !showAllHours;
          
          return Container(
            width: 80,
            margin: const EdgeInsets.only(right: 8),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(8),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text(
                      isNow ? 'Now' : DateFormat('HH:mm').format(forecast.time),
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        fontWeight: isNow ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                    Icon(
                      _getWeatherIcon(forecast.condition),
                      size: 24,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    Text(
                      '${forecast.temperature.round()}°',
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (forecast.precipitation > 0)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.water_drop,
                            size: 12,
                            color: Colors.blue,
                          ),
                          const SizedBox(width: 2),
                          Text(
                            '${forecast.precipitation.round()}mm',
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.blue,
                              fontSize: 10,
                            ),
                          ),
                        ],
                      ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
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