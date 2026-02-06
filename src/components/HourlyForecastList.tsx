import React, { useRef, useEffect } from 'react';
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
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Find the current hour index
  const getCurrentHourIndex = (): number => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Find the index of the hour that matches the current time
    for (let i = 0; i < Math.min(hourlyData.length, 24); i++) {
      try {
        const hourDate = new Date(hourlyData[i].time);
        if (hourDate.getHours() === currentHour) {
          return i;
        }
      } catch (e) {
        continue;
      }
    }
    return 0;
  };

  const currentHourIndex = getCurrentHourIndex();
  
  // Auto-scroll to current hour when component mounts
  useEffect(() => {
    if (scrollViewRef.current && currentHourIndex > 0) {
      // Each item is approximately 88px wide (80px min width + 8px margin)
      const itemWidth = 88;
      const scrollPosition = currentHourIndex * itemWidth;
      
      // Slight delay to ensure the ScrollView is rendered
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: scrollPosition, animated: true });
      }, 100);
    }
  }, [currentHourIndex, hourlyData]);
  
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };
  
  const isCurrentHour = (timeString: string): boolean => {
    try {
      const hourDate = new Date(timeString);
      const now = new Date();
      return hourDate.getHours() === now.getHours() && 
             hourDate.toDateString() === now.toDateString();
    } catch (e) {
      return false;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>⏰ Hourly Forecast</Text>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourlyData.slice(0, 24).map((hour, index) => {
          const isCurrent = isCurrentHour(hour.time);
          return (
            <View 
              key={index} 
              style={[
                styles.hourItem, 
                { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' },
                isCurrent && styles.currentHourItem,
                isCurrent && { borderColor: colors.primary, backgroundColor: colors.primary + '15' }
              ]}
            >
              <Text style={[
                styles.time, 
                { color: isCurrent ? colors.primary : colors.text + '80' },
                isCurrent && styles.currentHourText
              ]}>
                {isCurrent ? 'Now' : formatHour(hour.time)}
              </Text>
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
          );
        })}
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
  currentHourItem: {
    borderWidth: 2,
  },
  currentHourText: {
    fontWeight: 'bold',
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