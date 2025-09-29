import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { formatTemperature } from '../utils/temperatureUtils';

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
  apiSource?: string;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weatherData, apiSource }) => {
  const { location, current } = weatherData;
  const { colors } = useTheme();
  const { settings } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.location, { color: colors.text }]}>📍 {location.name}</Text>
        <Text style={[styles.country, { color: colors.text + '80' }]}>{location.country}</Text>
      </View>
      
      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>{formatTemperature(current.temperature, settings.temperatureUnit)}</Text>
        <View style={styles.conditionContainer}>
          <Image 
            source={{ uri: current.icon.startsWith('http') ? current.icon : `https:${current.icon}` }}
            style={styles.conditionIcon}
          />
          <Text style={[styles.condition, { color: colors.text + '80' }]}>{current.condition}</Text>
        </View>
      </View>

      {settings.showFeelsLike && (
        <Text style={[styles.feelsLike, { color: colors.text + '80' }]}>Feels like {formatTemperature(current.feelsLike, settings.temperatureUnit)}</Text>
      )}
      
      <View style={styles.detailsGrid}>
        {settings.showHumidity && (
          <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>Humidity</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{current.humidity}%</Text>
          </View>
        )}
        <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
          <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>Wind</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{Math.round(current.windSpeed)} km/h</Text>
        </View>
        <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
          <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>UV Index</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{current.uvIndex}</Text>
        </View>
        {settings.showPressure && (
          <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>Pressure</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{current.pressure} hPa</Text>
          </View>
        )}
        {settings.showVisibility && (
          <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>Visibility</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{current.visibility} km</Text>
          </View>
        )}
        <View style={[styles.detailItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
          <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>Wind Dir</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{current.windDirection}</Text>
        </View>
      </View>
      
      {apiSource && (
        <View style={styles.apiSourceContainer}>
          <Text style={[styles.apiSource, { color: colors.text + '60' }]}>{apiSource}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 24,
    margin: 16,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  apiSourceContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  apiSource: {
    fontSize: 11,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 8,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  condition: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  feelsLike: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});