import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { WeatherData } from '../services/types';
import { RealCompass } from './RealCompass';

interface WeatherDetailModalProps {
  visible: boolean;
  onClose: () => void;
  weatherData: WeatherData;
  metricType: 'humidity' | 'wind' | 'uv' | 'pressure' | 'windDir' | 'visibility' | 'airquality' | null;
}

export const WeatherDetailModal: React.FC<WeatherDetailModalProps> = ({
  visible,
  onClose,
  weatherData,
  metricType,
}) => {
  const { colors } = useTheme();

  const getModalTitle = (): string => {
    switch (metricType) {
      case 'humidity':
        return 'Humidity Trends';
      case 'wind':
        return 'Wind Speed Trends';
      case 'uv':
        return 'UV Index Trends';
      case 'pressure':
        return 'Atmospheric Pressure';
      case 'windDir':
        return 'Wind Direction';
      case 'visibility':
        return 'Visibility Trends';
      case 'airquality':
        return 'Air Quality Index';
      default:
        return 'Weather Details';
    }
  };

  const getModalDescription = (): string => {
    switch (metricType) {
      case 'humidity':
        return 'Relative humidity levels over the next 12 hours. Higher values indicate more moisture in the air.';
      case 'wind':
        return 'Wind speed variations throughout the day. Helps plan outdoor activities.';
      case 'uv':
        return 'UV Index forecast showing sun intensity. Use sun protection when values are above 3.';
      case 'pressure':
        return 'Atmospheric pressure changes can indicate weather pattern shifts.';
      case 'windDir':
        return 'Current wind direction and speed with compass visualization.';
      case 'visibility':
        return 'Visibility conditions affect driving, outdoor activities, and flight safety. Clear visibility indicates good weather conditions.';
      case 'airquality':
        return 'Air Quality Index measures air pollution levels. Lower values indicate better air quality.';
      default:
        return '';
    }
  };

  const getCurrentValue = (): string => {
    const current = weatherData.current;
    switch (metricType) {
      case 'humidity':
        return `${current.humidity}%`;
      case 'wind':
        return `${Math.round(current.windSpeed)} km/h`;
      case 'uv':
        return `${current.uvIndex}`;
      case 'pressure':
        return `${current.pressure} hPa`;
      case 'windDir':
        return `${current.windDirection} at ${Math.round(current.windSpeed)} km/h`;
      case 'visibility':
        return `${current.visibility} km`;
      case 'airquality':
        return `AQI ${weatherData.airQuality?.aqi || 'N/A'}`;
      default:
        return '';
    }
  };

  const getHealthTip = (): string => {
    const current = weatherData.current;
    switch (metricType) {
      case 'humidity':
        if (current.humidity > 70) return 'High humidity - stay hydrated and cool';
        if (current.humidity < 30) return 'Low humidity - use moisturizer and drink water';
        return 'Comfortable humidity level';
      case 'wind':
        if (current.windSpeed > 30) return 'Strong winds - secure loose items';
        if (current.windSpeed > 15) return 'Moderate winds - good for outdoor activities';
        return 'Light winds - perfect for any outdoor plans';
      case 'uv':
        if (current.uvIndex >= 8) return 'Very high UV - wear sunscreen SPF 30+';
        if (current.uvIndex >= 6) return 'High UV - consider sun protection';
        if (current.uvIndex >= 3) return 'Moderate UV - light protection recommended';
        return 'Low UV - minimal protection needed';
      case 'pressure':
        if (current.pressure > 1020) return 'High pressure - stable weather expected';
        if (current.pressure < 1000) return 'Low pressure - weather changes possible';
        return 'Normal pressure - stable conditions';
      case 'windDir':
        return `Wind coming from the ${current.windDirection} direction`;
      case 'visibility':
        if (current.visibility >= 10) return 'Excellent visibility - perfect for all activities';
        if (current.visibility >= 5) return 'Good visibility - safe for driving and outdoor activities';
        if (current.visibility >= 2) return 'Reduced visibility - drive carefully, use headlights';
        return 'Poor visibility - avoid unnecessary travel, use extreme caution';
      case 'airquality':
        const aqi = weatherData.airQuality?.aqi || 0;
        if (aqi <= 50) return 'Good air quality - safe for outdoor activities';
        if (aqi <= 100) return 'Moderate - acceptable for most people';
        if (aqi <= 150) return 'Unhealthy for sensitive groups - limit prolonged outdoor activities';
        if (aqi <= 200) return 'Unhealthy - everyone should limit outdoor activities';
        return 'Very unhealthy - avoid outdoor activities';
      default:
        return '';
    }
  };

  if (!metricType) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: colors.text }]}>
              {getModalTitle()}
            </Text>
            <Text style={[styles.currentValue, { color: colors.primary }]}>
              {getCurrentValue()}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.surface }]}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.descriptionCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.description, { color: colors.text }]}>
              {getModalDescription()}
            </Text>
          </View>

          <View style={[styles.tipCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.tipTitle, { color: colors.text }]}>
              <Ionicons name="bulb-outline" size={16} color={colors.text} /> Tip
            </Text>
            <Text style={[styles.tip, { color: colors.text + 'CC' }]}>
              {getHealthTip()}
            </Text>
          </View>

          {metricType === 'windDir' && (
            <RealCompass
              windSpeed={weatherData.current.windSpeed}
              windDirection={weatherData.current.windDirection}
              size={280}
            />
          )}

          {/* Additional insights based on metric type */}
          {metricType === 'humidity' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                🌡️ Humidity Comfort Guide
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • Below 30%: Too dry - may cause skin/throat irritation{'\n'}
                • 30-50%: Ideal comfort zone - perfect conditions{'\n'}
                • 50-65%: Comfortable for most people{'\n'}
                • 65-75%: Slightly humid - may feel warm{'\n'}
                • Above 75%: Very humid - feels muggy and sticky
              </Text>
            </View>
          )}

          {metricType === 'wind' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                Wind Speed Guide
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • 0-5 km/h: Calm - smoke rises vertically{'\n'}
                • 6-11 km/h: Light air - leaves rustle gently{'\n'}
                • 12-19 km/h: Light breeze - perfect for outdoor activities{'\n'}
                • 20-28 km/h: Gentle breeze - branches move, flags flutter{'\n'}
                • 29-38 km/h: Moderate breeze - small trees sway{'\n'}
                • 39-49 km/h: Fresh breeze - large branches move{'\n'}
                • 50-61 km/h: Strong breeze - difficult to use umbrellas{'\n'}
                • 62+ km/h: High wind - avoid outdoor activities
              </Text>
            </View>
          )}

          {metricType === 'uv' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                ☀️ UV Index Guide
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • 0-2: Low - No protection needed{'\n'}
                • 3-5: Moderate - Seek shade during midday{'\n'}
                • 6-7: High - Protection required{'\n'}
                • 8-10: Very High - Extra protection needed{'\n'}
                • 11+: Extreme - Avoid sun exposure
              </Text>
            </View>
          )}

          {metricType === 'pressure' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                Pressure Trends
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • Rising pressure: Fair weather ahead{'\n'}
                • Falling pressure: Storms possible{'\n'}
                • Stable pressure: Consistent conditions{'\n'}
                • Normal range: 1000-1020 hPa
              </Text>
            </View>
          )}

          {metricType === 'visibility' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                👁️ Visibility Guide
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • 10+ km: Excellent - perfect for all activities{'\n'}
                • 5-10 km: Good - safe driving conditions{'\n'}
                • 2-5 km: Moderate - use caution, headlights on{'\n'}
                • 1-2 km: Poor - hazardous driving conditions{'\n'}
                • {'<'}1 km: Very poor - avoid travel if possible
              </Text>
            </View>
          )}

          {metricType === 'airquality' && weatherData.airQuality && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                🌫️ Air Quality Details
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                <Text style={{ fontWeight: 'bold' }}>Current AQI: {weatherData.airQuality.aqi}</Text>{'\n\n'}
                PM2.5: {Math.round(weatherData.airQuality.pm2_5)} μg/m³{'\n'}
                PM10: {Math.round(weatherData.airQuality.pm10)} μg/m³{'\n'}
                {weatherData.airQuality.o3 && `O₃: ${Math.round(weatherData.airQuality.o3)} μg/m³${'\n'}`}
                {weatherData.airQuality.no2 && `NO₂: ${Math.round(weatherData.airQuality.no2)} μg/m³${'\n'}`}
                {weatherData.airQuality.so2 && `SO₂: ${Math.round(weatherData.airQuality.so2)} μg/m³${'\n'}`}
                {weatherData.airQuality.co && `CO: ${Math.round(weatherData.airQuality.co)} μg/m³${'\n'}`}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>AQI Scale:</Text>{'\n'}
                • 0-50: Good - Air quality is satisfactory{'\n'}
                • 51-100: Moderate - Acceptable for most{'\n'}
                • 101-150: Unhealthy for sensitive groups{'\n'}
                • 151-200: Unhealthy - Everyone may experience effects{'\n'}
                • 201-300: Very unhealthy - Health alert{'\n'}
                • 301+: Hazardous - Emergency conditions
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  descriptionCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tip: {
    fontSize: 16,
    lineHeight: 24,
  },
  insightCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 40,
  },
});