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
import { ShareComponent } from '../components/ShareComponent';
import { SettingsScreen } from './SettingsScreen';
import { SearchScreen } from './SearchScreen';
import { WeatherServiceFactory } from '../services/WeatherServiceFactory';
import { LocationService } from '../services/LocationService';
import { Location } from '../services/LocationSearchService';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotifications } from '../contexts/NotificationContext';
import { backgroundTaskService } from '../services/BackgroundTaskService';
import { updateWidgetWithWeatherData } from '../widgets/widget-utils';
import { notificationService } from '../services/NotificationService';

export const HomeScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [apiSource, setApiSource] = useState<string>('');

  const { colors } = useTheme();
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
          setError('Location permission is required to get weather data');
          setLoading(false);
          return;
        }

        // Get current location
        const location = await locationService.getCurrentLocation();
        latitude = location.latitude;
        longitude = location.longitude;
      }
      
      // Save location for the background task and widget refresh. A pinned
      // location keeps its name and never expires; device locations do.
      const isHome = !!customLocation && !!settings.homeLocation &&
        settings.homeLocation.latitude === customLocation.latitude &&
        settings.homeLocation.longitude === customLocation.longitude;
      await backgroundTaskService.saveLocationForBackground(
        latitude,
        longitude,
        customLocation?.name,
        isHome
      );
      
      // Fetch weather data using preferred provider from settings
      const result = await WeatherServiceFactory.getWeatherWithFallback(
        latitude, 
        longitude,
        settings.weatherProvider,
        settings.weatherApiKey || undefined,
        settings.openWeatherMapApiKey || undefined,
        settings.visualCrossingApiKey || undefined,
        settings.qweatherApiKey || undefined,
        settings.meteostatApiKey || undefined
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

      // Cache weather data for notifications to use
      await AsyncStorage.setItem('weatherwell_last_weather', JSON.stringify(result.data)).catch(() => {});

      // Update widget with fresh weather data
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
    } catch (err) {
      console.error('Error loading weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
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
      await backgroundTaskService.saveLocationForBackground(
        selectedLocation.latitude, selectedLocation.longitude, selectedLocation.name, false);
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
          <Text style={styles.loadingText}>Loading WeatherWell...</Text>
          <Text style={styles.loadingSubtext}>Getting your location and weather data</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>⚠️ Error</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              setLoading(true);
              loadWeatherData(selectedLocation || undefined);
            }}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
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
          <Text style={styles.errorText}>No weather data available</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              setLoading(true);
              loadWeatherData(selectedLocation || undefined);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const locationName = selectedLocation 
    ? `${selectedLocation.name}, ${selectedLocation.country}`
    : weatherData?.location.name || 'Current Location';

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Header with buttons */}
        <View style={styles.headerContainer}>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowSearch(true)}
            >
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.appTitle}>WeatherWell</Text>
              <View style={styles.locationContainer}>
                <View style={styles.locationWithFavorite}>
                  {selectedLocation && (
                    <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                      <Ionicons 
                        name={isFavorite(`${selectedLocation.name}-${selectedLocation.country}-${selectedLocation.latitude}-${selectedLocation.longitude}`) ? "heart" : "heart-outline"} 
                        size={16} 
                        color="rgba(255, 255, 255, 0.8)" 
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.locationText}>{locationName}</Text>
                  {selectedLocation && (
                    <TouchableOpacity onPress={handleTogglePin} style={styles.favoriteButton}>
                      <Ionicons
                        name={isPinned ? "pin" : "pin-outline"}
                        size={16}
                        color={isPinned ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {selectedLocation && (
                  <TouchableOpacity onPress={handleBackToCurrentLocation} style={styles.currentLocationButton}>
                    <Text style={styles.currentLocationText}>
                      {isPinned ? 'Pinned as main location — tap for current location' : 'Use Current Location'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowSettings(true)}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
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
          <CurrentWeatherCard weatherData={weatherData} apiSource={apiSource} />
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
  headerButtons: {
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationWithFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  favoriteButton: {
    marginRight: 6,
    padding: 2,
  },
  currentLocationButton: {
    paddingVertical: 2,
    paddingHorizontal: 4,
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