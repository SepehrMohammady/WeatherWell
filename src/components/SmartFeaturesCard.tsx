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

  const getUmbrellaRecommendation = () => {
    const precipChance = weatherData.forecast.daily[0]?.precipitationChance || 0;
    if (precipChance > 70) {
      return { text: "Definitely bring an umbrella!", emoji: "☂️", color: "#e17055" };
    } else if (precipChance > 30) {
      return { text: "Consider bringing an umbrella", emoji: "🌂", color: "#fdcb6e" };
    } else {
      return { text: "No umbrella needed today", emoji: "☀️", color: "#00b894" };
    }
  };

  const getClothingRecommendation = () => {
    const temp = weatherData.current.temperature;
    const windSpeed = weatherData.current.windSpeed;
    const precipChance = weatherData.forecast.daily[0]?.precipitationChance || 0;

    if (temp < 5) {
      return { text: "Heavy winter coat, scarf, gloves", emoji: "🧥", color: "#74b9ff" };
    } else if (temp < 15) {
      return { text: "Jacket or warm sweater", emoji: "🧥", color: "#81ecec" };
    } else if (temp < 25) {
      return { text: "Light sweater or long sleeves", emoji: "👕", color: "#00b894" };
    } else {
      return { text: "T-shirt or light clothing", emoji: "👔", color: "#fdcb6e" };
    }
  };

  const getUVRecommendation = () => {
    const uvIndex = weatherData.current.uvIndex;
    if (uvIndex >= 8) {
      return { text: "Wear sunglasses & sunscreen SPF 30+", emoji: "🕶️", color: "#e17055" };
    } else if (uvIndex >= 6) {
      return { text: "Consider sunglasses & sunscreen", emoji: "🧴", color: "#fdcb6e" };
    } else if (uvIndex >= 3) {
      return { text: "Light sun protection recommended", emoji: "☀️", color: "#00b894" };
    } else {
      return { text: "No sun protection needed", emoji: "🌤️", color: "#74b9ff" };
    }
  };

  const getMaskRecommendation = () => {
    const aqi = weatherData.airQuality?.aqi || 1;
    if (aqi >= 4) {
      return { text: "Wear a mask outdoors", emoji: "😷", color: "#e17055" };
    } else if (aqi >= 3) {
      return { text: "Consider wearing a mask", emoji: "😐", color: "#fdcb6e" };
    } else {
      return { text: "No mask needed", emoji: "😊", color: "#00b894" };
    }
  };

  const getAirQualityStatus = () => {
    const aqi = weatherData.airQuality?.aqi || 1;
    if (aqi <= 2) {
      return { text: "Air quality is good", emoji: "💚", color: "#00b894" };
    } else if (aqi <= 3) {
      return { text: "Moderate air quality", emoji: "💛", color: "#fdcb6e" };
    } else if (aqi <= 4) {
      return { text: "Poor air quality", emoji: "🧡", color: "#e17055" };
    } else {
      return { text: "Very poor air quality", emoji: "🔴", color: "#d63031" };
    }
  };

  const umbrella = getUmbrellaRecommendation();
  const clothing = getClothingRecommendation();
  const uvProtection = getUVRecommendation();
  const maskAdvice = getMaskRecommendation();
  const airQuality = getAirQualityStatus();

  const renderHourlyDetails = (type: string) => {
    const hourlyData = weatherData.forecast.hourly.slice(0, 12); // Next 12 hours
    
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
                {type === 'airquality' && '💨 Hourly Air Quality'}
              </Text>
              <TouchableOpacity onPress={() => setExpandedItem(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              {hourlyData.map((hour, index) => (
                <View key={index} style={[styles.hourlyItem, { borderBottomColor: colors.border }]}>
                  <Text style={[styles.hourlyTime, { color: colors.text }]}>
                    {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
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
                  {type === 'airquality' && weatherData.airQuality && (
                    <View style={styles.hourlyDetail}>
                      <Text style={[styles.hourlyValue, { color: colors.text }]}>
                        AQI {weatherData.airQuality.aqi}
                      </Text>
                      <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                        PM2.5: {Math.round(weatherData.airQuality.pm2_5)}μg/m³
                      </Text>
                    </View>
                  )}
                </View>
              ))}
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
                
                return (
                  <View key={index} style={[styles.hourlyItem, { borderBottomColor: colors.border }]}>
                    <Text style={[styles.hourlyTime, { color: colors.text }]}>
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                    {type === 'sun' && (
                      <View style={styles.hourlyDetail}>
                        {dayAstronomy ? (
                          <>
                            <Text style={[styles.hourlyValue, { color: colors.text }]}>
                              ☀️ {dayAstronomy.sunrise}
                            </Text>
                            <Text style={[styles.hourlyCondition, { color: colors.textSecondary }]}>
                              🌙 {dayAstronomy.sunset}
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
                        {dayAstronomy ? (
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
              Sunrise: {weatherData.astronomy.sunrise} • Sunset: {weatherData.astronomy.sunset}
            </Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              Daylight: {(() => {
                try {
                  // Check if we have valid sunrise and sunset times
                  if (!weatherData.astronomy.sunrise || !weatherData.astronomy.sunset || 
                      weatherData.astronomy.sunrise === 'N/A' || weatherData.astronomy.sunset === 'N/A') {
                    return 'Not available';
                  }
                  
                  const sunrise = new Date(`1970-01-01T${weatherData.astronomy.sunrise}`);
                  const sunset = new Date(`1970-01-01T${weatherData.astronomy.sunset}`);
                  
                  // Check if dates are valid
                  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
                    return 'Not available';
                  }
                  
                  const diff = sunset.getTime() - sunrise.getTime();
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  
                  if (isNaN(hours) || isNaN(minutes)) {
                    return 'Not available';
                  }
                  
                  return `${hours}h ${minutes}m`;
                } catch (error) {
                  return 'Not available';
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
              {weatherData.astronomy.moonPhase}
            </Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              Illumination: {Math.round(weatherData.astronomy.moonIllumination * 100)}%
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