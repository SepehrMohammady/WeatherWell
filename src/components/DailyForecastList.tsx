import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DailyForecast } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { formatTemperature } from '../utils/temperatureUtils';

interface DailyForecastListProps {
  dailyData: DailyForecast[];
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({ dailyData }) => {
  const { colors } = useTheme();
  const { settings } = useSettings();
  
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
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>📅 Future Forecast</Text>
      {dailyData.slice(0, 7).map((day, index) => (
        <View key={index} style={styles.dayItem}>
          <View style={styles.leftSection}>
            <Text style={[styles.dayName, { color: colors.text }]}>{formatDate(day.date)}</Text>
            <View style={styles.conditionContainer}>
              <Image 
                source={{ 
                  uri: day.icon.startsWith('http') ? day.icon : `https:${day.icon}` 
                }}
                style={styles.icon}
              />
              <Text style={[styles.condition, { color: colors.text + '80' }]}>{day.condition}</Text>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.temperatureContainer}>
              <Text style={[styles.maxTemp, { color: colors.primary }]}>{formatTemperature(day.maxTemp, settings.temperatureUnit).replace('°C', '°').replace('°F', '°')}</Text>
              <Text style={[styles.minTemp, { color: colors.text + '60' }]}>{formatTemperature(day.minTemp, settings.temperatureUnit).replace('°C', '°').replace('°F', '°')}</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailText, { color: colors.text + '60' }]}>💧 {day.precipitationChance}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailText, { color: colors.text + '60' }]}>🌬️ {Math.round(day.windSpeed)} km/h</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailText, { color: colors.text + '60' }]}>💦 {day.humidity}%</Text>
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
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 20,
    paddingBottom: 12,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leftSection: {
    flex: 2,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
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
    marginRight: 8,
  },
  minTemp: {
    fontSize: 16,
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  detailItem: {
    marginBottom: 2,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '500',
  },
});