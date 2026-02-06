## WeatherWell - React Native/Expo Project

✅ **Project Setup Complete**

### Project Type
Cross-platform weather application built with React Native and Expo for Android, iOS, and Web.

### Features Implemented
- ✅ Neutral Paradise color theme with light/dark mode support (now follows device theme)
- ✅ Settings screen with comprehensive display options and notification controls
- ✅ Location search with autocomplete and popular cities fallback
- ✅ Weather sharing with customizable options
- ✅ Daily and hourly forecasts with expandable details
- ✅ Complete weather metrics (temperature, wind, precipitation, UV, visibility, humidity)
- ✅ Smart recommendations: umbrella alerts, clothing suggestions, UV protection (worst-case based)
- ✅ Air Quality monitoring with health recommendations (moved to Recommendations section)
- ✅ Expandable hourly details for recommendations
- ✅ Astronomy section with clickable daily details and per-day data
- ✅ Comprehensive notification system with real weather data
- ✅ **Background weather alerts** - alerts work even when app is closed
- ✅ 6 weather API providers with fallback (WeatherAPI, OpenWeatherMap, Visual Crossing, Open-Meteo, QWeather, Meteostat)
- ✅ Minimal and clean neutral design
- ✅ Splash screen with app logo



### Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Weather APIs**: WeatherAPI.com + OpenWeatherMap + Visual Crossing + Open-Meteo + QWeather + Meteostat with fallback

### Development Commands
```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS  
npm run web        # Run on web
```

## Custom Instructions

### Version Management
- **ALWAYS update version numbers** after ANY code changes following semantic versioning:
  - **Patch (0.x.Y)**: Bug fixes, minor UI tweaks, typo corrections
  - **Minor (0.X.0)**: New features, significant enhancements, new components
  - **Major (X.0.0)**: Breaking changes, complete redesigns, architecture changes
- **Update in FIVE files simultaneously** (CRITICAL - do not forget any):
  1. `src/config/version.ts` - APP_VERSION constant
  2. `app.json` - expo.version field
  3. `package.json` - version field
  4. `package-lock.json` - version field (TWO locations at top of file)
  5. `android/app/build.gradle` - versionCode (increment by 1) and versionName

### After Changes Workflow (ALWAYS follow this)
1. Update ALL version files listed above
2. Build native release APK: `cd android; .\gradlew assembleRelease`
3. Install on device: `adb install -r android\app\build\outputs\apk\release\app-release.apk`
4. Commit with detailed message
5. Push to remote repository
6. Provide Release Title and Release Notes in Markdown format

### Architecture
- `src/components/` - Reusable UI components
- `src/screens/` - Main app screens (Home, Settings, Search)
- `src/services/` - API services and business logic
- `src/contexts/` - React Context providers (Theme, Settings)