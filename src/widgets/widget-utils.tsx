import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { WeatherData } from '../services/types';
import { WeatherWidget } from './WeatherWidget';
import { WIDGET_DATA_KEY } from './widget-task-handler';

/**
 * Cache weather data and trigger widget update from the foreground app
 */
export async function updateWidgetWithWeatherData(weatherData: WeatherData): Promise<void> {
  try {
    const current = weatherData.current;
    const today = weatherData.forecast.daily[0];
    const rainChance = today?.precipitationChance || 0;

    // Read widget opacity from settings
    const settingsData = await AsyncStorage.getItem('appSettings');
    const appSettings = settingsData ? JSON.parse(settingsData) : {};
    const opacity = appSettings.widgetOpacity ?? 0.85;

    const widgetData = {
      temperature: `${Math.round(current.temperature)}°`,
      location: weatherData.location.name,
      conditions: current.condition,
      high: `${Math.round(today?.maxTemp || current.temperature)}°`,
      low: `${Math.round(today?.minTemp || current.temperature)}°`,
      rainChance: rainChance > 0 ? `${rainChance}%` : undefined,
      feelsLike: current.feelsLike !== undefined ? `${Math.round(current.feelsLike)}°` : undefined,
      opacity,
    };

    // Cache for background reads
    await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));

    // Trigger immediate widget update
    await requestWidgetUpdate({
      widgetName: 'WeatherWidget',
      renderWidget: () => <WeatherWidget {...widgetData} />,
      widgetNotFound: () => {
        // Widget not on home screen, nothing to update
      },
    });
  } catch (error) {
    // Widget update is non-critical
    console.log('Widget update skipped:', error instanceof Error ? error.message : 'unknown');
  }
}
