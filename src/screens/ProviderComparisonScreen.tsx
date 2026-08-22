import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings, WeatherProvider } from '../contexts/SettingsContext';
import { WeatherServiceFactory } from '../services/WeatherServiceFactory';
import { WeatherData } from '../services/types';
import { WeatherIcon } from '../components/WeatherIcon';
import { formatTemperature } from '../utils/temperatureUtils';

interface ProviderComparisonScreenProps {
  latitude: number;
  longitude: number;
  locationName: string;
  onClose: () => void;
}

interface ProviderRow {
  key: WeatherProvider;
  label: string;
  state: 'loading' | 'ok' | 'error';
  data?: WeatherData;
}

const PROVIDERS: { key: WeatherProvider; label: string }[] = [
  { key: 'weatherapi', label: 'WeatherAPI' },
  { key: 'openweathermap', label: 'OpenWeatherMap' },
  { key: 'visualcrossing', label: 'Visual Crossing' },
  { key: 'openmeteo', label: 'Open-Meteo' },
  { key: 'qweather', label: 'QWeather' },
  { key: 'meteostat', label: 'Meteostat' },
];

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

export const ProviderComparisonScreen: React.FC<ProviderComparisonScreenProps> = ({
  latitude,
  longitude,
  locationName,
  onClose,
}) => {
  const { colors } = useTheme();
  const { t, ln } = useLanguage();
  const { settings, updateSetting } = useSettings();
  const [rows, setRows] = useState<ProviderRow[]>(
    PROVIDERS.map((p) => ({ ...p, state: 'loading' as const }))
  );

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;

    const serviceFor = (key: WeatherProvider) => {
      switch (key) {
        case 'weatherapi': return WeatherServiceFactory.getWeatherAPIService(settings.weatherApiKey || undefined);
        case 'openweathermap': return WeatherServiceFactory.getOpenWeatherMapService(settings.openWeatherMapApiKey || undefined);
        case 'visualcrossing': return WeatherServiceFactory.getVisualCrossingService(settings.visualCrossingApiKey || undefined);
        case 'openmeteo': return WeatherServiceFactory.getOpenMeteoService();
        case 'qweather': return WeatherServiceFactory.getQWeatherService(settings.qweatherApiKey || undefined);
        case 'meteostat': return WeatherServiceFactory.getMeteostatService(settings.meteostatApiKey || undefined);
      }
    };

    PROVIDERS.forEach(async ({ key }) => {
      try {
        const data = await withTimeout(serviceFor(key).getForecast(latitude, longitude), 15000);
        if (!cancelled) {
          setRows((prev) => prev.map((r) => (r.key === key ? { ...r, state: 'ok', data } : r)));
        }
      } catch {
        if (!cancelled) {
          setRows((prev) => prev.map((r) => (r.key === key ? { ...r, state: 'error' } : r)));
        }
      }
    });

    return () => { cancelled = true; };
  }, [latitude, longitude]);

  const selectProvider = async (key: WeatherProvider) => {
    await updateSetting('weatherProvider', key);
    onClose();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gradient[colors.gradient.length - 1] }]}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{t('compare.title')}</Text>
            <Text style={styles.headerSubtitle}>{locationName}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          <Text style={styles.hint}>{t('compare.hint')}</Text>
          {rows.map((row) => {
            const isActive = settings.weatherProvider === row.key;
            return (
              <TouchableOpacity
                key={row.key}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface },
                  isActive && { borderColor: colors.primary, borderWidth: 2 },
                ]}
                onPress={() => selectProvider(row.key)}
                disabled={row.state !== 'ok'}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.providerName, { color: colors.text }]}>{row.label}</Text>
                  {isActive && (
                    <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.activeBadgeText}>{t('compare.inUse')}</Text>
                    </View>
                  )}
                </View>

                {row.state === 'loading' && (
                  <View style={styles.cardBody}>
                    <ActivityIndicator color={colors.primary} />
                  </View>
                )}

                {row.state === 'error' && (
                  <View style={styles.cardBody}>
                    <MaterialCommunityIcons name="cloud-off-outline" size={22} color={colors.textSecondary} />
                    <Text style={[styles.errorText, { color: colors.textSecondary }]}>
                      {t('compare.unavailable')}
                    </Text>
                  </View>
                )}

                {row.state === 'ok' && row.data && (
                  <>
                    <View style={styles.mainRow}>
                      <WeatherIcon
                        code={row.data.current.conditionCode}
                        isNight={row.data.current.isNight}
                        size={34}
                      />
                      <Text style={[styles.temp, { color: colors.primary }]}>
                        {ln(formatTemperature(row.data.current.temperature, settings.temperatureUnit))}
                      </Text>
                      <Text style={[styles.condition, { color: colors.textSecondary }]} numberOfLines={1}>
                        {t('conditions.' + row.data.current.conditionCode)}
                      </Text>
                    </View>
                    <View style={styles.metricsRow}>
                      <Text style={[styles.metric, { color: colors.textSecondary }]}>
                        <MaterialCommunityIcons name="thermometer" size={13} /> {ln(formatTemperature(row.data.current.feelsLike, settings.temperatureUnit))}
                      </Text>
                      <Text style={[styles.metric, { color: colors.textSecondary }]}>
                        <MaterialCommunityIcons name="water-percent" size={14} /> {t('compare.humidityValue', { value: Math.round(row.data.current.humidity) })}
                      </Text>
                      <Text style={[styles.metric, { color: colors.textSecondary }]}>
                        <MaterialCommunityIcons name="weather-windy" size={13} /> {t('compare.windValue', { value: Math.round(row.data.current.windSpeed) })}
                      </Text>
                      <Text style={[styles.metric, { color: colors.textSecondary }]}>
                        <MaterialCommunityIcons name="lungs" size={13} />{' '}
                        {row.data.airQuality ? t('compare.aqiValue', { value: Math.round(row.data.airQuality.aqi) }) : '—'}
                      </Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  placeholder: { width: 44 },
  list: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 40 },
  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  providerName: { fontSize: 16, fontWeight: '600' },
  activeBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  errorText: { fontSize: 14 },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  temp: { fontSize: 26, fontWeight: 'bold' },
  condition: { fontSize: 14, flex: 1 },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 10,
  },
  metric: { fontSize: 13 },
});
