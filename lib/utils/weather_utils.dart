class WeatherUtils {
  static String getWindDirection(int degrees) {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
    
    final index = ((degrees + 11.25) / 22.5).floor() % 16;
    return directions[index];
  }

  static String getUVDescription(double uvIndex) {
    if (uvIndex <= 2) {
      return 'Low - No protection needed';
    } else if (uvIndex <= 5) {
      return 'Moderate - Some protection required';
    } else if (uvIndex <= 7) {
      return 'High - Protection essential';
    } else if (uvIndex <= 10) {
      return 'Very High - Extra protection needed';
    } else {
      return 'Extreme - Avoid sun exposure';
    }
  }

  static String getVisibilityDescription(double visibility) {
    if (visibility >= 10) {
      return 'Excellent';
    } else if (visibility >= 6) {
      return 'Good';
    } else if (visibility >= 2) {
      return 'Moderate';
    } else if (visibility >= 1) {
      return 'Poor';
    } else {
      return 'Very Poor';
    }
  }

  static String getHumidityDescription(int humidity) {
    if (humidity < 30) {
      return 'Very Dry';
    } else if (humidity < 50) {
      return 'Dry';
    } else if (humidity < 70) {
      return 'Comfortable';
    } else if (humidity < 85) {
      return 'Humid';
    } else {
      return 'Very Humid';
    }
  }

  static String getPressureDescription(double pressure) {
    if (pressure < 1000) {
      return 'Low (Stormy)';
    } else if (pressure < 1013) {
      return 'Below Normal';
    } else if (pressure < 1020) {
      return 'Normal';
    } else if (pressure < 1030) {
      return 'Above Normal';
    } else {
      return 'High (Fair)';
    }
  }

  static String getAirQualityAdvice(int aqi) {
    switch (aqi) {
      case 1:
        return 'Air quality is good. Perfect for outdoor activities.';
      case 2:
        return 'Air quality is fair. No restrictions for outdoor activities.';
      case 3:
        return 'Air quality is moderate. Sensitive individuals should consider reducing outdoor activities.';
      case 4:
        return 'Air quality is poor. Everyone should reduce outdoor activities.';
      case 5:
        return 'Air quality is very poor. Avoid outdoor activities if possible.';
      default:
        return 'Air quality data unavailable.';
    }
  }

  static bool isGoodWeatherForOutdoorActivities(
    double temperature,
    double windSpeed,
    String condition,
    double precipitation,
  ) {
    // Good weather criteria for European climate
    if (temperature < 5 || temperature > 30) return false;
    if (windSpeed > 25) return false;
    if (precipitation > 2) return false;
    if (condition.toLowerCase().contains('storm') || 
        condition.toLowerCase().contains('heavy')) return false;
    
    return true;
  }

  static String getSeasonalClothingAdvice(double temperature, String season) {
    // Seasonal advice specifically for European climate
    switch (season.toLowerCase()) {
      case 'winter':
        if (temperature < -5) {
          return 'Heavy winter coat, thermal layers, waterproof boots, warm hat, scarf, and gloves essential.';
        } else if (temperature < 5) {
          return 'Winter coat, warm layers, and accessories recommended.';
        } else {
          return 'Light jacket or sweater should be sufficient.';
        }
      
      case 'spring':
        if (temperature < 10) {
          return 'Light jacket or cardigan recommended. Layer for changing temperatures.';
        } else if (temperature < 20) {
          return 'Light sweater or long sleeves. Perfect layering weather.';
        } else {
          return 'Light clothing, but keep a light jacket handy for cooler evenings.';
        }
      
      case 'summer':
        if (temperature > 25) {
          return 'Light, breathable clothing. Don\'t forget sun protection!';
        } else {
          return 'Comfortable casual wear. Light layers for varying temperatures.';
        }
      
      case 'autumn':
        if (temperature < 10) {
          return 'Warm jacket or coat recommended. Prepare for cooler weather.';
        } else if (temperature < 20) {
          return 'Layer with sweater or cardigan. Weather can be unpredictable.';
        } else {
          return 'Light layers work well, but keep warmer options available.';
        }
      
      default:
        return 'Dress appropriately for the temperature and weather conditions.';
    }
  }

  static String getCurrentSeason() {
    final month = DateTime.now().month;
    
    if (month >= 3 && month <= 5) {
      return 'spring';
    } else if (month >= 6 && month <= 8) {
      return 'summer';
    } else if (month >= 9 && month <= 11) {
      return 'autumn';
    } else {
      return 'winter';
    }
  }
}