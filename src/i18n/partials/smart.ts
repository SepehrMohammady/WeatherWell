/**
 * English strings extracted from the smart UI:
 * SmartFeaturesCard (smart.*), WeatherDetailModal (detail.*), RealCompass (compass.*).
 */
export const smartStrings: Record<string, string> = {
  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'Recommendations',
  'smart.umbrellaAlert': 'Umbrella Alert',
  'smart.umbrellaChance': 'Up to {percent}% chance of rain in the next 24 hours',
  'smart.clothingSuggestion': 'Clothing Suggestion',
  'smart.tempFeelsLike': '{temp}°C, feels like {feels}°C',
  'smart.uvProtection': 'UV Protection',
  'smart.uvIndexLabel': 'UV Index: {value}',
  'smart.airQuality': 'Air Quality',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'N/A',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': 'Definitely bring an umbrella!',
  'smart.umbrella.consider': 'Consider bringing an umbrella',
  'smart.umbrella.none': 'No umbrella needed today',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'Heavy winter coat, scarf, gloves',
  'smart.clothing.jacket': 'Jacket or warm sweater',
  'smart.clothing.sweater': 'Light sweater or long sleeves',
  'smart.clothing.tshirt': 'T-shirt or light clothing',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'Wear sunglasses & sunscreen SPF 30+',
  'smart.uv.medium': 'Consider sunglasses & sunscreen',
  'smart.uv.light': 'Light sun protection recommended',
  'smart.uv.none': 'No sun protection needed',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'Wear a mask outdoors',
  'smart.mask.consider': 'Consider wearing a mask',
  'smart.mask.none': 'No mask needed',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'Air quality is good',
  'smart.air.moderate': 'Moderate air quality',
  'smart.air.sensitive': 'Unhealthy for sensitive',
  'smart.air.unhealthy': 'Unhealthy air quality',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'Daily Air Quality',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'Hourly Rain Forecast',
  'smart.hourlyTemperature': 'Hourly Temperature',
  'smart.hourlyUvIndex': 'Hourly UV Index',
  'smart.now': 'Now',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'Very High',
  'smart.uvLevel.high': 'High',
  'smart.uvLevel.moderate': 'Moderate',
  'smart.uvLevel.low': 'Low',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'Astronomy',
  'smart.sunTimes': 'Sun Times',
  'smart.sunriseSunset': 'Sunrise: {sunrise} • Sunset: {sunset}',
  'smart.daylightLabel': 'Daylight: {duration}',
  'smart.daylightDuration': '{hours}h {minutes}m',
  'smart.dailySunTimes': 'Daily Sun Times',
  'smart.moonPhases': 'Moon Phases',
  'smart.moonPhase': 'Moon Phase',
  'smart.illumination': 'Illumination: {percent}%',
  'smart.illuminationUnavailable': 'Illumination: Data not available',
  'smart.illuminatedPercent': '{percent}% illuminated',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'New Moon',
  'smart.moon.waxingCrescent': 'Waxing Crescent',
  'smart.moon.firstQuarter': 'First Quarter',
  'smart.moon.waxingGibbous': 'Waxing Gibbous',
  'smart.moon.fullMoon': 'Full Moon',
  'smart.moon.waningGibbous': 'Waning Gibbous',
  'smart.moon.lastQuarter': 'Last Quarter',
  'smart.moon.waningCrescent': 'Waning Crescent',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'Humidity Trends',
  'detail.title.wind': 'Wind Speed Trends',
  'detail.title.uv': 'UV Index Trends',
  'detail.title.pressure': 'Atmospheric Pressure',
  'detail.title.windDir': 'Wind Direction',
  'detail.title.visibility': 'Visibility Trends',
  'detail.title.airquality': 'Air Quality Index',
  'detail.title.default': 'Weather Details',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'Relative humidity levels over the next 12 hours. Higher values indicate more moisture in the air.',
  'detail.desc.wind': 'Wind speed variations throughout the day. Helps plan outdoor activities.',
  'detail.desc.uv': 'UV Index forecast showing sun intensity. Use sun protection when values are above 3.',
  'detail.desc.pressure': 'Atmospheric pressure changes can indicate weather pattern shifts.',
  'detail.desc.windDir': 'Current wind direction and speed with compass visualization.',
  'detail.desc.visibility': 'Visibility conditions affect driving, outdoor activities, and flight safety. Clear visibility indicates good weather conditions.',
  'detail.desc.airquality': 'Air Quality Index measures air pollution levels. Lower values indicate better air quality.',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} at {speed} km/h',
  'detail.na': 'N/A',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'Tip',
  'detail.tip.humidityHigh': 'High humidity - stay hydrated and cool',
  'detail.tip.humidityLow': 'Low humidity - use moisturizer and drink water',
  'detail.tip.humidityComfort': 'Comfortable humidity level',
  'detail.tip.windStrong': 'Strong winds - secure loose items',
  'detail.tip.windModerate': 'Moderate winds - good for outdoor activities',
  'detail.tip.windLight': 'Light winds - perfect for any outdoor plans',
  'detail.tip.uvVeryHigh': 'Very high UV - wear sunscreen SPF 30+',
  'detail.tip.uvHigh': 'High UV - consider sun protection',
  'detail.tip.uvModerate': 'Moderate UV - light protection recommended',
  'detail.tip.uvLow': 'Low UV - minimal protection needed',
  'detail.tip.pressureHigh': 'High pressure - stable weather expected',
  'detail.tip.pressureLow': 'Low pressure - weather changes possible',
  'detail.tip.pressureNormal': 'Normal pressure - stable conditions',
  'detail.tip.windDir': 'Wind coming from the {direction} direction',
  'detail.tip.visibilityExcellent': 'Excellent visibility - perfect for all activities',
  'detail.tip.visibilityGood': 'Good visibility - safe for driving and outdoor activities',
  'detail.tip.visibilityReduced': 'Reduced visibility - drive carefully, use headlights',
  'detail.tip.visibilityPoor': 'Poor visibility - avoid unnecessary travel, use extreme caution',
  'detail.tip.aqiGood': 'Good air quality - safe for outdoor activities',
  'detail.tip.aqiModerate': 'Moderate - acceptable for most people',
  'detail.tip.aqiSensitive': 'Unhealthy for sensitive groups - limit prolonged outdoor activities',
  'detail.tip.aqiUnhealthy': 'Unhealthy - everyone should limit outdoor activities',
  'detail.tip.aqiVeryUnhealthy': 'Very unhealthy - avoid outdoor activities',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ Humidity Comfort Guide',
  'detail.insight.humidityBody':
    '• Below 30%: Too dry - may cause skin/throat irritation\n' +
    '• 30-50%: Ideal comfort zone - perfect conditions\n' +
    '• 50-65%: Comfortable for most people\n' +
    '• 65-75%: Slightly humid - may feel warm\n' +
    '• Above 75%: Very humid - feels muggy and sticky',
  'detail.insight.windTitle': 'Wind Speed Guide',
  'detail.insight.windBody':
    '• 0-5 km/h: Calm - smoke rises vertically\n' +
    '• 6-11 km/h: Light air - leaves rustle gently\n' +
    '• 12-19 km/h: Light breeze - perfect for outdoor activities\n' +
    '• 20-28 km/h: Gentle breeze - branches move, flags flutter\n' +
    '• 29-38 km/h: Moderate breeze - small trees sway\n' +
    '• 39-49 km/h: Fresh breeze - large branches move\n' +
    '• 50-61 km/h: Strong breeze - difficult to use umbrellas\n' +
    '• 62+ km/h: High wind - avoid outdoor activities',
  'detail.insight.uvTitle': '☀️ UV Index Guide',
  'detail.insight.uvBody':
    '• 0-2: Low - No protection needed\n' +
    '• 3-5: Moderate - Seek shade during midday\n' +
    '• 6-7: High - Protection required\n' +
    '• 8-10: Very High - Extra protection needed\n' +
    '• 11+: Extreme - Avoid sun exposure',
  'detail.insight.pressureTitle': 'Pressure Trends',
  'detail.insight.pressureBody':
    '• Rising pressure: Fair weather ahead\n' +
    '• Falling pressure: Storms possible\n' +
    '• Stable pressure: Consistent conditions\n' +
    '• Normal range: 1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ Visibility Guide',
  'detail.insight.visibilityBody':
    '• 10+ km: Excellent - perfect for all activities\n' +
    '• 5-10 km: Good - safe driving conditions\n' +
    '• 2-5 km: Moderate - use caution, headlights on\n' +
    '• 1-2 km: Poor - hazardous driving conditions\n' +
    '• <1 km: Very poor - avoid travel if possible',
  'detail.insight.airTitle': '🌫️ Air Quality Details',
  'detail.air.currentAqi': 'Current AQI: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'AQI Scale:',
  'detail.air.scaleBody':
    '• 0-50: Good - Air quality is satisfactory\n' +
    '• 51-100: Moderate - Acceptable for most\n' +
    '• 101-150: Unhealthy for sensitive groups\n' +
    '• 151-200: Unhealthy - Everyone may experience effects\n' +
    '• 201-300: Very unhealthy - Health alert\n' +
    '• 301+: Hazardous - Emergency conditions',

  // RealCompass
  'compass.title': 'Compass',
  'compass.windLabel': 'Wind: {direction}',
  'compass.deviceHeading': 'Device heading: {value}°',
  'compass.instruction': 'For best accuracy: Hold phone flat, away from metal objects, and move in figure-8 pattern to calibrate',

  // RealCompass — calibration status
  'compass.status.initializing': 'Initializing...',
  'compass.status.noSensorsStatic': 'Sensors not available - showing static compass',
  'compass.status.calibratingDevice': 'Calibrating device sensors...',
  'compass.status.calibratedDevice': '✓ Calibrated - Real compass active',
  'compass.status.calibratingMagnetometer': 'Calibrating magnetometer...',
  'compass.status.calibratedMagnetometer': '✓ Calibrated - Magnetometer active',
  'compass.status.noSensors': '⚠️ No sensors available - Static compass',
  'compass.status.sensorError': '⚠️ Sensor error - Static compass',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● High accuracy',
  'compass.accuracy.medium': '● Medium accuracy',
  'compass.accuracy.low': '● Low accuracy - move away from metal objects',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': 'N',
  'compass.dir.nne': 'NNE',
  'compass.dir.ne': 'NE',
  'compass.dir.ene': 'ENE',
  'compass.dir.e': 'E',
  'compass.dir.ese': 'ESE',
  'compass.dir.se': 'SE',
  'compass.dir.sse': 'SSE',
  'compass.dir.s': 'S',
  'compass.dir.ssw': 'SSW',
  'compass.dir.sw': 'SW',
  'compass.dir.wsw': 'WSW',
  'compass.dir.w': 'W',
  'compass.dir.wnw': 'WNW',
  'compass.dir.nw': 'NW',
  'compass.dir.nnw': 'NNW',
};
