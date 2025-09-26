<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## WeatherWell - React Native/Expo Project

✅ **Project Setup Complete**

### Project Type
Cross-platform weather application built with React Native and Expo for Android, iOS, and Web.

### Features Implemented
- ✅ Settings screen with theme management and customization
- ✅ Location search with autocomplete and popular cities fallback
- ✅ Weather sharing with customizable options
- ✅ Daily and hourly forecasts
- ✅ Complete weather metrics (temperature, wind, precipitation, UV, visibility, humidity)
- ✅ Smart features: umbrella alarms and clothing suggestions
- ✅ Light/dark theme support with persistent storage
- ✅ European weather focus with accurate APIs
- ✅ Minimal and clean design

### Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Weather APIs**: WeatherAPI.com + OpenWeatherMap with fallback

### Development Commands
```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS  
npm run web        # Run on web
```

### Architecture
- `src/components/` - Reusable UI components
- `src/screens/` - Main app screens (Home, Settings, Search)
- `src/services/` - API services and business logic
- `src/contexts/` - React Context providers (Theme, Settings)
	<!--
	Set up debugging configuration for Flutter app.
	 -->

- [ ] Ensure Documentation is Complete
	<!--
	Complete README.md with WeatherWell project information and setup instructions.
	 -->

## WeatherWell Project Overview
Cross-platform weather application built with Flutter featuring:
- Daily and hourly forecasts
- Historical weather data
- Air Quality Index (AQI)
- Complete weather metrics (temperature, wind, precipitation, UV, visibility, humidity)
- Sunrise/sunset times and moon phases
- Smart features: umbrella alarms and clothing suggestions
- European weather focus with accurate APIs
- Minimal and clean design