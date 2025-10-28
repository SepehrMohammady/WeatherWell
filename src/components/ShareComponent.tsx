import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Share } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { WeatherData } from '../services/types';

interface ShareOptions {
  includeLocation: boolean;
  includeCurrent: boolean;
  includeHourly: boolean;
  includeDaily: boolean;
  includeFeelsLike: boolean;
  includeHumidity: boolean;
  includePressure: boolean;
  includeVisibility: boolean;
  includeUV: boolean;
  includeWind: boolean;
}

interface ShareComponentProps {
  weatherData: WeatherData;
  locationName?: string;
}

export const ShareComponent: React.FC<ShareComponentProps> = ({ 
  weatherData, 
  locationName = 'Current Location' 
}) => {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const [showModal, setShowModal] = useState(false);
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    includeLocation: settings.enableShareLocation,
    includeCurrent: true,
    includeHourly: false,
    includeDaily: false,
    includeFeelsLike: settings.showFeelsLike,
    includeHumidity: settings.showHumidity,
    includePressure: settings.showPressure,
    includeVisibility: settings.showVisibility,
    includeUV: true,
    includeWind: true,
  });

  const formatTemperature = (temp: number) => {
    const rounded = Math.round(temp);
    return settings.temperatureUnit === 'fahrenheit' 
      ? `${Math.round(temp * 9/5 + 32)}°F`
      : `${rounded}°C`;
  };

  const generateShareText = (): string => {
    const { current, forecast } = weatherData;
    let shareText = '';

    // Header
    shareText += '🌤️ Weather Report\n';
    shareText += '━━━━━━━━━━━━━━━━\n\n';

    // Location
    if (shareOptions.includeLocation) {
      shareText += `📍 Location: ${locationName}\n\n`;
    }

    // Current Weather
    if (shareOptions.includeCurrent) {
      shareText += '🌡️ Current Weather:\n';
      shareText += `Temperature: ${formatTemperature(current.temperature)}`;
      
      if (shareOptions.includeFeelsLike) {
        shareText += ` (feels like ${formatTemperature(current.feelsLike)})`;
      }
      shareText += '\n';
      
      shareText += `Condition: ${current.condition}\n`;
      
      if (shareOptions.includeHumidity) {
        shareText += `Humidity: ${current.humidity}%\n`;
      }
      
      if (shareOptions.includePressure) {
        shareText += `Pressure: ${current.pressure} hPa\n`;
      }
      
      if (shareOptions.includeVisibility) {
        shareText += `Visibility: ${current.visibility} km\n`;
      }
      
      if (shareOptions.includeUV) {
        shareText += `UV Index: ${current.uvIndex}\n`;
      }
      
      if (shareOptions.includeWind) {
        shareText += `Wind: ${current.windSpeed} km/h ${current.windDirection}\n`;
      }
      
      shareText += '\n';
    }

    // Hourly Forecast
    if (shareOptions.includeHourly && forecast.hourly.length > 0) {
      shareText += '⏰ Next 12 Hours:\n';
      forecast.hourly.slice(0, 12).forEach((hour, index) => {
        const time = new Date(hour.time).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        shareText += `${time}: ${formatTemperature(hour.temperature)} - ${hour.condition}\n`;
      });
      shareText += '\n';
    }

    // Daily Forecast
    if (shareOptions.includeDaily && forecast.daily.length > 0) {
      shareText += '📅 Future Forecast:\n';
      forecast.daily.slice(0, 7).forEach((day) => {
        const dayName = new Date(day.date).toLocaleDateString([], { weekday: 'short' });
        shareText += `${dayName}: ${formatTemperature(day.maxTemp)}/${formatTemperature(day.minTemp)} - ${day.condition}`;
        if (day.precipitationChance > 0) {
          shareText += ` (${day.precipitationChance}% rain)`;
        }
        shareText += '\n';
      });
      shareText += '\n';
    }

    // Footer
    shareText += '━━━━━━━━━━━━━━━━\n';
    shareText += '📱 Shared from WeatherWell';

    return shareText;
  };

  const handleShare = async (platform?: string) => {
    const shareText = generateShareText();
    const shareOptions = {
      message: shareText,
      title: `Weather Report - ${locationName}`,
    };

    try {
      await Share.share(shareOptions);
      setShowModal(false);
    } catch (error: any) {
      if (error?.message !== 'User did not share') {
        Alert.alert('Share Error', 'Failed to share weather data');
      }
    }
  };

  const handleQuickShare = () => {
    handleShare();
  };

  const ShareOption: React.FC<{
    title: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }> = ({ title, subtitle, value, onValueChange }) => (
    <View style={[styles.shareOption, { backgroundColor: colors.surface }]}>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? colors.accent : '#f4f3f4'}
      />
    </View>
  );

  return (
    <>
      {/* Quick Share Button */}
      <View style={styles.shareButtons}>
        <TouchableOpacity
          style={[styles.quickShareButton, { backgroundColor: colors.primary }]}
          onPress={handleQuickShare}
        >
          <Ionicons name="share-outline" size={20} color="white" />
          <Text style={styles.quickShareText}>Quick Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.customShareButton, { backgroundColor: colors.surface }]}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="options-outline" size={20} color={colors.primary} />
          <Text style={[styles.customShareText, { color: colors.primary }]}>
            Customize Share
          </Text>
        </TouchableOpacity>
      </View>

      {/* Share Options Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Share Options
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
              {/* Content Options */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Content to Include
              </Text>
              
              <ShareOption
                title="Location"
                subtitle="Include location name in shared weather"
                value={shareOptions.includeLocation}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeLocation: value }))
                }
              />
              
              <ShareOption
                title="Current Weather"
                subtitle="Temperature and current conditions"
                value={shareOptions.includeCurrent}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeCurrent: value }))
                }
              />
              
              <ShareOption
                title="Hourly Forecast"
                subtitle="Next 12 hours forecast"
                value={shareOptions.includeHourly}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeHourly: value }))
                }
              />
              
              <ShareOption
                title="Daily Forecast"
                subtitle="7-day weather forecast"
                value={shareOptions.includeDaily}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeDaily: value }))
                }
              />

              {/* Detail Options */}
              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
                Weather Details
              </Text>
              
              <ShareOption
                title="Feels Like Temperature"
                value={shareOptions.includeFeelsLike}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeFeelsLike: value }))
                }
              />
              
              <ShareOption
                title="Humidity"
                value={shareOptions.includeHumidity}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeHumidity: value }))
                }
              />
              
              <ShareOption
                title="Atmospheric Pressure"
                value={shareOptions.includePressure}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includePressure: value }))
                }
              />
              
              <ShareOption
                title="Visibility"
                value={shareOptions.includeVisibility}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeVisibility: value }))
                }
              />
              
              <ShareOption
                title="UV Index"
                value={shareOptions.includeUV}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeUV: value }))
                }
              />
              
              <ShareOption
                title="Wind Information"
                value={shareOptions.includeWind}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeWind: value }))
                }
              />
            </ScrollView>

            {/* Share Action Button */}
            <View style={styles.shareActionContainer}>
              <TouchableOpacity
                style={[styles.shareActionButton, { backgroundColor: colors.primary }]}
                onPress={() => handleShare()}
              >
                <Ionicons name="share-outline" size={24} color="white" />
                <Text style={styles.shareActionText}>Share Weather Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  shareButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  quickShareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  quickShareText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  customShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  customShareText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 4,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
  },
  shareActionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  shareActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  shareActionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});