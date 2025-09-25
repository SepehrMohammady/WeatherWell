// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'weather_data.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

WeatherData _$WeatherDataFromJson(Map<String, dynamic> json) => WeatherData(
      current: CurrentWeather.fromJson(json['current'] as Map<String, dynamic>),
      daily: (json['daily'] as List<dynamic>)
          .map((e) => DailyForecast.fromJson(e as Map<String, dynamic>))
          .toList(),
      hourly: (json['hourly'] as List<dynamic>)
          .map((e) => HourlyForecast.fromJson(e as Map<String, dynamic>))
          .toList(),
      airQuality: json['airQuality'] == null
          ? null
          : AirQuality.fromJson(json['airQuality'] as Map<String, dynamic>),
      astronomy: Astronomy.fromJson(json['astronomy'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$WeatherDataToJson(WeatherData instance) =>
    <String, dynamic>{
      'current': instance.current,
      'daily': instance.daily,
      'hourly': instance.hourly,
      'airQuality': instance.airQuality,
      'astronomy': instance.astronomy,
    };

CurrentWeather _$CurrentWeatherFromJson(Map<String, dynamic> json) =>
    CurrentWeather(
      temperature: (json['temperature'] as num).toDouble(),
      feelsLike: (json['feelsLike'] as num).toDouble(),
      humidity: (json['humidity'] as num).toInt(),
      pressure: (json['pressure'] as num).toDouble(),
      windSpeed: (json['windSpeed'] as num).toDouble(),
      windDirection: (json['windDirection'] as num).toInt(),
      visibility: (json['visibility'] as num).toDouble(),
      uvIndex: (json['uvIndex'] as num).toDouble(),
      condition: json['condition'] as String,
      icon: json['icon'] as String,
      lastUpdated: DateTime.parse(json['lastUpdated'] as String),
    );

Map<String, dynamic> _$CurrentWeatherToJson(CurrentWeather instance) =>
    <String, dynamic>{
      'temperature': instance.temperature,
      'feelsLike': instance.feelsLike,
      'humidity': instance.humidity,
      'pressure': instance.pressure,
      'windSpeed': instance.windSpeed,
      'windDirection': instance.windDirection,
      'visibility': instance.visibility,
      'uvIndex': instance.uvIndex,
      'condition': instance.condition,
      'icon': instance.icon,
      'lastUpdated': instance.lastUpdated.toIso8601String(),
    };

DailyForecast _$DailyForecastFromJson(Map<String, dynamic> json) =>
    DailyForecast(
      date: DateTime.parse(json['date'] as String),
      maxTemp: (json['maxTemp'] as num).toDouble(),
      minTemp: (json['minTemp'] as num).toDouble(),
      condition: json['condition'] as String,
      icon: json['icon'] as String,
      humidity: (json['humidity'] as num).toInt(),
      windSpeed: (json['windSpeed'] as num).toDouble(),
      precipitation: (json['precipitation'] as num).toDouble(),
      uvIndex: (json['uvIndex'] as num).toDouble(),
    );

Map<String, dynamic> _$DailyForecastToJson(DailyForecast instance) =>
    <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'maxTemp': instance.maxTemp,
      'minTemp': instance.minTemp,
      'condition': instance.condition,
      'icon': instance.icon,
      'humidity': instance.humidity,
      'windSpeed': instance.windSpeed,
      'precipitation': instance.precipitation,
      'uvIndex': instance.uvIndex,
    };

HourlyForecast _$HourlyForecastFromJson(Map<String, dynamic> json) =>
    HourlyForecast(
      time: DateTime.parse(json['time'] as String),
      temperature: (json['temperature'] as num).toDouble(),
      condition: json['condition'] as String,
      icon: json['icon'] as String,
      precipitation: (json['precipitation'] as num).toDouble(),
      windSpeed: (json['windSpeed'] as num).toDouble(),
      humidity: (json['humidity'] as num).toInt(),
    );

Map<String, dynamic> _$HourlyForecastToJson(HourlyForecast instance) =>
    <String, dynamic>{
      'time': instance.time.toIso8601String(),
      'temperature': instance.temperature,
      'condition': instance.condition,
      'icon': instance.icon,
      'precipitation': instance.precipitation,
      'windSpeed': instance.windSpeed,
      'humidity': instance.humidity,
    };

AirQuality _$AirQualityFromJson(Map<String, dynamic> json) => AirQuality(
      aqi: (json['aqi'] as num).toInt(),
      co: (json['co'] as num).toDouble(),
      no2: (json['no2'] as num).toDouble(),
      o3: (json['o3'] as num).toDouble(),
      so2: (json['so2'] as num).toDouble(),
      pm25: (json['pm25'] as num).toDouble(),
      pm10: (json['pm10'] as num).toDouble(),
    );

Map<String, dynamic> _$AirQualityToJson(AirQuality instance) =>
    <String, dynamic>{
      'aqi': instance.aqi,
      'co': instance.co,
      'no2': instance.no2,
      'o3': instance.o3,
      'so2': instance.so2,
      'pm25': instance.pm25,
      'pm10': instance.pm10,
    };

Astronomy _$AstronomyFromJson(Map<String, dynamic> json) => Astronomy(
      sunrise: DateTime.parse(json['sunrise'] as String),
      sunset: DateTime.parse(json['sunset'] as String),
      moonPhase: MoonPhase.fromJson(json['moonPhase'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AstronomyToJson(Astronomy instance) => <String, dynamic>{
      'sunrise': instance.sunrise.toIso8601String(),
      'sunset': instance.sunset.toIso8601String(),
      'moonPhase': instance.moonPhase,
    };

MoonPhase _$MoonPhaseFromJson(Map<String, dynamic> json) => MoonPhase(
      phase: json['phase'] as String,
      illumination: (json['illumination'] as num).toDouble(),
    );

Map<String, dynamic> _$MoonPhaseToJson(MoonPhase instance) => <String, dynamic>{
      'phase': instance.phase,
      'illumination': instance.illumination,
    };
