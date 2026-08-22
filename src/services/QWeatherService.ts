import axios from 'axios';
import { WeatherService, WeatherData, DailyForecast, HourlyForecast } from './types';
import { mapQWeatherIcon, qweatherIconIsNight } from './conditions';

export class QWeatherService implements WeatherService {
  private apiKey: string;
  private readonly baseUrl = 'https://devapi.qweather.com/v7';

  constructor(apiKey: string = 'b196010778a24af19765ed70af849801') {
    this.apiKey = apiKey;
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
      conditionCode: mapQWeatherIcon(hour.icon),
      isNight: qweatherIconIsNight(hour.icon),
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
      conditionCode: mapQWeatherIcon(day.iconDay),
      precipitationChance: parseFloat(day.precip) || 0,
      precipitationMm: parseFloat(day.precip) || 0,
      windSpeed: parseFloat(day.windSpeedDay) || 0,
      humidity: parseFloat(day.humidity) || 0
    }));

    return {
      location: {
        name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
        country: '',
        lat,
        lon
      },
      current: {
        temperature: parseFloat(now.temp) || 0,
        condition: now.text || 'Unknown',
        conditionCode: mapQWeatherIcon(now.icon),
        isNight: qweatherIconIsNight(now.icon),
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

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}
