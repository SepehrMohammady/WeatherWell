import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

export class OpenMeteoService implements WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1';
  private readonly geocodingUrl = 'https://geocoding-api.open-meteo.com/v1';

  constructor() {
    // Open-Meteo is free and doesn't require an API key
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const forecast = await this.getForecast(lat, lon, 1);
    return forecast;
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m',
          hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m,uv_index,visibility',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max',
          timezone: 'auto',
          forecast_days: Math.min(days, 16)
        }
      });

      // Open-Meteo doesn't support reverse geocoding, so we'll use coordinates
      // The location name will be set by the caller if available
      return this.transformForecastData(response.data, null, lat, lon);
    } catch (error) {
      console.error('Error fetching forecast from Open-Meteo:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${this.geocodingUrl}/search`, {
        params: {
          name: query,
          count: 10,
          language: 'en',
          format: 'json'
        }
      });

      if (!response.data.results) {
        return [];
      }

      return response.data.results.map((location: any) => ({
        name: location.name,
        region: location.admin1 || '',
        country: location.country || '',
        latitude: location.latitude,
        longitude: location.longitude
      }));
    } catch (error) {
      console.error('Error searching locations from Open-Meteo:', error);
      return [];
    }
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          latitude: lat,
          longitude: lon,
          start_date: date,
          end_date: date,
          hourly: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
          timezone: 'auto'
        }
      });

      return this.transformForecastData(response.data, null, lat, lon);
    } catch (error) {
      console.error('Error fetching historical weather from Open-Meteo:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    return true; // Always available, no API key required
  }

  getApiSource(): string {
    return 'Open-Meteo';
  }

  private transformForecastData(data: any, locationData: any, lat: number, lon: number): WeatherData {
    const current = data.current || {};
    const hourly = data.hourly || {};
    const daily = data.daily || {};

    // Get location name
    // Open-Meteo doesn't provide reverse geocoding, so we use a simple format
    // The actual location name should be provided by the app when calling this service
    let locationName = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
    let country = '';
    let region = '';
    
    if (locationData && locationData.results && locationData.results.length > 0) {
      const loc = locationData.results[0];
      locationName = loc.name;
      country = loc.country || '';
      region = loc.admin1 || '';
    }

    // Transform hourly forecast
    const hourlyForecast: HourlyForecast[] = [];
    if (hourly.time) {
      for (let i = 0; i < Math.min(hourly.time.length, 24); i++) {
        hourlyForecast.push({
          time: hourly.time[i],
          temperature: hourly.temperature_2m?.[i] || 0,
          condition: this.getWeatherCondition(hourly.weather_code?.[i] || 0),
          icon: this.getWeatherIcon(hourly.weather_code?.[i] || 0),
          humidity: hourly.relative_humidity_2m?.[i] || 0,
          windSpeed: hourly.wind_speed_10m?.[i] || 0,
          precipitationChance: hourly.precipitation_probability?.[i] || 0,
          precipitationMm: hourly.precipitation?.[i] || 0,
          uvIndex: hourly.uv_index?.[i] || 0,
          pressure: hourly.pressure_msl?.[i] || 1013,
          visibility: (hourly.visibility?.[i] || 10000) / 1000
        });
      }
    }

    // Transform daily forecast
    const dailyForecast: DailyForecast[] = [];
    if (daily.time) {
      for (let i = 0; i < daily.time.length; i++) {
        dailyForecast.push({
          date: daily.time[i],
          maxTemp: daily.temperature_2m_max?.[i] || 0,
          minTemp: daily.temperature_2m_min?.[i] || 0,
          condition: this.getWeatherCondition(daily.weather_code?.[i] || 0),
          icon: this.getWeatherIcon(daily.weather_code?.[i] || 0),
          precipitationChance: daily.precipitation_probability_max?.[i] || 0,
          precipitationMm: daily.precipitation_sum?.[i] || 0,
          windSpeed: daily.wind_speed_10m_max?.[i] || 0,
          humidity: 0, // Not available in daily data
          uvIndex: daily.uv_index_max?.[i] || 0,
          astronomy: {
            sunrise: this.formatTime(daily.sunrise?.[i]),
            sunset: this.formatTime(daily.sunset?.[i]),
            moonPhase: '', // Open-Meteo doesn't provide moon phase
            moonIllumination: -1 // -1 indicates data not available
          }
        });
      }
    }

    return {
      location: {
        name: locationName,
        country: country,
        region: region,
        lat: lat,
        lon: lon
      },
      current: {
        temperature: current.temperature_2m || 0,
        condition: this.getWeatherCondition(current.weather_code || 0),
        icon: this.getWeatherIcon(current.weather_code || 0),
        humidity: current.relative_humidity_2m || 0,
        windSpeed: current.wind_speed_10m || 0,
        windDirection: this.getWindDirection(current.wind_direction_10m || 0),
        pressure: current.pressure_msl || 1013,
        uvIndex: 0, // Not available in current weather
        visibility: 10, // Not available
        feelsLike: current.apparent_temperature || current.temperature_2m || 0
      },
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: this.formatTime(daily.sunrise?.[0]),
        sunset: this.formatTime(daily.sunset?.[0]),
        moonPhase: '', // Open-Meteo doesn't provide moon data
        moonIllumination: -1 // -1 indicates data not available
      }
    };
  }

  private getWeatherCondition(code: number): string {
    const conditions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return conditions[code] || 'Unknown';
  }

  private getWeatherIcon(code: number): string {
    const iconMap: { [key: number]: string } = {
      0: 'https://cdn.weatherapi.com/weather/64x64/day/113.png', // Clear
      1: 'https://cdn.weatherapi.com/weather/64x64/day/116.png', // Mainly clear
      2: 'https://cdn.weatherapi.com/weather/64x64/day/116.png', // Partly cloudy
      3: 'https://cdn.weatherapi.com/weather/64x64/day/119.png', // Overcast
      45: 'https://cdn.weatherapi.com/weather/64x64/day/248.png', // Fog
      48: 'https://cdn.weatherapi.com/weather/64x64/day/248.png', // Rime fog
      51: 'https://cdn.weatherapi.com/weather/64x64/day/263.png', // Light drizzle
      53: 'https://cdn.weatherapi.com/weather/64x64/day/266.png', // Moderate drizzle
      55: 'https://cdn.weatherapi.com/weather/64x64/day/266.png', // Dense drizzle
      61: 'https://cdn.weatherapi.com/weather/64x64/day/293.png', // Slight rain
      63: 'https://cdn.weatherapi.com/weather/64x64/day/296.png', // Moderate rain
      65: 'https://cdn.weatherapi.com/weather/64x64/day/308.png', // Heavy rain
      71: 'https://cdn.weatherapi.com/weather/64x64/day/326.png', // Slight snow
      73: 'https://cdn.weatherapi.com/weather/64x64/day/332.png', // Moderate snow
      75: 'https://cdn.weatherapi.com/weather/64x64/day/338.png', // Heavy snow
      77: 'https://cdn.weatherapi.com/weather/64x64/day/332.png', // Snow grains
      80: 'https://cdn.weatherapi.com/weather/64x64/day/353.png', // Rain showers
      81: 'https://cdn.weatherapi.com/weather/64x64/day/356.png', // Moderate rain showers
      82: 'https://cdn.weatherapi.com/weather/64x64/day/359.png', // Violent rain showers
      85: 'https://cdn.weatherapi.com/weather/64x64/day/368.png', // Slight snow showers
      86: 'https://cdn.weatherapi.com/weather/64x64/day/371.png', // Heavy snow showers
      95: 'https://cdn.weatherapi.com/weather/64x64/day/386.png', // Thunderstorm
      96: 'https://cdn.weatherapi.com/weather/64x64/day/389.png', // Thunderstorm with hail
      99: 'https://cdn.weatherapi.com/weather/64x64/day/392.png'  // Thunderstorm with heavy hail
    };
    return iconMap[code] || 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  private formatTime(isoDateTime: string | undefined): string {
    if (!isoDateTime) return '';
    try {
      // Open-Meteo returns ISO datetime like "2024-01-15T06:45"
      const date = new Date(isoDateTime);
      if (isNaN(date.getTime())) return '';
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } catch {
      return '';
    }
  }
}
