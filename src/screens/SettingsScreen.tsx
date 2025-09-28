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
  Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings, WeatherProvider, TemperatureUnit } from '../contexts/SettingsContext';

interface SettingsScreenProps {
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  const { theme, toggleTheme, colors } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useSettings();
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  const handleProviderChange = (provider: WeatherProvider) => {
    updateSetting('weatherProvider', provider);
  };

  const handleUnitChange = (unit: TemperatureUnit) => {
    updateSetting('temperatureUnit', unit);
  };

  const handleApiKeyUpdate = (provider: 'weatherapi' | 'openweathermap') => {
    const key = provider === 'weatherapi' ? 'weatherApiKey' : 'openWeatherMapApiKey';
    updateSetting(key, tempApiKey || null);
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

  const handleExport = () => {
    const settingsJson = exportSettings();
    Alert.alert(
      'Export Settings',
      'Your settings have been exported. You can copy the JSON data from this alert.',
      [
        { text: 'Cancel' },
        { 
          text: 'Copy', 
          onPress: () => {
            // In a real app, you'd use Clipboard.setString(settingsJson)
            Alert.alert('Settings Data', settingsJson, [
              { text: 'Close' }
            ]);
          }
        }
      ]
    );
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

  const SettingItem: React.FC<{
    title: string;
    subtitle?: string;
    rightElement: React.ReactNode;
    onPress?: () => void;
  }> = ({ title, subtitle, rightElement, onPress }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: colors.surface }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={colors.gradient as [string, string, ...string[]]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

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
          <SettingItem
            title="Weather Provider"
            subtitle={`Currently using ${settings.weatherProvider === 'weatherapi' ? 'WeatherAPI' : 'OpenWeatherMap'}`}
            rightElement={
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
            }
          />

          <SettingItem
            title="Temperature Unit"
            rightElement={
              <View style={styles.providerButtons}>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.temperatureUnit === 'celsius' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleUnitChange('celsius')}
                >
                  <Text style={[styles.providerText, { color: settings.temperatureUnit === 'celsius' ? 'white' : colors.text }]}>
                    °C
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.providerButton,
                    { backgroundColor: settings.temperatureUnit === 'fahrenheit' ? colors.primary : colors.border }
                  ]}
                  onPress={() => handleUnitChange('fahrenheit')}
                >
                  <Text style={[styles.providerText, { color: settings.temperatureUnit === 'fahrenheit' ? 'white' : colors.text }]}>
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
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Text>
          <SettingItem
            title="Enable Notifications"
            subtitle="Weather alerts and updates"
            rightElement={
              <Switch
                value={settings.enableNotifications}
                onValueChange={(value) => updateSetting('enableNotifications', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={settings.enableNotifications ? colors.accent : '#f4f3f4'}
              />
            }
          />
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
            subtitle="Save your settings configuration"
            rightElement={
              <TouchableOpacity onPress={handleExport}>
                <Ionicons name="download-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={handleExport}
          />
          <SettingItem
            title="Import Settings"
            subtitle="Restore settings from backup"
            rightElement={
              <TouchableOpacity onPress={() => setShowImportModal(true)}>
                <Ionicons name="cloud-upload-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            }
            onPress={() => setShowImportModal(true)}
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

        <View style={styles.bottomSpacing} />
      </ScrollView>

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
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: 'white',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
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
  },
  providerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  providerText: {
    fontSize: 14,
    fontWeight: '500',
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
    marginBottom: 20,
    textAlign: 'center',
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
});