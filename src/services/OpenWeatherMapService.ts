import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

export class OpenWeatherMapService implements WeatherService {
  private readonly apiKey = '2f16c38d61c17ac94d944a5a66ca0e96';
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly geocodingUrl = 'https://api.openweathermap.org/geo/1.0';

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const [weatherResponse, airQualityResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/weather`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
          }
        }),
        axios.get(`${this.baseUrl}/air_pollution`, {
          params: {
            lat,
            lon,
            appid: this.apiKey
          }
        }).catch(() => null) // Air quality might not be available
      ]);

      return this.transformCurrentWeatherData(weatherResponse.data, airQualityResponse?.data);
    } catch (error) {
      console.error('Error fetching current weather from OpenWeatherMap:', error);
      throw new Error('Failed to fetch current weather data');
    }
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

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${this.geocodingUrl}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: this.apiKey
        }
      });

      return response.data.map((location: any) => ({
        name: location.name,
        country: location.country,
        region: location.state || location.country,
        lat: location.lat,
        lon: location.lon
      }));
    } catch (error) {
      console.error('Error searching locations with OpenWeatherMap:', error);
      throw new Error('Failed to search locations');
    }
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      const response = await axios.get(`${this.baseUrl}/onecall/timemachine`, {
        params: {
          lat,
          lon,
          dt: timestamp,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return this.transformHistoricalData(response.data);
    } catch (error) {
      console.error('Error fetching historical weather from OpenWeatherMap:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    return this.apiKey.length > 0;
  }

  private transformCurrentWeatherData(weatherData: any, airQualityData?: any): WeatherData {
    return {
      location: {
        name: weatherData.name,
        country: weatherData.sys.country,
        region: weatherData.sys.country,
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      },
      current: {
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed * 3.6, // Convert m/s to km/h
        windDirection: this.getWindDirection(weatherData.wind.deg || 0),
        pressure: weatherData.main.pressure,
        uvIndex: 0, // Not available in current weather endpoint
        visibility: (weatherData.visibility || 10000) / 1000, // Convert m to km
        feelsLike: weatherData.main.feels_like
      },
      forecast: {
        daily: [],
        hourly: []
      },
      astronomy: {
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
        moonPhase: '',
        moonIllumination: 0
      },
      airQuality: airQualityData ? {
        aqi: airQualityData.list[0].main.aqi,
        co: airQualityData.list[0].components.co,
        no2: airQualityData.list[0].components.no2,
        o3: airQualityData.list[0].components.o3,
        so2: airQualityData.list[0].components.so2,
        pm2_5: airQualityData.list[0].components.pm2_5,
        pm10: airQualityData.list[0].components.pm10
      } : undefined
    };
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
      precipitationMm: item.rain?.['3h'] || item.snow?.['3h'] || 0
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
          uvIndex: 0, // Not available in this endpoint
          precipitationChance: Math.max(...precipChances),
          precipitationMm: precipAmounts.reduce((a: number, b: number) => a + b, 0)
        };
      });

    return {
      location: {
        name: data.city.name,
        country: data.city.country,
        region: data.city.country,
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
        sunrise: new Date(data.city.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.city.sunset * 1000).toLocaleTimeString(),
        moonPhase: '',
        moonIllumination: 0
      }
    };
  }

  private transformHistoricalData(data: any): WeatherData {
    const current = data.current || data.data[0];
    
    return {
      location: {
        name: '',
        country: '',
        region: '',
        lat: data.lat,
        lon: data.lon
      },
      current: {
        temperature: current.temp,
        condition: current.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
        humidity: current.humidity,
        windSpeed: current.wind_speed * 3.6,
        windDirection: this.getWindDirection(current.wind_deg || 0),
        pressure: current.pressure,
        uvIndex: current.uvi || 0,
        visibility: (current.visibility || 10000) / 1000,
        feelsLike: current.feels_like
      },
      forecast: {
        daily: [],
        hourly: []
      },
      astronomy: {
        sunrise: new Date(current.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(current.sunset * 1000).toLocaleTimeString(),
        moonPhase: '',
        moonIllumination: 0
      }
    };
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}