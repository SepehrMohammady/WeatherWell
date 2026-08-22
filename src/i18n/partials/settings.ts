/** English strings extracted from the settings UI. Filled during i18n extraction. */
export const settingsStrings: Record<string, string> = {
  // Header
  'settings.title': 'Settings',

  // Appearance
  'settings.appearance': 'Appearance',
  'settings.modeSystem': 'System',
  'settings.modeLight': 'Light',
  'settings.modeDark': 'Dark',
  'settings.weatherAnimations': 'Weather Animations',
  'settings.weatherAnimationsSubtitle': 'Ambient rain, snow and cloud effects on the main screen',
  'settings.themeColor': 'Theme Color',

  // Weather data / provider
  'settings.weatherData': 'Weather Data',
  'settings.weatherProvider': 'Weather Provider',
  'settings.providerWeatherApiDesc': 'WeatherAPI - Most accurate with full astronomy data',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - Reliable forecasts, limited astronomy',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - Good data, no astronomy',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - Free, no moon phase data',
  'settings.providerQWeatherDesc': '⚠ QWeather - May require paid plan',
  'settings.providerMeteostatDesc': '⚠ Meteostat - Historical data only, not for forecasts',
  'settings.providerCustomDesc': 'Custom - Pick a provider for each metric below',
  'settings.providerCustom': 'Custom (mix providers)',
  'settings.providerHint': 'WA WeatherAPI · OWM OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Custom source metric labels
  'settings.metricForecast': 'Forecast (hourly & daily)',
  'settings.metricTemperature': 'Temperature',
  'settings.metricCondition': 'Condition',
  'settings.metricHumidity': 'Humidity',
  'settings.metricWind': 'Wind',
  'settings.metricPressure': 'Pressure',
  'settings.metricUvIndex': 'UV Index',
  'settings.metricVisibility': 'Visibility',
  'settings.metricAirQuality': 'Air Quality',
  'settings.metricAstronomy': 'Astronomy',

  // Units and refresh
  'settings.temperatureUnit': 'Temperature Unit',
  'settings.refreshInterval': 'Refresh Interval',
  'settings.refreshIntervalSubtitle': 'Update every {minutes} minutes',
  'settings.minutesShort': '{minutes}m',

  // API keys
  'settings.weatherApiKey': 'WeatherAPI Key',
  'settings.openWeatherMapKey': 'OpenWeatherMap Key',
  'settings.visualCrossingKey': 'Visual Crossing Key',
  'settings.qweatherKey': 'QWeather Key',
  'settings.meteostatKey': 'Meteostat Key (RapidAPI)',
  'settings.customKeyConfigured': 'Custom key configured',
  'settings.usingDefaultKey': 'Using default key',
  'settings.apiKeyModalSubtitle': 'Enter your API key or leave blank to use demo key',
  'settings.apiKeyPlaceholder': 'Enter API key...',
  'settings.apiKeyUpdated': 'API key updated successfully',

  // Display options
  'settings.displayOptions': 'Display Options',
  'settings.showFeelsLike': 'Show Feels Like Temperature',
  'settings.showHumidity': 'Show Humidity',
  'settings.showPressure': 'Show Pressure',
  'settings.showVisibility': 'Show Visibility',
  'settings.showUvIndex': 'Show UV Index',
  'settings.showWindSpeed': 'Show Wind Speed',
  'settings.showWindDirection': 'Show Wind Direction',
  'settings.showAirQuality': 'Show Air Quality',

  // Notifications
  'settings.notifications': 'Notifications',
  'settings.notificationNote': 'Scheduled alerts (Daily/Hourly) fire at your chosen time.\nDynamic alerts check based on your refresh interval ({minutes} min) and warn before hazardous conditions.',
  'settings.enableNotifications': 'Enable Notifications',
  'settings.enableNotificationsSubtitle': 'Turn on/off all scheduled and dynamic weather alerts',
  'settings.severeWeatherAlerts': 'Severe Weather Alerts',
  'settings.severeWeatherAlertsSubtitle': 'Warns about thunderstorms, heavy rain, snow, and hail',
  'settings.dailyForecast': 'Daily Forecast',
  'settings.dailyForecastSubtitle': 'Scheduled daily summary at {time} with conditions and tips',
  'settings.hourlyForecast': 'Hourly Forecast',
  'settings.hourlyForecastSubtitle': 'Scheduled 6-hour outlook at {time} with rain and temp info',
  'settings.temperatureAlerts': 'Temperature Alerts',
  'settings.temperatureAlertsSubtitle': 'Alerts when temp drops below {low}°C or exceeds {high}°C',
  'settings.tempLowShort': 'L:{value}°',
  'settings.tempHighShort': 'H:{value}°',
  'settings.uvAlerts': 'UV Index Alerts',
  'settings.uvAlertsSubtitle': 'Warns when UV index reaches {value}+ to protect your skin',
  'settings.umbrellaAlerts': 'Umbrella Alerts',
  'settings.umbrellaAlertsSubtitle': 'Reminds you to bring an umbrella when rain chance hits {value}%+',
  'settings.windAlerts': 'Wind Alerts',
  'settings.windAlertsSubtitle': 'Warns when wind speed exceeds {value} km/h',
  'settings.aqiAlerts': 'Air Quality Alerts',
  'settings.aqiAlertsSubtitle': 'Alerts when AQI reaches {value}+ (unhealthy levels)',
  'settings.percentValue': '{value}%',

  // Time picker modal
  'settings.dailyForecastTimeTitle': 'Daily Forecast Time',
  'settings.hourlyForecastTimeTitle': 'Hourly Forecast Time',

  // Threshold editor modal
  'settings.thresholdRain': 'Rain Threshold (%)',
  'settings.thresholdWind': 'Wind Speed Threshold (km/h)',
  'settings.thresholdUv': 'UV Index Threshold',
  'settings.thresholdTempHigh': 'High Temperature Threshold (°C)',
  'settings.thresholdTempLow': 'Low Temperature Threshold (°C)',
  'settings.thresholdAqi': 'AQI Threshold',
  'settings.thresholdModalSubtitle': 'Enter the threshold value for alerts',
  'settings.thresholdPlaceholder': 'Enter value...',
  'settings.invalidValueTitle': 'Invalid Value',
  'settings.invalidValueMessage': 'Please enter a valid number',

  // Widget
  'settings.homeScreenWidget': 'Home Screen Widget',
  'settings.addWidget': 'Add Widget to Home Screen',
  'settings.addWidgetSubtitle': 'Tap to add the weather widget directly',
  'settings.widgetAlertTitle': 'Widget',
  'settings.widgetPinHint': 'To add the widget, long-press your home screen → Widgets → WeatherWell',
  'settings.widgetOpacity': 'Widget Opacity',
  'settings.widgetShowFeelsLike': 'Show Feels Like',
  'settings.widgetShowFeelsLikeSubtitle': 'Display feels-like temperature',
  'settings.widgetShowHighLow': 'Show High/Low',
  'settings.widgetShowHighLowSubtitle': 'Display daily high and low temperatures',
  'settings.widgetShowRainChance': 'Show Rain Chance',
  'settings.widgetShowRainChanceSubtitle': 'Display precipitation probability',
  'settings.widgetShowConditions': 'Show Conditions',
  'settings.widgetShowConditionsSubtitle': 'Display weather condition text',
  'settings.widgetShowTomorrow': 'Show Tomorrow',
  'settings.widgetShowTomorrowSubtitle': "Display tomorrow's high/low forecast",

  // Privacy
  'settings.privacy': 'Privacy',
  'settings.shareLocation': 'Share Location in Weather Data',
  'settings.shareLocationSubtitle': 'Include location when sharing weather',

  // Advanced (backup / reset)
  'settings.advanced': 'Advanced',
  'settings.exportBackup': 'Export Backup',
  'settings.exportBackupSubtitle': 'Save all settings and favorites',
  'settings.importBackup': 'Import Backup',
  'settings.importBackupSubtitle': 'Restore settings and favorites',
  'settings.resetToDefaults': 'Reset to Defaults',
  'settings.resetToDefaultsSubtitle': 'Reset all settings to original values',
  'settings.successTitle': 'Success',
  'settings.resetTitle': 'Reset Settings',
  'settings.resetConfirm': 'Are you sure you want to reset all settings to default?',
  'settings.resetDone': 'Settings reset to default',
  'settings.exportDialogTitle': 'Export WeatherWell Backup',
  'settings.backupExported': 'Backup exported successfully',
  'settings.sharingUnavailable': 'Sharing is not available on this device',
  'settings.exportFailed': 'Failed to export backup: {error}',
  'settings.unknownError': 'Unknown error',
  'settings.backupRestored': 'Backup restored (settings and favorites)',
  'settings.restoreFailed': 'Failed to restore settings from backup',
  'settings.settingsImported': 'Settings imported successfully',
  'settings.invalidBackupFile': 'Invalid backup file',
  'settings.importFailed': 'Failed to import backup. Make sure you selected a valid .weatherwell file.',

  // Testers
  'settings.testers': 'Testers',
  'settings.testersThanks': 'Thank you for your valuable feedback!',

  // About
  'settings.about': 'About',
  'settings.appTagline': 'Ad-free weather forecasts',
  'settings.version': 'Version',
  'settings.developer': 'Developer',
  'settings.privacyPolicy': 'Privacy Policy',
  'settings.privacyPolicySubtitle': 'No personal data is collected or shared',

  // More from SeMo Lab
  'settings.moreFromSemoLab': 'More from SeMo Lab',
  'settings.feedwellDesc': 'Ad-free RSS reader. Clean reading, no distractions.',
  'settings.ledgerwellDesc': 'Track personal debts and credits, multi-currency.',
  'settings.allSemoLabApps': 'All SeMo Lab apps',
  'settings.allSemoLabAppsSubtitle': 'See everything we make on Google Play',

  // Footer
  'settings.footerText': 'WeatherWell provides accurate weather forecasts with privacy-first approach. No personal data is collected or shared.',
  'settings.copyright': '© 2026 SeMo Lab',
};
