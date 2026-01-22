import axios from 'axios';
import { WeatherService, WeatherData, Location, DailyForecast, HourlyForecast } from './types';

export class VisualCrossingService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
  private readonly fallbackApiKey = 'UQV5F8J9S55QF3KU8CUM77YC7'; // Working API key

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.fallbackApiKey;
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const forecast = await this.getForecast(lat, lon, 1);
    return forecast;
  }

  async getForecast(lat: number, lon: number, days: number = 7): Promise<WeatherData> {
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + Math.min(days - 1, 14)); // Max 15 days

      const response = await axios.get(
        `${this.baseUrl}/${lat},${lon}/${this.formatDate(today)}/${this.formatDate(endDate)}`,
        {
          params: {
            key: this.apiKey,
            unitGroup: 'metric',
            include: 'days,hours,current,alerts',
            elements: 'datetime,temp,tempmax,tempmin,humidity,precip,precipprob,windspeed,winddir,visibility,uvindex,conditions,icon,description'
          }
        }
      );

      return this.transformForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast from Visual Crossing:', error);
      throw new Error('Failed to fetch forecast data from Visual Crossing');
    }
  }

  async searchLocations(query: string): Promise<Location[]> {
    // Visual Crossing doesn't have a dedicated search endpoint, 
    // so we'll return empty array and let other services handle location search
    return [];
  }

  async getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${lat},${lon}/${date}`,
        {
          params: {
            key: this.apiKey,
            unitGroup: 'metric',
            include: 'days,hours',
            elements: 'datetime,temp,tempmax,tempmin,humidity,precip,precipprob,windspeed,winddir,visibility,uvindex,conditions,icon'
          }
        }
      );

      return this.transformForecastData(response.data);
    } catch (error) {
      console.error('Error fetching historical weather from Visual Crossing:', error);
      throw new Error('Failed to fetch historical weather data');
    }
  }

  isAvailable(): boolean {
    // Visual Crossing API key is now working
    return this.apiKey.length > 10;
  }

  getApiSource(): string {
    return this.apiKey === this.fallbackApiKey ? 'Visual Crossing' : 'Visual Crossing (Custom)';
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private transformForecastData(data: any): WeatherData {
    const current = data.currentConditions || data.days[0];
    
    return {
      location: {
        name: data.resolvedAddress?.split(',')[0] || 'Unknown',
        country: data.resolvedAddress?.split(',').pop()?.trim() || 'Unknown',
        region: data.resolvedAddress?.split(',')[1]?.trim() || '',
        lat: data.latitude,
        lon: data.longitude
      },
      current: {
        temperature: current.temp || 0,
        feelsLike: current.feelslike || current.temp || 0,
        condition: current.conditions || 'Unknown',
        icon: this.mapIconToUrl(current.icon),
        humidity: current.humidity || 0,
        windSpeed: current.windspeed || 0,
        windDirection: this.getWindDirection(current.winddir || 0),
        pressure: current.pressure || 1013,
        visibility: current.visibility || 10,
        uvIndex: current.uvindex || 0
      },
      forecast: {
        daily: this.transformDailyForecast(data.days || []),
        hourly: this.transformHourlyForecast(data.days || [])
      },
      airQuality: undefined, // Visual Crossing doesn't provide air quality data
      astronomy: {
        sunrise: this.formatTime(data.days[0]?.sunrise),
        sunset: this.formatTime(data.days[0]?.sunset),
        moonPhase: data.days[0]?.moonphase !== undefined ? this.getMoonPhase(data.days[0].moonphase) : '',
        moonIllumination: data.days[0]?.moonphase !== undefined ? data.days[0].moonphase : -1
      }
    };
  }

  private transformDailyForecast(days: any[]): DailyForecast[] {
    return days.slice(0, 7).map(day => ({
      date: day.datetime,
      maxTemp: day.tempmax || 0,
      minTemp: day.tempmin || 0,
      condition: day.conditions || 'Unknown',
      icon: this.mapIconToUrl(day.icon),
      precipitationChance: day.precipprob || 0,
      precipitationMm: day.precip || 0,
      windSpeed: day.windspeed || 0,
      humidity: day.humidity || 0,
      uvIndex: day.uvindex || 0,
      astronomy: {
        sunrise: this.formatTime(day.sunrise),
        sunset: this.formatTime(day.sunset),
        moonPhase: day.moonphase !== undefined ? this.getMoonPhase(day.moonphase) : '',
        moonIllumination: day.moonphase !== undefined ? day.moonphase : -1
      }
    }));
  }

  private formatTime(time: string | undefined): string {
    if (!time) return '';
    // Visual Crossing returns time in HH:MM:SS format, convert to HH:MM AM/PM
    try {
      const [hours, minutes] = time.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } catch {
      return time;
    }
  }

  private transformHourlyForecast(days: any[]): HourlyForecast[] {
    const hourly: HourlyForecast[] = [];
    
    days.slice(0, 2).forEach(day => {
      if (day.hours) {
        day.hours.forEach((hour: any) => {
          hourly.push({
            time: `${day.datetime}T${hour.datetime}`,
            temperature: hour.temp || 0,
            condition: hour.conditions || 'Unknown',
            icon: this.mapIconToUrl(hour.icon),
            precipitationChance: hour.precipprob || 0,
            precipitationMm: hour.precip || 0,
            windSpeed: hour.windspeed || 0,
            humidity: hour.humidity || 0,
            uvIndex: hour.uvindex || 0,
            pressure: hour.pressure || 1013,
            visibility: hour.visibility || 10
          });
        });
      }
    });

    return hourly.slice(0, 24);
  }

  private mapIconToUrl(icon: string): string {
    // Visual Crossing icon mapping to weather icon URLs
    const iconMap: { [key: string]: string } = {
      'clear-day': 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      'clear-night': 'https://cdn.weatherapi.com/weather/64x64/night/113.png',
      'partly-cloudy-day': 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
      'partly-cloudy-night': 'https://cdn.weatherapi.com/weather/64x64/night/116.png',
      'cloudy': 'https://cdn.weatherapi.com/weather/64x64/day/119.png',
      'rain': 'https://cdn.weatherapi.com/weather/64x64/day/296.png',
      'snow': 'https://cdn.weatherapi.com/weather/64x64/day/332.png',
      'wind': 'https://cdn.weatherapi.com/weather/64x64/day/264.png',
      'fog': 'https://cdn.weatherapi.com/weather/64x64/day/248.png'
    };

    return iconMap[icon] || 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  private getMoonPhase(phase: number): string {
    if (phase === 0) return 'New Moon';
    if (phase < 0.25) return 'Waxing Crescent';
    if (phase === 0.25) return 'First Quarter';
    if (phase < 0.5) return 'Waxing Gibbous';
    if (phase === 0.5) return 'Full Moon';
    if (phase < 0.75) return 'Waning Gibbous';
    if (phase === 0.75) return 'Last Quarter';
    return 'Waning Crescent';
  }
}