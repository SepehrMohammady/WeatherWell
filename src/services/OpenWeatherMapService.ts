import axios from 'axios';
import { WeatherService, WeatherData, DailyForecast, HourlyForecast } from './types';

export class OpenWeatherMapService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly fallbackApiKey = '2f16c38d61c17ac94d944a5a66ca0e96'; // Demo key

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.fallbackApiKey;
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          cnt: Math.min(days * 8, 40) // 8 forecasts per day (3-hour intervals), max 40
        }
      });

      return this.transformForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast from OpenWeatherMap:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  isAvailable(): boolean {
    return this.apiKey.length > 0;
  }

  getApiSource(): string {
    return this.apiKey === this.fallbackApiKey ? 'OpenWeatherMap' : 'OpenWeatherMap (Custom)';
  }

  private transformForecastData(data: any): WeatherData {
    const hourlyForecast: HourlyForecast[] = data.list.slice(0, 24).map((item: any) => ({
      time: new Date(item.dt * 1000).toISOString(),
      temperature: item.main.temp,
      condition: item.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed * 3.6,
      precipitationChance: (item.pop || 0) * 100,
      precipitationMm: item.rain?.['3h'] || item.snow?.['3h'] || 0,
      uvIndex: 0, // Not available in forecast endpoint
      pressure: item.main.pressure || 1013,
      visibility: 10 // Default visibility for OpenWeatherMap
    }));

    // Group by day for daily forecast
    const dailyGroups = data.list.reduce((groups: any, item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    const dailyForecast: DailyForecast[] = Object.entries(dailyGroups)
      .slice(0, 7)
      .map(([date, items]: [string, any]) => {
        const temps = items.map((item: any) => item.main.temp);
        const humidities = items.map((item: any) => item.main.humidity);
        const winds = items.map((item: any) => item.wind.speed * 3.6);
        const precipChances = items.map((item: any) => (item.pop || 0) * 100);
        const precipAmounts = items.map((item: any) => item.rain?.['3h'] || item.snow?.['3h'] || 0);

        return {
          date: new Date(date).toISOString().split('T')[0],
          maxTemp: Math.max(...temps),
          minTemp: Math.min(...temps),
          condition: items[0].weather[0].description,
          icon: `https://openweathermap.org/img/wn/${items[0].weather[0].icon}@2x.png`,
          humidity: Math.round(humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length),
          windSpeed: Math.max(...winds),
          precipitationChance: Math.max(...precipChances),
          precipitationMm: precipAmounts.reduce((a: number, b: number) => a + b, 0)
        };
      });

    return {
      location: {
        name: data.city.name,
        country: data.city.country,
        lat: data.city.coord.lat,
        lon: data.city.coord.lon
      },
      current: {
        temperature: data.list[0].main.temp,
        condition: data.list[0].weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
        humidity: data.list[0].main.humidity,
        windSpeed: data.list[0].wind.speed * 3.6,
        windDirection: this.getWindDirection(data.list[0].wind.deg || 0),
        pressure: data.list[0].main.pressure,
        uvIndex: 0,
        visibility: 10, // Default value
        feelsLike: data.list[0].main.feels_like
      },
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moonPhase: '', // OpenWeatherMap doesn't provide moon data
        moonIllumination: -1 // -1 indicates data not available
      }
    };
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}