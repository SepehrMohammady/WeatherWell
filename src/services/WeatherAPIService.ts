import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

export class WeatherAPIService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://api.weatherapi.com/v1';
  private readonly fallbackApiKey = '725bd54f9a1b458884f85421252509'; // Demo key

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.fallbackApiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/current.json`, {
        params: {
          key: this.apiKey,
          q: `${lat},${lon}`,
          aqi: 'yes'
        }
      });

      return this.transformCurrentWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather data');
    }
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: `${lat},${lon}`,
          days: Math.min(days, 10),
          aqi: 'yes',
          alerts: 'yes'
        }
      });

      return this.transformForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/search.json`, {
        params: {
          key: this.apiKey,
          q: query
        }
      });

      return response.data.map((location: any) => ({
        name: location.name,
        country: location.country,
        region: location.region,
        lat: location.lat,
        lon: location.lon
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      throw new Error('Failed to search locations');
    }
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/history.json`, {
        params: {
          key: this.apiKey,
          q: `${lat},${lon}`,
          dt: date
        }
      });

      return this.transformHistoricalData(response.data);
    } catch (error) {
      console.error('Error fetching historical weather:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    return this.apiKey !== '' && this.apiKey.length > 10;
  }

  getApiSource(): string {
    return this.apiKey === this.fallbackApiKey ? 'WeatherAPI' : 'WeatherAPI (Custom)';
  }

  private transformCurrentWeatherData(data: any): WeatherData {
    return {
      location: {
        name: data.location.name,
        country: data.location.country,
        region: data.location.region,
        lat: data.location.lat,
        lon: data.location.lon
      },
      current: {
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windDirection: data.current.wind_dir,
        pressure: data.current.pressure_mb,
        uvIndex: data.current.uv,
        visibility: data.current.vis_km,
        feelsLike: data.current.feelslike_c
      },
      forecast: {
        daily: [],
        hourly: []
      },
      astronomy: {
        sunrise: '',
        sunset: '',
        moonPhase: '',
        moonIllumination: 0
      },
      airQuality: data.current.air_quality ? {
        // Calculate real AQI from PM2.5 using EPA breakpoints
        // EPA AQI breakpoints for PM2.5: 0-12=0-50, 12.1-35.4=51-100, 35.5-55.4=101-150, etc.
        aqi: this.calculateAQIFromPM25(data.current.air_quality.pm2_5),
        co: data.current.air_quality.co,
        no2: data.current.air_quality.no2,
        o3: data.current.air_quality.o3,
        so2: data.current.air_quality.so2,
        pm2_5: data.current.air_quality.pm2_5,
        pm10: data.current.air_quality.pm_10
      } : undefined
    };
  }

  /**
   * Calculate AQI from PM2.5 concentration using EPA breakpoints
   */
  private calculateAQIFromPM25(pm25: number): number {
    if (pm25 === null || pm25 === undefined) return 0;
    
    // EPA AQI breakpoints for PM2.5 (24-hour average)
    const breakpoints = [
      { cLow: 0, cHigh: 12.0, iLow: 0, iHigh: 50 },
      { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
      { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
      { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
      { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
      { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
      { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
    ];

    for (const bp of breakpoints) {
      if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
        // Linear interpolation formula: I = ((Ihigh - Ilow) / (Chigh - Clow)) * (C - Clow) + Ilow
        const aqi = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow;
        return Math.round(aqi);
      }
    }

    // If PM2.5 is above the highest breakpoint
    if (pm25 > 500.4) return 500;
    return 0;
  }

  private transformForecastData(data: any): WeatherData {
    const dailyForecast: DailyForecast[] = data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
      humidity: day.day.avghumidity,
      windSpeed: day.day.maxwind_kph,
      uvIndex: day.day.uv,
      precipitationChance: day.day.daily_chance_of_rain,
      precipitationMm: day.day.totalprecip_mm,
      astronomy: {
        sunrise: day.astro?.sunrise || '',
        sunset: day.astro?.sunset || '',
        moonPhase: day.astro?.moon_phase || '',
        moonIllumination: day.astro?.moon_illumination ? parseFloat(day.astro.moon_illumination) / 100 : 0
      }
    }));

    const hourlyForecast: HourlyForecast[] = data.forecast.forecastday
      .flatMap((day: any) => day.hour)
      .slice(0, 24)
      .map((hour: any) => ({
        time: hour.time,
        temperature: hour.temp_c,
        condition: hour.condition.text,
        icon: hour.condition.icon,
        humidity: hour.humidity,
        windSpeed: hour.wind_kph,
        precipitationChance: hour.chance_of_rain,
        precipitationMm: hour.precip_mm,
        uvIndex: hour.uv || 0,
        pressure: hour.pressure_mb || 1013,
        visibility: hour.vis_km || 10
      }));

    const currentDay = data.forecast.forecastday[0];
    
    return {
      location: this.transformCurrentWeatherData(data).location,
      current: this.transformCurrentWeatherData(data).current,
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: currentDay.astro.sunrise,
        sunset: currentDay.astro.sunset,
        moonPhase: currentDay.astro.moon_phase,
        moonIllumination: parseFloat(currentDay.astro.moon_illumination) / 100
      },
      airQuality: this.transformCurrentWeatherData(data).airQuality
    };
  }

  private transformHistoricalData(data: any): WeatherData {
    const currentWeather = this.transformCurrentWeatherData(data);
    const historicalDay = data.forecast.forecastday[0];
    
    return {
      ...currentWeather,
      current: {
        temperature: historicalDay.day.avgtemp_c,
        condition: historicalDay.day.condition.text,
        icon: historicalDay.day.condition.icon,
        humidity: historicalDay.day.avghumidity,
        windSpeed: historicalDay.day.maxwind_kph,
        windDirection: '',
        pressure: 1013, // Default value as historical data might not have pressure
        uvIndex: historicalDay.day.uv,
        visibility: historicalDay.day.avgvis_km,
        feelsLike: historicalDay.day.avgtemp_c
      },
      astronomy: {
        sunrise: historicalDay.astro.sunrise,
        sunset: historicalDay.astro.sunset,
        moonPhase: historicalDay.astro.moon_phase,
        moonIllumination: parseFloat(historicalDay.astro.moon_illumination) / 100
      }
    };
  }
}