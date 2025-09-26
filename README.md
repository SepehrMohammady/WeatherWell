# WeatherWell - React Native

A cross-platform weather application built with React Native and Expo, featuring comprehensive weather data, smart recommendations, and a clean, minimal design focused on European weather.

## Features

### 🌤️ Weather Data
- **Current Weather**: Real-time temperature, conditions, humidity, wind, pressure, UV index, and visibility
- **Hourly Forecast**: 24-hour detailed weather predictions
- **Daily Forecast**: 7-day weather outlook with precipitation and wind data
- **Historical Data**: Access to past weather information
- **Multiple Data Sources**: WeatherAPI.com and OpenWeatherMap with automatic fallback

### 🌍 Location Services
- **GPS Location**: Automatic location detection
- **Location Search**: Search for cities worldwide
- **Reverse Geocoding**: Convert coordinates to readable addresses
- **European Focus**: Optimized for European weather patterns and cities

### 🤖 Smart Features
- **Umbrella Alerts**: Intelligent rain notifications based on precipitation probability
- **Clothing Suggestions**: Personalized outfit recommendations based on temperature and conditions
- **Air Quality Index**: Real-time air pollution data (when available)
- **Sun & Moon Info**: Sunrise, sunset times, and moon phase information

### 📱 User Experience
- **Clean Design**: Minimalist interface with intuitive navigation
- **Real-time Updates**: Pull-to-refresh functionality
- **Cross-platform**: Works on iOS, Android, and Web
- **Offline Handling**: Graceful error handling and fallback mechanisms

## Tech Stack

- **React Native** with **Expo SDK**
- **TypeScript** for type safety
- **Expo Location** for GPS services
- **Axios** for HTTP requests
- **React Navigation** for navigation (ready to implement)
- **Expo Linear Gradient** for beautiful UI backgrounds

## API Integration

WeatherWell uses two weather data providers for reliability:

1. **WeatherAPI.com** (Primary)
   - Comprehensive weather data
   - Air quality information
   - Astronomy data (sunrise, sunset, moon phases)
   - Historical weather access

2. **OpenWeatherMap** (Fallback)
   - Reliable backup service
   - Additional air quality data
   - Global coverage

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CurrentWeatherCard.tsx
│   ├── HourlyForecastList.tsx
│   ├── DailyForecastList.tsx
│   └── SmartFeaturesCard.tsx
├── screens/             # Application screens
│   └── HomeScreen.tsx
├── services/            # Business logic and API calls
│   ├── types.ts
│   ├── WeatherAPIService.ts
│   ├── OpenWeatherMapService.ts
│   ├── LocationService.ts
│   └── WeatherServiceFactory.ts
```

## Installation & Setup

1. **Prerequisites**
   ```bash
   npm install -g expo-cli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   # iOS (requires macOS)
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## API Configuration

The app comes pre-configured with API keys for immediate testing:
- WeatherAPI.com: `725bd54f9a1b458884f85421252509`
- OpenWeatherMap: `2f16c38d61c17ac94d944a5a66ca0e96`

For production use, replace these with your own API keys in the service files.

## Development

### Running in Development
```bash
npx expo start
```

This will open Expo DevTools where you can:
- Run on iOS simulator
- Run on Android emulator  
- Run in web browser
- Test on physical device using Expo Go app

### Building for Production
```bash
# Build for Android
expo build:android

# Build for iOS (requires Apple Developer account)
expo build:ios
```

## Version History

- **v1.0.0** - Initial React Native implementation with full weather features
  - Complete weather data display
  - Smart recommendations
  - Location services
  - Cross-platform support

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**WeatherWell** - Your intelligent weather companion for Europe and beyond! 🌤️