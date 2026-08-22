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
import { useLanguage } from '../contexts/LanguageContext';
import { WeatherData } from '../services/types';
import { RealCompass, localizeWindDirection } from './RealCompass';

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
  const { t, ln } = useLanguage();

  const getModalTitle = (): string => {
    switch (metricType) {
      case 'humidity':
        return t('detail.title.humidity');
      case 'wind':
        return t('detail.title.wind');
      case 'uv':
        return t('detail.title.uv');
      case 'pressure':
        return t('detail.title.pressure');
      case 'windDir':
        return t('detail.title.windDir');
      case 'visibility':
        return t('detail.title.visibility');
      case 'airquality':
        return t('detail.title.airquality');
      default:
        return t('detail.title.default');
    }
  };

  const getModalDescription = (): string => {
    switch (metricType) {
      case 'humidity':
        return t('detail.desc.humidity');
      case 'wind':
        return t('detail.desc.wind');
      case 'uv':
        return t('detail.desc.uv');
      case 'pressure':
        return t('detail.desc.pressure');
      case 'windDir':
        return t('detail.desc.windDir');
      case 'visibility':
        return t('detail.desc.visibility');
      case 'airquality':
        return t('detail.desc.airquality');
      default:
        return '';
    }
  };

  const getCurrentValue = (): string => {
    const current = weatherData.current;
    switch (metricType) {
      case 'humidity':
        return t('weather.percentValue', { value: current.humidity });
      case 'wind':
        return t('weather.kmhValue', { value: Math.round(current.windSpeed) });
      case 'uv':
        return ln(current.uvIndex);
      case 'pressure':
        return t('weather.hpaValue', { value: current.pressure });
      case 'windDir':
        return t('detail.windDirAt', {
          direction: localizeWindDirection(current.windDirection),
          speed: Math.round(current.windSpeed),
        });
      case 'visibility':
        return t('weather.kmValue', { value: current.visibility });
      case 'airquality':
        return t('weather.aqiValue', { value: weatherData.airQuality?.aqi || t('detail.na') });
      default:
        return '';
    }
  };

  const getHealthTip = (): string => {
    const current = weatherData.current;
    switch (metricType) {
      case 'humidity':
        if (current.humidity > 70) return t('detail.tip.humidityHigh');
        if (current.humidity < 30) return t('detail.tip.humidityLow');
        return t('detail.tip.humidityComfort');
      case 'wind':
        if (current.windSpeed > 30) return t('detail.tip.windStrong');
        if (current.windSpeed > 15) return t('detail.tip.windModerate');
        return t('detail.tip.windLight');
      case 'uv':
        if (current.uvIndex >= 8) return t('detail.tip.uvVeryHigh');
        if (current.uvIndex >= 6) return t('detail.tip.uvHigh');
        if (current.uvIndex >= 3) return t('detail.tip.uvModerate');
        return t('detail.tip.uvLow');
      case 'pressure':
        if (current.pressure > 1020) return t('detail.tip.pressureHigh');
        if (current.pressure < 1000) return t('detail.tip.pressureLow');
        return t('detail.tip.pressureNormal');
      case 'windDir':
        return t('detail.tip.windDir', { direction: localizeWindDirection(current.windDirection) });
      case 'visibility':
        if (current.visibility >= 10) return t('detail.tip.visibilityExcellent');
        if (current.visibility >= 5) return t('detail.tip.visibilityGood');
        if (current.visibility >= 2) return t('detail.tip.visibilityReduced');
        return t('detail.tip.visibilityPoor');
      case 'airquality':
        const aqi = weatherData.airQuality?.aqi || 0;
        if (aqi <= 50) return t('detail.tip.aqiGood');
        if (aqi <= 100) return t('detail.tip.aqiModerate');
        if (aqi <= 150) return t('detail.tip.aqiSensitive');
        if (aqi <= 200) return t('detail.tip.aqiUnhealthy');
        return t('detail.tip.aqiVeryUnhealthy');
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
              <Ionicons name="bulb-outline" size={16} color={colors.text} /> {t('detail.tipTitle')}
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
                {t('detail.insight.humidityTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                {t('detail.insight.humidityBody')}
              </Text>
            </View>
          )}

          {metricType === 'wind' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                {t('detail.insight.windTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                {t('detail.insight.windBody')}
              </Text>
            </View>
          )}

          {metricType === 'uv' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                {t('detail.insight.uvTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                {t('detail.insight.uvBody')}
              </Text>
            </View>
          )}

          {metricType === 'pressure' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                {t('detail.insight.pressureTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                {t('detail.insight.pressureBody')}
              </Text>
            </View>
          )}

          {metricType === 'visibility' && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                {t('detail.insight.visibilityTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                {t('detail.insight.visibilityBody')}
              </Text>
            </View>
          )}

          {metricType === 'airquality' && weatherData.airQuality && (
            <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.insightTitle, { color: colors.text }]}>
                {t('detail.insight.airTitle')}
              </Text>
              <Text style={[styles.insightText, { color: colors.text + 'CC' }]}>
                <Text style={{ fontWeight: 'bold' }}>{t('detail.air.currentAqi', { value: weatherData.airQuality.aqi })}</Text>{'\n\n'}
                {t('detail.air.pollutantValue', { name: 'PM2.5', value: Math.round(weatherData.airQuality.pm2_5) })}{'\n'}
                {t('detail.air.pollutantValue', { name: 'PM10', value: Math.round(weatherData.airQuality.pm10) })}{'\n'}
                {weatherData.airQuality.o3 && t('detail.air.pollutantValue', { name: 'O₃', value: Math.round(weatherData.airQuality.o3) }) + '\n'}
                {weatherData.airQuality.no2 && t('detail.air.pollutantValue', { name: 'NO₂', value: Math.round(weatherData.airQuality.no2) }) + '\n'}
                {weatherData.airQuality.so2 && t('detail.air.pollutantValue', { name: 'SO₂', value: Math.round(weatherData.airQuality.so2) }) + '\n'}
                {weatherData.airQuality.co && t('detail.air.pollutantValue', { name: 'CO', value: Math.round(weatherData.airQuality.co) }) + '\n'}
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>{t('detail.air.scaleTitle')}</Text>{'\n'}
                {t('detail.air.scaleBody')}
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