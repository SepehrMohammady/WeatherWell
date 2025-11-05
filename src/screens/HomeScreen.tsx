import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  RefreshControl, 
  Alert,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
  const { settings } = useSettings();
  const { addToFavorites, removeFromFavorites, isFavorite, favorites } = useFavorites();
  const { checkWeatherAlerts, sendWeatherUpdate, isInitialized } = useNotifications();
  const locationService = LocationService.getInstance();

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
      
      // Fetch weather data using preferred provider from settings
      const result = await WeatherServiceFactory.getWeatherWithFallback(
        latitude, 
        longitude,
        settings.weatherProvider,
        settings.weatherApiKey || undefined,
        settings.openWeatherMapApiKey || undefined,
        settings.visualCrossingApiKey || undefined
      );
      
      setWeatherData(result.data);
      setApiSource(result.source);
      console.log('Using weather source:', result.source);
      
      // Check for weather alerts and send notifications after loading data
      if (isInitialized && settings.enableNotifications) {
        await checkWeatherAlerts(result.data);
        
        // Send immediate weather notifications with real data
        // This gives users current weather info instead of generic messages
        if (settings.enableDailyForecast) {
          await sendWeatherUpdate(result.data, 'daily');
        }
        if (settings.enableHourlyForecast) {
          await sendWeatherUpdate(result.data, 'hourly');
        }
      }
    } catch (err) {
      console.error('Error loading weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

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

  const handleBackToCurrentLocation = () => {
    setSelectedLocation(null);
    setLoading(true);
    loadWeatherData();
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

  const handleUmbrellaAlert = () => {
    if (weatherData) {
      const precipChance = weatherData.forecast.daily[0]?.precipitationChance || 0;
      Alert.alert(
        '☂️ Umbrella Alert',
        `There's a ${precipChance}% chance of rain today. ${
          precipChance > 70 ? 'Definitely bring an umbrella!' :
          precipChance > 30 ? 'Consider bringing an umbrella.' :
          'You probably won\'t need an umbrella.'
        }`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleClothingSuggestion = () => {
    if (weatherData) {
      const temp = weatherData.current.temperature;
      let suggestion = '';
      
      if (temp < 5) {
        suggestion = 'It\'s very cold! Wear a heavy winter coat, scarf, and gloves.';
      } else if (temp < 15) {
        suggestion = 'It\'s quite cool. A jacket or warm sweater would be perfect.';
      } else if (temp < 25) {
        suggestion = 'Pleasant temperature. A light sweater or long sleeves should be comfortable.';
      } else {
        suggestion = 'It\'s warm! T-shirt or light clothing will be perfect.';
      }

      Alert.alert(
        '👕 Clothing Suggestion',
        `Current temperature: ${Math.round(temp)}°C (feels like ${Math.round(weatherData.current.feelsLike)}°C)\n\n${suggestion}`,
        [{ text: 'OK' }]
      );
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
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
    <>
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
                </View>
                {selectedLocation && (
                  <TouchableOpacity onPress={handleBackToCurrentLocation} style={styles.currentLocationButton}>
                    <Text style={styles.currentLocationText}>Use Current Location</Text>
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
          <SmartFeaturesCard 
            weatherData={weatherData}
            onUmbrellaAlert={handleUmbrellaAlert}
            onClothingSuggestion={handleClothingSuggestion}
          />
          
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
    </>
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
  locationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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