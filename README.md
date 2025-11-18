# WeatherWell

A comprehensive cross-platform weather application built with **React Native** and **Expo** for Android, iOS, and Web. WeatherWell provides detailed weather information and includes smart features like umbrella alarms and clothing suggestions.

## ✨ Features

### 🌤️ Core Weather Data
- **Current Weather**: Real-time temperature, conditions, and atmospheric data
- **Hourly Forecast**: Detailed 24-hour weather predictions
- **Daily Forecast**: 7-day extended forecast with high/low temperatures
- **Air Quality Index**: Real-time AQI with pollutant breakdowns

### 📊 Comprehensive Metrics
- Temperature (current, feels-like, min/max)
- Wind speed and direction
- Precipitation levels
- UV Index with safety recommendations
- Visibility conditions
- Humidity levels
- Atmospheric pressure

### 🌙 Astronomical Data
- Sunrise and sunset times
- Moon phases with illumination percentage

### 🎯 Smart Features
- **Umbrella Alarm**: Intelligent notifications when rain is expected
- **Clothing Suggestions**: Daily outfit recommendations based on weather conditions

### 🎨 Enhanced User Experience
- **Settings Screen**: Theme management, API configuration, display options
- **Location Search**: Search any city worldwide with autocomplete
- **Weather Sharing**: Share customizable weather reports to any app
- **Theme Support**: Light and dark modes with persistent preferences
- **Cross-Platform**: Runs on Android, iOS, and Web
- **Offline Capability**: Fallback system for reliable functionality

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistent settings
- **Weather APIs**: Multiple providers with fallback support
- **Platforms**: Android, iOS, Web

## 🌐 Weather APIs

WeatherWell uses multiple weather data providers to ensure reliability:

1. **WeatherAPI.com**: Comprehensive global weather data
2. **OpenWeatherMap**: Reliable worldwide forecasts
3. **Visual Crossing**: Advanced weather intelligence
4. **Open-Meteo**: Free, open-source weather API (no key required)

## 📱 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device (for testing)

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
   - **Mobile**: Scan QR code with Expo Go app
   - **Web**: Press `w` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **iOS Simulator**: Press `i` in terminal

## 🚀 Building for Production

### Create Development Build
```bash
npx expo build:android
npx expo build:ios
```

### Create Production Build
```bash
eas build --platform android
eas build --platform ios
```

### Web Deployment
```bash
npx expo export:web
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CurrentWeatherCard.tsx
│   ├── ShareComponent.tsx
│   ├── DailyForecastList.tsx
│   ├── HourlyForecastList.tsx
│   └── SmartFeaturesCard.tsx
├── screens/            # Main app screens
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   └── SearchScreen.tsx
├── services/           # API and business logic
│   ├── WeatherAPIService.ts
│   ├── OpenWeatherMapService.ts
│   ├── LocationSearchService.ts
│   └── WeatherServiceFactory.ts
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx
│   └── SettingsContext.tsx
└── types.ts           # TypeScript type definitions
```

## ⚙️ Configuration

### API Keys (Optional)
The app includes working API keys, but you can add your own in the settings screen:

1. Open the app
2. Tap the settings icon (⚙️)
3. Configure your preferred weather provider
4. Add your API keys if desired

### Customization
- **Theme**: Toggle between light and dark modes
- **Units**: Switch between Celsius and Fahrenheit
- **Display**: Show/hide weather details
- **Sharing**: Customize what gets shared

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by WeatherAPI.com and OpenWeatherMap
- Icons from Expo Vector Icons
- Built with React Native and Expo

---

**WeatherWell** - Your reliable companion for weather updates! 🌤️

*Built with React Native & Expo for the best cross-platform experience*