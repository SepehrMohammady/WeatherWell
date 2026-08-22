/** English strings extracted from the share UI (ShareComponent). */
export const shareStrings: Record<string, string> = {
  // Fallback location name
  'share.currentLocation': 'Current Location',

  // Buttons
  'share.quickShare': 'Quick Share',
  'share.customizeShare': 'Customize Share',
  'share.shareButton': 'Share Weather Report',

  // Options modal
  'share.optionsTitle': 'Share Options',
  'share.contentSection': 'Content to Include',
  'share.detailsSection': 'Weather Details',
  'share.option.location': 'Location',
  'share.option.locationSubtitle': 'Include location name in shared weather',
  'share.option.current': 'Current Weather',
  'share.option.currentSubtitle': 'Temperature and current conditions',
  'share.option.hourly': 'Hourly Forecast',
  'share.option.hourlySubtitle': 'Next 12 hours forecast',
  'share.option.daily': 'Daily Forecast',
  'share.option.dailySubtitle': '7-day weather forecast',
  'share.option.astronomy': 'Astronomy',
  'share.option.astronomySubtitle': 'Sunrise, sunset and moon phase',
  'share.option.feelsLike': 'Feels Like Temperature',
  'share.option.humidity': 'Humidity',
  'share.option.pressure': 'Atmospheric Pressure',
  'share.option.visibility': 'Visibility',
  'share.option.uv': 'UV Index',
  'share.option.wind': 'Wind Information',

  // Share sheet title and errors
  'share.shareTitle': 'Weather Report - {location}',
  'share.errorTitle': 'Share Error',
  'share.errorMessage': 'Failed to share weather data',

  // Generated share text
  'share.text.header': 'Weather Report',
  'share.text.location': 'Location: {location}',
  'share.text.currentWeather': 'Current Weather:',
  'share.text.temperature': 'Temperature: {temp}',
  'share.text.feelsLike': '(feels like {temp})',
  'share.text.condition': 'Condition: {condition}',
  'share.text.humidity': 'Humidity: {humidity}%',
  'share.text.pressure': 'Pressure: {pressure} hPa',
  'share.text.visibility': 'Visibility: {visibility} km',
  'share.text.uvIndex': 'UV Index: {uvIndex}',
  'share.text.wind': 'Wind: {speed} km/h {direction}',
  'share.text.next12Hours': 'Next 12 Hours:',
  'share.text.nextHours': 'Next Hours:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'Future Forecast:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '({chance}% rain)',
  'share.text.astronomy': 'Astronomy:',
  'share.text.sunrise': 'Sunrise: {time}',
  'share.text.sunset': 'Sunset: {time}',
  'share.text.moon': 'Moon: {phase}',
  'share.text.moonIllumination': '({percent}% illuminated)',
  'share.text.footer': 'Shared from WeatherWell',

  // Temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',
};
