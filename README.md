# WeatherWell# WeatherWell



Cross-platform weather application built with **React Native** and **Expo** featuring:A comprehensive cross-platform weather application built with Flutter for Windows, Android, and iOS. WeatherWell provides detailed weather information with a focus on European weather patterns and includes smart features like umbrella alarms and clothing suggestions.

- Daily and hourly forecasts

- Historical weather data## Features

- Air Quality Index (AQI)

- Complete weather metrics (temperature, wind, precipitation, UV, visibility, humidity)### 🌤️ Weather Data

- Sunrise/sunset times and moon phases- **Current Weather**: Real-time weather conditions with detailed metrics

- Smart features: umbrella alarms and clothing suggestions- **Daily Forecast**: 7-day weather forecast with high/low temperatures

- **Settings screen** with theme management and customization- **Hourly Forecast**: 24-hour detailed hourly predictions

- **Location search** with autocomplete and popular cities- **Historical Data**: Access to past weather information

- **Weather sharing** with customizable options

- European weather focus with accurate APIs### 📊 Comprehensive Metrics

- Minimal and clean design with **light/dark themes**- Temperature (current, feels-like, min/max)

- Wind speed and direction

## ✨ Features- Precipitation levels

- UV Index with safety recommendations

### Core Weather Data- Visibility conditions

- **Current Weather**: Real-time temperature, conditions, and atmospheric data- Humidity levels

- **Hourly Forecast**: Detailed 24-hour weather predictions- Atmospheric pressure

- **Daily Forecast**: 7-day extended forecast with high/low temperatures- Air Quality Index (AQI) with health recommendations

- **Historical Data**: Access to past weather information

- **Air Quality Index**: Real-time AQI with pollutant breakdowns### 🌙 Astronomical Data

- Sunrise and sunset times

### Smart Features- Moon phases with illumination percentage

- **Umbrella Alerts**: Intelligent precipitation warnings

- **Clothing Suggestions**: Weather-appropriate outfit recommendations### 🎯 Smart Features

- **European Focus**: Optimized for European weather patterns and locations- **Umbrella Alarm**: Intelligent notifications when rain is expected

- **Clothing Suggestions**: Daily outfit recommendations based on weather conditions

### Enhanced User Experience- European weather focus with accurate local data

- **Settings Screen**: Theme management, API configuration, display options

- **Location Search**: Search any city worldwide with autocomplete### 🎨 Design

- **Weather Sharing**: Share customizable weather reports to any app- Minimal and clean interface

- **Theme Support**: Light and dark modes with persistent preferences- Material Design 3 with light/dark theme support

- **Cross-Platform**: Runs on Android, iOS, and Web- Intuitive navigation with bottom tabs

- **Offline Capability**: Fallback system for reliable functionality- Responsive design for all screen sizes



## 🛠️ Tech Stack## Screenshots



- **Framework**: React Native with Expo*Screenshots will be added here once the app is built and tested*

- **Language**: TypeScript

- **State Management**: React Context API## Getting Started

- **Storage**: AsyncStorage for persistent settings

- **Weather APIs**: Multiple providers with fallback support### Prerequisites

- **Platforms**: Android, iOS, Web

- Flutter SDK (3.10.0 or higher)

## 🌐 Weather APIs- Dart SDK (3.0.0 or higher)

- For Windows development: Visual Studio with C++ workload

WeatherWell uses multiple weather data providers to ensure reliability:- For Android development: Android Studio and Android SDK

- For iOS development: Xcode (macOS only)

1. **Primary**: WeatherAPI.com

2. **Secondary**: OpenWeatherMap### Installation

3. **Fallback**: Popular European cities database

1. **Clone the repository**

## 📱 Installation & Setup   ```bash

   git clone https://github.com/SepehrMohammady/WeatherWell.git

### Prerequisites   cd WeatherWell

- Node.js 16+    ```

- npm or yarn

- Expo CLI: `npm install -g @expo/cli`2. **Install dependencies**

- Expo Go app on your mobile device (for testing)   ```bash

   flutter pub get

### Quick Start   ```

1. Clone the repository:

   ```bash3. **API Keys**

   git clone https://github.com/SepehrMohammady/WeatherWell.git   The app comes pre-configured with API keys for WeatherAPI.com and OpenWeatherMap. If you need to update them:

   cd WeatherWell   - WeatherAPI.com: Open `lib/services/weather_service.dart`

   ```   - OpenWeatherMap: Open `lib/services/openweathermap_service.dart`



2. Install dependencies:4. **Generate model files**

   ```bash   ```bash

   npm install   flutter packages pub run build_runner build

   ```   ```



3. Start the development server:5. **Run the app**

   ```bash   ```bash

   npm start   # For development

   ```   flutter run

   

4. Run on your device:   # For specific platforms

   - **Mobile**: Scan QR code with Expo Go app   flutter run -d windows

   - **Web**: Press `w` in terminal   flutter run -d android

   - **Android Emulator**: Press `a` in terminal   flutter run -d ios

   - **iOS Simulator**: Press `i` in terminal   ```



## 🚀 Building for Production## Building for Production



### Create Development Build### Android

```bash```bash

expo build:androidflutter build apk --release

expo build:ios# or for app bundle

```flutter build appbundle --release

```

### Create Production Build

```bash### iOS

eas build --platform android```bash

eas build --platform iosflutter build ios --release

``````



### Web Deployment### Windows

```bash```bash

expo export:webflutter build windows --release

``````



## 📁 Project Structure## API Integration



```WeatherWell uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data, chosen for its:

src/- Excellent European weather coverage

├── components/          # Reusable UI components- Comprehensive data including AQI and astronomy

│   ├── CurrentWeatherCard.tsx- Reliable forecasting with historical data support

│   ├── ShareComponent.tsx- Free tier suitable for development and testing

│   └── ...

├── screens/            # Main app screens### Required API Endpoints

│   ├── HomeScreen.tsx- Current weather conditions

│   ├── SettingsScreen.tsx- Weather forecasts (daily and hourly)

│   └── SearchScreen.tsx- Air quality data

├── services/           # API and business logic- Astronomical data

│   ├── WeatherAPIService.ts- Location search

│   ├── LocationSearchService.ts

│   └── ...## Project Structure

├── contexts/           # React Context providers

│   ├── ThemeContext.tsx```

│   └── SettingsContext.tsxlib/

└── ...├── main.dart                 # App entry point

```├── models/                   # Data models

│   ├── weather_data.dart

## ⚙️ Configuration│   └── location.dart

├── services/                 # API and system services

### API Keys (Optional)│   ├── weather_service.dart

The app includes working API keys, but you can add your own in the settings screen:│   ├── location_service.dart

│   └── notification_service.dart

1. Open the app├── providers/                # State management

2. Tap the settings icon (⚙️)│   └── weather_provider.dart

3. Configure your preferred weather provider├── screens/                  # App screens

4. Add your API keys if desired│   ├── home_screen.dart

│   ├── search_screen.dart

### Customization│   └── settings_screen.dart

- **Theme**: Toggle between light and dark modes├── widgets/                  # Reusable UI components

- **Units**: Switch between Celsius and Fahrenheit│   ├── current_weather_card.dart

- **Display**: Show/hide weather details│   ├── hourly_forecast_list.dart

- **Sharing**: Customize what gets shared│   ├── daily_forecast_list.dart

│   ├── weather_details_grid.dart

## 🤝 Contributing│   └── smart_features_card.dart

└── utils/                    # Utility functions

1. Fork the repository    └── weather_utils.dart

2. Create a feature branch: `git checkout -b feature/amazing-feature````

3. Commit changes: `git commit -m 'Add amazing feature'`

4. Push to branch: `git push origin feature/amazing-feature`## Key Dependencies

5. Open a Pull Request

- **flutter**: Cross-platform UI framework

## 📄 License- **provider**: State management

- **http**: API requests

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.- **geolocator**: Location services

- **flutter_local_notifications**: Push notifications

## 🙏 Acknowledgments- **shared_preferences**: Local storage

- **intl**: Internationalization and date formatting

- Weather data provided by WeatherAPI.com and OpenWeatherMap- **json_annotation**: JSON serialization

- Icons from Expo Vector Icons

- Built with React Native and Expo## Permissions

- European weather focus inspired by local meteorological patterns

### Android

---- `ACCESS_FINE_LOCATION`: For precise location

- `ACCESS_COARSE_LOCATION`: For approximate location

**WeatherWell** - Your reliable companion for European weather updates! 🌤️- `INTERNET`: For API requests

- `WAKE_LOCK`: For notifications

*Built with React Native & Expo for the best cross-platform experience*- `RECEIVE_BOOT_COMPLETED`: For persistent alarms

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

For support, create an issue in this repository.

---

**WeatherWell** - Your intelligent weather companion for Europe and beyond! 🌦️