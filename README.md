# WeatherWell

A comprehensive cross-platform weather application built with **React Native** and **Expo** for Android, iOS, and Web. WeatherWell provides detailed weather information with smart features like umbrella alarms, clothing suggestions, and real-time notifications.

![Version](https://img.shields.io/badge/version-0.4.8-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-green)
![License](https://img.shields.io/badge/license-MIT-purple)

## ✨ Features

### 🌤️ Core Weather Data
- **Current Weather**: Real-time temperature, conditions, and atmospheric data
- **Hourly Forecast**: 24-hour predictions with auto-scroll to current hour
- **Daily Forecast**: 7-day extended forecast with expandable details
- **Air Quality Index**: Real-time AQI with pollutant breakdowns and health advice

### 📊 Comprehensive Metrics
- Temperature (current, feels-like, min/max)
- Wind speed and direction with interactive compass
- Precipitation levels and probability
- UV Index with safety recommendations
- Visibility conditions
- Humidity and atmospheric pressure

### 🌙 Astronomical Data
- Per-day sunrise and sunset times
- Moon phases with illumination percentage
- Expandable daily astronomy details

### 🎯 Smart Features
- **Umbrella Alert**: Intelligent notifications when rain is expected
- **Clothing Suggestions**: Daily outfit recommendations based on conditions
- **UV Protection**: Alerts when UV index is dangerously high
- **Air Quality Advice**: Mask and indoor activity recommendations

### 🔔 Notification System
- Daily and hourly forecast notifications
- Severe weather alerts
- Temperature threshold alerts
- UV and wind warnings
- Customizable notification times and thresholds

### 🎨 User Experience
- **Neutral Paradise Theme**: Warm, muted color palette
- **Dark Mode**: Full light/dark theme support
- **Location Search**: Worldwide city search with autocomplete
- **Weather Sharing**: Customizable weather reports
- **Settings Export/Import**: Backup and restore preferences

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistent settings
- **Weather APIs**: 6 providers with automatic fallback
- **Platforms**: Android, iOS, Web

## 🌐 Weather API Providers

WeatherWell supports multiple weather data providers for reliability:

| Provider | Features | API Key Required |
|----------|----------|------------------|
| WeatherAPI.com | Comprehensive global data, air quality | Yes |
| OpenWeatherMap | Reliable worldwide forecasts | Yes |
| Visual Crossing | Advanced weather intelligence | Yes |
| Open-Meteo | Free, open-source API | No |
| QWeather | Chinese & global data, air quality | Yes |
| Meteostat | Historical weather data | Yes (RapidAPI) |

## 📱 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SepehrMohammady/WeatherWell.git
   cd WeatherWell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - **Android**: `npm run android`
   - **iOS**: `npm run ios`
   - **Web**: `npm run web`

## 🚀 Building for Production

### Android Release APK
```bash
cd android
./gradlew assembleRelease
```
The APK will be at `android/app/build/outputs/apk/release/app-release.apk`

### Install on Device
```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CurrentWeatherCard.tsx
│   ├── DailyForecastList.tsx
│   ├── HourlyForecastList.tsx
│   ├── SmartFeaturesCard.tsx
│   ├── ShareComponent.tsx
│   ├── WeatherDetailModal.tsx
│   └── RealCompass.tsx
├── screens/             # Main app screens
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   └── SearchScreen.tsx
├── services/            # API and business logic
│   ├── WeatherAPIService.ts
│   ├── OpenWeatherMapService.ts
│   ├── OpenMeteoService.ts
│   ├── QWeatherService.ts
│   ├── MeteostatService.ts
│   ├── VisualCrossingService.ts
│   ├── WeatherServiceFactory.ts
│   ├── LocationService.ts
│   ├── LocationSearchService.ts
│   ├── NotificationService.ts
│   └── types.ts
├── contexts/            # React Context providers
│   ├── ThemeContext.tsx
│   ├── SettingsContext.tsx
│   ├── FavoritesContext.tsx
│   └── NotificationContext.tsx
├── config/
│   └── version.ts
└── utils/
    └── temperatureUtils.ts
```

## ⚙️ Configuration

### API Keys
The app includes working API keys by default. To use your own:

1. Open Settings (⚙️ icon)
2. Scroll to API Keys section
3. Tap the key icon next to any provider
4. Enter your API key

### Display Options
Customize which weather metrics are shown:
- Feels Like Temperature
- Humidity, Pressure, Visibility
- UV Index, Wind Speed, Wind Direction
- Air Quality

### Notification Settings
Configure alerts for:
- Temperature thresholds (high/low)
- Rain probability threshold
- UV index threshold
- Wind speed threshold
- Daily/hourly forecast times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by WeatherAPI.com, OpenWeatherMap, Open-Meteo, QWeather, Visual Crossing, and Meteostat
- Icons from Expo Vector Icons
- Built with React Native and Expo

---

**WeatherWell** v0.4.8 - Your reliable companion for weather updates! 🌤️

© 2026 Sepehr Mohammady
