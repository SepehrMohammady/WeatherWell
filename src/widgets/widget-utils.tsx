import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { WeatherData } from '../services/types';
import { WeatherServiceFactory } from '../services/WeatherServiceFactory';
import { WeatherWidget } from './WeatherWidget';

export const WIDGET_DATA_KEY = 'weatherwell_widget_data';

/**
 * Read widget display settings from app settings
 */
async function getWidgetSettings() {
  const settingsData = await AsyncStorage.getItem('appSettings');
  const appSettings = settingsData ? JSON.parse(settingsData) : {};
  return {
    opacity: appSettings.widgetOpacity ?? 0.85,
    showFeelsLike: appSettings.widgetShowFeelsLike ?? true,
    showHighLow: appSettings.widgetShowHighLow ?? true,
    showRainChance: appSettings.widgetShowRainChance ?? true,
    showConditions: appSettings.widgetShowConditions ?? true,
    showTomorrow: appSettings.widgetShowTomorrow ?? false,
  };
}

/**
 * Build the widget display payload from weather data + current widget settings
 */
export async function buildWidgetData(weatherData: WeatherData) {
  const current = weatherData.current;
  const today = weatherData.forecast.daily[0];
  const tomorrow = weatherData.forecast.daily[1];
  const rainChance = today?.precipitationChance || 0;
  const widgetSettings = await getWidgetSettings();

  return {
    temperature: `${Math.round(current.temperature)}°`,
    location: weatherData.location.name,
    conditions: current.condition,
    high: `${Math.round(today?.maxTemp || current.temperature)}°`,
    low: `${Math.round(today?.minTemp || current.temperature)}°`,
    rainChance: rainChance > 0 ? `${rainChance}%` : undefined,
    feelsLike: current.feelsLike !== undefined ? `${Math.round(current.feelsLike)}°` : undefined,
    tomorrowHigh: tomorrow ? `${Math.round(tomorrow.maxTemp)}°` : undefined,
    tomorrowLow: tomorrow ? `${Math.round(tomorrow.minTemp)}°` : undefined,
    tomorrowCondition: tomorrow?.condition,
    ...widgetSettings,
  };
}

/**
 * Cache weather data and trigger widget update from the foreground app
 */
export async function updateWidgetWithWeatherData(weatherData: WeatherData): Promise<void> {
  try {
    const widgetData = await buildWidgetData(weatherData);

    // Cache for background reads
    await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));

    // Trigger immediate widget update
    await requestWidgetUpdate({
      widgetName: 'WeatherWidget',
      renderWidget: (info) => <WeatherWidget {...widgetData} widgetWidth={info.width} widgetHeight={info.height} />,
      widgetNotFound: () => {},
    });
  } catch (error) {
    console.log('Widget update skipped:', error instanceof Error ? error.message : 'unknown');
  }
}

/**
 * Fetch fresh weather using the saved location and app settings, then cache it
 * for the widget. Used by the widget's refresh button (runs headless, without
 * the app open). Returns the new widget payload, or null if no location is known.
 */
export async function fetchAndCacheWidgetData(): Promise<Record<string, unknown> | null> {
  const settingsData = await AsyncStorage.getItem('appSettings');
  const settings = settingsData ? JSON.parse(settingsData) : {};

  let latitude: number | undefined;
  let longitude: number | undefined;
  const locationStr = await AsyncStorage.getItem('weatherwell_last_location');
  if (locationStr) {
    const loc = JSON.parse(locationStr);
    latitude = loc.latitude;
    longitude = loc.longitude;
  } else {
    // Fall back to the location of the last fetched weather
    const cachedWeatherStr = await AsyncStorage.getItem('weatherwell_last_weather');
    if (cachedWeatherStr) {
      const cached = JSON.parse(cachedWeatherStr);
      latitude = cached?.location?.lat;
      longitude = cached?.location?.lon;
    }
  }

  if (latitude === undefined || longitude === undefined) {
    return null;
  }

  const result = await WeatherServiceFactory.getWeatherWithFallback(
    latitude,
    longitude,
    settings.weatherProvider || 'weatherapi',
    settings.weatherApiKey,
    settings.openWeatherMapApiKey,
    settings.visualCrossingApiKey,
    settings.qweatherApiKey,
    settings.meteostatApiKey
  );

  const weatherData: WeatherData = result.data;
  await AsyncStorage.setItem('weatherwell_last_weather', JSON.stringify(weatherData)).catch(() => {});

  const widgetData = await buildWidgetData(weatherData);
  await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));
  return widgetData;
}

/**
 * Re-render widget with current cached data and updated settings (e.g. opacity change)
 */
export async function refreshWidgetSettings(): Promise<void> {
  try {
    const dataStr = await AsyncStorage.getItem(WIDGET_DATA_KEY);
    if (!dataStr) return;

    const cachedData = JSON.parse(dataStr);
    const widgetSettings = await getWidgetSettings();
    const widgetData = { ...cachedData, ...widgetSettings };

    // Update cache with new settings
    await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));

    await requestWidgetUpdate({
      widgetName: 'WeatherWidget',
      renderWidget: (info) => <WeatherWidget {...widgetData} widgetWidth={info.width} widgetHeight={info.height} />,
      widgetNotFound: () => {},
    });
  } catch (error) {
    console.log('Widget settings refresh skipped:', error instanceof Error ? error.message : 'unknown');
  }
}
