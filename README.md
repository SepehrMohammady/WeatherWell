# WeatherWell

A comprehensive cross-platform weather application built with Flutter for Windows, Android, and iOS. WeatherWell provides detailed weather information with a focus on European weather patterns and includes smart features like umbrella alarms and clothing suggestions.

## Features

### 🌤️ Weather Data
- **Current Weather**: Real-time weather conditions with detailed metrics
- **Daily Forecast**: 7-day weather forecast with high/low temperatures
- **Hourly Forecast**: 24-hour detailed hourly predictions
- **Historical Data**: Access to past weather information

### 📊 Comprehensive Metrics
- Temperature (current, feels-like, min/max)
- Wind speed and direction
- Precipitation levels
- UV Index with safety recommendations
- Visibility conditions
- Humidity levels
- Atmospheric pressure
- Air Quality Index (AQI) with health recommendations

### 🌙 Astronomical Data
- Sunrise and sunset times
- Moon phases with illumination percentage

### 🎯 Smart Features
- **Umbrella Alarm**: Intelligent notifications when rain is expected
- **Clothing Suggestions**: Daily outfit recommendations based on weather conditions
- European weather focus with accurate local data

### 🎨 Design
- Minimal and clean interface
- Material Design 3 with light/dark theme support
- Intuitive navigation with bottom tabs
- Responsive design for all screen sizes

## Screenshots

*Screenshots will be added here once the app is built and tested*

## Getting Started

### Prerequisites

- Flutter SDK (3.10.0 or higher)
- Dart SDK (3.0.0 or higher)
- For Windows development: Visual Studio with C++ workload
- For Android development: Android Studio and Android SDK
- For iOS development: Xcode (macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weatherwell.git
   cd weatherwell
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Set up API Key**
   - Sign up for a free API key at [WeatherAPI.com](https://www.weatherapi.com/)
   - Open `lib/services/weather_service.dart`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```dart
     static const String _apiKey = 'your_actual_api_key_here';
     ```

4. **Generate model files**
   ```bash
   flutter packages pub run build_runner build
   ```

5. **Run the app**
   ```bash
   # For development
   flutter run
   
   # For specific platforms
   flutter run -d windows
   flutter run -d android
   flutter run -d ios
   ```

## Building for Production

### Android
```bash
flutter build apk --release
# or for app bundle
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

### Windows
```bash
flutter build windows --release
```

## API Integration

WeatherWell uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data, chosen for its:
- Excellent European weather coverage
- Comprehensive data including AQI and astronomy
- Reliable forecasting with historical data support
- Free tier suitable for development and testing

### Required API Endpoints
- Current weather conditions
- Weather forecasts (daily and hourly)
- Air quality data
- Astronomical data
- Location search

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── weather_data.dart
│   └── location.dart
├── services/                 # API and system services
│   ├── weather_service.dart
│   ├── location_service.dart
│   └── notification_service.dart
├── providers/                # State management
│   └── weather_provider.dart
├── screens/                  # App screens
│   ├── home_screen.dart
│   ├── search_screen.dart
│   └── settings_screen.dart
├── widgets/                  # Reusable UI components
│   ├── current_weather_card.dart
│   ├── hourly_forecast_list.dart
│   ├── daily_forecast_list.dart
│   ├── weather_details_grid.dart
│   └── smart_features_card.dart
└── utils/                    # Utility functions
    └── weather_utils.dart
```

## Key Dependencies

- **flutter**: Cross-platform UI framework
- **provider**: State management
- **http**: API requests
- **geolocator**: Location services
- **flutter_local_notifications**: Push notifications
- **shared_preferences**: Local storage
- **intl**: Internationalization and date formatting
- **json_annotation**: JSON serialization

## Permissions

### Android
- `ACCESS_FINE_LOCATION`: For precise location
- `ACCESS_COARSE_LOCATION`: For approximate location
- `INTERNET`: For API requests
- `WAKE_LOCK`: For notifications
- `RECEIVE_BOOT_COMPLETED`: For persistent alarms

### iOS
- `NSLocationWhenInUseUsageDescription`: Location access
- `NSLocationAlwaysAndWhenInUseUsageDescription`: Background location

### Windows
- Network access for API requests
- Location services (if available)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## European Weather Focus

WeatherWell is specifically designed with European weather patterns in mind:
- Timezone handling for European regions
- Clothing recommendations suited for European climates
- Weather pattern recognition optimized for European conditions
- Multi-language support (planned)

## Future Enhancements

- [ ] Radar maps and satellite imagery
- [ ] Weather alerts and warnings
- [ ] Widget support for home screens
- [ ] Apple Watch and WearOS companions
- [ ] Multi-language localization
- [ ] Advanced charts and historical analysis
- [ ] Social sharing of weather conditions
- [ ] Offline mode with cached data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons and design inspiration from Material Design
- Flutter team for the excellent framework
- European weather services for pattern research

## Support

For support, email weatherwell.support@example.com or create an issue in this repository.

---

**WeatherWell** - Your intelligent weather companion for Europe and beyond! 🌦️