# WeatherWell Notification Troubleshooting Guide

## Overview
WeatherWell has a comprehensive notification system that sends weather alerts based on real-time data and user-configured thresholds.

## Notification Types

### 1. Immediate Notifications (Sent when app loads)
- **Daily Forecast**: Summary of today's weather with temperature, conditions, and rain chance
- **Hourly Forecast**: Next few hours weather outlook
- Triggered automatically when the app loads and weather data is fetched

### 2. Alert-Based Notifications (Threshold-triggered)
- **Umbrella Alert**: When rain chance exceeds `rainThreshold` (default: 70%)
- **Wind Alert**: When wind speed exceeds `windSpeedThreshold` (default: 50 km/h)
- **Temperature Alert**: When temperature exceeds high/low thresholds
- **UV Alert**: When UV index exceeds `uvThreshold` (default: 8)
- **AQI Alert**: When air quality is poor (requires enableAQIAlerts)
- **Severe Weather**: Thunderstorms, heavy rain, snow, etc.

### 3. Scheduled Notifications
- **Daily Forecast**: Scheduled at `dailyForecastTime` (default: 08:00)
- **Hourly Forecast**: Scheduled at `hourlyForecastTime` (default: 18:00)

## Why You Might Not Receive Notifications

### Common Issues:

#### 1. **Android Battery Optimization**
Android aggressively limits background apps to save battery. This can prevent scheduled notifications.

**Solution:**
- Go to Settings → Apps → WeatherWell → Battery → Battery optimization
- Select "Don't optimize" for WeatherWell
- Grant "Unrestricted" battery usage

#### 2. **Notification Permissions**
Notifications require explicit permission on Android 13+.

**Check:**
- Settings → Apps → WeatherWell → Notifications
- Ensure all notification categories are enabled
- Check system notification settings

#### 3. **Threshold Settings**
Your weather conditions might not meet the alert thresholds.

**For yesterday's stormy weather, check:**
- Settings → Notifications → Umbrella Alerts
  - Threshold: 70% (if rain was 69%, no alert would be sent)
- Settings → Notifications → Wind Alerts  
  - Threshold: 50 km/h (if wind was 49 km/h, no alert)

**Recommendations:**
- Lower `rainThreshold` to 50% for more sensitive umbrella alerts
- Lower `windSpeedThreshold` to 30 km/h for earlier wind warnings
- Enable "Wind Alerts" and "Umbrella Alerts" toggles in Settings

#### 4. **Notification Toggle States**
Verify these settings are enabled:
- ✅ Enable Notifications (master switch)
- ✅ Severe Weather Alerts
- ✅ Umbrella Alerts
- ✅ Wind Alerts

#### 5. **App Must Be Opened Recently**
Due to Android limitations, background scheduled notifications work best when:
- App was opened within the last 24 hours
- Device is not in "deep sleep" or "doze mode"
- App is not force-stopped

#### 6. **Immediate vs Scheduled Notifications**
**Working Now:**
- ✅ Open app → Notifications sent immediately with real weather data
- ✅ Refresh weather → Alert notifications check conditions

**May Not Work:**
- ⚠️ Scheduled background notifications (Android battery restrictions)
- ⚠️ Notifications when app hasn't been opened for days

## Testing Notifications

### Test Real-Time Alerts:
1. Open Settings → Notifications
2. Enable "Umbrella Alerts" and "Wind Alerts"  
3. Set thresholds very low:
   - Rain Threshold: 10%
   - Wind Speed Threshold: 10 km/h
4. Close Settings
5. Pull down to refresh on Home screen
6. Check if notifications appear

### Test Scheduled Notifications:
1. Enable "Daily Forecast" in Settings
2. Set "Daily Forecast Time" to 2 minutes from now
3. Close the app completely
4. Wait for the scheduled time
5. **Note**: May not work if device is in battery saver mode

### Test Immediate Notifications:
1. Close app completely
2. Reopen app
3. You should see notifications for current weather immediately

## Current Notification Logic

### Umbrella Alert Triggers When:
```
precipitationChance >= rainThreshold (default 70%)
```

### Wind Alert Triggers When:
```
windSpeed >= windSpeedThreshold (default 50 km/h)
```

### Severe Weather Triggers When:
- Condition includes: "thunderstorm", "heavy rain", "snow", "hail", "fog"
- Wind speed > 50 km/h

## Recommended Settings for Active Alerts

For maximum weather awareness:
```
Enable Notifications: ON
Severe Weather Alerts: ON  
Daily Forecast: ON (08:00)
Umbrella Alerts: ON (Threshold: 50%)
Wind Alerts: ON (Threshold: 30 km/h)
UV Alerts: ON (Threshold: 6)
Temperature Alerts: ON (High: 30°C, Low: 5°C)
```

## Development Notes

The notification system is fully implemented and working. The main limitation is Android's aggressive background restrictions. Users should:

1. **Open the app daily** for best notification experience
2. **Adjust thresholds** based on local weather patterns
3. **Grant unrestricted battery** for WeatherWell
4. **Enable all notification permissions** in system settings

The app sends **immediate notifications with real weather data** when opened, which is more reliable than scheduled background notifications on modern Android.
