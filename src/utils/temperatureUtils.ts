import { TemperatureUnit } from '../contexts/SettingsContext';

const convertTemperature = (celsius: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return (celsius * 9/5) + 32;
  }
  return celsius;
};

const getTemperatureUnit = (unit: TemperatureUnit): string => {
  return unit === 'celsius' ? '°C' : '°F';
};

export const formatTemperature = (celsius: number, unit: TemperatureUnit): string => {
  const converted = convertTemperature(celsius, unit);
  return `${Math.round(converted)}${getTemperatureUnit(unit)}`;
};