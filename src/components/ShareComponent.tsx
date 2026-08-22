import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
  ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Share } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { WeatherData } from '../services/types';

interface ShareOptions {
  includeLocation: boolean;
  includeCurrent: boolean;
  includeHourly: boolean;
  includeDaily: boolean;
  includeAstronomy: boolean;
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
  locationName
}) => {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const { t, ln } = useLanguage();
  const displayLocationName = locationName ?? t('share.currentLocation');
  const [showModal, setShowModal] = useState(false);
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    includeLocation: settings.enableShareLocation,
    includeCurrent: true,
    includeHourly: false,
    includeDaily: false,
    includeAstronomy: false,
    includeFeelsLike: settings.showFeelsLike,
    includeHumidity: settings.showHumidity,
    includePressure: settings.showPressure,
    includeVisibility: settings.showVisibility,
    includeUV: true,
    includeWind: true,
  });

  const formatTemperature = (temp: number) => {
    return settings.temperatureUnit === 'fahrenheit'
      ? t('share.text.tempF', { temp: Math.round(temp * 9/5 + 32) })
      : t('share.text.tempC', { temp: Math.round(temp) });
  };

  const generateShareText = (): string => {
    const { current, forecast } = weatherData;
    let shareText = '';

    // Header
    shareText += `🌤️ ${t('share.text.header')}\n`;
    shareText += '━━━━━━━━━━━━━━━━\n\n';

    // Location
    if (shareOptions.includeLocation) {
      shareText += `📍 ${t('share.text.location', { location: displayLocationName })}\n\n`;
    }

    // Current Weather
    if (shareOptions.includeCurrent) {
      shareText += `🌡️ ${t('share.text.currentWeather')}\n`;
      shareText += t('share.text.temperature', { temp: formatTemperature(current.temperature) });

      if (shareOptions.includeFeelsLike) {
        shareText += ` ${t('share.text.feelsLike', { temp: formatTemperature(current.feelsLike) })}`;
      }
      shareText += '\n';

      shareText += `${t('share.text.condition', { condition: current.condition })}\n`;

      if (shareOptions.includeHumidity) {
        shareText += `${t('share.text.humidity', { humidity: current.humidity })}\n`;
      }

      if (shareOptions.includePressure) {
        shareText += `${t('share.text.pressure', { pressure: current.pressure })}\n`;
      }

      if (shareOptions.includeVisibility) {
        shareText += `${t('share.text.visibility', { visibility: current.visibility })}\n`;
      }

      if (shareOptions.includeUV) {
        shareText += `${t('share.text.uvIndex', { uvIndex: current.uvIndex })}\n`;
      }

      if (shareOptions.includeWind) {
        shareText += `${t('share.text.wind', { speed: current.windSpeed, direction: current.windDirection })}\n`;
      }

      shareText += '\n';
    }

    // Hourly Forecast — starting from the NEXT full hour
    if (shareOptions.includeHourly && forecast.hourly.length > 0) {
      const nextHourStart = new Date();
      nextHourStart.setMinutes(0, 0, 0);
      nextHourStart.setHours(nextHourStart.getHours() + 1);
      const upcomingHours = forecast.hourly
        .filter(hour => new Date(hour.time) >= nextHourStart)
        .slice(0, 12);
      if (upcomingHours.length > 0) {
        shareText += upcomingHours.length >= 12 ? `⏰ ${t('share.text.next12Hours')}\n` : `⏰ ${t('share.text.nextHours')}\n`;
        upcomingHours.forEach(hour => {
          const time = new Date(hour.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });
          shareText += `${t('share.text.hourLine', { time, temp: formatTemperature(hour.temperature), condition: hour.condition })}\n`;
        });
        shareText += '\n';
      }
    }

    // Daily Forecast
    if (shareOptions.includeDaily && forecast.daily.length > 0) {
      shareText += `📅 ${t('share.text.dailyForecast')}\n`;
      forecast.daily.slice(0, 7).forEach((day) => {
        const dayName = new Date(day.date).toLocaleDateString([], { weekday: 'short' });
        shareText += t('share.text.dayLine', {
          day: dayName,
          max: formatTemperature(day.maxTemp),
          min: formatTemperature(day.minTemp),
          condition: day.condition,
        });
        if (day.precipitationChance > 0) {
          shareText += ` ${t('share.text.rainChance', { chance: day.precipitationChance })}`;
        }
        shareText += '\n';
      });
      shareText += '\n';
    }

    // Astronomy
    const astronomy = weatherData.astronomy;
    if (shareOptions.includeAstronomy && astronomy && (astronomy.sunrise || astronomy.sunset || astronomy.moonPhase)) {
      shareText += `🌅 ${t('share.text.astronomy')}\n`;
      if (astronomy.sunrise) {
        shareText += `${t('share.text.sunrise', { time: astronomy.sunrise })}\n`;
      }
      if (astronomy.sunset) {
        shareText += `${t('share.text.sunset', { time: astronomy.sunset })}\n`;
      }
      if (astronomy.moonPhase) {
        shareText += t('share.text.moon', { phase: astronomy.moonPhase });
        if (astronomy.moonIllumination > 0) {
          shareText += ` ${t('share.text.moonIllumination', { percent: Math.round(astronomy.moonIllumination * 100) })}`;
        }
        shareText += '\n';
      }
      shareText += '\n';
    }

    // Footer
    shareText += '━━━━━━━━━━━━━━━━\n';
    shareText += `📱 ${t('share.text.footer')}`;

    return shareText;
  };

  const handleShare = async () => {
    const shareText = generateShareText();
    const shareOptions = {
      message: shareText,
      title: t('share.shareTitle', { location: displayLocationName }),
    };

    try {
      await Share.share(shareOptions);
      setShowModal(false);
    } catch (error: any) {
      if (error?.message !== 'User did not share') {
        Alert.alert(t('share.errorTitle'), t('share.errorMessage'));
      }
    }
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
          onPress={() => handleShare()}
        >
          <Ionicons name="share-outline" size={20} color="white" />
          <Text style={styles.quickShareText}>{t('share.quickShare')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.customShareButton, { backgroundColor: colors.surface }]}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="options-outline" size={20} color={colors.primary} />
          <Text style={[styles.customShareText, { color: colors.primary }]}>
            {t('share.customizeShare')}
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
                {t('share.optionsTitle')}
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
                {t('share.contentSection')}
              </Text>
              
              <ShareOption
                title={t('share.option.location')}
                subtitle={t('share.option.locationSubtitle')}
                value={shareOptions.includeLocation}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeLocation: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.current')}
                subtitle={t('share.option.currentSubtitle')}
                value={shareOptions.includeCurrent}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeCurrent: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.hourly')}
                subtitle={t('share.option.hourlySubtitle')}
                value={shareOptions.includeHourly}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeHourly: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.daily')}
                subtitle={t('share.option.dailySubtitle')}
                value={shareOptions.includeDaily}
                onValueChange={(value) =>
                  setShareOptions(prev => ({ ...prev, includeDaily: value }))
                }
              />

              <ShareOption
                title={t('share.option.astronomy')}
                subtitle={t('share.option.astronomySubtitle')}
                value={shareOptions.includeAstronomy}
                onValueChange={(value) =>
                  setShareOptions(prev => ({ ...prev, includeAstronomy: value }))
                }
              />

              {/* Detail Options */}
              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
                {t('share.detailsSection')}
              </Text>
              
              <ShareOption
                title={t('share.option.feelsLike')}
                value={shareOptions.includeFeelsLike}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeFeelsLike: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.humidity')}
                value={shareOptions.includeHumidity}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeHumidity: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.pressure')}
                value={shareOptions.includePressure}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includePressure: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.visibility')}
                value={shareOptions.includeVisibility}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeVisibility: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.uv')}
                value={shareOptions.includeUV}
                onValueChange={(value) => 
                  setShareOptions(prev => ({ ...prev, includeUV: value }))
                }
              />
              
              <ShareOption
                title={t('share.option.wind')}
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
                <Text style={styles.shareActionText}>{t('share.shareButton')}</Text>
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