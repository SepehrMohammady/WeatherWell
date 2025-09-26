import 'package:json_annotation/json_annotation.dart';

part 'weather_data.g.dart';

@JsonSerializable()
class WeatherData {
  final CurrentWeather current;
  final List<DailyForecast> daily;
  final List<HourlyForecast> hourly;
  final AirQuality? airQuality;
  final Astronomy astronomy;

  const WeatherData({
    required this.current,
    required this.daily,
    required this.hourly,
    required this.astronomy, this.airQuality,
  });

  factory WeatherData.fromJson(Map<String, dynamic> json) =>
      _$WeatherDataFromJson(json);

  Map<String, dynamic> toJson() => _$WeatherDataToJson(this);
}

@JsonSerializable()
class CurrentWeather {
  final double temperature;
  final double feelsLike;
  final int humidity;
  final double pressure;
  final double windSpeed;
  final int windDirection;
  final double visibility;
  final double uvIndex;
  final String condition;
  final String icon;
  final DateTime lastUpdated;

  const CurrentWeather({
    required this.temperature,
    required this.feelsLike,
    required this.humidity,
    required this.pressure,
    required this.windSpeed,
    required this.windDirection,
    required this.visibility,
    required this.uvIndex,
    required this.condition,
    required this.icon,
    required this.lastUpdated,
  });

  factory CurrentWeather.fromJson(Map<String, dynamic> json) =>
      _$CurrentWeatherFromJson(json);

  Map<String, dynamic> toJson() => _$CurrentWeatherToJson(this);
}

@JsonSerializable()
class DailyForecast {
  final DateTime date;
  final double maxTemp;
  final double minTemp;
  final String condition;
  final String icon;
  final int humidity;
  final double windSpeed;
  final double precipitation;
  final double uvIndex;

  const DailyForecast({
    required this.date,
    required this.maxTemp,
    required this.minTemp,
    required this.condition,
    required this.icon,
    required this.humidity,
    required this.windSpeed,
    required this.precipitation,
    required this.uvIndex,
  });

  factory DailyForecast.fromJson(Map<String, dynamic> json) =>
      _$DailyForecastFromJson(json);

  Map<String, dynamic> toJson() => _$DailyForecastToJson(this);
}

@JsonSerializable()
class HourlyForecast {
  final DateTime time;
  final double temperature;
  final String condition;
  final String icon;
  final double precipitation;
  final double windSpeed;
  final int humidity;

  const HourlyForecast({
    required this.time,
    required this.temperature,
    required this.condition,
    required this.icon,
    required this.precipitation,
    required this.windSpeed,
    required this.humidity,
  });

  factory HourlyForecast.fromJson(Map<String, dynamic> json) =>
      _$HourlyForecastFromJson(json);

  Map<String, dynamic> toJson() => _$HourlyForecastToJson(this);
}

@JsonSerializable()
class AirQuality {
  final int aqi;
  final double co;
  final double no2;
  final double o3;
  final double so2;
  final double pm25;
  final double pm10;

  const AirQuality({
    required this.aqi,
    required this.co,
    required this.no2,
    required this.o3,
    required this.so2,
    required this.pm25,
    required this.pm10,
  });

  factory AirQuality.fromJson(Map<String, dynamic> json) =>
      _$AirQualityFromJson(json);

  Map<String, dynamic> toJson() => _$AirQualityToJson(this);

  String get qualityDescription {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  }
}

@JsonSerializable()
class Astronomy {
  final DateTime sunrise;
  final DateTime sunset;
  final MoonPhase moonPhase;

  const Astronomy({
    required this.sunrise,
    required this.sunset,
    required this.moonPhase,
  });

  factory Astronomy.fromJson(Map<String, dynamic> json) =>
      _$AstronomyFromJson(json);

  Map<String, dynamic> toJson() => _$AstronomyToJson(this);
}

@JsonSerializable()
class MoonPhase {
  final String phase;
  final double illumination;

  const MoonPhase({
    required this.phase,
    required this.illumination,
  });

  factory MoonPhase.fromJson(Map<String, dynamic> json) =>
      _$MoonPhaseFromJson(json);

  Map<String, dynamic> toJson() => _$MoonPhaseToJson(this);
}