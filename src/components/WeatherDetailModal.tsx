import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { WeatherData } from '../services/types';
import { RealCompass } from './RealCompass';

interface WeatherDetailModalProps {
  visible: boolean;
  onClose: () => void;
  weatherData: WeatherData;
  metricType: 'humidity' | 'wind' | 'uv' | 'pressure' | 'windDir' | 'visibility' | null;
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
      default:
        return '';
    }
  };

  const getHealthTip = (): string => {
    const current = weatherData.current;
    switch (metricType) {
      case 'humidity':
        if (current.humidity > 70) return '💧 High humidity - stay hydrated and cool';
        if (current.humidity < 30) return '🏜️ Low humidity - use moisturizer and drink water';
        return '✅ Comfortable humidity level';
      case 'wind':
        if (current.windSpeed > 30) return '💨 Strong winds - secure loose items';
        if (current.windSpeed > 15) return '🍃 Moderate winds - good for outdoor activities';
        return '🌤️ Light winds - perfect for any outdoor plans';
      case 'uv':
        if (current.uvIndex >= 8) return '🕶️ Very high UV - wear sunscreen SPF 30+';
        if (current.uvIndex >= 6) return '☀️ High UV - consider sun protection';
        if (current.uvIndex >= 3) return '🧴 Moderate UV - light protection recommended';
        return '🌤️ Low UV - minimal protection needed';
      case 'pressure':
        if (current.pressure > 1020) return '📈 High pressure - stable weather expected';
        if (current.pressure < 1000) return '📉 Low pressure - weather changes possible';
        return '⚖️ Normal pressure - stable conditions';
      case 'windDir':
        return `🧭 Wind coming from the ${current.windDirection} direction`;
      case 'visibility':
        if (current.visibility >= 10) return '👁️ Excellent visibility - perfect for all activities';
        if (current.visibility >= 5) return '🌤️ Good visibility - safe for driving and outdoor activities';
        if (current.visibility >= 2) return '🌫️ Reduced visibility - drive carefully, use headlights';
        return '⚠️ Poor visibility - avoid unnecessary travel, use extreme caution';
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
            <Text style={[styles.tipTitle, { color: colors.text }]}>💡 Tip</Text>
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
                🌡️ Comfort Levels
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                • 30-50%: Optimal for comfort{'\n'}
                • 50-70%: Still comfortable{'\n'}
                • Above 70%: May feel muggy{'\n'}
                • Below 30%: May feel dry
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
                📊 Pressure Trends
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