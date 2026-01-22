import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Share
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings, WeatherProvider, TemperatureUnit } from '../contexts/SettingsContext';
import { useNotifications } from '../contexts/NotificationContext';
import { APP_VERSION } from '../config/version';

interface SettingsScreenProps {
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  const { theme, toggleTheme, colors } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useSettings();
  const { sendTestNotification, isInitialized } = useNotifications();
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'weatherapi' | 'openweathermap' | 'visualcrossing' | 'qweather' | 'meteostat'>('weatherapi');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');


  const handleProviderChange = (provider: WeatherProvider) => {
    updateSetting('weatherProvider', provider);
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
    Alert.alert('Success', 'API key updated successfully');
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetSettings();
            Alert.alert('Success', 'Settings reset to default');
          }
        }
      ]
    );
  };

  const handleExport = async () => {
    try {
      const settingsJson = exportSettings();
      const fileName = `WeatherWell_Settings_${new Date().toISOString().split('T')[0]}.json`;
      
      await Share.share({
        message: settingsJson,
        title: 'WeatherWell Settings Export',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export settings');
    }
  };

  const handleImport = async () => {
    if (!importText.trim()) {
      Alert.alert('Error', 'Please paste your settings data');
      return;
    }

    const success = await importSettings(importText);
    if (success) {
      Alert.alert('Success', 'Settings imported successfully');
      setShowImportModal(false);
      setImportText('');
    } else {
      Alert.alert('Error', 'Invalid settings data');
    }
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://sepehrmohammady.ir/');
  };

  const handleOpenGitHub = () => {
    Linking.openURL('https://github.com/SepehrMohammady/WeatherWell');
  };

  const SettingItem: React.FC<{
    title: string;
    subtitle?: string;
    description?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    compact?: boolean;
    isLast?: boolean;
  }> = ({ title, subtitle, description, rightElement, onPress, compact = false, isLast = false }) => (
    <TouchableOpacity
      style={[
        compact ? styles.settingItemCompact : styles.settingItem, 
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
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
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
            Appearance
          </Text>
          <SettingItem
            title="Dark Mode"
            subtitle={`Currently using ${theme} theme`}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={theme === 'dark' ? colors.accent : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* Weather Provider Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weather Data
          </Text>
          <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Weather Provider
              </Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                {settings.weatherProvider === 'weatherapi' 
                  ? 'WeatherAPI - Most accurate with full astronomy data' 
                  : settings.weatherProvider === 'openweathermap'
                    ? '✓ OpenWeatherMap - Reliable forecasts, limited astronomy'
                    : settings.weatherProvider === 'visualcrossing'
                    ? '✓ Visual Crossing - Good data, limited moon phase'
                    : settings.weatherProvider === 'openmeteo'
                    ? '✓ Open-Meteo - Free, no moon phase data'
                    : settings.weatherProvider === 'qweather'
                    ? '⚠ QWeather - May require paid plan'
                    : '⚠ Meteostat - Historical data only, not for forecasts'
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
            </View>
          </View>

          <SettingItem
            title="Temperature Unit"
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
            title="Refresh Interval"
            subtitle={`Update every ${settings.refreshInterval} minutes`}
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
                      {interval}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          />

          {/* API Keys Configuration */}
          <SettingItem
            title="WeatherAPI Key"
            subtitle={settings.weatherApiKey ? 'Custom key configured' : 'Using default key'}
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
            title="OpenWeatherMap Key"
            subtitle={settings.openWeatherMapApiKey ? 'Custom key configured' : 'Using default key'}
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
            title="Visual Crossing Key"
            subtitle={settings.visualCrossingApiKey ? 'Custom key configured' : 'Using default key'}
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
            title="QWeather Key"
            subtitle={settings.qweatherApiKey && settings.qweatherApiKey !== 'b196010778a24af19765ed70af849801' ? 'Custom key configured' : 'Using default key'}
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
            title="Meteostat Key (RapidAPI)"
            subtitle={settings.meteostatApiKey && settings.meteostatApiKey !== '93d3a5f1d3msh36569bf37d01a27p1c06ecjsna9f86b114ae8' ? 'Custom key configured' : 'Using default key'}
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
            Display Options
          </Text>
          <SettingItem
            title="Show Feels Like Temperature"
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
            title="Show Humidity"
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
            title="Show Pressure"
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
            title="Show Visibility"
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
            title="Show UV Index"
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
            title="Show Wind Speed"
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
            title="Show Wind Direction"
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
            title="Show Air Quality"
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
            Notifications
          </Text>
          <SettingItem
            title="Enable Notifications"
            subtitle="Master switch for all weather notifications"
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
                title="Severe Weather Alerts"
                subtitle="Thunderstorms, heavy rain, strong winds"
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
                title="Daily Forecast"
                subtitle={`Daily weather summary at ${settings.dailyForecastTime}`}
                rightElement={
                  <Switch
                    value={settings.enableDailyForecast}
                    onValueChange={(value) => updateSetting('enableDailyForecast', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableDailyForecast ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="Temperature Alerts"
                subtitle={`High: ${settings.temperatureThresholdHigh}°C, Low: ${settings.temperatureThresholdLow}°C`}
                rightElement={
                  <Switch
                    value={settings.enableTemperatureAlerts}
                    onValueChange={(value) => updateSetting('enableTemperatureAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableTemperatureAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="UV Index Alerts"
                subtitle={`Alert when UV index exceeds ${settings.uvThreshold}`}
                rightElement={
                  <Switch
                    value={settings.enableUVAlerts}
                    onValueChange={(value) => updateSetting('enableUVAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableUVAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="Hourly Forecast"
                subtitle={`Hourly weather updates at ${settings.hourlyForecastTime || '18:00'}`}
                rightElement={
                  <Switch
                    value={settings.enableHourlyForecast}
                    onValueChange={(value) => updateSetting('enableHourlyForecast', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableHourlyForecast ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="Umbrella Alerts"
                subtitle={`Rain alerts when chance exceeds ${settings.rainThreshold || 70}%`}
                rightElement={
                  <Switch
                    value={settings.enableUmbrellaAlerts}
                    onValueChange={(value) => updateSetting('enableUmbrellaAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableUmbrellaAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="Wind Alerts"
                subtitle={`Strong wind alerts above ${settings.windSpeedThreshold || 50} km/h`}
                rightElement={
                  <Switch
                    value={settings.enableWindAlerts}
                    onValueChange={(value) => updateSetting('enableWindAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableWindAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
              
              <SettingItem
                title="Air Quality Alerts"
                subtitle="AQI alerts for unhealthy air quality levels"
                rightElement={
                  <Switch
                    value={settings.enableAQIAlerts}
                    onValueChange={(value) => updateSetting('enableAQIAlerts', value)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={settings.enableAQIAlerts ? colors.accent : '#f4f3f4'}
                  />
                }
              />
            </>
          )}
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Privacy
          </Text>
          <SettingItem
            title="Share Location in Weather Data"
            subtitle="Include location when sharing weather"
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
            Advanced
          </Text>
          <SettingItem
            title="Export Settings"
            subtitle="Save settings as file for backup"
            rightElement={
              <TouchableOpacity onPress={handleExport}>
                <Ionicons name="cloud-upload-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={handleExport}
          />
          <SettingItem
            title="Import Settings"
            subtitle="Restore settings from backup"
            rightElement={
              <TouchableOpacity onPress={() => setShowImportModal(true)}>
                <Ionicons name="cloud-download-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={() => setShowImportModal(true)}
          />
          <SettingItem
            title="Test Notification"
            subtitle="Send a test notification (real weather data sent when app loads)"
            rightElement={
              <TouchableOpacity 
                onPress={sendTestNotification}
                disabled={!isInitialized || !settings.enableNotifications}
              >
                <Ionicons 
                  name="notifications-outline" 
                  size={24} 
                  color={isInitialized && settings.enableNotifications ? colors.primary : colors.textSecondary} 
                />
              </TouchableOpacity>
            }
            onPress={sendTestNotification}
          />
          <SettingItem
            title="Reset to Defaults"
            subtitle="Reset all settings to original values"
            rightElement={
              <TouchableOpacity onPress={handleReset}>
                <Ionicons name="refresh-outline" size={24} color={colors.error} />
              </TouchableOpacity>
            }
            onPress={handleReset}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>
          <SettingItem
            title="WeatherWell"
            description="Cross-platform weather app"
            rightElement={null}
          />
          <SettingItem
            title="Version"
            description={APP_VERSION}
            rightElement={null}
          />
          <SettingItem
            title="Developer"
            description="Sepehr Mohammady"
            onPress={handleOpenWebsite}
            rightElement={<Ionicons name="open-outline" size={20} color={colors.primary} />}
          />
          <SettingItem
            title="Source Code"
            description="github.com/SepehrMohammady/WeatherWell"
            onPress={handleOpenGitHub}
            rightElement={<Ionicons name="logo-github" size={20} color={colors.primary} />}
          />
          <SettingItem
            title="Privacy"
            description="No personal data is collected or shared"
            isLast={true}
            rightElement={null}
          />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            WeatherWell provides accurate weather forecasts with privacy-first approach. No personal data is collected or shared.
          </Text>
          <Text style={[styles.copyrightText, { color: colors.textSecondary }]}>
            © 2026 Sepehr Mohammady. Open source under MIT License.
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
              {selectedProvider === 'weatherapi' ? 'WeatherAPI Key' 
                : selectedProvider === 'openweathermap' ? 'OpenWeatherMap Key'
                : selectedProvider === 'visualcrossing' ? 'Visual Crossing Key'
                : selectedProvider === 'qweather' ? 'QWeather Key'
                : 'Meteostat Key (RapidAPI)'}
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              Enter your API key or leave blank to use demo key
            </Text>
            <TextInput
              style={[styles.importInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Enter API key..."
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
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => handleApiKeyUpdate(selectedProvider)}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Import Modal */}
      <Modal
        visible={showImportModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowImportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Import Settings
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              Paste your exported settings data below
            </Text>
            <TextInput
              style={[styles.importInput, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Paste your settings JSON here..."
              placeholderTextColor={colors.textSecondary}
              value={importText}
              onChangeText={setImportText}
              multiline
              numberOfLines={10}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.border }]}
                onPress={() => setShowImportModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={handleImport}
              >
                <Text style={[styles.modalButtonText, { color: 'white' }]}>
                  Import
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  settingItemLast: {
    marginBottom: 0,
  },
  settingContent: {
    flex: 1,
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