import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

/**
 * MeteostatService - Historical Weather Data Provider
 * 
 * IMPORTANT: Meteostat provides HISTORICAL weather data only, not forecasts.
 * - Current weather shows the most recent available observation (may be hours/days old)
 * - Daily forecast shows historical data from the past, not future predictions
 * - No astronomy data is available from this source
 * 
 * Best used for: Historical weather analysis, research, past weather lookup
 * NOT recommended for: Current weather or forecasts
 */
export class MeteostatService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://meteostat.p.rapidapi.com';

  constructor(apiKey: string = '93d3a5f1d3msh36569bf37d01a27p1c06ecjsna9f86b114ae8') {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    // Meteostat provides historical data, so we get the most recent available data
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const endDate = this.formatDate(today);
    const startDate = this.formatDate(yesterday);
    
    try {
      // Get hourly data for the last 24 hours
      const hourlyResponse = await axios.get(`${this.baseUrl}/point/hourly`, {
        params: {
          lat,
          lon,
          start: startDate,
          end: endDate
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
        }
      });

      return this.transformToWeatherData(hourlyResponse.data, lat, lon);
    } catch (error) {
      console.error('Error fetching current weather from Meteostat:', error);
      throw new Error('Failed to fetch current weather data');
    }
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - 30); // Get last 30 days for better context
      
      const endDate = this.formatDate(today);
      const startDate = this.formatDate(pastDate);

      // Get daily historical data
      const dailyResponse = await axios.get(`${this.baseUrl}/point/daily`, {
        params: {
          lat,
          lon,
          start: startDate,
          end: endDate
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
        }
      });

      // Get hourly data for the last 24 hours
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const hourlyStartDate = this.formatDate(yesterday);

      const hourlyResponse = await axios.get(`${this.baseUrl}/point/hourly`, {
        params: {
          lat,
          lon,
          start: hourlyStartDate,
          end: endDate
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
        }
      });

      return this.transformForecastData(
        dailyResponse.data,
        hourlyResponse.data,
        lat,
        lon
      );
    } catch (error) {
      console.error('Error fetching forecast from Meteostat:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    // Meteostat doesn't provide location search
    // Return empty array - locations should be provided via coordinates
    console.log('Meteostat does not support location search by name');
    return [];
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const dailyResponse = await axios.get(`${this.baseUrl}/point/daily`, {
        params: {
          lat,
          lon,
          start: date,
          end: date
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
        }
      });

      const hourlyResponse = await axios.get(`${this.baseUrl}/point/hourly`, {
        params: {
          lat,
          lon,
          start: date,
          end: date
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
        }
      });

      return this.transformForecastData(dailyResponse.data, hourlyResponse.data, lat, lon);
    } catch (error) {
      console.error('Error fetching historical weather from Meteostat:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  getApiSource(): string {
    return 'Meteostat (Historical)';
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private transformToWeatherData(hourlyData: any, lat: number, lon: number): WeatherData {
    const data = hourlyData.data || [];
    const latest = data[data.length - 1] || {};

    // Transform hourly data
    const hourlyForecast: HourlyForecast[] = data.slice(-24).map((hour: any) => ({
      time: hour.time,
      temperature: hour.temp || 0,
      condition: this.getWeatherCondition(hour.coco),
      icon: this.getWeatherIcon(hour.coco),
      humidity: hour.rhum || 0,
      windSpeed: hour.wspd || 0,
      precipitationChance: hour.prcp > 0 ? 70 : 20,
      precipitationMm: hour.prcp || 0,
      uvIndex: 0, // Not available
      pressure: hour.pres || 1013,
      visibility: 10 // Not available, default
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
        temperature: latest.temp || 0,
        condition: this.getWeatherCondition(latest.coco),
        icon: this.getWeatherIcon(latest.coco),
        humidity: latest.rhum || 0,
        windSpeed: latest.wspd || 0,
        windDirection: this.getWindDirection(latest.wdir || 0),
        pressure: latest.pres || 1013,
        uvIndex: 0,
        visibility: 10,
        feelsLike: latest.temp || 0 // Approximate
      },
      forecast: {
        daily: [],
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: '06:00',
        sunset: '18:00',
        moonPhase: '',
        moonIllumination: 0
      }
    };
  }

  private transformForecastData(
    dailyData: any,
    hourlyData: any,
    lat: number,
    lon: number
  ): WeatherData {
    const daily = dailyData.data || [];
    const hourly = hourlyData.data || [];
    
    const latest = hourly[hourly.length - 1] || daily[daily.length - 1] || {};

    // Transform daily forecast
    const dailyForecast: DailyForecast[] = daily.slice(-7).map((day: any) => ({
      date: day.date,
      maxTemp: day.tmax || 0,
      minTemp: day.tmin || 0,
      condition: 'Partly Cloudy', // Meteostat doesn't provide detailed conditions for daily
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      precipitationChance: day.prcp > 0 ? 70 : 20,
      precipitationMm: day.prcp || 0,
      windSpeed: day.wspd || 0,
      humidity: 0, // Not available in daily
      uvIndex: 0
    }));

    // Transform hourly forecast
    const hourlyForecast: HourlyForecast[] = hourly.slice(-24).map((hour: any) => ({
      time: hour.time,
      temperature: hour.temp || 0,
      condition: this.getWeatherCondition(hour.coco),
      icon: this.getWeatherIcon(hour.coco),
      humidity: hour.rhum || 0,
      windSpeed: hour.wspd || 0,
      precipitationChance: hour.prcp > 0 ? 70 : 20,
      precipitationMm: hour.prcp || 0,
      uvIndex: 0,
      pressure: hour.pres || 1013,
      visibility: 10
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
        temperature: latest.temp || latest.tavg || 0,
        condition: this.getWeatherCondition(latest.coco),
        icon: this.getWeatherIcon(latest.coco),
        humidity: latest.rhum || 0,
        windSpeed: latest.wspd || 0,
        windDirection: this.getWindDirection(latest.wdir || 0),
        pressure: latest.pres || 1013,
        uvIndex: 0,
        visibility: 10,
        feelsLike: latest.temp || latest.tavg || 0
      },
      forecast: {
        daily: dailyForecast,
        hourly: hourlyForecast
      },
      astronomy: {
        sunrise: '06:00',
        sunset: '18:00',
        moonPhase: '',
        moonIllumination: 0
      }
    };
  }

  private getWeatherCondition(code: number): string {
    // Meteostat weather condition codes
    const conditions: { [key: number]: string } = {
      1: 'Clear',
      2: 'Fair',
      3: 'Cloudy',
      4: 'Overcast',
      5: 'Fog',
      6: 'Freezing Fog',
      7: 'Light Rain',
      8: 'Rain',
      9: 'Heavy Rain',
      10: 'Freezing Rain',
      11: 'Heavy Freezing Rain',
      12: 'Sleet',
      13: 'Heavy Sleet',
      14: 'Light Snowfall',
      15: 'Snowfall',
      16: 'Heavy Snowfall',
      17: 'Rain Shower',
      18: 'Heavy Rain Shower',
      19: 'Sleet Shower',
      20: 'Heavy Sleet Shower',
      21: 'Snow Shower',
      22: 'Heavy Snow Shower',
      23: 'Lightning',
      24: 'Hail',
      25: 'Thunderstorm',
      26: 'Heavy Thunderstorm',
      27: 'Storm'
    };
    return conditions[code] || 'Unknown';
  }

  private getWeatherIcon(code: number): string {
    // Map Meteostat codes to WeatherAPI.com icons
    const iconMap: { [key: number]: string } = {
      1: '113',  // Clear
      2: '116',  // Fair -> Partly cloudy
      3: '119',  // Cloudy
      4: '122',  // Overcast
      5: '248',  // Fog
      6: '260',  // Freezing Fog
      7: '293',  // Light Rain -> Patchy light drizzle
      8: '296',  // Rain -> Light rain
      9: '302',  // Heavy Rain -> Moderate rain
      10: '311', // Freezing Rain
      11: '314', // Heavy Freezing Rain
      12: '317', // Sleet
      13: '320', // Heavy Sleet
      14: '326', // Light Snowfall -> Light snow
      15: '332', // Snowfall -> Moderate snow
      16: '338', // Heavy Snowfall -> Heavy snow
      17: '353', // Rain Shower -> Light rain shower
      18: '359', // Heavy Rain Shower -> Torrential rain shower
      19: '362', // Sleet Shower -> Light sleet showers
      20: '365', // Heavy Sleet Shower -> Moderate or heavy sleet showers
      21: '368', // Snow Shower -> Light snow showers
      22: '371', // Heavy Snow Shower -> Moderate or heavy snow showers
      23: '386', // Lightning -> Patchy light rain with thunder
      24: '374', // Hail -> Light showers of ice pellets
      25: '389', // Thunderstorm -> Moderate or heavy rain with thunder
      26: '392', // Heavy Thunderstorm -> Patchy light snow with thunder
      27: '395'  // Storm -> Moderate or heavy snow with thunder
    };

    const iconCode = iconMap[code] || '113';
    return `//cdn.weatherapi.com/weather/64x64/day/${iconCode}.png`;
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}
