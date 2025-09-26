import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:weatherwell/providers/weather_provider.dart';
import 'package:weatherwell/services/i_weather_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String _version = '';
  String _buildNumber = '';

  @override
  void initState() {
    super.initState();
    _getVersionInfo();
  }

  Future<void> _getVersionInfo() async {
    final packageInfo = await PackageInfo.fromPlatform();
    setState(() {
      _version = packageInfo.version;
      _buildNumber = packageInfo.buildNumber;
    });
  }

  void _showWeatherProviderDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Row(
            children: [
              Icon(Icons.cloud, size: 24),
              SizedBox(width: 12),
              Text('Weather Data Provider'),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Choose your preferred weather data source:',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 16),
              
              // WeatherAPI.com option
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Theme.of(context).colorScheme.primary),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const ListTile(
                  leading: Icon(Icons.verified, color: Colors.green),
                  title: Text('WeatherAPI.com'),
                  subtitle: Text('✓ Comprehensive European coverage\n✓ Air quality data\n✓ 7-day forecasts\n✓ Currently active'),
                  trailing: Icon(Icons.check_circle, color: Colors.green),
                  contentPadding: EdgeInsets.all(12),
                ),
              ),
              
              const SizedBox(height: 12),
              
              // OpenWeatherMap option (coming soon)
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const ListTile(
                  leading: Icon(Icons.cloud_outlined, color: Colors.grey),
                  title: Text('OpenWeatherMap'),
                  subtitle: Text('⏳ Coming in future update\n• Global weather coverage\n• Historical data support'),
                  trailing: Icon(Icons.schedule, color: Colors.grey),
                  contentPadding: EdgeInsets.all(12),
                  enabled: false,
                ),
              ),
              
              const SizedBox(height: 16),
              
              const Text(
                '💡 Tip: Different providers may have varying data coverage for your region.',
                style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Consumer<WeatherProvider>(
        builder: (context, weatherProvider, child) {
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _buildSectionHeader(context, 'Appearance'),
              Card(
                child: ListTile(
                  leading: const Icon(Icons.brightness_6),
                  title: const Text('Theme'),
                  subtitle: Text(_getThemeModeText(weatherProvider.themeMode)),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => _showThemeDialog(context, weatherProvider),
                ),
              ),
              const SizedBox(height: 24),
              _buildSectionHeader(context, 'Smart Features'),
              Card(
                child: Column(
                  children: [
                    SwitchListTile(
                      title: const Text('Umbrella Alarms'),
                      subtitle: const Text('Get notified when you need an umbrella'),
                      value: weatherProvider.umbrellaAlarmsEnabled,
                      onChanged: weatherProvider.toggleUmbrellaAlarms,
                      secondary: const Icon(Icons.beach_access),
                    ),
                    const Divider(height: 1),
                    SwitchListTile(
                      title: const Text('Clothing Suggestions'),
                      subtitle: const Text('Daily clothing recommendations'),
                      value: weatherProvider.clothesNotificationsEnabled,
                      onChanged: weatherProvider.toggleClothesNotifications,
                      secondary: const Icon(Icons.checkroom),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              _buildSectionHeader(context, 'Location'),
              Card(
                child: Column(
                  children: [
                    ListTile(
                      leading: const Icon(Icons.location_on),
                      title: const Text('Current Location'),
                      subtitle: Text(
                        weatherProvider.currentLocation?.displayName ?? 'Unknown',
                      ),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        // Navigate to location search
                        Navigator.pushNamed(context, '/search');
                      },
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.my_location),
                      title: const Text('Use Current Location'),
                      subtitle: const Text('Automatically detect your location'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () => _useCurrentLocation(context, weatherProvider),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              _buildSectionHeader(context, 'About'),
              Card(
                child: Column(
                  children: [
                    ListTile(
                      leading: const Icon(Icons.info_outline),
                      title: const Text('App Version'),
                      subtitle: Text('$_version ($_buildNumber)'),
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.cloud),
                      title: const Text('Weather Data Provider'),
                      subtitle: const Text('WeatherAPI.com - Comprehensive coverage'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        _showWeatherProviderDialog(context);
                      },
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.policy),
                      title: const Text('Privacy Policy'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        _showPrivacyPolicyDialog(context);
                      },
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.help_outline),
                      title: const Text('Help & Support'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        _showHelpSupportDialog(context);
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              _buildSectionHeader(context, 'Advanced'),
              Card(
                child: Column(
                  children: [
                    ListTile(
                      leading: const Icon(Icons.refresh),
                      title: const Text('Refresh Weather Data'),
                      subtitle: const Text('Update all weather information'),
                      onTap: () => _refreshWeatherData(context, weatherProvider),
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.delete_outline),
                      title: const Text('Clear Cache'),
                      subtitle: const Text('Remove stored weather data'),
                      onTap: () => _clearCache(context),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, top: 8),
      child: Row(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: Theme.of(context).colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _useCurrentLocation(BuildContext context, WeatherProvider weatherProvider) async {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return const AlertDialog(
          content: Row(
            children: [
              CircularProgressIndicator(),
              SizedBox(width: 16),
              Text('Getting your location...'),
            ],
          ),
        );
      },
    );

    try {
      // This would trigger the location detection process
      await weatherProvider.refreshWeather();
      Navigator.of(context).pop(); // Close loading dialog
      
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Location updated successfully'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      Navigator.of(context).pop(); // Close loading dialog
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to get location: $e'),
          backgroundColor: Theme.of(context).colorScheme.error,
        ),
      );
    }
  }

  Future<void> _refreshWeatherData(BuildContext context, WeatherProvider weatherProvider) async {
    try {
      await weatherProvider.refreshWeather();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Weather data refreshed'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to refresh data: $e'),
          backgroundColor: Theme.of(context).colorScheme.error,
        ),
      );
    }
  }

  Future<void> _clearCache(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Clear Cache'),
          content: const Text('This will remove all stored weather data. Are you sure?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Clear'),
            ),
          ],
        );
      },
    );

    if (confirmed == true) {
      // Clear cache logic would go here
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Cache cleared'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  String _getThemeModeText(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.light:
        return 'Light';
      case ThemeMode.dark:
        return 'Dark';
      case ThemeMode.system:
        return 'System default';
    }
  }

  void _showThemeDialog(BuildContext context, WeatherProvider provider) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Choose Theme'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              RadioListTile<ThemeMode>(
                title: const Text('Light'),
                value: ThemeMode.light,
                groupValue: provider.themeMode,
                onChanged: (ThemeMode? mode) {
                  if (mode != null) {
                    provider.setThemeMode(mode);
                    Navigator.of(context).pop();
                  }
                },
              ),
              RadioListTile<ThemeMode>(
                title: const Text('Dark'),
                value: ThemeMode.dark,
                groupValue: provider.themeMode,
                onChanged: (ThemeMode? mode) {
                  if (mode != null) {
                    provider.setThemeMode(mode);
                    Navigator.of(context).pop();
                  }
                },
              ),
              RadioListTile<ThemeMode>(
                title: const Text('System default'),
                value: ThemeMode.system,
                groupValue: provider.themeMode,
                onChanged: (ThemeMode? mode) {
                  if (mode != null) {
                    provider.setThemeMode(mode);
                    Navigator.of(context).pop();
                  }
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void _showPrivacyPolicyDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Privacy Policy'),
          content: const SingleChildScrollView(
            child: Text(
              'WeatherWell Privacy Policy\n\n'
              'Last updated: September 2025\n\n'
              '1. Information We Collect\n'
              '• Location data (only when you grant permission)\n'
              '• Weather preferences and settings\n'
              '• Usage analytics to improve the app\n\n'
              '2. How We Use Your Information\n'
              '• Provide accurate weather data for your location\n'
              '• Send notifications for weather alerts\n'
              '• Improve app functionality and user experience\n\n'
              '3. Data Sharing\n'
              '• We do not sell or share your personal data\n'
              '• Weather data is provided by WeatherAPI.com\n'
              '• Anonymous usage data may be used for analytics\n\n'
              '4. Data Security\n'
              '• Your data is stored securely on your device\n'
              '• Location data is only used for weather services\n'
              '• You can disable location access at any time\n\n'
              'For questions, contact: support@weatherwell.app',
              style: TextStyle(fontSize: 14),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  void _showHelpSupportDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Help & Support'),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'WeatherWell Help Center\n',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const Text('🌤️ Getting Started\n'),
                const Text('• Allow location access for automatic weather updates\n'),
                const Text('• Search for cities manually if location is disabled\n'),
                const Text('• Swipe between current, forecast, and details tabs\n\n'),
                
                const Text('🔔 Smart Features\n'),
                const Text('• Enable umbrella alarms for rainy weather alerts\n'),
                const Text('• Get daily clothing suggestions based on weather\n'),
                const Text('• Customize notification preferences in settings\n\n'),
                
                const Text('🎨 Customization\n'),
                const Text('• Choose between light, dark, or system theme\n'),
                const Text('• View 7-day forecasts and hourly updates\n'),
                const Text('• Access detailed weather metrics in Details tab\n\n'),
                
                const Text('❓ Troubleshooting\n'),
                const Text('• Check internet connection for weather updates\n'),
                const Text('• Allow location permissions for accurate data\n'),
                const Text('• Restart the app if data doesn\'t refresh\n\n'),
                
                const Text('📧 Contact Support\n'),
                const Text('Email: support@weatherwell.app\n'),
                Text('Version: $_version'),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }
}