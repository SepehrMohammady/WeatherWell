import axios from 'axios';
import { WeatherService, WeatherData, DailyForecast, HourlyForecast } from './types';
import { mapMeteostatCoco, isNightAtHour } from './conditions';

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

  async getForecast(lat: number, lon: number): Promise<WeatherData> {
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
      conditionCode: 'partly',
      precipitationChance: day.prcp > 0 ? 70 : 20,
      precipitationMm: day.prcp || 0,
      windSpeed: day.wspd || 0,
      humidity: 0, // Not available in daily
    }));

    // Transform hourly forecast
    const hourlyForecast: HourlyForecast[] = hourly.slice(-24).map((hour: any) => ({
      time: hour.time,
      temperature: hour.temp || 0,
      condition: this.getWeatherCondition(hour.coco),
      conditionCode: mapMeteostatCoco(hour.coco),
      isNight: isNightAtHour(hour.time),
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
        lat,
        lon
      },
      current: {
        temperature: latest.temp || latest.tavg || 0,
        condition: this.getWeatherCondition(latest.coco),
        conditionCode: mapMeteostatCoco(latest.coco),
        isNight: latest.time ? isNightAtHour(latest.time) : false,
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
        sunrise: '', // Meteostat doesn't provide astronomy data
        sunset: '',
        moonPhase: '',
        moonIllumination: -1 // -1 indicates data not available
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

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}
