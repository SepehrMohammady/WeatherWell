export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    uvIndex: number;
    visibility: number;
    feelsLike: number;
  };
  forecast: {
    daily: DailyForecast[];
    hourly: HourlyForecast[];
  };
  astronomy: {
    sunrise: string;
    sunset: string;
    moonPhase: string;
    moonIllumination: number;
  };
  airQuality?: {
    aqi: number;
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
  };
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  precipitationChance: number;
  precipitationMm: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitationChance: number;
  precipitationMm: number;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export interface WeatherService {
  getCurrentWeather(lat: number, lon: number): Promise<WeatherData>;
  getForecast(lat: number, lon: number, days?: number): Promise<WeatherData>;
  searchLocations(query: string): Promise<Location[]>;
  getHistoricalWeather(lat: number, lon: number, date: string): Promise<WeatherData>;
  isAvailable(): boolean;
  getApiSource(): string;
}