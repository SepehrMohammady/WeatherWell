import { WeatherAPIService } from './WeatherAPIService';
import { OpenWeatherMapService } from './OpenWeatherMapService';
import { VisualCrossingService } from './VisualCrossingService';
import { OpenMeteoService } from './OpenMeteoService';
import { QWeatherService } from './QWeatherService';
import { MeteostatService } from './MeteostatService';
import { WeatherService, WeatherData } from './types';
import { WeatherProvider, WeatherSource, CustomSourceConfig } from '../contexts/SettingsContext';

export class WeatherServiceFactory {
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

  static getOpenMeteoService(): OpenMeteoService {
    // Always create new instance (no API key required)
    return new OpenMeteoService();
  }

  static getQWeatherService(apiKey?: string): QWeatherService {
    // Always create new instance with current API key
    return new QWeatherService(apiKey);
  }

  static getMeteostatService(apiKey?: string): MeteostatService {
    // Always create new instance with current API key
    return new MeteostatService(apiKey);
  }

  static getServiceByProvider(provider: WeatherProvider, weatherApiKey?: string, openWeatherMapApiKey?: string, visualCrossingApiKey?: string, qweatherApiKey?: string, meteostatApiKey?: string): WeatherService {
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
    } else if (provider === 'openmeteo') {
      const service = this.getOpenMeteoService();
      if (service.isAvailable()) {
        return service;
      }
    } else if (provider === 'qweather') {
      const service = this.getQWeatherService(qweatherApiKey);
      if (service.isAvailable()) {
        return service;
      }
    } else if (provider === 'meteostat') {
      const service = this.getMeteostatService(meteostatApiKey);
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

  /**
   * Custom blend: fetch each distinct provider in the config once, take the
   * forecast provider's result as the base, and overwrite individual current
   * metrics with the provider the user picked for each of them.
   */
  static async getBlendedWeather(
    lat: number,
    lon: number,
    config: CustomSourceConfig,
    weatherApiKey?: string,
    openWeatherMapApiKey?: string,
    visualCrossingApiKey?: string,
    qweatherApiKey?: string,
    meteostatApiKey?: string
  ): Promise<{ data: WeatherData; source: string }> {
    const providers = Array.from(new Set(Object.values(config))) as WeatherProvider[];
    const results = await Promise.allSettled(
      providers.map((p) =>
        this.getServiceByProvider(p, weatherApiKey, openWeatherMapApiKey, visualCrossingApiKey, qweatherApiKey, meteostatApiKey).getForecast(lat, lon)
      )
    );

    const byProvider: Partial<Record<WeatherProvider, WeatherData>> = {};
    providers.forEach((p, i) => {
      const r = results[i];
      if (r.status === 'fulfilled') byProvider[p] = r.value;
    });

    const base = byProvider[config.forecast] ?? Object.values(byProvider)[0];
    if (!base) {
      throw new Error('All weather services are unavailable');
    }

    const data: WeatherData = JSON.parse(JSON.stringify(base));
    const pick = (p: WeatherProvider) => byProvider[p];

    const t = pick(config.temperature);
    if (t) {
      data.current.temperature = t.current.temperature;
      data.current.feelsLike = t.current.feelsLike;
    }
    const c = pick(config.condition);
    if (c) {
      data.current.condition = c.current.condition;
      data.current.conditionCode = c.current.conditionCode;
      data.current.isNight = c.current.isNight;
    }
    const h = pick(config.humidity);
    if (h) data.current.humidity = h.current.humidity;
    const w = pick(config.wind);
    if (w) {
      data.current.windSpeed = w.current.windSpeed;
      data.current.windDirection = w.current.windDirection;
    }
    const pr = pick(config.pressure);
    if (pr) data.current.pressure = pr.current.pressure;
    const uv = pick(config.uvIndex);
    if (uv) data.current.uvIndex = uv.current.uvIndex;
    const vis = pick(config.visibility);
    if (vis) data.current.visibility = vis.current.visibility;
    const aq = pick(config.airQuality);
    if (aq && aq.airQuality) data.airQuality = aq.airQuality;
    const astro = pick(config.astronomy);
    if (astro && astro.astronomy.sunrise) data.astronomy = astro.astronomy;

    return { data, source: 'Custom Blend' };
  }

  static async getWeatherWithFallback(
    lat: number,
    lon: number,
    preferredProvider?: WeatherSource,
    weatherApiKey?: string,
    openWeatherMapApiKey?: string,
    visualCrossingApiKey?: string,
    qweatherApiKey?: string,
    meteostatApiKey?: string,
    customSources?: CustomSourceConfig
  ): Promise<{ data: any; source: string }> {
    // Custom blend mode composes several providers; on total failure it falls
    // through to the ordinary fallback chain below.
    if (preferredProvider === 'custom' && customSources) {
      try {
        return await this.getBlendedWeather(lat, lon, customSources, weatherApiKey, openWeatherMapApiKey, visualCrossingApiKey, qweatherApiKey, meteostatApiKey);
      } catch (error) {
        console.warn('Custom blend failed, falling back to default chain:', error);
      }
    }

    try {
      // Use preferred provider if specified, otherwise use default primary service
      let primaryService: WeatherService;
      if (preferredProvider && preferredProvider !== 'custom') {
        primaryService = this.getServiceByProvider(preferredProvider, weatherApiKey, openWeatherMapApiKey, visualCrossingApiKey, qweatherApiKey, meteostatApiKey);
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