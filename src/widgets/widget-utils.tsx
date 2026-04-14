import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { WeatherData } from '../services/types';
import { WeatherWidget } from './WeatherWidget';
import { WIDGET_DATA_KEY } from './widget-task-handler';

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
 * Cache weather data and trigger widget update from the foreground app
 */
export async function updateWidgetWithWeatherData(weatherData: WeatherData): Promise<void> {
  try {
    const current = weatherData.current;
    const today = weatherData.forecast.daily[0];
    const tomorrow = weatherData.forecast.daily[1];
    const rainChance = today?.precipitationChance || 0;
    const widgetSettings = await getWidgetSettings();

    const widgetData = {
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
