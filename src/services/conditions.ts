/**
 * Canonical weather condition codes.
 *
 * Every provider reports conditions in its own vocabulary and ships its own
 * icon art, so switching providers used to change the whole look of the app.
 * Each service maps its native codes to this canonical set, and the UI renders
 * one consistent icon family (Material Design weather icons) everywhere —
 * screens and widget alike. Canonical codes are also what makes condition
 * names translatable.
 */

export type ConditionCode =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'sleet'
  | 'snow'
  | 'heavy-snow'
  | 'hail'
  | 'thunder'
  | 'thunder-rain'
  | 'windy';

interface ConditionVisual {
  /** MaterialCommunityIcons glyph name (in-app rendering) */
  mci: string;
  /** Key into WEATHER_ICON_PATHS (widget SVG rendering) */
  pathKey: string;
  /** Icon tint that reads on both light and dark surfaces */
  color: string;
}

const VISUALS: Record<ConditionCode, { day: ConditionVisual; night: ConditionVisual }> = {
  clear: {
    day: { mci: 'weather-sunny', pathKey: 'clear-day', color: '#F2B53D' },
    night: { mci: 'weather-night', pathKey: 'clear-night', color: '#8FA6CC' },
  },
  partly: {
    day: { mci: 'weather-partly-cloudy', pathKey: 'partly-day', color: '#E0A93E' },
    night: { mci: 'weather-night-partly-cloudy', pathKey: 'partly-night', color: '#8FA6CC' },
  },
  cloudy: {
    day: { mci: 'weather-cloudy', pathKey: 'cloudy', color: '#93A1AB' },
    night: { mci: 'weather-cloudy', pathKey: 'cloudy', color: '#8794A0' },
  },
  overcast: {
    day: { mci: 'weather-cloudy', pathKey: 'cloudy', color: '#78868F' },
    night: { mci: 'weather-cloudy', pathKey: 'cloudy', color: '#6F7D87' },
  },
  fog: {
    day: { mci: 'weather-fog', pathKey: 'fog', color: '#9AA6B0' },
    night: { mci: 'weather-fog', pathKey: 'fog', color: '#8C99A5' },
  },
  drizzle: {
    day: { mci: 'weather-partly-rainy', pathKey: 'drizzle', color: '#6FA3D6' },
    night: { mci: 'weather-rainy', pathKey: 'rain', color: '#6C98C4' },
  },
  rain: {
    day: { mci: 'weather-rainy', pathKey: 'rain', color: '#5B95CE' },
    night: { mci: 'weather-rainy', pathKey: 'rain', color: '#5B95CE' },
  },
  'heavy-rain': {
    day: { mci: 'weather-pouring', pathKey: 'heavy-rain', color: '#4A82BE' },
    night: { mci: 'weather-pouring', pathKey: 'heavy-rain', color: '#4A82BE' },
  },
  sleet: {
    day: { mci: 'weather-snowy-rainy', pathKey: 'sleet', color: '#7BAAD1' },
    night: { mci: 'weather-snowy-rainy', pathKey: 'sleet', color: '#7BAAD1' },
  },
  snow: {
    day: { mci: 'weather-snowy', pathKey: 'snow', color: '#9FC6E4' },
    night: { mci: 'weather-snowy', pathKey: 'snow', color: '#9FC6E4' },
  },
  'heavy-snow': {
    day: { mci: 'weather-snowy-heavy', pathKey: 'heavy-snow', color: '#8ABADC' },
    night: { mci: 'weather-snowy-heavy', pathKey: 'heavy-snow', color: '#8ABADC' },
  },
  hail: {
    day: { mci: 'weather-hail', pathKey: 'hail', color: '#84B2D6' },
    night: { mci: 'weather-hail', pathKey: 'hail', color: '#84B2D6' },
  },
  thunder: {
    day: { mci: 'weather-lightning', pathKey: 'thunder', color: '#DFAF35' },
    night: { mci: 'weather-lightning', pathKey: 'thunder', color: '#DFAF35' },
  },
  'thunder-rain': {
    day: { mci: 'weather-lightning-rainy', pathKey: 'thunder-rain', color: '#CDA23A' },
    night: { mci: 'weather-lightning-rainy', pathKey: 'thunder-rain', color: '#CDA23A' },
  },
  windy: {
    day: { mci: 'weather-windy', pathKey: 'windy', color: '#8AABA3' },
    night: { mci: 'weather-windy', pathKey: 'windy', color: '#8AABA3' },
  },
};

export function getConditionVisual(code: ConditionCode, isNight: boolean = false): ConditionVisual {
  const entry = VISUALS[code] || VISUALS.cloudy;
  return isNight ? entry.night : entry.day;
}

/** Fallback when a provider gives no day/night signal for an hour */
export function isNightAtHour(time: string): boolean {
  const hour = new Date(time.replace(' ', 'T')).getHours();
  return isNaN(hour) ? false : hour >= 20 || hour < 6;
}

// ---------------------------------------------------------------------------
// Provider mappings
// ---------------------------------------------------------------------------

/** WeatherAPI condition codes (https://www.weatherapi.com/docs/weather_conditions.json) */
export function mapWeatherApiCode(code: number): ConditionCode {
  if (code === 1000) return 'clear';
  if (code === 1003) return 'partly';
  if (code === 1006) return 'cloudy';
  if (code === 1009) return 'overcast';
  if (code === 1030 || code === 1135 || code === 1147) return 'fog';
  if (code === 1063 || code === 1150 || code === 1153 || code === 1180) return 'drizzle';
  if (code === 1066 || code === 1114 || code === 1210 || code === 1213 ||
      code === 1216 || code === 1219 || code === 1255) return 'snow';
  if (code === 1117 || code === 1222 || code === 1225 || code === 1258) return 'heavy-snow';
  if (code === 1069 || code === 1072 || code === 1168 || code === 1171 ||
      code === 1198 || code === 1201 || code === 1204 || code === 1207 ||
      code === 1249 || code === 1252) return 'sleet';
  if (code === 1087) return 'thunder';
  if (code === 1183 || code === 1186 || code === 1189 || code === 1240) return 'rain';
  if (code === 1192 || code === 1195 || code === 1243 || code === 1246) return 'heavy-rain';
  if (code === 1237 || code === 1261 || code === 1264) return 'hail';
  if (code === 1273 || code === 1276) return 'thunder-rain';
  if (code === 1279 || code === 1282) return 'thunder';
  return 'cloudy';
}

/** Open-Meteo WMO weather codes */
export function mapOpenMeteoWmo(code: number): ConditionCode {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 55) return 'drizzle';
  if (code === 56 || code === 57 || code === 66 || code === 67) return 'sleet';
  if (code === 61 || code === 63 || code === 80 || code === 81) return 'rain';
  if (code === 65 || code === 82) return 'heavy-rain';
  if (code === 71 || code === 73 || code === 77 || code === 85) return 'snow';
  if (code === 75 || code === 86) return 'heavy-snow';
  if (code === 95) return 'thunder-rain';
  if (code === 96 || code === 99) return 'thunder';
  return 'cloudy';
}

/** OpenWeatherMap icon codes ("01d".."50n") */
export function mapOwmIcon(icon: string): ConditionCode {
  const c = (icon || '').slice(0, 2);
  switch (c) {
    case '01': return 'clear';
    case '02': return 'partly';
    case '03': return 'cloudy';
    case '04': return 'overcast';
    case '09': return 'rain';
    case '10': return 'rain';
    case '11': return 'thunder-rain';
    case '13': return 'snow';
    case '50': return 'fog';
    default: return 'cloudy';
  }
}

export function owmIconIsNight(icon: string): boolean {
  return (icon || '').endsWith('n');
}

/** QWeather icon codes */
export function mapQWeatherIcon(iconCode: string): ConditionCode {
  const c = parseInt(iconCode, 10) || 100;
  const day = c >= 150 && c < 300 ? c - 50 : c; // fold night variants onto day codes
  if (day === 100) return 'clear';
  if (day >= 101 && day <= 103) return 'partly';
  if (day === 104) return 'overcast';
  if (day >= 302 && day <= 304) return 'thunder-rain';
  if (day === 300 || day === 301 || day === 305 || day === 309) return 'drizzle';
  if (day === 306 || day === 314 || day === 315 || day === 350 || day === 351 || day === 399) return 'rain';
  if (day === 307 || day === 308 || day === 310 || day === 311 || day === 312 ||
      (day >= 316 && day <= 318)) return 'heavy-rain';
  if (day === 313 || day === 404 || day === 405 || day === 406 || day === 456 || day === 457) return 'sleet';
  if (day === 400 || day === 401 || day === 407 || day === 408 || day === 499) return 'snow';
  if (day === 402 || day === 403 || day === 409 || day === 410) return 'heavy-snow';
  if (day >= 500 && day <= 515) return 'fog';
  return 'cloudy';
}

export function qweatherIconIsNight(iconCode: string): boolean {
  const c = parseInt(iconCode, 10) || 100;
  return c >= 150 && c < 300;
}

/** Meteostat condition codes (coco) */
export function mapMeteostatCoco(coco: number): ConditionCode {
  switch (coco) {
    case 1: return 'clear';
    case 2: return 'partly';
    case 3: return 'cloudy';
    case 4: return 'overcast';
    case 5: case 6: return 'fog';
    case 7: return 'drizzle';
    case 8: case 17: return 'rain';
    case 9: case 18: return 'heavy-rain';
    case 10: case 11: case 12: case 13: case 19: case 20: return 'sleet';
    case 14: case 15: case 21: return 'snow';
    case 16: case 22: return 'heavy-snow';
    case 23: return 'thunder';
    case 24: return 'hail';
    case 25: case 26: return 'thunder-rain';
    case 27: return 'windy';
    default: return 'cloudy';
  }
}

/** Visual Crossing icon strings */
export function mapVisualCrossingIcon(icon: string): ConditionCode {
  const base = (icon || '').replace(/-(day|night)$/, '');
  switch (base) {
    case 'clear': return 'clear';
    case 'partly-cloudy': return 'partly';
    case 'cloudy': return 'cloudy';
    case 'fog': return 'fog';
    case 'wind': return 'windy';
    case 'rain': return 'rain';
    case 'showers': return 'rain';
    case 'rain-snow': case 'rain-snow-showers': case 'sleet': return 'sleet';
    case 'snow': case 'snow-showers': return 'snow';
    case 'hail': return 'hail';
    case 'thunder': return 'thunder';
    case 'thunder-rain': case 'thunder-showers': return 'thunder-rain';
    default: return 'cloudy';
  }
}

export function visualCrossingIconIsNight(icon: string): boolean {
  return (icon || '').endsWith('-night');
}
