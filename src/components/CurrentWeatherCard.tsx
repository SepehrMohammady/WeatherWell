import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTemperature } from '../utils/temperatureUtils';
import { WeatherDetailModal } from './WeatherDetailModal';

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
  apiSource?: string;
  /** Opens the side-by-side provider comparison */
  onCompare?: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weatherData, apiSource, onCompare }) => {
  const { location, current } = weatherData;
  const { colors } = useTheme();
  const { settings } = useSettings();
  const { t, ln } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'humidity' | 'wind' | 'uv' | 'pressure' | 'windDir' | 'visibility' | 'airquality' | null>(null);

  const handleMetricPress = (metric: 'humidity' | 'wind' | 'uv' | 'pressure' | 'windDir' | 'visibility' | 'airquality') => {
    setSelectedMetric(metric);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMetric(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.location, { color: colors.text }]}>
            <Ionicons name="location-outline" size={18} color={colors.text} /> {location.name}
          </Text>
          <Text style={[styles.country, { color: colors.text + '80' }]}>{location.country}</Text>
        </View>
        {onCompare && (
          <TouchableOpacity
            onPress={onCompare}
            style={[styles.compareButton, { backgroundColor: colors.primary + '1F' }]}
            accessibilityLabel={t('compare.title')}
          >
            <MaterialCommunityIcons name="scale-balance" size={22} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.mainInfo}>
        <Text style={[styles.temperature, { color: colors.primary }]}>{ln(formatTemperature(current.temperature, settings.temperatureUnit))}</Text>
        <View style={styles.conditionContainer}>
          <View style={styles.conditionIcon}>
            <WeatherIcon code={current.conditionCode} isNight={current.isNight} size={36} />
          </View>
          <Text style={[styles.condition, { color: colors.text + '80' }]}>{t('conditions.' + current.conditionCode)}</Text>
        </View>
      </View>

      {settings.showFeelsLike && (
        <Text style={[styles.feelsLike, { color: colors.text + '80' }]}>{t('weather.feelsLike', { temp: formatTemperature(current.feelsLike, settings.temperatureUnit) })}</Text>
      )}
      
      <View style={styles.detailsGrid}>
        {settings.showHumidity && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('humidity')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.humidity')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{t('weather.percentValue', { value: current.humidity })}</Text>
          </TouchableOpacity>
        )}
        {settings.showWindSpeed && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('wind')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.wind')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{t('weather.kmhValue', { value: Math.round(current.windSpeed) })}</Text>
          </TouchableOpacity>
        )}
        {settings.showUVIndex && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('uv')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.uvIndex')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{ln(current.uvIndex)}</Text>
          </TouchableOpacity>
        )}
        {settings.showPressure && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('pressure')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.pressure')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{t('weather.hpaValue', { value: current.pressure })}</Text>
          </TouchableOpacity>
        )}
        {settings.showWindDirection && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('windDir')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.windDir')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{current.windDirection}</Text>
          </TouchableOpacity>
        )}
        {settings.showVisibility && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('visibility')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.visibility')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{t('weather.kmValue', { value: current.visibility })}</Text>
          </TouchableOpacity>
        )}
        {settings.showAirQuality && weatherData.airQuality && (
          <TouchableOpacity 
            style={[styles.detailItem, styles.clickableItem, { backgroundColor: colors.surface === '#ffffff' ? '#f8f9fa' : colors.text + '10' }]}
            onPress={() => handleMetricPress('airquality')}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailLabel, { color: colors.text + '60' }]}>{t('weather.airQuality')}</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{t('weather.aqiValue', { value: weatherData.airQuality.aqi })}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {apiSource && (
        <View style={styles.apiSourceContainer}>
          <Text style={[styles.apiSource, { color: colors.text + '60' }]}>{apiSource}</Text>
        </View>
      )}

      <WeatherDetailModal
        visible={modalVisible}
        onClose={closeModal}
        weatherData={weatherData}
        metricType={selectedMetric}
      />
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 50,
  },
  compareButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 8,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIcon: {
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
  clickableItem: {
    transform: [{ scale: 1 }],
  },
});