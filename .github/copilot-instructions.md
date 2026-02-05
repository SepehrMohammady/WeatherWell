## WeatherWell - React Native/Expo Project

✅ **Project Setup Complete** - Version 0.5.0

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

### Recent Updates (v0.5.2)
- **UI Improvements**: Fixed Temperature Alerts order (L:0° before H:35°, Low to High)
- **Modal Styling**: Improved time picker Cancel button visibility (was gray, now properly styled)

### Previous Updates (v0.5.1)
- **Customizable Notification Settings UI**: Users can now change notification times and alert thresholds directly from Settings
  - Added time picker for Daily Forecast Time (default: 19:00)
  - Added time picker for Hourly Forecast Time (default: 08:00)
  - Added threshold editor for Rain Alert (default: 70%)
  - Added threshold editor for Wind Alert (default: 50 km/h)
  - Added threshold editor for UV Alert (default: 8)
  - Added threshold editor for Temperature High Alert (default: 35°C)
  - Added threshold editor for Temperature Low Alert (default: 0°C)
- **Fixed Notification Defaults**: Daily forecast at 19:00 (evening), Hourly at 08:00 (morning)

### Previous Updates (v0.5.0)
- **Background Weather Alerts**: Implemented background task service for real-time alerts
  - Uses expo-task-manager and expo-background-fetch for periodic weather checks
  - Alerts now work even when app is closed (every ~15-30 minutes)
  - Checks all alert types: umbrella, wind, UV, temperature, AQI, severe weather
  - Location is saved for background task to use
- **New Service**: BackgroundTaskService.ts handles all background weather fetching

### Previous Updates (v0.4.9)
- **Notification System Improvements**:
  - Removed Test Notification button from Settings (not useful for users)
  - Removed duplicate daily/hourly notifications on app load
  - Added info note explaining how alert notifications work
- **Visibility Data**: Confirmed WeatherAPI provides real visibility data

### Previous Updates (v0.4.8)
- **Codebase Cleanup**: Removed dead files and updated documentation
  - Removed `eas.json` (no longer using EAS Build, native Gradle only)
  - Updated VERSION_MANAGEMENT.md to mention build.gradle manual updates

### Previous Updates (v0.4.7)
- **AQI Calculation Fix**: Real AQI values now calculated from PM2.5 using EPA breakpoints
- **Future-Only Recommendations**: Fixed recommendations to use ONLY future hours
- **Notifications Improved**: All alerts enabled by default

### Previous Updates (v0.4.5)
- **System Theme Detection**: App now follows device dark/light mode on first launch
- **Default Settings Improvements**: Refresh interval 60 minutes, all alerts enabled
- **Smart Recommendations Enhanced**: Worst-case scenario for remaining hours
- **Astronomy Data Fixes**: Proper handling of unavailable data across providers
  - All services now use -1 for unavailable moonIllumination to distinguish from actual 0%

### Previous Updates (v0.4.4)
- **Provider Reliability Analysis**: Compared data accuracy with MSN Weather and AccuWeather
  - Added reliability indicators (⚠ limited) to provider selection
  - Provider descriptions now show data capabilities and limitations
- **Visual Crossing Fix**: Fixed astronomy time formatting (was showing raw HH:MM:SS)
  - Added formatTime helper for proper 12-hour AM/PM format
  - Added per-day astronomy data for daily forecasts
- **Meteostat Clarification**: Added documentation that it's for historical data only
  - getApiSource now returns "Meteostat (Historical)" to indicate limitation
  - Provider button shows warning indicator
- **Provider Reliability Ranking** (most to least reliable):
  1. WeatherAPI - Best accuracy, full astronomy (sunrise, sunset, moon phase, illumination)
  2. OpenWeatherMap - Good forecasts, limited astronomy (no moon phase)
  3. Visual Crossing - Good data, astronomy available
  4. Open-Meteo - Free/no key, good forecasts, no moon phase data
  5. QWeather - May require paid plan, fallback issues
  6. Meteostat - Historical data only, not suitable for forecasts

### Previous Updates (v0.4.3)
- **New API Provider**: Added Meteostat service
  - Historical weather data from global stations
  - Hourly and daily weather observations
  - Access via RapidAPI platform
  - API Key: 93d3a5f1d3msh36569bf37d01a27p1c06ecjsna9f86b114ae8
- **Settings UI**: Added Meteostat button as 6th provider option
- **Factory Pattern**: Extended WeatherServiceFactory to support Meteostat
- **Type System**: Updated WeatherProvider type to include 'meteostat'

### Previous Updates (v0.4.1)
- **New API Provider**: Added QWeather (HeFeng Weather) service
  - Comprehensive Chinese and global weather data
  - Includes air quality monitoring (AQI, PM2.5, PM10, O3, NO2, SO2, CO)
  - Astronomy data with moon phases
  - API Key: b196010778a24af19765ed70af849801
- **Settings UI**: Added QWeather button as 5th provider option
- **Factory Pattern**: Extended WeatherServiceFactory to support QWeather
- **Type System**: Updated WeatherProvider type to include 'qweather'

### Previous Updates (v0.4.0)
- **New API Provider**: Added Open-Meteo weather service
  - Free, open-source weather API (no API key required)
  - Comprehensive weather data including forecasts and historical data
  - Geocoding support for location search
  - Weather code mapping (0-99) to conditions and icons
- **Settings UI**: Reorganized provider buttons into 2x2 grid layout
  - Now displays 4 weather providers in two rows
  - Added Open-Meteo selection button
- **Factory Pattern**: Updated WeatherServiceFactory to support Open-Meteo
- **Type System**: Extended WeatherProvider type to include 'openmeteo'

### Previous Updates (v0.3.1)
- **Splash Screen**: Added 2-second loading screen with app logo
- **API Names**: Removed "Demo" suffix from all API provider names in footer
- **Branding**: Removed all "European focus" references for global appeal
- **Air Quality Fix**: Fixed Air Quality metric modal showing correct AQI details instead of Humidity
- **Display Settings**: Air Quality toggle now only controls main weather card, not Recommendations section

### Previous Updates (v0.3.0)
- **Color Scheme**: Implemented Neutral Paradise palette with warm, muted tones for light and dark themes
- **Display Options**: Added Wind Direction and Air Quality toggles, fixed UV Index and Wind Speed controls
- **Notifications**: Enhanced weather alerts with real-time data (umbrella, wind, AQI, temperature, UV)
- **UI Enhancements**: Replaced Import Settings icon, fixed NaN daylight display issue
- **Air Quality**: Moved to Recommendations section with mask/stay-home advice
- **Expandable Details**: Added hourly forecast modals for recommendations and daily astronomy details
- **Settings Integration**: All display options now properly control component visibility

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
- Document changes in `.github/copilot-instructions.md` under "Recent Updates"

### After Changes Workflow (ALWAYS follow this)
1. Update ALL version files listed above
2. Build native release APK: `cd android; .\gradlew assembleRelease`
3. Install on device: `adb install -r android\app\build\outputs\apk\release\app-release.apk`
4. Commit with detailed message
5. Push to remote repository
6. Provide Release Title and Release Notes in Markdown format

### Git Commit Policy
- **NEVER commit automatically** - Only commit when explicitly requested by the developer
- Wait for explicit commit requests like "Commit these changes", "Please commit", "Ready to commit"

### Architecture
- `src/components/` - Reusable UI components
- `src/screens/` - Main app screens (Home, Settings, Search)
- `src/services/` - API services and business logic
- `src/contexts/` - React Context providers (Theme, Settings)