import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:weatherwell/providers/weather_provider.dart';
import 'package:weatherwell/models/weather_data.dart';
import 'package:weatherwell/widgets/current_weather_card.dart';
import 'package:weatherwell/widgets/hourly_forecast_list.dart';
import 'package:weatherwell/widgets/daily_forecast_list.dart';
import 'package:weatherwell/widgets/weather_details_grid.dart';
import 'package:weatherwell/widgets/smart_features_card.dart';
import 'package:weatherwell/services/share_service.dart';
import 'package:weatherwell/screens/search_screen.dart';
import 'package:weatherwell/screens/settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    // Initialize notifications
    WidgetsBinding.instance.addPostFrameCallback((_) {
      // NotificationService.initialize() would be called here in a real app
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Consumer<WeatherProvider>(
          builder: (context, weatherProvider, child) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'WeatherWell',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                if (weatherProvider.currentLocation != null)
                  Text(
                    weatherProvider.currentLocation!.displayName,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
              ],
            );
          },
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SearchScreen()),
            ),
          ),
          Consumer<WeatherProvider>(
            builder: (context, weatherProvider, child) {
              return IconButton(
                icon: weatherProvider.isLoading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      )
                    : const Icon(Icons.refresh),
                onPressed: weatherProvider.isLoading
                    ? null
                    : () => weatherProvider.refreshWeather(),
                tooltip: 'Refresh weather data',
              );
            },
          ),
          Consumer<WeatherProvider>(
            builder: (context, weatherProvider, child) {
              return IconButton(
                icon: const Icon(Icons.share),
                onPressed: weatherProvider.currentWeather != null
                    ? () => _showShareOptions(context, weatherProvider)
                    : null,
                tooltip: 'Share weather',
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SettingsScreen()),
            ),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Consumer<WeatherProvider>(
        builder: (context, weatherProvider, child) {
          if (weatherProvider.isLoading && weatherProvider.currentWeather == null) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Loading weather data...'),
                ],
              ),
            );
          }

          if (weatherProvider.error != null && weatherProvider.currentWeather == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.location_off,
                    size: 64,
                    color: Theme.of(context).colorScheme.error,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Location Access Needed',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      weatherProvider.error!,
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton.icon(
                        onPressed: weatherProvider.requestLocationAccess,
                        icon: const Icon(Icons.my_location),
                        label: const Text('Enable Location'),
                      ),
                      const SizedBox(width: 16),
                      OutlinedButton.icon(
                        onPressed: () {
                          Navigator.pushNamed(context, '/search');
                        },
                        icon: const Icon(Icons.search),
                        label: const Text('Search City'),
                      ),
                    ],
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: weatherProvider.refreshWeather,
            child: IndexedStack(
              index: _selectedIndex,
              children: [
                _buildCurrentWeatherTab(weatherProvider),
                _buildForecastTab(weatherProvider),
                _buildDetailsTab(weatherProvider),
              ],
            ),
          );
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.wb_sunny),
            label: 'Current',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_view_week),
            label: 'Forecast',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.info_outline),
            label: 'Details',
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentWeatherTab(WeatherProvider weatherProvider) {
    if (weatherProvider.currentWeather == null) {
      return const Center(child: Text('No weather data available'));
    }

    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CurrentWeatherCard(weather: weatherProvider.currentWeather!),
          const SizedBox(height: 16),
          SmartFeaturesCard(weatherProvider: weatherProvider),
          const SizedBox(height: 16),
          Text(
            'Today\'s Hourly Forecast',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          HourlyForecastList(
            forecasts: weatherProvider.currentWeather!.hourly.take(24).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildForecastTab(WeatherProvider weatherProvider) {
    if (weatherProvider.currentWeather == null) {
      return const Center(child: Text('No forecast data available'));
    }

    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '7-Day Forecast',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          DailyForecastList(forecasts: weatherProvider.currentWeather!.daily),
          const SizedBox(height: 24),
          Text(
            'Hourly Forecast',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          HourlyForecastList(
            forecasts: weatherProvider.currentWeather!.hourly,
            showAllHours: true,
          ),
        ],
      ),
    );
  }

  Widget _buildDetailsTab(WeatherProvider weatherProvider) {
    if (weatherProvider.currentWeather == null) {
      return const Center(child: Text('No weather details available'));
    }

    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Weather Details',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          WeatherDetailsGrid(weather: weatherProvider.currentWeather!),
          const SizedBox(height: 24),
          _buildAstronomyCard(weatherProvider.currentWeather!),
          const SizedBox(height: 16),
          if (weatherProvider.currentWeather!.airQuality != null)
            _buildAirQualityCard(weatherProvider.currentWeather!.airQuality!),
        ],
      ),
    );
  }

  Widget _buildAstronomyCard(WeatherData weather) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Sun & Moon',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: Column(
                    children: [
                      const Icon(Icons.wb_sunny, color: Colors.orange),
                      const SizedBox(height: 8),
                      const Text('Sunrise'),
                      Text(
                        DateFormat.Hm().format(weather.astronomy.sunrise),
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    children: [
                      const Icon(Icons.wb_sunny_outlined, color: Colors.orange),
                      const SizedBox(height: 8),
                      const Text('Sunset'),
                      Text(
                        DateFormat.Hm().format(weather.astronomy.sunset),
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    children: [
                      const Icon(Icons.nightlight_round, color: Colors.blue),
                      const SizedBox(height: 8),
                      Text(weather.astronomy.moonPhase.phase),
                      Text(
                        '${weather.astronomy.moonPhase.illumination.round()}%',
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAirQualityCard(AirQuality airQuality) {
    Color getAqiColor(int aqi) {
      switch (aqi) {
        case 1: return Colors.green;
        case 2: return Colors.lightGreen;
        case 3: return Colors.yellow;
        case 4: return Colors.orange;
        case 5: return Colors.red;
        default: return Colors.grey;
      }
    }

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  'Air Quality',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: getAqiColor(airQuality.aqi),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    airQuality.qualityDescription,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _buildAqiValue('PM2.5', '${airQuality.pm25.round()}', 'μg/m³'),
                _buildAqiValue('PM10', '${airQuality.pm10.round()}', 'μg/m³'),
                _buildAqiValue('O₃', '${airQuality.o3.round()}', 'μg/m³'),
                _buildAqiValue('NO₂', '${airQuality.no2.round()}', 'μg/m³'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAqiValue(String label, String value, String unit) {
    return Expanded(
      child: Column(
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall,
          ),
          Text(
            value,
            style: Theme.of(context).textTheme.titleSmall,
          ),
          Text(
            unit,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }

  void _showShareOptions(BuildContext context, WeatherProvider weatherProvider) {
    final weather = weatherProvider.currentWeather!;
    final locationName = weatherProvider.currentLocation?.displayName ?? 'Unknown Location';

    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.share, size: 24),
                        const SizedBox(width: 12),
                        Text(
                          'Share Weather',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    ListTile(
                      leading: const Icon(Icons.thermostat),
                      title: const Text('Share Current Weather'),
                      subtitle: const Text('Temperature and basic conditions'),
                      onTap: () {
                        Navigator.pop(context);
                        ShareService.shareWeatherBasic(weather, locationName);
                      },
                    ),
                    ListTile(
                      leading: const Icon(Icons.analytics),
                      title: const Text('Share Detailed Report'),
                      subtitle: const Text('All weather details and metrics'),
                      onTap: () {
                        Navigator.pop(context);
                        ShareService.shareWeatherDetailed(weather, locationName);
                      },
                    ),
                    ListTile(
                      leading: const Icon(Icons.calendar_today),
                      title: const Text('Share Forecast'),
                      subtitle: const Text('Current weather plus 3-day forecast'),
                      onTap: () {
                        Navigator.pop(context);
                        ShareService.shareWeatherForecast(weather, locationName);
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}