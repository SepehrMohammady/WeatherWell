import 'package:json_annotation/json_annotation.dart';

part 'location.g.dart';

@JsonSerializable()
class Location {
  final String name;
  final String country;
  final String region;
  final double latitude;
  final double longitude;
  final String timezone;

  const Location({
    required this.name,
    required this.country,
    required this.region,
    required this.latitude,
    required this.longitude,
    required this.timezone,
  });

  factory Location.fromJson(Map<String, dynamic> json) =>
      _$LocationFromJson(json);

  Map<String, dynamic> toJson() => _$LocationToJson(this);

  String get displayName => '$name, $country';
}