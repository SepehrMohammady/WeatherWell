import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Linking,
  BackHandler
} from 'react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, THEME_COLOR_SWATCHES, ThemeColorName } from '../contexts/ThemeContext';
import { useSettings, WeatherProvider, WeatherSource, TemperatureUnit, CustomSourceConfig } from '../contexts/SettingsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AppLanguage } from '../i18n';
import { TutorialModal } from '../components/TutorialModal';
import { AppPicker } from '../components/AppPicker';
import { APP_VERSION } from '../config/version';
import { refreshWidgetSettings } from '../widgets/widget-utils';

interface SettingsScreenProps {
  onClose: () => void;
}

const TESTERS = [
  'Alireza Asadi Jozani',
  'Amirhossein Yaghoubnezhad',
  'Benyamin Izadpanah',
  'Hamed Zanganeh',
];

const CUSTOM_METRICS: { key: keyof CustomSourceConfig; labelKey: string }[] = [
  { key: 'forecast', labelKey: 'settings.metricForecast' },
  { key: 'temperature', labelKey: 'settings.metricTemperature' },
  { key: 'condition', labelKey: 'settings.metricCondition' },
  { key: 'humidity', labelKey: 'settings.metricHumidity' },
  { key: 'wind', labelKey: 'settings.metricWind' },
  { key: 'pressure', labelKey: 'settings.metricPressure' },
  { key: 'uvIndex', labelKey: 'settings.metricUvIndex' },
  { key: 'visibility', labelKey: 'settings.metricVisibility' },
  { key: 'airQuality', labelKey: 'settings.metricAirQuality' },
  { key: 'astronomy', labelKey: 'settings.metricAstronomy' },
];

// Languages sorted alphabetically by the romanization of their native name
// (shown in the trailing comment) so non-Latin scripts have a stable place.
const LANGUAGE_OPTIONS: { key: AppLanguage; labelKey: string }[] = [
  { key: 'system', labelKey: 'language.system' },
  { key: 'ar', labelKey: 'language.ar' }, // al-Arabiya (Arabic)
  { key: 'en', labelKey: 'language.en' }, // English
  { key: 'es', labelKey: 'language.es' }, // Espanol (Spanish)
  { key: 'fa', labelKey: 'language.fa' }, // Farsi
  { key: 'hi', labelKey: 'language.hi' }, // Hindi
  { key: 'it', labelKey: 'language.it' }, // Italiano (Italian)
  { key: 'zh', labelKey: 'language.zh' }, // Zhongwen (Chinese, Simplified)
];

const PROVIDER_OPTIONS: { key: WeatherProvider; short: string }[] = [
  { key: 'weatherapi', short: 'WA' },
  { key: 'openweathermap', short: 'OW' },
  { key: 'visualcrossing', short: 'VC' },
  { key: 'openmeteo', short: 'OM' },
  { key: 'qweather', short: 'QW' },
  { key: 'meteostat', short: 'MS' },
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  // The device back gesture should return to the main screen, not exit the app
  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [onClose]);

  const { theme, themeMode, themeColor, colors, setThemeMode, setThemeColor } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useSettings();
  const { favorites, addToFavorites, clearFavorites } = useFavorites();
  const { t, ln, language, setLanguage } = useLanguage();
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'weatherapi' | 'openweathermap' | 'visualcrossing' | 'qweather' | 'meteostat'>('weatherapi');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState<'daily' | 'hourly'>('daily');
  const [pickerHour, setPickerHour] = useState(0);
  const [pickerMinute, setPickerMinute] = useState(0);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [thresholdType, setThresholdType] = useState<'rain' | 'wind' | 'uv' | 'tempHigh' | 'tempLow' | 'aqi'>('rain');
  const [tempThresholdValue, setTempThresholdValue] = useState('');

  // Custom alert modal state
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    buttons?: { text: string; style?: 'default' | 'destructive' | 'cancel'; onPress?: () => void }[];
  }>({ visible: false, title: '', message: '' });

  const showAlert = (
    title: string,
    message: string,
    buttons?: { text: string; style?: 'default' | 'destructive' | 'cancel'; onPress?: () => void }[]
  ) => {
    setAlertModal({ visible: true, title, message, buttons });
  };

  const dismissAlert = () => {
    setAlertModal({ visible: false, title: '', message: '' });
  };

  const openTimePicker = (type: 'daily' | 'hourly') => {
    setTimePickerType(type);
    const timeStr = type === 'daily' ? settings.dailyForecastTime : (settings.hourlyForecastTime || '08:00');
    const [h, m] = timeStr.split(':').map(Number);
    setPickerHour(h);
    setPickerMinute(m);
    setShowTimePicker(true);
  };

  const handleTimeSave = () => {
    const timeStr = `${pickerHour.toString().padStart(2, '0')}:${pickerMinute.toString().padStart(2, '0')}`;
    if (timePickerType === 'daily') {
      updateSetting('dailyForecastTime', timeStr);
    } else {
      updateSetting('hourlyForecastTime', timeStr);
    }
    setShowTimePicker(false);
  };

  const openThresholdEditor = (type: 'rain' | 'wind' | 'uv' | 'tempHigh' | 'tempLow' | 'aqi') => {
    setThresholdType(type);
    let currentValue = '';
    switch (type) {
      case 'rain': currentValue = String(settings.rainThreshold); break;
      case 'wind': currentValue = String(settings.windSpeedThreshold); break;
      case 'uv': currentValue = String(settings.uvThreshold); break;
      case 'tempHigh': currentValue = String(settings.temperatureThresholdHigh); break;
      case 'tempLow': currentValue = String(settings.temperatureThresholdLow); break;
      case 'aqi': currentValue = String(settings.aqiThreshold); break;
    }
    setTempThresholdValue(currentValue);
    setShowThresholdModal(true);
  };

  const handleThresholdSave = () => {
    const value = parseFloat(tempThresholdValue);
    if (isNaN(value)) {
      showAlert(t('settings.invalidValueTitle'), t('settings.invalidValueMessage'));
      return;
    }
    switch (thresholdType) {
      case 'rain': updateSetting('rainThreshold', Math.min(100, Math.max(0, value))); break;
      case 'wind': updateSetting('windSpeedThreshold', Math.max(0, value)); break;
      case 'uv': updateSetting('uvThreshold', Math.min(15, Math.max(1, value))); break;
      case 'tempHigh': updateSetting('temperatureThresholdHigh', value); break;
      case 'tempLow': updateSetting('temperatureThresholdLow', value); break;
      case 'aqi': updateSetting('aqiThreshold', Math.min(500, Math.max(1, Math.round(value)))); break;
    }
    setShowThresholdModal(false);
  };

  const getThresholdTitle = () => {
    switch (thresholdType) {
      case 'rain': return t('settings.thresholdRain');
      case 'wind': return t('settings.thresholdWind');
      case 'uv': return t('settings.thresholdUv');
      case 'tempHigh': return t('settings.thresholdTempHigh');
      case 'tempLow': return t('settings.thresholdTempLow');
      case 'aqi': return t('settings.thresholdAqi');
    }
  };

  const handleProviderChange = (provider: WeatherSource) => {
    updateSetting('weatherProvider', provider);
  };

  const handleCustomSourceChange = (metric: keyof CustomSourceConfig, provider: WeatherProvider) => {
    updateSetting('customSources', { ...settings.customSources, [metric]: provider });
  };

  const handleUnitChange = (unit: TemperatureUnit) => {
    updateSetting('temperatureUnit', unit);
  };

  const handleApiKeyUpdate = (provider: 'weatherapi' | 'openweathermap' | 'visualcrossing' | 'qweather' | 'meteostat') => {
    const keyMap: Record<typeof provider, keyof typeof settings> = {
      'weatherapi': 'weatherApiKey',
      'openweathermap': 'openWeatherMapApiKey',
      'visualcrossing': 'visualCrossingApiKey',
      'qweather': 'qweatherApiKey',
      'meteostat': 'meteostatApiKey'
    };
    const key = keyMap[provider];
    updateSetting(key as any, tempApiKey || null);
    setTempApiKey('');
    setShowApiKeyInput(false);
    showAlert(t('settings.successTitle'), t('settings.apiKeyUpdated'));
  };

  const handleReset = () => {
    showAlert(
      t('settings.resetTitle'),
      t('settings.resetConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.reset'),
          style: 'destructive',
          onPress: () => {
            resetSettings();
            showAlert(t('settings.successTitle'), t('settings.resetDone'));
          }
        }
      ]
    );
  };

  const handleExport = async () => {
    try {
      const backupData = {
        type: 'weatherwell-backup',
        version: APP_VERSION,
        exportDate: new Date().toISOString(),
        settings: JSON.parse(exportSettings()),
        favorites: favorites,
        // Appearance and language persist outside AppSettings, so carry them
        // explicitly or a restore would silently drop them.
        appearance: { themeMode, themeColor },
        language,
      };
      const backupJson = JSON.stringify(backupData, null, 2);
      const fileName = `WeatherWell_Backup_${new Date().toISOString().split('T')[0]}.weatherwell`;
      
      const file = new File(Paths.cache, fileName);
      file.write(backupJson, { encoding: 'utf8' });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/octet-stream',
          dialogTitle: t('settings.exportDialogTitle'),
        });
        showAlert(t('settings.successTitle'), t('settings.backupExported'));
      } else {
        showAlert(t('common.error'), t('settings.sharingUnavailable'));
      }
    } catch (error) {
      console.error('Export error:', error);
      showAlert(t('common.error'), t('settings.exportFailed', { error: error instanceof Error ? error.message : t('settings.unknownError') }));
    }
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const fileUri = result.assets[0].uri;
      const importedFile = new File(fileUri);
      const fileContent = await importedFile.text();

      const parsed = JSON.parse(fileContent);
      
      // Handle .weatherwell backup format
      if (parsed.type === 'weatherwell-backup') {
        const settingsSuccess = await importSettings(JSON.stringify(parsed.settings));

        if (parsed.appearance?.themeMode) {
          setThemeMode(parsed.appearance.themeMode);
        }
        if (parsed.appearance?.themeColor) {
          setThemeColor(parsed.appearance.themeColor);
        }
        if (parsed.language) {
          await setLanguage(parsed.language);
        }
        
        if (parsed.favorites && Array.isArray(parsed.favorites)) {
          await clearFavorites();
          for (const fav of parsed.favorites) {
            await addToFavorites(fav);
          }
        }
        
        if (settingsSuccess) {
          showAlert(t('settings.successTitle'), t('settings.backupRestored'));
        } else {
          showAlert(t('common.error'), t('settings.restoreFailed'));
        }
      } else {
        // Legacy format: plain settings JSON
        const success = await importSettings(fileContent);
        if (success) {
          showAlert(t('settings.successTitle'), t('settings.settingsImported'));
        } else {
          showAlert(t('common.error'), t('settings.invalidBackupFile'));
        }
      }
    } catch (error) {
      console.error('Import error:', error);
      showAlert(t('common.error'), t('settings.importFailed'));
    }
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://semo-lab.com/weatherwell/');
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://semo-lab.com/weatherwell/privacy-policy/');
  };

  const handleOpenPlayListing = (packageName: string) => {
    // Prefer the Play Store app, fall back to the browser if it is unavailable
    const marketUrl = `market://details?id=${packageName}`;
    const webUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
    Linking.openURL(marketUrl).catch(() => Linking.openURL(webUrl));
  };

  const handleOpenDeveloperPage = () => {
    const marketUrl = 'market://dev?id=6449174405168948991';
    const webUrl = 'https://play.google.com/store/apps/dev?id=6449174405168948991';
    Linking.openURL(marketUrl).catch(() => Linking.openURL(webUrl));
  };

  const handleAddWidgetToHomeScreen = async () => {
    try {
      const { NativeModules } = require('react-native');
      const { WidgetPinModule } = NativeModules;
      if (WidgetPinModule) {
        await WidgetPinModule.requestPinWidget();
      } else {
        showAlert(t('settings.widgetAlertTitle'), t('settings.widgetPinHint'));
      }
    } catch {
      showAlert(t('settings.widgetAlertTitle'), t('settings.widgetPinHint'));
    }
  };

  const handleWidgetSettingChange = async (key: string, value: any) => {
    await updateSetting(key as any, value);
    // Refresh widget with new settings
    setTimeout(() => refreshWidgetSettings(), 300);
  };

  const SettingItem: React.FC<{
    title: string;
    subtitle?: string;
    description?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    isLast?: boolean;
  }> = ({ title, subtitle, description, rightElement, onPress, isLast = false }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: colors.surface },
        isLast && styles.settingItemLast
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>
          {title}
        </Text>
        {(subtitle || description) && (
          <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
            {subtitle || description}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gradient[colors.gradient.length - 1] }]}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('settings.title')}</Text>
          <View style={styles.placeholder} />
        </View>

        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.appearance')}
          </Text>
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.appearanceModeRow}>
              {([
                { mode: 'system' as const, label: t('settings.modeSystem'), icon: 'contrast-outline' as const },
                { mode: 'light' as const, label: t('settings.modeLight'), icon: 'sunny-outline' as const },
                { mode: 'dark' as const, label: t('settings.modeDark'), icon: 'moon-outline' as const },
              ]).map(({ mode, label, icon }) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modeChip,
                    { backgroundColor: themeMode === mode ? colors.primary : colors.card },
                  ]}
                  onPress={() => setThemeMode(mode)}
                >
                  <Ionicons
                    name={icon}
                    size={15}
                    color={themeMode === mode ? '#FFFFFF' : colors.text}
                  />
                  <Text
                    style={[
                      styles.modeChipText,
                      { color: themeMode === mode ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>{t('settings.themeColor')}</Text>
              <View style={styles.colorDotRow}>
                {(Object.keys(THEME_COLOR_SWATCHES) as ThemeColorName[]).map((name) => (
                  <TouchableOpacity
                    key={name}
                    onPress={() => setThemeColor(name)}
                    style={[
                      styles.colorDot,
                      { backgroundColor: THEME_COLOR_SWATCHES[name] },
                      themeColor === name && [styles.colorDotSelected, { borderColor: colors.text }],
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
          <SettingItem
            title={t('settings.weatherAnimations')}
            subtitle={t('settings.weatherAnimationsSubtitle')}
            rightElement={
              <Switch
                value={settings.enableWeatherAnimations}
                onValueChange={(value) => updateSetting('enableWeatherAnimations', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.enableWeatherAnimations ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>{t('language.title')}</Text>
              <AppPicker
                selectedValue={language}
                onValueChange={(value) => setLanguage(value as AppLanguage)}
                options={LANGUAGE_OPTIONS.map(({ key, labelKey }) => ({ value: key, label: t(labelKey) }))}
                title={t('language.title')}
              />
            </View>
          </View>
        </View>

        {/* Weather Provider Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.weatherData')}
          </Text>
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                {t('settings.weatherProvider')}
              </Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                {settings.weatherProvider === 'weatherapi'
                  ? t('settings.providerWeatherApiDesc')
                  : settings.weatherProvider === 'openweathermap'
                    ? t('settings.providerOpenWeatherMapDesc')
                    : settings.weatherProvider === 'visualcrossing'
                    ? t('settings.providerVisualCrossingDesc')
                    : settings.weatherProvider === 'openmeteo'
                    ? t('settings.providerOpenMeteoDesc')
                    : settings.weatherProvider === 'qweather'
                    ? t('settings.providerQWeatherDesc')
                    : settings.weatherProvider === 'meteostat'
                    ? t('settings.providerMeteostatDesc')
                    : t('settings.providerCustomDesc')
                }
              </Text>
              <View style={styles.providerButtons}>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'weatherapi' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleProviderChange('weatherapi')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'weatherapi' ? 'white' : colors.text }]}>
                    WeatherAPI
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'openweathermap' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleProviderChange('openweathermap')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'openweathermap' ? 'white' : colors.text }]}>
                    OpenWeather
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.providerButtons}>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'visualcrossing' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleProviderChange('visualcrossing')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'visualcrossing' ? 'white' : colors.text }]}>
                    Visual Crossing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'openmeteo' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleProviderChange('openmeteo')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'openmeteo' ? 'white' : colors.text }]}>
                    Open-Meteo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.providerButtons}>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'qweather' ? colors.primary : colors.border, opacity: 0.7 }
                  ]}
                  onPress={() => handleProviderChange('qweather')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'qweather' ? 'white' : colors.text }]}>
                    QWeather ⚠
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'meteostat' ? colors.primary : colors.border, opacity: 0.7 }
                  ]}
                  onPress={() => handleProviderChange('meteostat')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'meteostat' ? 'white' : colors.text }]}>
                    Meteostat ⚠
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.providerButtons}>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.weatherProvider === 'custom' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleProviderChange('custom')}
                >
                  <Text style={[styles.providerText, { color: settings.weatherProvider === 'custom' ? 'white' : colors.text }]}>
                    {t('settings.providerCustom')}
                  </Text>
                </TouchableOpacity>
              </View>
              {settings.weatherProvider === 'custom' && (
                <View style={styles.customSourceList}>
                  {CUSTOM_METRICS.map(({ key, labelKey }) => (
                    <View key={key} style={styles.customMetricRow}>
                      <Text style={[styles.customMetricLabel, { color: colors.text }]}>
                        {t(labelKey)}
                      </Text>
                      <View style={styles.customMetricChips}>
                        {PROVIDER_OPTIONS.map(({ key: provider, short }) => {
                          const selected = settings.customSources[key] === provider;
                          return (
                            <TouchableOpacity
                              key={provider}
                              style={[
                                styles.customMetricChip,
                                { backgroundColor: selected ? colors.primary : colors.border }
                              ]}
                              onPress={() => handleCustomSourceChange(key, provider)}
                            >
                              <Text style={[styles.customMetricChipText, { color: selected ? 'white' : colors.text }]}>
                                {short}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                  <Text style={[styles.customSourceHint, { color: colors.textSecondary }]}>
                    {t('settings.providerHint')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <SettingItem
            title={t('settings.temperatureUnit')}
            rightElement={
              <View style={styles.unitButtons}>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    { backgroundColor: settings.temperatureUnit === 'celsius' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleUnitChange('celsius')}
                >
                  <Text style={[styles.unitText, { color: settings.temperatureUnit === 'celsius' ? 'white' : colors.text }]}>
                    °C
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.unitButton,
                    { backgroundColor: settings.temperatureUnit === 'fahrenheit' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleUnitChange('fahrenheit')}
                >
                  <Text style={[styles.unitText, { color: settings.temperatureUnit === 'fahrenheit' ? 'white' : colors.text }]}>
                    °F
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />

          <SettingItem
            title={t('settings.refreshInterval')}
            subtitle={t('settings.refreshIntervalSubtitle', { minutes: settings.refreshInterval })}
            rightElement={
              <View style={styles.intervalButtons}>
                {[15, 30, 60].map(interval => (
                  <TouchableOpacity
                    key={interval}
                    style={[
                      styles.intervalButton,
                      { backgroundColor: settings.refreshInterval === interval ? colors.primary : colors.border }
                    ]}
                    onPress={() => updateSetting('refreshInterval', interval)}
                  >
                    <Text style={[styles.intervalText, { color: settings.refreshInterval === interval ? 'white' : colors.text }]}>
                      {t('settings.minutesShort', { minutes: interval })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          />

          {/* API Keys Configuration */}
          <SettingItem
            title={t('settings.weatherApiKey')}
            subtitle={settings.weatherApiKey ? t('settings.customKeyConfigured') : t('settings.usingDefaultKey')}
            rightElement={
              <TouchableOpacity
                onPress={() => {
                  setTempApiKey(settings.weatherApiKey || '');
                  setShowApiKeyInput(true);
                  setSelectedProvider('weatherapi');
                }}
              >
                <Ionicons name="key-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
          />

          <SettingItem
            title={t('settings.openWeatherMapKey')}
            subtitle={settings.openWeatherMapApiKey ? t('settings.customKeyConfigured') : t('settings.usingDefaultKey')}
            rightElement={
              <TouchableOpacity
                onPress={() => {
                  setTempApiKey(settings.openWeatherMapApiKey || '');
                  setShowApiKeyInput(true);
                  setSelectedProvider('openweathermap');
                }}
              >
                <Ionicons name="key-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
          />

          <SettingItem
            title={t('settings.visualCrossingKey')}
            subtitle={settings.visualCrossingApiKey ? t('settings.customKeyConfigured') : t('settings.usingDefaultKey')}
            rightElement={
              <TouchableOpacity
                onPress={() => {
                  setTempApiKey(settings.visualCrossingApiKey || '');
                  setShowApiKeyInput(true);
                  setSelectedProvider('visualcrossing');
                }}
              >
                <Ionicons name="key-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
          />

          <SettingItem
            title={t('settings.qweatherKey')}
            subtitle={settings.qweatherApiKey && settings.qweatherApiKey !== 'b196010778a24af19765ed70af849801' ? t('settings.customKeyConfigured') : t('settings.usingDefaultKey')}
            rightElement={
              <TouchableOpacity
                onPress={() => {
                  setTempApiKey(settings.qweatherApiKey || '');
                  setShowApiKeyInput(true);
                  setSelectedProvider('qweather');
                }}
              >
                <Ionicons name="key-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
          />

          <SettingItem
            title={t('settings.meteostatKey')}
            subtitle={settings.meteostatApiKey && settings.meteostatApiKey !== '93d3a5f1d3msh36569bf37d01a27p1c06ecjsna9f86b114ae8' ? t('settings.customKeyConfigured') : t('settings.usingDefaultKey')}
            rightElement={
              <TouchableOpacity
                onPress={() => {
                  setTempApiKey(settings.meteostatApiKey || '');
                  setShowApiKeyInput(true);
                  setSelectedProvider('meteostat');
                }}
              >
                <Ionicons name="key-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
          />
        </View>

        {/* Display Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.displayOptions')}
          </Text>
          <SettingItem
            title={t('settings.showFeelsLike')}
            rightElement={
              <Switch
                value={settings.showFeelsLike}
                onValueChange={(value) => updateSetting('showFeelsLike', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showFeelsLike ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showHumidity')}
            rightElement={
              <Switch
                value={settings.showHumidity}
                onValueChange={(value) => updateSetting('showHumidity', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showHumidity ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showPressure')}
            rightElement={
              <Switch
                value={settings.showPressure}
                onValueChange={(value) => updateSetting('showPressure', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showPressure ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showVisibility')}
            rightElement={
              <Switch
                value={settings.showVisibility}
                onValueChange={(value) => updateSetting('showVisibility', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showVisibility ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showUvIndex')}
            rightElement={
              <Switch
                value={settings.showUVIndex}
                onValueChange={(value) => updateSetting('showUVIndex', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showUVIndex ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showWindSpeed')}
            rightElement={
              <Switch
                value={settings.showWindSpeed}
                onValueChange={(value) => updateSetting('showWindSpeed', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showWindSpeed ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showWindDirection')}
            rightElement={
              <Switch
                value={settings.showWindDirection}
                onValueChange={(value) => updateSetting('showWindDirection', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showWindDirection ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.showAirQuality')}
            rightElement={
              <Switch
                value={settings.showAirQuality}
                onValueChange={(value) => updateSetting('showAirQuality', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.showAirQuality ? colors.accent : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.notifications')}
          </Text>
          <Text style={[styles.notificationNote, { color: colors.textSecondary }]}>
            {t('settings.notificationNote', { minutes: settings.refreshInterval })}
          </Text>
          <SettingItem
            title={t('settings.enableNotifications')}
            subtitle={t('settings.enableNotificationsSubtitle')}
            rightElement={
              <Switch
                value={settings.enableNotifications}
                onValueChange={(value) => updateSetting('enableNotifications', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.enableNotifications ? colors.accent : '#f4f3f4'}
              />
            }
          />
          
          {settings.enableNotifications && (
            <>
              <SettingItem
                title={t('settings.severeWeatherAlerts')}
                subtitle={t('settings.severeWeatherAlertsSubtitle')}
                rightElement={
                  <Switch
                    value={settings.enableSevereWeatherAlerts}
                    onValueChange={(value) => updateSetting('enableSevereWeatherAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableSevereWeatherAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title={t('settings.dailyForecast')}
                subtitle={t('settings.dailyForecastSubtitle', { time: settings.dailyForecastTime })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.timeButton, { backgroundColor: colors.card }]}
                      onPress={() => openTimePicker('daily')}
                    >
                      <Text style={[styles.timeButtonText, { color: colors.primary }]}>{ln(settings.dailyForecastTime)}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableDailyForecast}
                      onValueChange={(value) => updateSetting('enableDailyForecast', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableDailyForecast ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.hourlyForecast')}
                subtitle={t('settings.hourlyForecastSubtitle', { time: settings.hourlyForecastTime || '08:00' })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.timeButton, { backgroundColor: colors.card }]}
                      onPress={() => openTimePicker('hourly')}
                    >
                      <Text style={[styles.timeButtonText, { color: colors.primary }]}>{ln(settings.hourlyForecastTime || '08:00')}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableHourlyForecast}
                      onValueChange={(value) => updateSetting('enableHourlyForecast', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableHourlyForecast ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.temperatureAlerts')}
                subtitle={t('settings.temperatureAlertsSubtitle', { low: settings.temperatureThresholdLow, high: settings.temperatureThresholdHigh })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('tempLow')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{t('settings.tempLowShort', { value: settings.temperatureThresholdLow })}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('tempHigh')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{t('settings.tempHighShort', { value: settings.temperatureThresholdHigh })}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableTemperatureAlerts}
                      onValueChange={(value) => updateSetting('enableTemperatureAlerts', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableTemperatureAlerts ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.uvAlerts')}
                subtitle={t('settings.uvAlertsSubtitle', { value: settings.uvThreshold })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('uv')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{ln(settings.uvThreshold)}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableUVAlerts}
                      onValueChange={(value) => updateSetting('enableUVAlerts', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableUVAlerts ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.umbrellaAlerts')}
                subtitle={t('settings.umbrellaAlertsSubtitle', { value: settings.rainThreshold || 70 })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('rain')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{t('settings.percentValue', { value: settings.rainThreshold })}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableUmbrellaAlerts}
                      onValueChange={(value) => updateSetting('enableUmbrellaAlerts', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableUmbrellaAlerts ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.windAlerts')}
                subtitle={t('settings.windAlertsSubtitle', { value: settings.windSpeedThreshold || 50 })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('wind')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{ln(settings.windSpeedThreshold)}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableWindAlerts}
                      onValueChange={(value) => updateSetting('enableWindAlerts', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableWindAlerts ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
              
              <SettingItem
                title={t('settings.aqiAlerts')}
                subtitle={t('settings.aqiAlertsSubtitle', { value: settings.aqiThreshold })}
                rightElement={
                  <View style={styles.rowRight}>
                    <TouchableOpacity 
                      style={[styles.thresholdButton, { backgroundColor: colors.card }]}
                      onPress={() => openThresholdEditor('aqi')}
                    >
                      <Text style={[styles.thresholdButtonText, { color: colors.primary }]}>{ln(settings.aqiThreshold)}</Text>
                    </TouchableOpacity>
                    <Switch
                      value={settings.enableAQIAlerts}
                      onValueChange={(value) => updateSetting('enableAQIAlerts', value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={settings.enableAQIAlerts ? colors.accent : '#f4f3f4'}
                    />
                  </View>
                }
              />
            </>
          )}
        </View>

        {/* Widget */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.homeScreenWidget')}
          </Text>
          <SettingItem
            title={t('settings.addWidget')}
            subtitle={t('settings.addWidgetSubtitle')}
            onPress={handleAddWidgetToHomeScreen}
            rightElement={
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            }
          />
          <SettingItem
            title={t('settings.widgetOpacity')}
            subtitle={t('settings.percentValue', { value: Math.round((settings.widgetOpacity ?? 0.85) * 100) })}
            rightElement={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => {
                  const current = settings.widgetOpacity ?? 0.85;
                  if (current > 0.3) handleWidgetSettingChange('widgetOpacity', Math.round((current - 0.05) * 100) / 100);
                }}>
                  <Ionicons name="remove-circle-outline" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 16, minWidth: 40, textAlign: 'center' }}>
                  {t('settings.percentValue', { value: Math.round((settings.widgetOpacity ?? 0.85) * 100) })}
                </Text>
                <TouchableOpacity onPress={() => {
                  const current = settings.widgetOpacity ?? 0.85;
                  if (current < 1.0) handleWidgetSettingChange('widgetOpacity', Math.round((current + 0.05) * 100) / 100);
                }}>
                  <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
                </TouchableOpacity>
              </View>
            }
          />
          <SettingItem
            title={t('settings.widgetShowFeelsLike')}
            subtitle={t('settings.widgetShowFeelsLikeSubtitle')}
            rightElement={
              <Switch
                value={settings.widgetShowFeelsLike ?? true}
                onValueChange={(value) => handleWidgetSettingChange('widgetShowFeelsLike', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={(settings.widgetShowFeelsLike ?? true) ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.widgetShowHighLow')}
            subtitle={t('settings.widgetShowHighLowSubtitle')}
            rightElement={
              <Switch
                value={settings.widgetShowHighLow ?? true}
                onValueChange={(value) => handleWidgetSettingChange('widgetShowHighLow', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={(settings.widgetShowHighLow ?? true) ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.widgetShowRainChance')}
            subtitle={t('settings.widgetShowRainChanceSubtitle')}
            rightElement={
              <Switch
                value={settings.widgetShowRainChance ?? true}
                onValueChange={(value) => handleWidgetSettingChange('widgetShowRainChance', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={(settings.widgetShowRainChance ?? true) ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.widgetShowConditions')}
            subtitle={t('settings.widgetShowConditionsSubtitle')}
            rightElement={
              <Switch
                value={settings.widgetShowConditions ?? true}
                onValueChange={(value) => handleWidgetSettingChange('widgetShowConditions', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={(settings.widgetShowConditions ?? true) ? colors.accent : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            title={t('settings.widgetShowTomorrow')}
            subtitle={t('settings.widgetShowTomorrowSubtitle')}
            rightElement={
              <Switch
                value={settings.widgetShowTomorrow ?? false}
                onValueChange={(value) => handleWidgetSettingChange('widgetShowTomorrow', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={(settings.widgetShowTomorrow ?? false) ? colors.accent : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.privacy')}
          </Text>
          <SettingItem
            title={t('settings.shareLocation')}
            subtitle={t('settings.shareLocationSubtitle')}
            rightElement={
              <Switch
                value={settings.enableShareLocation}
                onValueChange={(value) => updateSetting('enableShareLocation', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.enableShareLocation ? colors.accent : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* Advanced */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.advanced')}
          </Text>
          <SettingItem
            title={t('settings.exportBackup')}
            subtitle={t('settings.exportBackupSubtitle')}
            rightElement={
              <TouchableOpacity onPress={handleExport}>
                <Ionicons name="cloud-upload-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={handleExport}
          />
          <SettingItem
            title={t('settings.importBackup')}
            subtitle={t('settings.importBackupSubtitle')}
            rightElement={
              <TouchableOpacity onPress={handleImport}>
                <Ionicons name="cloud-download-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={handleImport}
          />
          <SettingItem
            title={t('settings.resetToDefaults')}
            subtitle={t('settings.resetToDefaultsSubtitle')}
            rightElement={
              <TouchableOpacity onPress={handleReset}>
                <Ionicons name="refresh-outline" size={24} color={colors.error} />
              </TouchableOpacity>
            }
            onPress={handleReset}
          />
        </View>

        {/* Testers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.testers')}
          </Text>
          <View style={[styles.testersCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.testersThanks, { color: colors.text }]}>
              {t('settings.testersThanks')}
            </Text>
            {TESTERS.map((name) => (
              <Text key={name} style={[styles.testerName, { color: colors.textSecondary }]}>
                {name}
              </Text>
            ))}
          </View>
        </View>

        {/* Tutorial Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('tutorial.sectionTitle')}
          </Text>
          <SettingItem
            title={t('tutorial.settingsRow')}
            subtitle={t('tutorial.settingsRowSubtitle')}
            onPress={() => setShowTutorial(true)}
            rightElement={<Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />}
            isLast
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.about')}
          </Text>
          <SettingItem
            title="WeatherWell"
            description={t('settings.appTagline')}
            rightElement={null}
          />
          <SettingItem
            title={t('settings.version')}
            description={ln(APP_VERSION)}
            rightElement={null}
          />
          <SettingItem
            title={t('settings.developer')}
            description="SeMo Lab"
            onPress={handleOpenWebsite}
            rightElement={<Ionicons name="open-outline" size={20} color={colors.primary} />}
          />
          <SettingItem
            title={t('settings.privacyPolicy')}
            description={t('settings.privacyPolicySubtitle')}
            onPress={handleOpenPrivacyPolicy}
            isLast={true}
            rightElement={<Ionicons name="open-outline" size={20} color={colors.primary} />}
          />
        </View>

        {/* More from SeMo Lab */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('settings.moreFromSemoLab')}
          </Text>
          <SettingItem
            title="FeedWell"
            description={t('settings.feedwellDesc')}
            onPress={() => handleOpenPlayListing('com.feedwell.app')}
            rightElement={<Ionicons name="logo-google-playstore" size={20} color={colors.primary} />}
          />
          <SettingItem
            title="LedgerWell"
            description={t('settings.ledgerwellDesc')}
            onPress={() => handleOpenPlayListing('com.ledgerwell.app')}
            rightElement={<Ionicons name="logo-google-playstore" size={20} color={colors.primary} />}
          />
          <SettingItem
            title="ThinkWell"
            description={t('settings.thinkwellDesc')}
            onPress={() => handleOpenPlayListing('com.thinkwell.app')}
            rightElement={<Ionicons name="logo-google-playstore" size={20} color={colors.primary} />}
          />
          <SettingItem
            title={t('settings.allSemoLabApps')}
            description={t('settings.allSemoLabAppsSubtitle')}
            onPress={handleOpenDeveloperPage}
            isLast={true}
            rightElement={<Ionicons name="open-outline" size={20} color={colors.primary} />}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {t('settings.footerText')}
          </Text>
          <Text style={[styles.copyrightText, { color: colors.textSecondary }]}>
            {t('settings.copyright')}
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
          </ScrollView>
        </KeyboardAvoidingView>

      {/* API Key Input Modal */}
      <Modal
        visible={showApiKeyInput}
        transparent
        animationType="slide"
        onRequestClose={() => setShowApiKeyInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedProvider === 'weatherapi' ? t('settings.weatherApiKey')
                : selectedProvider === 'openweathermap' ? t('settings.openWeatherMapKey')
                : selectedProvider === 'visualcrossing' ? t('settings.visualCrossingKey')
                : selectedProvider === 'qweather' ? t('settings.qweatherKey')
                : t('settings.meteostatKey')}
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              {t('settings.apiKeyModalSubtitle')}
            </Text>
            <TextInput
              style={[styles.importInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder={t('settings.apiKeyPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              value={tempApiKey}
              onChangeText={setTempApiKey}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.border }]}
                onPress={() => setShowApiKeyInput(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  {t('common.cancel')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => handleApiKeyUpdate(selectedProvider)}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  {t('common.save')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, maxWidth: 320 }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {timePickerType === 'daily' ? t('settings.dailyForecastTimeTitle') : t('settings.hourlyForecastTimeTitle')}
            </Text>
            <View style={styles.timePickerRow}>
              <View style={styles.timePickerColumn}>
                <TouchableOpacity onPress={() => setPickerHour((pickerHour + 1) % 24)}>
                  <Ionicons name="chevron-up" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.timePickerValue, { color: colors.text }]}>
                  {ln(pickerHour.toString().padStart(2, '0'))}
                </Text>
                <TouchableOpacity onPress={() => setPickerHour((pickerHour + 23) % 24)}>
                  <Ionicons name="chevron-down" size={28} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.timePickerSeparator, { color: colors.text }]}>:</Text>
              <View style={styles.timePickerColumn}>
                <TouchableOpacity onPress={() => setPickerMinute((pickerMinute + 5) % 60)}>
                  <Ionicons name="chevron-up" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.timePickerValue, { color: colors.text }]}>
                  {ln(pickerMinute.toString().padStart(2, '0'))}
                </Text>
                <TouchableOpacity onPress={() => setPickerMinute((pickerMinute + 55) % 60)}>
                  <Ionicons name="chevron-down" size={28} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.border }]}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>{t('common.cancel')}</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={handleTimeSave}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>{t('common.save')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Threshold Editor Modal */}
      <Modal
        visible={showThresholdModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowThresholdModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {getThresholdTitle()}
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              {t('settings.thresholdModalSubtitle')}
            </Text>
            <TextInput
              style={[styles.thresholdInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder={t('settings.thresholdPlaceholder')}
              placeholderTextColor={colors.textSecondary}
              value={tempThresholdValue}
              onChangeText={setTempThresholdValue}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.border }]}
                onPress={() => setShowThresholdModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  {t('common.cancel')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={handleThresholdSave}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  {t('common.save')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Modal */}
      <Modal
        visible={alertModal.visible}
        transparent
        animationType="fade"
        onRequestClose={dismissAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, maxWidth: 340 }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {alertModal.title}
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary, marginBottom: alertModal.buttons ? 20 : 16 }]}>
              {alertModal.message}
            </Text>
            <View style={styles.modalButtons}>
              {alertModal.buttons ? (
                alertModal.buttons.map((btn, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.modalButton,
                      { backgroundColor: btn.style === 'destructive' ? colors.error : btn.style === 'cancel' ? colors.border : colors.primary }
                    ]}
                    onPress={() => {
                      dismissAlert();
                      btn.onPress?.();
                    }}
                  >
                    <Text style={[styles.modalButtonText, { color: btn.style === 'cancel' ? colors.text : 'white' }]}>
                      {btn.text}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Pressable
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={dismissAlert}
                >
                  <Text style={[styles.modalButtonText, { color: 'white' }]}>
                    {t('common.ok')}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appearanceModeRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  modeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modeChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorDotRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  colorDotSelected: {
    borderWidth: 2.5,
  },
  testersCard: {
    borderRadius: 12,
    padding: 16,
  },
  testersThanks: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  testerName: {
    fontSize: 14,
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: 'white',
  },
  notificationNote: {
    fontSize: 12,
    marginBottom: 12,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemLast: {
    marginBottom: 0,
  },
  settingContent: {
    flex: 1,
    marginRight: 12, // keep long descriptions clear of the trailing icon
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  providerButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  providerButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  providerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customSourceList: {
    marginTop: 12,
    gap: 10,
  },
  customMetricRow: {
    gap: 6,
  },
  customMetricLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  customMetricChips: {
    flexDirection: 'row',
    gap: 6,
  },
  customMetricChip: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  customMetricChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  customSourceHint: {
    fontSize: 11,
    marginTop: 2,
  },
  unitButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
  },
  intervalButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  intervalButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  intervalText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  importInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  thresholdButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  thresholdButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  thresholdInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 8,
  },
  timePickerColumn: {
    alignItems: 'center',
    gap: 8,
  },
  timePickerValue: {
    fontSize: 36,
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'center',
  },
  timePickerSeparator: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});