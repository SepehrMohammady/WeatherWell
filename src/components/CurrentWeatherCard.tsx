import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../services/types';

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>📍 {location.name}</Text>
        <Text style={styles.country}>{location.country}</Text>
      </View>
      
      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>{Math.round(current.temperature)}°C</Text>
        <View style={styles.conditionContainer}>
          <Image 
            source={{ uri: current.icon.startsWith('http') ? current.icon : `https:${current.icon}` }}
            style={styles.conditionIcon}
          />
          <Text style={styles.condition}>{current.condition}</Text>
        </View>
      </View>

      <Text style={styles.feelsLike}>Feels like {Math.round(current.feelsLike)}°C</Text>
      
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{current.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{Math.round(current.windSpeed)} km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>UV Index</Text>
          <Text style={styles.detailValue}>{current.uvIndex}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{current.pressure} hPa</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Visibility</Text>
          <Text style={styles.detailValue}>{current.visibility} km</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Dir</Text>
          <Text style={styles.detailValue}>{current.windDirection}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#636e72',
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
    color: '#636e72',
    textTransform: 'capitalize',
  },
  feelsLike: {
    fontSize: 14,
    color: '#636e72',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#636e72',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: 'bold',
  },
});