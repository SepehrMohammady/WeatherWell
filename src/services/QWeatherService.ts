import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

export class QWeatherService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://devapi.qweather.com/v7';
  private readonly geoUrl = 'https://geoapi.qweather.com/v2';

  constructor(apiKey: string = 'b196010778a24af19765ed70af849801') {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const forecast = await this.getForecast(lat, lon, 1);
    return forecast;
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const location = `${lon.toFixed(2)},${lat.toFixed(2)}`;
      
      // Determine forecast days parameter
      let daysParam = '7d';
      if (days <= 3) daysParam = '3d';
      else if (days <= 7) daysParam = '7d';
      else if (days <= 10) daysParam = '10d';
      else if (days <= 15) daysParam = '15d';
      else daysParam = '30d';

      // Get current weather
      const nowResponse = await axios.get(`${this.baseUrl}/weather/now`, {
        params: {
          location,
          key: this.apiKey,
          lang: 'en'
        }
      });

      // Get daily forecast
      const dailyResponse = await axios.get(`${this.baseUrl}/weather/${daysParam}`, {
        params: {
          location,
          key: this.apiKey,
          lang: 'en'
        }
      });

      // Get hourly forecast (24 hours)
      const hourlyResponse = await axios.get(`${this.baseUrl}/weather/24h`, {
        params: {
          location,
          key: this.apiKey,
          lang: 'en'
        }
      });

      // Get air quality
      let airQuality = null;
      try {
        const airResponse = await axios.get(`${this.baseUrl}/air/now`, {
          params: {
            location,
            key: this.apiKey,
            lang: 'en'
          }
        });
        airQuality = airResponse.data.now;
      } catch (error) {
        console.log('Air quality data not available');
      }

      return this.transformWeatherData(
        nowResponse.data,
        dailyResponse.data,
        hourlyResponse.data,
        airQuality,
        lat,
        lon
      );
    } catch (error) {
      console.error('Error fetching forecast from QWeather:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${this.geoUrl}/city/lookup`, {
        params: {
          location: query,
          key: this.apiKey,
          lang: 'en',
          number: 10
        }
      });

      if (!response.data.location || response.data.code !== '200') {
        return [];
      }

      return response.data.location.map((loc: any) => ({
        name: loc.name,
        region: loc.adm2 || loc.adm1,
        country: loc.country,
        latitude: parseFloat(loc.lat),
        longitude: parseFloat(loc.lon)
      }));
    } catch (error) {
      console.error('Error searching locations from QWeather:', error);
      return [];
    }
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const location = `${lon.toFixed(2)},${lat.toFixed(2)}`;
      
      const response = await axios.get(`${this.baseUrl}/historical/weather`, {
        params: {
          location,
          date,
          key: this.apiKey,
          lang: 'en'
        }
      });

      // Transform historical data (simplified - reuses current structure)
      return this.transformWeatherData(
        { now: response.data.weatherDaily?.[0] || {} },
        response.data,
        { hourly: [] },
        null,
        lat,
        lon
      );
    } catch (error) {
      console.error('Error fetching historical weather from QWeather:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  getApiSource(): string {
    return 'QWeather';
  }

  private transformWeatherData(
    nowData: any,
    dailyData: any,
    hourlyData: any,
    airQuality: any,
    lat: number,
    lon: number
  ): WeatherData {
    const now = nowData.now || {};
    const daily = dailyData.daily || [];
    const hourly = hourlyData.hourly || [];

    // Transform hourly forecast
    const hourlyForecast: HourlyForecast[] = hourly.slice(0, 24).map((hour: any) => ({
      time: hour.fxTime,
      temperature: parseFloat(hour.temp) || 0,
      condition: hour.text || 'Unknown',
      icon: this.mapIconCode(hour.icon),
      humidity: parseFloat(hour.humidity) || 0,
      windSpeed: parseFloat(hour.windSpeed) || 0,
      precipitationChance: parseFloat(hour.pop) || 0,
      precipitationMm: parseFloat(hour.precip) || 0,
      uvIndex: 0, // Not available in hourly
      pressure: parseFloat(hour.pressure) || 1013,
      visibility: parseFloat(hour.vis) || 10
    }));

    // Transform daily forecast
    const dailyForecast: DailyForecast[] = daily.map((day: any) => ({
      date: day.fxDate,
      maxTemp: parseFloat(day.tempMax) || 0,
      minTemp: parseFloat(day.tempMin) || 0,
      condition: day.textDay || 'Unknown',
      icon: this.mapIconCode(day.iconDay),
      precipitationChance: parseFloat(day.precip) || 0,
      precipitationMm: parseFloat(day.precip) || 0,
      windSpeed: parseFloat(day.windSpeedDay) || 0,
      humidity: parseFloat(day.humidity) || 0,
      uvIndex: parseFloat(day.uvIndex) || 0
    }));

    return {
      location: {
        name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
        country: '',
        region: '',
        lat,
        lon
      },
      current: {
        temperature: parseFloat(now.temp) || 0,
        condition: now.text || 'Unknown',
        icon: this.mapIconCode(now.icon),
        humidity: parseFloat(now.humidity) || 0,
        windSpeed: parseFloat(now.windSpeed) || 0,
        windDirection: now.windDir || this.getWindDirection(parseFloat(now.wind360) || 0),
        pressure: parseFloat(now.pressure) || 1013,
        uvIndex: airQuality ? parseFloat(airQuality.aqi) / 50 : 0, // Approximate UV from AQI
        visibility: parseFloat(now.vis) || 10,
        feelsLike: parseFloat(now.feelsLike) || parseFloat(now.temp) || 0
      },
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: daily[0]?.sunrise || '06:00',
        sunset: daily[0]?.sunset || '18:00',
        moonPhase: daily[0]?.moonPhase || '',
        moonIllumination: 0
      },
      airQuality: airQuality ? {
        aqi: parseFloat(airQuality.aqi) || 0,
        pm2_5: parseFloat(airQuality.pm2p5) || 0,
        pm10: parseFloat(airQuality.pm10) || 0,
        o3: parseFloat(airQuality.o3) || 0,
        no2: parseFloat(airQuality.no2) || 0,
        so2: parseFloat(airQuality.so2) || 0,
        co: parseFloat(airQuality.co) || 0
      } : undefined
    };
  }

  private mapIconCode(iconCode: string): string {
    // QWeather icon codes to WeatherAPI.com icon URLs
    // QWeather uses 3-digit codes (100-999)
    const code = iconCode || '100';
    
    // Map QWeather codes to similar WeatherAPI.com codes
    const iconMap: { [key: string]: string } = {
      '100': '113', // Sunny -> Clear
      '101': '116', // Cloudy -> Partly cloudy
      '102': '119', // Few Clouds -> Cloudy
      '103': '122', // Partly Cloudy -> Overcast
      '104': '122', // Overcast -> Overcast
      '150': '113', // Clear night -> Clear
      '151': '116', // Partly cloudy night -> Partly cloudy
      '300': '176', // Shower rain -> Patchy rain possible
      '301': '266', // Heavy shower rain -> Moderate rain
      '302': '356', // Thundershower -> Moderate or heavy rain with thunder
      '303': '389', // Heavy thunderstorm -> Moderate or heavy snow with thunder
      '304': '353', // Thundershower with hail -> Light rain shower
      '305': '176', // Light rain -> Patchy rain possible
      '306': '296', // Moderate rain -> Light rain
      '307': '302', // Heavy rain -> Moderate rain
      '308': '305', // Extreme rain -> Heavy rain
      '309': '293', // Drizzle -> Patchy light drizzle
      '310': '359', // Storm -> Torrential rain shower
      '311': '359', // Heavy storm -> Torrential rain shower
      '312': '359', // Severe storm -> Torrential rain shower
      '313': '263', // Freezing rain -> Patchy light rain
      '314': '263', // Light to moderate rain -> Patchy light rain
      '315': '305', // Moderate to heavy rain -> Heavy rain
      '316': '308', // Heavy rain to storm -> Heavy rain
      '317': '359', // Storm to heavy storm -> Torrential rain shower
      '318': '359', // Heavy to severe storm -> Torrential rain shower
      '399': '185', // Rain -> Patchy freezing drizzle possible
      '400': '227', // Light snow -> Blowing snow
      '401': '338', // Moderate snow -> Heavy snow
      '402': '335', // Heavy snow -> Patchy heavy snow
      '403': '395', // Snowstorm -> Moderate or heavy snow in area with thunder
      '404': '317', // Sleet -> Light sleet
      '405': '365', // Rain and snow -> Moderate or heavy sleet showers
      '406': '374', // Light to moderate rain and snow -> Light showers of ice pellets
      '407': '365', // Moderate to heavy rain and snow -> Moderate or heavy sleet showers
      '408': '335', // Heavy rain and snow -> Patchy heavy snow
      '409': '227', // Snowflake -> Blowing snow
      '410': '335', // Light to moderate snow -> Patchy heavy snow
      '499': '338', // Snow -> Heavy snow
      '500': '260', // Mist -> Freezing fog
      '501': '248', // Foggy -> Fog
      '502': '260', // Haze -> Freezing fog
      '503': '185', // Sand -> Patchy freezing drizzle possible
      '504': '185', // Dust -> Patchy freezing drizzle possible
      '507': '185', // Duststorm -> Patchy freezing drizzle possible
      '508': '185', // Sandstorm -> Patchy freezing drizzle possible
      '509': '248', // Dense fog -> Fog
      '510': '260', // Strong fog -> Freezing fog
      '511': '248', // Moderate fog -> Fog
      '512': '248', // Heavy fog -> Fog
      '513': '248', // Severe fog -> Fog
      '514': '248', // Extra heavy fog -> Fog
      '515': '248', // Extra severe fog -> Fog
      '900': '113', // Hot -> Clear
      '901': '230', // Cold -> Blizzard
      '999': '119', // Unknown -> Cloudy
    };

    const mappedCode = iconMap[code] || '113';
    return `//cdn.weatherapi.com/weather/64x64/day/${mappedCode}.png`;
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}
