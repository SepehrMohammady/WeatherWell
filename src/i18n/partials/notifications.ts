/**
 * English strings extracted from the notification services
 * (NotificationService.ts and BackgroundTaskService.ts).
 * Keys shared by both services carry a single entry here.
 */
export const notificationStrings: Record<string, string> = {
  // Android notification channels (visible in system settings)
  'notif.channel.weatherAlerts': 'Weather Alerts',
  'notif.channel.dailyForecast': 'Daily Forecast',

  // Time-of-day markers used in hourly forecast summaries
  'notif.time.am': 'AM',
  'notif.time.pm': 'PM',

  // Daily forecast notification
  'notif.daily.title': '📅 Daily Weather Forecast',
  'notif.daily.fallbackTitle': '🌤️ Daily Weather Forecast',
  'notif.daily.fallbackBody': "Open WeatherWell to see today's full forecast.",
  'notif.daily.today': 'Today: {high}°/{low}°, {condition}',
  'notif.daily.tomorrow': 'Tomorrow: {high}°/{low}°, {condition}',
  'notif.daily.rainChance': '🌧️ {chance}% rain',
  'notif.daily.highUv': '☀️ High UV ({uv})',
  'notif.daily.strongWind': '💨 Strong wind {speed} km/h',
  'notif.daily.heavyRain': '🌊 Heavy rain {mm}mm',

  // Hourly forecast notification
  'notif.hourly.title': '⏰ Next Hours Weather',
  'notif.hourly.updateTitle': '⏰ Hourly Weather Update',
  'notif.hourly.fallbackBody': 'Open WeatherWell to check the next few hours forecast.',
  'notif.hourly.rainAt': '🌧️ Rain at {times}',
  'notif.hourly.windUpTo': '💨 Wind up to {speed} km/h',

  // Umbrella / rain alerts
  'notif.umbrella.title': '☂️ Umbrella Alert',
  'notif.umbrella.body': "{chance}% chance of rain upcoming. Don't forget your umbrella!",
  'notif.umbrella.upcomingBody': "{chance}% chance of rain around {time}. Don't forget your umbrella!",

  // Wind alerts
  'notif.wind.title': '💨 Strong Wind Alert',
  'notif.wind.body': 'Wind speed is {speed} km/h. Take precautions when outdoors.',
  'notif.wind.expectedTitle': '💨 Strong Wind Expected',
  'notif.wind.expectedBody': 'Wind speeds up to {speed} km/h expected around {time}.',

  // UV alerts
  'notif.uv.title': '☀️ High UV Alert',
  'notif.uv.body': 'UV Index is {uv} - Wear sunscreen and protective clothing!',
  'notif.uv.indexTitle': '☀️ UV Index Alert',
  'notif.uv.indexBody': 'UV Index is {uv} ({level}). Wear sunscreen and protective clothing!',
  'notif.uv.expectedTitle': '☀️ High UV Expected',
  'notif.uv.expectedBody': 'UV index of {uv} expected around {time}. Apply sunscreen!',
  'notif.uvLevel.extreme': 'Extreme',
  'notif.uvLevel.veryHigh': 'Very High',
  'notif.uvLevel.high': 'High',

  // Temperature alerts
  'notif.temp.highTitle': '🔥 Temperature High Alert',
  'notif.temp.lowTitle': '🥶 Temperature Low Alert',
  'notif.temp.highBody': 'Temperature is {temp}°C, above your {threshold}°C threshold',
  'notif.temp.lowBody': 'Temperature is {temp}°C, below your {threshold}°C threshold',
  'notif.temp.highAlertTitle': '🔥 High Temperature Alert',
  'notif.temp.highAlertBody': 'Temperature is {temp}°C. Stay hydrated and avoid prolonged sun exposure.',
  'notif.temp.lowAlertTitle': '❄️ Low Temperature Alert',
  'notif.temp.lowAlertBody': 'Temperature is {temp}°C. Bundle up and stay warm!',
  'notif.temp.aheadHighTitle': '🔥 High Temperature Ahead',
  'notif.temp.aheadHighBody': 'Expected {temp}°C around {time}. Stay hydrated!',
  'notif.temp.aheadLowTitle': '❄️ Cold Temperature Ahead',
  'notif.temp.aheadLowBody': 'Expected {temp}°C around {time}. Dress warmly!',

  // Air quality alerts
  'notif.aqi.title': '🌫️ Air Quality Alert',
  'notif.aqi.body': 'AQI is {aqi} ({level}). Consider limiting outdoor activities.',
  'notif.aqiLevel.hazardous': 'Hazardous',
  'notif.aqiLevel.veryUnhealthy': 'Very Unhealthy',
  'notif.aqiLevel.unhealthy': 'Unhealthy',
  'notif.aqiLevel.sensitive': 'Unhealthy for Sensitive Groups',

  // Severe weather alerts
  'notif.severe.title': '🚨 {type} Alert',
  'notif.severe.windDetected': '💨 Strong winds detected: {speed} km/h. Take precautions when outdoors.',
  'notif.severe.conditionsDetected': '{emoji} {type} conditions detected in {location}. Stay safe!',
  'notif.severe.bgTitle': '{emoji} Severe Weather: {type}',
  'notif.severe.bgBody': '{type} detected in your area. Take necessary precautions.',
  'notif.severe.expectedTitle': '{emoji} {type} Expected Soon',
  'notif.severe.expectedBody': '{type} forecast around {time}. Take precautions.',
  'notif.severeType.thunderstorm': 'Thunderstorm',
  'notif.severeType.heavyRain': 'Heavy Rain',
  'notif.severeType.snow': 'Snow',
  'notif.severeType.hail': 'Hail',
  'notif.severeType.fog': 'Fog',
  'notif.severeType.strongWind': 'Strong Wind',
};
