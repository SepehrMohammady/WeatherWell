import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../services/LocationSearchService';

interface FavoritesContextType {
  favorites: Location[];
  addToFavorites: (location: Location) => Promise<void>;
  removeFromFavorites: (locationId: string) => Promise<void>;
  isFavorite: (locationId: string) => boolean;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Location[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favoriteLocations');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: Location[]) => {
    try {
      await AsyncStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  };

  const generateLocationId = (location: Location): string => {
    return `${location.name}-${location.country}-${location.latitude}-${location.longitude}`;
  };

  const addToFavorites = async (location: Location) => {
    const locationId = generateLocationId(location);
    const locationWithId = { ...location, id: locationId };
    
    const newFavorites = [...favorites.filter(fav => generateLocationId(fav) !== locationId), locationWithId];
    await saveFavorites(newFavorites);
  };

  const removeFromFavorites = async (locationId: string) => {
    const newFavorites = favorites.filter(fav => generateLocationId(fav) !== locationId);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (locationId: string): boolean => {
    return favorites.some(fav => generateLocationId(fav) === locationId);
  };

  const clearFavorites = async () => {
    await saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};