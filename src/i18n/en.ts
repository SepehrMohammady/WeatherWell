import { settingsStrings } from './partials/settings';
import { homeStrings } from './partials/home';
import { compareStrings } from './partials/compare';
import { weatherStrings } from './partials/weather';
import { smartStrings } from './partials/smart';
import { shareStrings } from './partials/share';
import { notificationStrings } from './partials/notifications';
import { widgetStrings } from './partials/widget';

/**
 * Master English dictionary. Feature strings live in ./partials (one file per
 * UI area, extracted from the code they belong to); cross-cutting strings are
 * defined here. Keys are flat, namespaced by prefix.
 */
const baseStrings: Record<string, string> = {
  // Common
  'common.ok': 'OK',
  'common.cancel': 'Cancel',
  'common.close': 'Close',
  'common.retry': 'Retry',
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.save': 'Save',
  'common.reset': 'Reset',
  'common.notAvailable': 'Data not available',

  // Canonical weather conditions (keyed by ConditionCode)
  'conditions.clear': 'Clear',
  'conditions.clear.night': 'Clear Night',
  'conditions.partly': 'Partly Cloudy',
  'conditions.cloudy': 'Cloudy',
  'conditions.overcast': 'Overcast',
  'conditions.fog': 'Fog',
  'conditions.drizzle': 'Drizzle',
  'conditions.rain': 'Rain',
  'conditions.heavy-rain': 'Heavy Rain',
  'conditions.sleet': 'Sleet',
  'conditions.snow': 'Snow',
  'conditions.heavy-snow': 'Heavy Snow',
  'conditions.hail': 'Hail',
  'conditions.thunder': 'Thunderstorm',
  'conditions.thunder-rain': 'Thunderstorm with Rain',
  'conditions.windy': 'Windy',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': 'Language',
  'language.system': 'System',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'Restart Required',
  'language.restartMessage': 'Please close and reopen WeatherWell to apply the new layout direction.',

  // Tutorial
  'tutorial.title': 'Welcome to WeatherWell',
  'tutorial.skip': 'Skip',
  'tutorial.next': 'Next',
  'tutorial.back': 'Back',
  'tutorial.done': 'Get Started',
  'tutorial.settingsRow': 'App Tutorial',
  'tutorial.settingsRowSubtitle': 'Replay the introduction to WeatherWell',
  'tutorial.page1.title': 'Your Weather, Your Way',
  'tutorial.page1.body': 'WeatherWell shows current conditions, hourly and 7-day forecasts for your location — ad-free and privacy-friendly.',
  'tutorial.page2.title': 'Search & Pin Locations',
  'tutorial.page2.body': 'Search any city and pin it as your main location. The app and widget will follow your pinned place; unpin to return to your current location.',
  'tutorial.page3.title': 'Choose Your Provider',
  'tutorial.page3.body': 'Pick from six weather providers, compare them side by side, or build a custom blend — each metric from the provider you trust most.',
  'tutorial.page4.title': 'Smart Features',
  'tutorial.page4.body': 'Get clothing suggestions, umbrella reminders, air quality, astronomy data, and weather alerts — plus a home screen widget.',
  'tutorial.page5.title': 'Make It Yours',
  'tutorial.page5.body': 'Themes in five accent colors, light and dark modes, weather animations, and multiple languages. Find everything in Settings.',
};

export const en: Record<string, string> = {
  ...baseStrings,
  ...settingsStrings,
  ...homeStrings,
  ...compareStrings,
  ...weatherStrings,
  ...smartStrings,
  ...shareStrings,
  ...notificationStrings,
  ...widgetStrings,
};
