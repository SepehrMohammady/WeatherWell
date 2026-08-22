import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrentWeatherCard } from '../components/CurrentWeatherCard';
import { HourlyForecastList } from '../components/HourlyForecastList';
import { DailyForecastList } from '../components/DailyForecastList';
import { SmartFeaturesCard } from '../components/SmartFeaturesCard';
import { WeatherAnimation } from '../components/WeatherAnimation';
import { TutorialModal } from '../components/TutorialModal';
import { ShareComponent } from '../components/ShareComponent';
import { SettingsScreen } from './SettingsScreen';
import { SearchScreen } from './SearchScreen';
import { ProviderComparisonScreen } from './ProviderComparisonScreen';
import { WeatherServiceFactory } from '../services/WeatherServiceFactory';
import { LocationService } from '../services/LocationService';
import { Location } from '../services/LocationSearchService';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotifications } from '../contexts/NotificationContext';
import { backgroundTaskService } from '../services/BackgroundTaskService';
import { updateWidgetWithWeatherData, fetchAndCacheWidgetData, refreshWidgetSettings } from '../widgets/widget-utils';
import { notificationService } from '../services/NotificationService';

export const HomeScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [apiSource, setApiSource] = useState<string>('');
  const [showTutorial, setShowTutorial] = useState(false);

  // First-run tutorial: show once, then only on demand from Settings
  useEffect(() => {
    AsyncStorage.getItem('tutorial_seen')
      .then((seen) => {
        if (!seen) setShowTutorial(true);
      })
      .catch(() => {});
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
    AsyncStorage.setItem('tutorial_seen', '1').catch(() => {});
  };

  const { colors } = useTheme();
  const { t, ln } = useLanguage();
  const { settings, isLoaded: settingsLoaded, updateSetting } = useSettings();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { checkWeatherAlerts, isInitialized } = useNotifications();
  const locationService = LocationService.getInstance();

  // Register background task on mount
  useEffect(() => {
    const initBackgroundTask = async () => {
      if (settings.enableNotifications) {
        await backgroundTaskService.registerBackgroundTask(settings.refreshInterval);
      }
    };
    initBackgroundTask();
  }, [settings.enableNotifications, settings.refreshInterval]);

  const loadWeatherData = async (customLocation?: Location) => {
    try {
      setError(null);
      
      let latitude: number, longitude: number;
      
      if (customLocation) {
        // Use selected location
        latitude = customLocation.latitude;
        longitude = customLocation.longitude;
      } else {
        // Request location permission
        const hasPermission = await locationService.requestPermission();
        if (!hasPermission) {
          setError(t('home.locationPermissionRequired'));
          setLoading(false);
          return;
        }

        // Get current location
        const location = await locationService.getCurrentLocation();
        latitude = location.latitude;
        longitude = location.longitude;
      }
      
      // The widget and background alerts follow the device location or the
      // PINNED location only — browsing another city must not hijack them.
      const isHome = !!customLocation && !!settings.homeLocation &&
        settings.homeLocation.latitude === customLocation.latitude &&
        settings.homeLocation.longitude === customLocation.longitude;
      // The main location is the pinned one, or the device location when
      // nothing is pinned. Browsing any other city is transient.
      const isMainLocation = !customLocation || isHome;
      if (isMainLocation) {
        await backgroundTaskService.saveLocationForBackground(
          latitude,
          longitude,
          customLocation?.name,
          isHome
        );
      }
      
      // Fetch weather data using preferred provider from settings
      const result = await WeatherServiceFactory.getWeatherWithFallback(
        latitude, 
        longitude,
        settings.weatherProvider,
        settings.weatherApiKey || undefined,
        settings.openWeatherMapApiKey || undefined,
        settings.visualCrossingApiKey || undefined,
        settings.qweatherApiKey || undefined,
        settings.meteostatApiKey || undefined,
        settings.customSources
      );
      
      // Show the name the user actually picked — providers often return the
      // nearest station district (e.g. "Lambeth" for London) instead
      if (customLocation) {
        result.data.location.name = customLocation.name;
        if (customLocation.country) {
          result.data.location.country = customLocation.country;
        }
      }

      setWeatherData(result.data);
      setApiSource(result.source);
      console.log('Using weather source:', result.source);

      // Only the main location drives the widget, the cached payload that
      // notifications read, and the alerts themselves.
      if (isMainLocation) {
        await AsyncStorage.setItem('weatherwell_last_weather', JSON.stringify(result.data)).catch(() => {});
        await updateWidgetWithWeatherData(result.data);

        // Schedule notifications with real weather data for configured times
        if (settings.enableNotifications) {
          await notificationService.scheduleDailyForecastWithData(result.data);
          await notificationService.scheduleHourlyForecastWithData(result.data);
        }

        // Check for weather alerts when app is opened
        // Background alerts are handled by BackgroundTaskService
        if (isInitialized && settings.enableNotifications) {
          await checkWeatherAlerts(result.data);
        }
      }
    } catch (err) {
      console.error('Error loading weather data:', err);
      setError(err instanceof Error ? err.message : t('home.failedToLoad'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load waits for persisted settings so a pinned home location wins
  // over the device's current location.
  const initialLoadDone = useRef(false);
  useEffect(() => {
    if (!settingsLoaded || initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (settings.homeLocation) {
      const home: Location = {
        id: `${settings.homeLocation.name}-${settings.homeLocation.country}-${settings.homeLocation.latitude}-${settings.homeLocation.longitude}`,
        region: '',
        ...settings.homeLocation,
      };
      setSelectedLocation(home);
      loadWeatherData(home);
    } else {
      loadWeatherData();
    }
  }, [settingsLoaded]);

  // Auto-refresh when weather provider changes
  useEffect(() => {
    if (weatherData) { // Only refresh if we already have data loaded
      loadWeatherData(selectedLocation || undefined);
    }
  }, [settings.weatherProvider]);

  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData(selectedLocation || undefined);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setLoading(true);
    loadWeatherData(location);
  };

  const handleBackToCurrentLocation = async () => {
    // Returning to the device location also clears any pinned home location
    if (settings.homeLocation) {
      await updateSetting('homeLocation', null);
    }
    setSelectedLocation(null);
    setLoading(true);
    loadWeatherData();
  };

  const isPinned = !!settings.homeLocation && !!selectedLocation &&
    settings.homeLocation.latitude === selectedLocation.latitude &&
    settings.homeLocation.longitude === selectedLocation.longitude;

  const handleTogglePin = async () => {
    if (!selectedLocation) return;
    if (isPinned) {
      await updateSetting('homeLocation', null);
      // Hand the widget and background alerts back to the device location
      try {
        const gps = await locationService.getCurrentLocation();
        await backgroundTaskService.saveLocationForBackground(gps.latitude, gps.longitude);
      } catch {
        // No fix available right now; the next current-location fetch will save it
      }
    } else {
      await updateSetting('homeLocation', {
        name: selectedLocation.name,
        country: selectedLocation.country,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
      await backgroundTaskService.saveLocationForBackground(
        selectedLocation.latitude, selectedLocation.longitude, selectedLocation.name, true);
    }

    // Point the widget at whatever is now the main location, without
    // waiting for its next scheduled refresh.
    try {
      await fetchAndCacheWidgetData();
      await refreshWidgetSettings();
    } catch {
      // Widget may not be placed on the home screen; nothing to update
    }
  };

  const handleToggleFavorite = async () => {
    if (selectedLocation) {
      const locationId = `${selectedLocation.name}-${selectedLocation.country}-${selectedLocation.latitude}-${selectedLocation.longitude}`;
      if (isFavorite(locationId)) {
        await removeFromFavorites(locationId);
      } else {
        await addToFavorites(selectedLocation);
      }
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Image 
            source={require('../../assets/splash-icon.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.loadingText}>{t('home.loadingTitle')}</Text>
          <Text style={styles.loadingSubtext}>{t('home.loadingSubtext')}</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{t('home.errorTitle')}</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              setLoading(true);
              loadWeatherData(selectedLocation || undefined);
            }}
          >
            <Text style={styles.retryButtonText}>{t('home.tryAgain')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  if (!weatherData) {
    return (
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{t('home.noWeatherData')}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              setLoading(true);
              loadWeatherData(selectedLocation || undefined);
            }}
          >
            <Text style={styles.retryButtonText}>{t('home.retry')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const locationName = selectedLocation
    ? t('home.locationFormat', { name: selectedLocation.name, country: selectedLocation.country })
    : weatherData?.location.name || t('home.currentLocation');

  const selectedLocationId = selectedLocation
    ? [selectedLocation.name, selectedLocation.country, selectedLocation.latitude, selectedLocation.longitude].join('-')
    : null;

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        {weatherData && (
          <WeatherAnimation
            code={weatherData.current.conditionCode}
            enabled={settings.enableWeatherAnimations}
          />
        )}

        {/* Header: title row, then the location row underneath */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowSearch(true)}
            >
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.appTitle}>WeatherWell</Text>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowSettings(true)}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerLocationRow}>
            {selectedLocation && (
              <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                <Ionicons
                  name={selectedLocationId && isFavorite(selectedLocationId) ? "heart" : "heart-outline"}
                  size={18}
                  color="rgba(255, 255, 255, 0.9)"
                />
              </TouchableOpacity>
            )}

            <Text style={styles.locationText} numberOfLines={1}>{locationName}</Text>

            {selectedLocation && (
              <TouchableOpacity
                onPress={handleTogglePin}
                style={[styles.pinChip, isPinned && styles.pinChipActive]}
              >
                <Ionicons
                  name={isPinned ? "pin" : "pin-outline"}
                  size={14}
                  color={isPinned ? "#3D2E22" : "#FFFFFF"}
                />
                <Text style={[styles.pinChipText, isPinned && styles.pinChipTextActive]}>
                  {isPinned ? t('home.pinned') : t('home.pinAsMain')}
                </Text>
              </TouchableOpacity>
            )}

            {selectedLocation && (
              <TouchableOpacity onPress={handleBackToCurrentLocation} style={styles.currentLocationChip}>
                <Ionicons name="location-outline" size={14} color="#FFFFFF" />
                <Text style={styles.currentLocationText}>{t('home.useCurrentLocation')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
              colors={['#ffffff']}
            />
          }
        >
          <CurrentWeatherCard weatherData={weatherData} apiSource={apiSource} onCompare={() => setShowCompare(true)} />
          <HourlyForecastList hourlyData={weatherData.forecast.hourly} />
          <DailyForecastList dailyData={weatherData.forecast.daily} />
          <SmartFeaturesCard weatherData={weatherData} />
          
          {/* Share Component */}
          <View style={styles.shareContainer}>
            <ShareComponent 
              weatherData={weatherData} 
              locationName={locationName}
            />
          </View>
          
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
      
      {/* Settings Screen - Full Screen */}
      {showSettings && (
        <View style={StyleSheet.absoluteFillObject}>
          <SettingsScreen onClose={() => setShowSettings(false)} />
        </View>
      )}
      
      {/* Search Screen - Full Screen */}
      {showSearch && (
        <View style={StyleSheet.absoluteFillObject}>
          <SearchScreen
            onClose={() => setShowSearch(false)}
            onLocationSelect={handleLocationSelect}
          />
        </View>
      )}

      {/* Provider Comparison - Full Screen */}
      {showCompare && weatherData && (
        <View style={StyleSheet.absoluteFillObject}>
          <ProviderComparisonScreen
            latitude={weatherData.location.lat}
            longitude={weatherData.location.lon}
            locationName={locationName}
            onClose={() => setShowCompare(false)}
          />
        </View>
      )}

      <TutorialModal visible={showTutorial} onClose={closeTutorial} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  // Second header line: favourite · location · pin · back-to-current
  headerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.92)',
    maxWidth: '55%',
  },
  pinChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  pinChipActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  pinChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pinChipTextActive: {
    color: '#3D2E22',
  },
  favoriteButton: {
    padding: 2,
  },
  currentLocationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  currentLocationText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'underline',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  shareContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});