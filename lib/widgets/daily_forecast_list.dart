import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/weather_data.dart';

class DailyForecastList extends StatelessWidget {
  final List<DailyForecast> forecasts;

  const DailyForecastList({
    super.key,
    required this.forecasts,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: forecasts.map((forecast) => _buildDayForecast(context, forecast)).toList(),
    );
  }

  Widget _buildDayForecast(BuildContext context, DailyForecast forecast) {
    final isToday = DateFormat('yyyy-MM-dd').format(forecast.date) ==
        DateFormat('yyyy-MM-dd').format(DateTime.now());
    
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Expanded(
              flex: 2,
              child: Text(
                isToday ? 'Today' : DateFormat('EEEE').format(forecast.date),
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: isToday ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
            Icon(
              _getWeatherIcon(forecast.condition),
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                forecast.condition,
                style: Theme.of(context).textTheme.bodySmall,
                textAlign: TextAlign.start,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(width: 16),
            if (forecast.precipitation > 0) ...[
              Icon(
                Icons.water_drop,
                size: 16,
                color: Colors.blue,
              ),
              const SizedBox(width: 4),
              Text(
                '${forecast.precipitation.round()}mm',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.blue,
                ),
              ),
              const SizedBox(width: 12),
            ],
            Text(
              '${forecast.minTemp.round()}° / ${forecast.maxTemp.round()}°',
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
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