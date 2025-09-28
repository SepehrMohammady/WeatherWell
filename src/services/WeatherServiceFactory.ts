import { WeatherAPIService } from './WeatherAPIService';
import { OpenWeatherMapService } from './OpenWeatherMapService';
import { WeatherService } from './types';
import { WeatherProvider } from '../contexts/SettingsContext';

export class WeatherServiceFactory {
  private static weatherApiService: WeatherAPIService;
  private static openWeatherMapService: OpenWeatherMapService;

  static getWeatherAPIService(): WeatherAPIService {
    if (!this.weatherApiService) {
      this.weatherApiService = new WeatherAPIService();
    }
    return this.weatherApiService;
  }

  static getOpenWeatherMapService(): OpenWeatherMapService {
    if (!this.openWeatherMapService) {
      this.openWeatherMapService = new OpenWeatherMapService();
    }
    return this.openWeatherMapService;
  }

  static getServiceByProvider(provider: WeatherProvider): WeatherService {
    if (provider === 'weatherapi') {
      const service = this.getWeatherAPIService();
      if (service.isAvailable()) {
        return service;
      }
    } else if (provider === 'openweathermap') {
      const service = this.getOpenWeatherMapService();
      if (service.isAvailable()) {
        return service;
      }
    }
    
    // Fallback to any available service
    return this.getPrimaryService();
  }

  static getPrimaryService(): WeatherService {
    const weatherApiService = this.getWeatherAPIService();
    if (weatherApiService.isAvailable()) {
      return weatherApiService;
    }
    
    const openWeatherMapService = this.getOpenWeatherMapService();
    if (openWeatherMapService.isAvailable()) {
      return openWeatherMapService;
    }

    throw new Error('No weather service is available');
  }

  static getSecondaryService(): WeatherService {
    const openWeatherMapService = this.getOpenWeatherMapService();
    if (openWeatherMapService.isAvailable()) {
      return openWeatherMapService;
    }
    
    const weatherApiService = this.getWeatherAPIService();
    if (weatherApiService.isAvailable()) {
      return weatherApiService;
    }

    throw new Error('No secondary weather service is available');
  }

  static async getWeatherWithFallback(lat: number, lon: number, preferredProvider?: WeatherProvider): Promise<any> {
    try {
      // Use preferred provider if specified, otherwise use default primary service
      let primaryService: WeatherService;
      if (preferredProvider) {
        primaryService = this.getServiceByProvider(preferredProvider);
      } else {
        primaryService = this.getPrimaryService();
      }
      
      return await primaryService.getForecast(lat, lon);
    } catch (error) {
      console.warn('Primary weather service failed, trying secondary:', error);
      try {
        const secondaryService = this.getSecondaryService();
        return await secondaryService.getForecast(lat, lon);
      } catch (fallbackError) {
        console.error('Both weather services failed:', fallbackError);
        throw new Error('All weather services are unavailable');
      }
    }
  }
}