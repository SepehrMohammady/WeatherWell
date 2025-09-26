import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DailyForecast } from '../services/types';

interface DailyForecastListProps {
  dailyData: DailyForecast[];
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({ dailyData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 7-Day Forecast</Text>
      {dailyData.slice(0, 7).map((day, index) => (
        <View key={index} style={styles.dayItem}>
          <View style={styles.leftSection}>
            <Text style={styles.dayName}>{formatDate(day.date)}</Text>
            <View style={styles.conditionContainer}>
              <Image 
                source={{ 
                  uri: day.icon.startsWith('http') ? day.icon : `https:${day.icon}` 
                }}
                style={styles.icon}
              />
              <Text style={styles.condition}>{day.condition}</Text>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.temperatureContainer}>
              <Text style={styles.maxTemp}>{Math.round(day.maxTemp)}°</Text>
              <Text style={styles.minTemp}>{Math.round(day.minTemp)}°</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailText}>💧 {day.precipitationChance}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailText}>🌬️ {Math.round(day.windSpeed)} km/h</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailText}>💦 {day.humidity}%</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
    paddingBottom: 12,
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
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  leftSection: {
    flex: 2,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  condition: {
    fontSize: 14,
    color: '#636e72',
    textTransform: 'capitalize',
    flex: 1,
  },
  rightSection: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maxTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0984e3',
    marginRight: 8,
  },
  minTemp: {
    fontSize: 16,
    color: '#636e72',
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  detailItem: {
    marginBottom: 2,
  },
  detailText: {
    fontSize: 12,
    color: '#636e72',
    fontWeight: '500',
  },
});