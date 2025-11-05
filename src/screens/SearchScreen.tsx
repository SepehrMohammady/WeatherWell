import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { LocationSearchService, Location } from '../services/LocationSearchService';

interface SearchScreenProps {
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onClose, onLocationSelect }) => {
  const { colors } = useTheme();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [recentSearches, setRecentSearches] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const searchService = LocationSearchService.getInstance();

  useEffect(() => {
    // Load recent searches on component mount
    setRecentSearches(searchService.getRecentSearches());
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchQuery.trim().length >= 2) {
      // Set new timeout for search
      const timeout = setTimeout(() => {
        performSearch(searchQuery);
      }, 500); // 500ms delay for debouncing
      
      setSearchTimeout(timeout);
    } else {
      setSearchResults([]);
      setLoading(false);
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    if (query.trim().length < 2) return;

    setLoading(true);
    try {
      const results = await searchService.searchLocations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Don't show alert for search errors, just show empty results
      // The service will fallback to local search automatically
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    // Add to recent searches
    searchService.addToRecentSearches(location);
    setRecentSearches(searchService.getRecentSearches());
    
    // Call the callback
    onLocationSelect(location);
    onClose();
  };

  const clearRecentSearches = () => {
    Alert.alert(
      'Clear Recent Searches',
      'Are you sure you want to clear all recent searches?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            searchService.clearRecentSearches();
            setRecentSearches([]);
          }
        }
      ]
    );
  };

  const generateLocationId = (location: Location): string => {
    return `${location.name}-${location.country}-${location.latitude}-${location.longitude}`;
  };

  const handleToggleFavorite = async (location: Location, event: any) => {
    event.stopPropagation(); // Prevent location selection when tapping favorite
    const locationId = generateLocationId(location);
    
    try {
      if (isFavorite(locationId)) {
        await removeFromFavorites(locationId);
      } else {
        await addToFavorites(location);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderLocationItem = ({ item }: { item: Location }) => {
    const locationId = generateLocationId(item);
    const isItemFavorite = isFavorite(locationId);
    
    return (
      <TouchableOpacity
        style={[styles.locationItem, { backgroundColor: colors.surface }]}
        onPress={() => handleLocationSelect(item)}
      >
        <View style={styles.locationInfo}>
          <View style={styles.locationIcon}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.locationDetails}>
            <Text style={[styles.locationName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.locationSubtext, { color: colors.textSecondary }]}>
              {item.region ? `${item.region}, ${item.country}` : item.country}
            </Text>
          </View>
        </View>
        <View style={styles.locationActions}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => handleToggleFavorite(item, e)}
          >
            <Ionicons 
              name={isItemFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isItemFavorite ? colors.error : colors.textSecondary} 
            />
          </TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Searching locations...
          </Text>
        </View>
      );
    }

    if (searchQuery.trim().length >= 2 && searchResults.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No locations found for "{searchQuery}"
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Try a different search term
          </Text>
        </View>
      );
    }

    return null;
  };

  const displayData = searchQuery.trim().length >= 2 ? searchResults : [];
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Location</Text>
          <View style={styles.placeholder} />
        </View>

        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search for a city or location..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => {
              if (searchQuery.trim().length >= 2) {
                performSearch(searchQuery);
              }
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {/* Favorites Section */}
        {searchQuery.trim().length < 2 && favorites.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Favorite Places
              </Text>
            </View>
            <FlatList
              data={favorites}
              renderItem={renderLocationItem}
              keyExtractor={(item) => generateLocationId(item)}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Recent Searches Section */}
        {searchQuery.trim().length < 2 && recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Searches
              </Text>
              <TouchableOpacity onPress={clearRecentSearches}>
                <Text style={[styles.clearText, { color: colors.primary }]}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentSearches}
              keyExtractor={(item) => item.id}
              renderItem={renderLocationItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Search Results or Recent Searches */}
        {searchQuery.trim().length >= 2 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Search Results
            </Text>
            {displayData.length > 0 ? (
              <>
                {/* Show notice if we might be using fallback data */}
                {displayData.length <= 10 && searchQuery.trim().length >= 2 && (
                  <Text style={[styles.fallbackNotice, { color: colors.textSecondary }]}>
                    Popular cities matching your search
                  </Text>
                )}
                <FlatList
                  data={displayData}
                  keyExtractor={(item) => item.id}
                  renderItem={renderLocationItem}
                  showsVerticalScrollIndicator={false}
                />
              </>
            ) : (
              renderEmptyState()
            )}
          </View>
        )}

        {/* Initial State */}
        {searchQuery.trim().length < 2 && recentSearches.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="earth-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Search for any location
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Start typing to find cities worldwide
            </Text>
          </View>
        )}
        </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(116, 185, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 14,
  },
  locationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  fallbackNotice: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
});