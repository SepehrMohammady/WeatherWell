import 'package:flutter/material.dart';
import 'package:weatherwell/models/weather_data.dart';

class WeatherDetailsGrid extends StatelessWidget {
  final WeatherData weather;

  const WeatherDetailsGrid({
    required this.weather, super.key,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // Determine number of columns based on screen width
        var crossAxisCount = constraints.maxWidth > 600 ? 3 : 2;
        var aspectRatio = constraints.maxWidth > 600 ? 1.2 : 1.1;
        
        return GridView.count(
          crossAxisCount: crossAxisCount,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: aspectRatio,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
        _buildDetailCard(
          context,
          'Feels Like',
          '${weather.current.feelsLike.round()}°C',
          Icons.thermostat,
        ),
        _buildDetailCard(
          context,
          'Humidity',
          '${weather.current.humidity}%',
          Icons.water_drop,
        ),
        _buildDetailCard(
          context,
          'Wind Speed',
          '${weather.current.windSpeed.round()} km/h',
          Icons.air,
        ),
        _buildDetailCard(
          context,
          'Pressure',
          '${weather.current.pressure.round()} mb',
          Icons.compress,
        ),
        _buildDetailCard(
          context,
          'Visibility',
          '${weather.current.visibility.round()} km',
          Icons.visibility,
        ),
        _buildDetailCard(
          context,
          'UV Index',
          weather.current.uvIndex.round().toString(),
          Icons.wb_sunny,
          subtitle: _getUVDescription(weather.current.uvIndex),
        ),
      ],
    );
      },
    );
  }

  Widget _buildDetailCard(
    BuildContext context,
    String title,
    String value,
    IconData icon, {
    String? subtitle,
  }) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: Theme.of(context).colorScheme.primary,
              size: 28,
            ),
            const SizedBox(height: 6),
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontWeight: FontWeight.w500,
                fontSize: 12,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 2),
            FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                value,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            if (subtitle != null) ...[
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface.withOpacity(0.6),
                  fontSize: 10,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ],
        ),
      ),
    );
  }

  String _getUVDescription(double uvIndex) {
    if (uvIndex <= 2) {
      return 'Low';
    } else if (uvIndex <= 5) {
      return 'Moderate';
    } else if (uvIndex <= 7) {
      return 'High';
    } else if (uvIndex <= 10) {
      return 'Very High';
    } else {
      return 'Extreme';
    }
  }
}