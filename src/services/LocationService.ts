import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationError {
  code: string;
  message: string;
}

export class LocationService {
  private static instance: LocationService;
  private permissionGranted: boolean = false;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      this.permissionGranted = status === 'granted';
      return this.permissionGranted;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationCoords> {
    if (!this.permissionGranted) {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 1000,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      throw new Error('Failed to get current location');
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length > 0) {
        const location = result[0];
        const parts = [];
        
        if (location.city) parts.push(location.city);
        if (location.region) parts.push(location.region);
        if (location.country) parts.push(location.country);
        
        return parts.join(', ') || 'Unknown Location';
      }
      
      return 'Unknown Location';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Unknown Location';
    }
  }

  async watchPosition(
    callback: (coords: LocationCoords) => void,
    errorCallback?: (error: LocationError) => void
  ): Promise<Location.LocationSubscription | null> {
    if (!this.permissionGranted) {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        errorCallback?.({ code: 'PERMISSION_DENIED', message: 'Location permission denied' });
        return null;
      }
    }

    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 30000,
          distanceInterval: 100,
        },
        (location) => {
          callback({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return subscription;
    } catch (error) {
      console.error('Error watching position:', error);
      errorCallback?.({ code: 'WATCH_ERROR', message: 'Failed to watch position' });
      return null;
    }
  }

  hasPermission(): boolean {
    return this.permissionGranted;
  }
}