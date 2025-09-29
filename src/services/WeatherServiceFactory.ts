import { WeatherAPIService } from './WeatherAPIService';
import { OpenWeatherMapService } from './OpenWeatherMapService';
import { VisualCrossingService } from './VisualCrossingService';
import { WeatherService } from './types';
import { WeatherProvider } from '../contexts/SettingsContext';

export class WeatherServiceFactory {
  private static weatherApiService: WeatherAPIService;
  private static openWeatherMapService: OpenWeatherMapService;
  private static visualCrossingService: VisualCrossingService;

  static getWeatherAPIService(apiKey?: string): WeatherAPIService {
    // Always create new instance with current API key
    return new WeatherAPIService(apiKey);
  }

  static getOpenWeatherMapService(apiKey?: string): OpenWeatherMapService {
    // Always create new instance with current API key
    return new OpenWeatherMapService(apiKey);
  }

  static getVisualCrossingService(apiKey?: string): VisualCrossingService {
    // Always create new instance with current API key
    return new VisualCrossingService(apiKey);
  }

  static getServiceByProvider(provider: WeatherProvider, weatherApiKey?: string, openWeatherMapApiKey?: string, visualCrossingApiKey?: string): WeatherService {
    if (provider === 'weatherapi') {
      const service = this.getWeatherAPIService(weatherApiKey);
      if (service.isAvailable()) {
        return service;
      }
    } else if (provider === 'openweathermap') {
      const service = this.getOpenWeatherMapService(openWeatherMapApiKey);
      if (service.isAvailable()) {
        return service;
      }
    } else if (provider === 'visualcrossing') {
      const service = this.getVisualCrossingService(visualCrossingApiKey);
      if (service.isAvailable()) {
        return service;
      }
    }
    
    // Fallback to any available service with demo keys
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

    const visualCrossingService = this.getVisualCrossingService();
    if (visualCrossingService.isAvailable()) {
      return visualCrossingService;
    }

    throw new Error('No weather service is available');
  }

  static getSecondaryService(): WeatherService {
    const openWeatherMapService = this.getOpenWeatherMapService();
    if (openWeatherMapService.isAvailable()) {
      return openWeatherMapService;
    }
    
    const visualCrossingService = this.getVisualCrossingService();
    if (visualCrossingService.isAvailable()) {
      return visualCrossingService;
    }
    
    const weatherApiService = this.getWeatherAPIService();
    if (weatherApiService.isAvailable()) {
      return weatherApiService;
    }

    throw new Error('No secondary weather service is available');
  }

  static async getWeatherWithFallback(
    lat: number, 
    lon: number, 
    preferredProvider?: WeatherProvider,
    weatherApiKey?: string,
    openWeatherMapApiKey?: string,
    visualCrossingApiKey?: string
  ): Promise<{ data: any; source: string }> {
    try {
      // Use preferred provider if specified, otherwise use default primary service
      let primaryService: WeatherService;
      if (preferredProvider) {
        primaryService = this.getServiceByProvider(preferredProvider, weatherApiKey, openWeatherMapApiKey, visualCrossingApiKey);
      } else {
        primaryService = this.getPrimaryService();
      }
      
      const data = await primaryService.getForecast(lat, lon);
      return {
        data,
        source: primaryService.getApiSource()
      };
    } catch (error) {
      console.warn('Primary weather service failed, trying secondary:', error);
      try {
        const secondaryService = this.getSecondaryService();
        const data = await secondaryService.getForecast(lat, lon);
        return {
          data,
          source: secondaryService.getApiSource() + ' (Fallback)'
        };
      } catch (fallbackError) {
        console.error('Both weather services failed:', fallbackError);
        throw new Error('All weather services are unavailable');
      }
    }
  }
}