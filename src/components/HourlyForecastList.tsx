import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HourlyForecast } from '../services/types';

interface HourlyForecastListProps {
  hourlyData: HourlyForecast[];
}

export const HourlyForecastList: React.FC<HourlyForecastListProps> = ({ hourlyData }) => {
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Hourly Forecast</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourlyData.slice(0, 24).map((hour, index) => (
          <View key={index} style={styles.hourItem}>
            <Text style={styles.time}>{formatHour(hour.time)}</Text>
            <Image 
              source={{ 
                uri: hour.icon.startsWith('http') ? hour.icon : `https:${hour.icon}` 
              }}
              style={styles.icon}
            />
            <Text style={styles.temperature}>{Math.round(hour.temperature)}°</Text>
            <View style={styles.precipitation}>
              <Text style={styles.precipText}>💧 {hour.precipitationChance}%</Text>
            </View>
            <Text style={styles.wind}>🌬️ {Math.round(hour.windSpeed)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    padding: 20,
    paddingBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  hourItem: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 80,
  },
  time: {
    fontSize: 12,
    color: '#636e72',
    fontWeight: '600',
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 6,
  },
  precipitation: {
    marginBottom: 6,
  },
  precipText: {
    fontSize: 10,
    color: '#00b894',
    fontWeight: '600',
  },
  wind: {
    fontSize: 10,
    color: '#636e72',
    fontWeight: '600',
  },
});