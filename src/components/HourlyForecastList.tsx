import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HourlyForecast } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { formatTemperature } from '../utils/temperatureUtils';

interface HourlyForecastListProps {
  hourlyData: HourlyForecast[];
}

export const HourlyForecastList: React.FC<HourlyForecastListProps> = ({ hourlyData }) => {
  const { colors } = useTheme();
  const { settings } = useSettings();
  
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>📊 Hourly Forecast</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourlyData.slice(0, 24).map((hour, index) => (
          <View key={index} style={[styles.hourItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}>
            <Text style={[styles.time, { color: colors.text + '80' }]}>{formatHour(hour.time)}</Text>
            <Image 
              source={{ 
                uri: hour.icon.startsWith('http') ? hour.icon : `https:${hour.icon}` 
              }}
              style={styles.icon}
            />
            <Text style={[styles.temperature, { color: colors.primary }]}>{formatTemperature(hour.temperature, settings.temperatureUnit).replace('°C', '°').replace('°F', '°')}</Text>
            <View style={styles.precipitation}>
              <Text style={[styles.precipText, { color: colors.text + '80' }]}>💧 {hour.precipitationChance}%</Text>
            </View>
            <Text style={[styles.wind, { color: colors.text + '60' }]}>🌬️ {Math.round(hour.windSpeed)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 20,
    paddingBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  hourItem: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 80,
  },
  time: {
    fontSize: 12,
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
    marginBottom: 6,
  },
  precipitation: {
    marginBottom: 6,
  },
  precipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  wind: {
    fontSize: 10,
    fontWeight: '600',
  },
});