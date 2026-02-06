import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';

interface SmartFeaturesCardProps {
  weatherData: WeatherData;
  onUmbrellaAlert?: () => void;
  onClothingSuggestion?: () => void;
}

export const SmartFeaturesCard: React.FC<SmartFeaturesCardProps> = ({ 
  weatherData, 
  onUmbrellaAlert,
  onClothingSuggestion 
}) => {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showAstronomyDetail, setShowAstronomyDetail] = useState<string | null>(null);

  // Get remaining hourly data for today (from current hour onwards - FUTURE only)
  const getRemainingHourlyData = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const todayStr = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    
    return weatherData.forecast.hourly.filter(hour => {
      // Handle both "YYYY-MM-DD HH:MM" and ISO format
      const timeStr = hour.time.replace(' ', 'T');
      const hourTime = new Date(timeStr);
      const hourDate = hour.time.split(' ')[0] || hour.time.split('T')[0];
      const hourHour = hourTime.getHours();
      
      // Only include future hours from today
      return hourDate === todayStr && hourHour > currentHour;
    });
  };

  const getUmbrellaRecommendation = () => {
    // Check worst case: max precipitation chance from current hour until end of day
    const remainingHours = getRemainingHourlyData();
    const dailyPrecip = weatherData.forecast.daily[0]?.precipitationChance || 0;
    const hourlyMaxPrecip = remainingHours.length > 0 
      ? Math.max(...remainingHours.map(h => h.precipitationChance || 0))
      : dailyPrecip;
    const precipChance = Math.max(dailyPrecip, hourlyMaxPrecip);
    
    if (precipChance > 70) {
      return { text: "Definitely bring an umbrella!", emoji: "☂️", color: "#e17055" };
    } else if (precipChance > 30) {
      return { text: "Consider bringing an umbrella", emoji: "🌂", color: "#fdcb6e" };
    } else {
      return { text: "No umbrella needed today", emoji: "☀️", color: "#00b894" };
    }
  };

  const getClothingRecommendation = () => {
    // Use minimum temperature from remaining hours for worst-case cold scenario
    const remainingHours = getRemainingHourlyData();
    const currentTemp = weatherData.current.temperature;
    const minTemp = remainingHours.length > 0
      ? Math.min(currentTemp, ...remainingHours.map(h => h.temperature))
      : currentTemp;

    if (minTemp < 5) {
      return { text: "Heavy winter coat, scarf, gloves", emoji: "🧥", color: "#74b9ff" };
    } else if (minTemp < 15) {
      return { text: "Jacket or warm sweater", emoji: "🧥", color: "#81ecec" };
    } else if (minTemp < 25) {
      return { text: "Light sweater or long sleeves", emoji: "👕", color: "#00b894" };
    } else {
      return { text: "T-shirt or light clothing", emoji: "👔", color: "#fdcb6e" };
    }
  };

  const getUVRecommendation = () => {
    // Use maximum UV index from remaining hours for worst-case scenario
    const remainingHours = getRemainingHourlyData();
    const currentUV = weatherData.current.uvIndex;
    const maxUV = remainingHours.length > 0
      ? Math.max(currentUV, ...remainingHours.map(h => h.uvIndex || 0))
      : currentUV;
    
    if (maxUV >= 8) {
      return { text: "Wear sunglasses & sunscreen SPF 30+", emoji: "🕶️", color: "#e17055" };
    } else if (maxUV >= 6) {
      return { text: "Consider sunglasses & sunscreen", emoji: "🧴", color: "#fdcb6e" };
    } else if (maxUV >= 3) {
      return { text: "Light sun protection recommended", emoji: "☀️", color: "#00b894" };
    } else {
      return { text: "No sun protection needed", emoji: "🌤️", color: "#74b9ff" };
    }
  };

  const getMaskRecommendation = () => {
    // AQI is now 0-500 scale (EPA standard)
    const aqi = weatherData.airQuality?.aqi || 0;
    if (aqi > 150) {
      return { text: "Wear a mask outdoors", emoji: "😷", color: "#e17055" };
    } else if (aqi > 100) {
      return { text: "Consider wearing a mask", emoji: "😐", color: "#fdcb6e" };
    } else {
      return { text: "No mask needed", emoji: "😊", color: "#00b894" };
    }
  };

  const getAirQualityStatus = () => {
    // AQI is now 0-500 scale (EPA standard)
    const aqi = weatherData.airQuality?.aqi || 0;
    if (aqi <= 50) {
      return { text: "Air quality is good", emoji: "💚", color: "#00b894" };
    } else if (aqi <= 100) {
      return { text: "Moderate air quality", emoji: "💛", color: "#fdcb6e" };
    } else if (aqi <= 150) {
      return { text: "Unhealthy for sensitive", emoji: "🧡", color: "#e17055" };
    } else {
      return { text: "Unhealthy air quality", emoji: "🔴", color: "#d63031" };
    }
  };

  const umbrella = getUmbrellaRecommendation();
  const clothing = getClothingRecommendation();
  const uvProtection = getUVRecommendation();
  const maskAdvice = getMaskRecommendation();
  const airQuality = getAirQualityStatus();

  const renderHourlyDetails = (type: string) => {
    const hourlyData = weatherData.forecast.hourly.slice(0, 24); // Next 24 hours
    
    // Helper to check if hour is current
    const isCurrentHour = (timeString: string): boolean => {
      try {
        const hourDate = new Date(timeString);
        const now = new Date();
        return hourDate.getHours() === now.getHours() && 
               hourDate.toDateString() === now.toDateString();
      } catch (e) {
        return false;
      }
    };
    
    // Air Quality uses daily data (only current is available)
    if (type === 'airquality') {
      return (
        <Modal
          visible={expandedItem === type}
          transparent
          animationType="slide"
          onRequestClose={() => setExpandedItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  🌬️ Daily Air Quality
                </Text>
                <TouchableOpacity onPress={() => setExpandedItem(null)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalScroll}>
                {weatherData.airQuality && (
                  <View style={[styles.hourlyItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.hourlyTime, { color: colors.text }]}>
                      {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                    <View style={styles.hourlyDetail}>
                      <Text style={[styles.hourlyValue, { color: colors.text }]}>
                        AQI {weatherData.airQuality.aqi}
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      );
    }
    
    return (
      <Modal
        visible={expandedItem === type}
        transparent
        animationType="slide"
        onRequestClose={() => setExpandedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {type === 'umbrella' && '☂️ Hourly Rain Forecast'}
                {type === 'clothing' && '🧥 Hourly Temperature'}
                {type === 'uv' && '☀️ Hourly UV Index'}
              </Text>
              <TouchableOpacity onPress={() => setExpandedItem(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              {hourlyData.map((hour, index) => {
                const isCurrent = isCurrentHour(hour.time);
                return (
                <View key={index} style={[
                  styles.hourlyItem, 
                  { borderBottomColor: colors.border },
                  isCurrent && styles.currentHourItem,
                  isCurrent && { backgroundColor: colors.primary + '20', borderLeftColor: colors.primary }
                ]}>
                  <Text style={[
                    styles.hourlyTime, 
                    { color: isCurrent ? colors.primary : colors.text },
                    isCurrent && { fontWeight: 'bold' }
                  ]}>
                    {isCurrent ? 'Now' : new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </Text>
                  {type === 'umbrella' && (
                    <View style={styles.hourlyDetail}>
                      <Text style={[styles.hourlyValue, { color: colors.text }]}>
                        {hour.precipitationChance}%
                      </Text>
                      <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                        {hour.condition}
                      </Text>
                    </View>
                  )}
                  {type === 'clothing' && (
                    <View style={styles.hourlyDetail}>
                      <Text style={[styles.hourlyValue, { color: colors.text }]}>
                        {Math.round(hour.temperature)}°C
                      </Text>
                      <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                        {hour.condition}
                      </Text>
                    </View>
                  )}
                  {type === 'uv' && (
                    <View style={styles.hourlyDetail}>
                      <Text style={[styles.hourlyValue, { color: colors.text }]}>
                        UV {hour.uvIndex || 0}
                      </Text>
                      <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                        {hour.uvIndex && hour.uvIndex >= 8 ? 'Very High' : 
                         hour.uvIndex && hour.uvIndex >= 6 ? 'High' : 
                         hour.uvIndex && hour.uvIndex >= 3 ? 'Moderate' : 'Low'}
                      </Text>
                    </View>
                  )}
                </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAstronomyDetails = (type: string) => {
    const dailyData = weatherData.forecast.daily.slice(0, 7); // Next 7 days
    
    return (
      <Modal
        visible={showAstronomyDetail === type}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAstronomyDetail(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {type === 'sun' && '☀️ Daily Sun Times'}
                {type === 'moon' && '🌙 Moon Phases'}
              </Text>
              <TouchableOpacity onPress={() => setShowAstronomyDetail(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              {dailyData.map((day, index) => {
                // Use per-day astronomy if available, otherwise fallback to current day's data
                const dayAstronomy = day.astronomy || (index === 0 ? weatherData.astronomy : null);
                const hasSunData = dayAstronomy && dayAstronomy.sunrise && dayAstronomy.sunset;
                const hasMoonData = dayAstronomy && dayAstronomy.moonPhase && dayAstronomy.moonIllumination >= 0;
                
                return (
                  <View key={index} style={[styles.hourlyItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.hourlyTime, { color: colors.text }]}>
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                    {type === 'sun' && (
                      <View style={styles.hourlyDetail}>
                        {hasSunData ? (
                          <>
                            <Text style={[styles.hourlyValue, { color: colors.text }]}>
                              ☀️ {dayAstronomy.sunrise}
                            </Text>
                            <Text style={[styles.hourlyValue, { color: colors.text }]}>
                              � {dayAstronomy.sunset}
                            </Text>
                          </>
                        ) : (
                          <Text style={[styles.hourlyValue, { color: colors.textSecondary }]}>
                            Data not available
                          </Text>
                        )}
                      </View>
                    )}
                    {type === 'moon' && (
                      <View style={styles.hourlyDetail}>
                        {hasMoonData ? (
                          <>
                            <Text style={[styles.hourlyValue, { color: colors.text }]}>
                              {dayAstronomy.moonPhase}
                            </Text>
                            <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                              {Math.round(dayAstronomy.moonIllumination * 100)}% illuminated
                            </Text>
                          </>
                        ) : (
                          <Text style={[styles.hourlyValue, { color: colors.textSecondary }]}>
                            Data not available
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      {/* Recommendations Section */}
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>💡 Recommendations</Text>
        
        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => setExpandedItem('umbrella')}
        >
          <View style={[styles.featureIcon, { backgroundColor: umbrella.color + '20' }]}>
            <Text style={styles.featureEmoji}>{umbrella.emoji}</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Umbrella Alert</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>{umbrella.text}</Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              {weatherData.forecast.daily[0]?.precipitationChance || 0}% chance of rain
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => setExpandedItem('clothing')}
        >
          <View style={[styles.featureIcon, { backgroundColor: clothing.color + '20' }]}>
            <Text style={styles.featureEmoji}>{clothing.emoji}</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Clothing Suggestion</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>{clothing.text}</Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              {Math.round(weatherData.current.temperature)}°C, feels like {Math.round(weatherData.current.feelsLike)}°C
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => setExpandedItem('uv')}
        >
          <View style={[styles.featureIcon, { backgroundColor: uvProtection.color + '20' }]}>
            <Text style={styles.featureEmoji}>{uvProtection.emoji}</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>UV Protection</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>{uvProtection.text}</Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              UV Index: {weatherData.current.uvIndex}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Air Quality moved to Recommendations with expandable details */}
        {weatherData.airQuality && (
          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => setExpandedItem('airquality')}
          >
            <View style={[styles.featureIcon, { backgroundColor: airQuality.color + '20' }]}>
              <Text style={styles.featureEmoji}>{airQuality.emoji}</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Air Quality</Text>
              <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>{maskAdvice.text}</Text>
              <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
                AQI: {weatherData.airQuality?.aqi || 'N/A'} • PM2.5: {weatherData.airQuality ? Math.round(weatherData.airQuality.pm2_5) : 'N/A'}μg/m³
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Render modals for hourly details */}
      {renderHourlyDetails('umbrella')}
      {renderHourlyDetails('clothing')}
      {renderHourlyDetails('uv')}
      {renderHourlyDetails('airquality')}
      {renderAstronomyDetails('sun')}
      {renderAstronomyDetails('moon')}

      {/* Astronomy Section with expandable details */}
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>🌟 Astronomy</Text>
        
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => setShowAstronomyDetail('sun')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#fdcb6e20' }]}>
            <Text style={styles.featureEmoji}>☀️</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Sun Times</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>
              {weatherData.astronomy.sunrise && weatherData.astronomy.sunset
                ? `Sunrise: ${weatherData.astronomy.sunrise} • Sunset: ${weatherData.astronomy.sunset}`
                : 'Data not available'}
            </Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              Daylight: {(() => {
                try {
                  // Check if we have valid sunrise and sunset times
                  if (!weatherData.astronomy.sunrise || !weatherData.astronomy.sunset || 
                      weatherData.astronomy.sunrise === 'N/A' || weatherData.astronomy.sunset === 'N/A') {
                    return 'Data not available';
                  }
                  
                  const sunrise = new Date(`1970-01-01T${weatherData.astronomy.sunrise}`);
                  const sunset = new Date(`1970-01-01T${weatherData.astronomy.sunset}`);
                  
                  // Check if dates are valid
                  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
                    return 'Data not available';
                  }
                  
                  const diff = sunset.getTime() - sunrise.getTime();
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  
                  if (isNaN(hours) || isNaN(minutes)) {
                    return 'Data not available';
                  }
                  
                  return `${hours}h ${minutes}m`;
                } catch (error) {
                  return 'Data not available';
                }
              })()}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => setShowAstronomyDetail('moon')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#74b9ff20' }]}>
            <Text style={styles.featureEmoji}>🌙</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Moon Phase</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>
              {weatherData.astronomy.moonPhase || 'Data not available'}
            </Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              {weatherData.astronomy.moonIllumination >= 0 
                ? `Illumination: ${Math.round(weatherData.astronomy.moonIllumination * 100)}%`
                : 'Illumination: Data not available'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    margin: 16,
    marginTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 20,
    paddingBottom: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  featureDetail: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalScroll: {
    paddingHorizontal: 20,
  },
  hourlyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  currentHourItem: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginLeft: -12,
    borderRadius: 4,
  },
  hourlyTime: {
    fontSize: 14,
    fontWeight: '500',
    width: 80,
  },
  hourlyDetail: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hourlyValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  hourlyCondition: {
    fontSize: 12,
  },
});