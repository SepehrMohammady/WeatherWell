import 'package:flutter/material.dart';
import '../providers/weather_provider.dart';

class SmartFeaturesCard extends StatelessWidget {
  final WeatherProvider weatherProvider;

  const SmartFeaturesCard({
    super.key,
    required this.weatherProvider,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Smart Suggestions',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            _buildUmbrellaSection(context),
            const Divider(height: 32),
            _buildClothingSection(context),
          ],
        ),
      ),
    );
  }

  Widget _buildUmbrellaSection(BuildContext context) {
    final shouldTakeUmbrella = weatherProvider.shouldTakeUmbrella();
    
    return Row(
      children: [
        Icon(
          Icons.beach_access,
          color: shouldTakeUmbrella ? Colors.blue : Colors.grey,
          size: 32,
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                shouldTakeUmbrella ? 'Take an umbrella!' : 'No umbrella needed',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: shouldTakeUmbrella ? Colors.blue : Colors.grey[600],
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                shouldTakeUmbrella 
                    ? 'Rain is expected today or in the next few hours.'
                    : 'Clear skies ahead - leave the umbrella at home.',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildClothingSection(BuildContext context) {
    final clothingRecommendation = weatherProvider.getClothingRecommendation();
    
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(
          Icons.checkroom,
          color: Theme.of(context).colorScheme.primary,
          size: 32,
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'What to wear today',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                clothingRecommendation,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),
        ),
      ],
    );
  }
}