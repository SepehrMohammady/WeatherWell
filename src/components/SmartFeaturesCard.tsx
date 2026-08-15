import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';

interface SmartFeaturesCardProps {
  weatherData: WeatherData;
}

export const SmartFeaturesCard: React.FC<SmartFeaturesCardProps> = ({
  weatherData
}) => {
  const { colors } = useTheme();
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
      return { text: "Definitely bring an umbrella!", icon: "umbrella" as IconName, color: "#e17055" };
    } else if (precipChance > 30) {
      return { text: "Consider bringing an umbrella", icon: "umbrella-outline" as IconName, color: "#fdcb6e" };
    } else {
      return { text: "No umbrella needed today", icon: "sunny-outline" as IconName, color: "#00b894" };
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
      return { text: "Heavy winter coat, scarf, gloves", icon: "snow" as IconName, color: "#74b9ff" };
    } else if (minTemp < 15) {
      return { text: "Jacket or warm sweater", icon: "shirt" as IconName, color: "#81ecec" };
    } else if (minTemp < 25) {
      return { text: "Light sweater or long sleeves", icon: "shirt-outline" as IconName, color: "#00b894" };
    } else {
      return { text: "T-shirt or light clothing", icon: "shirt-outline" as IconName, color: "#fdcb6e" };
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
      return { text: "Wear sunglasses & sunscreen SPF 30+", icon: "glasses" as IconName, color: "#e17055" };
    } else if (maxUV >= 6) {
      return { text: "Consider sunglasses & sunscreen", icon: "glasses-outline" as IconName, color: "#fdcb6e" };
    } else if (maxUV >= 3) {
      return { text: "Light sun protection recommended", icon: "sunny-outline" as IconName, color: "#00b894" };
    } else {
      return { text: "No sun protection needed", icon: "partly-sunny-outline" as IconName, color: "#74b9ff" };
    }
  };

  const getMaskRecommendation = () => {
    // AQI is now 0-500 scale (EPA standard)
    const aqi = weatherData.airQuality?.aqi || 0;
    if (aqi > 150) {
      return { text: "Wear a mask outdoors", icon: "alert-circle" as IconName, color: "#e17055" };
    } else if (aqi > 100) {
      return { text: "Consider wearing a mask", icon: "warning-outline" as IconName, color: "#fdcb6e" };
    } else {
      return { text: "No mask needed", icon: "checkmark-circle-outline" as IconName, color: "#00b894" };
    }
  };

  const getAirQualityStatus = () => {
    // AQI is now 0-500 scale (EPA standard)
    const aqi = weatherData.airQuality?.aqi || 0;
    if (aqi <= 50) {
      return { text: "Air quality is good", icon: "leaf" as IconName, color: "#00b894" };
    } else if (aqi <= 100) {
      return { text: "Moderate air quality", icon: "leaf-outline" as IconName, color: "#fdcb6e" };
    } else if (aqi <= 150) {
      return { text: "Unhealthy for sensitive", icon: "warning-outline" as IconName, color: "#e17055" };
    } else {
      return { text: "Unhealthy air quality", icon: "alert-circle" as IconName, color: "#d63031" };
    }
  };

  const umbrella = getUmbrellaRecommendation();
  const clothing = getClothingRecommendation();
  const uvProtection = getUVRecommendation();
  const maskAdvice = getMaskRecommendation();
  const airQuality = getAirQualityStatus();
  
  // Ref for auto-scrolling to current hour in recommendations
  const recommendationScrollRef = useRef<ScrollView>(null);
  
  // Find current hour index for auto-scroll
  const getCurrentHourIndex = () => {
    const now = new Date();
    const hourlyData = weatherData.forecast.hourly.slice(0, 24);
    return hourlyData.findIndex(hour => {
      const hourDate = new Date(hour.time);
      return hourDate.getHours() === now.getHours() && 
             hourDate.toDateString() === now.toDateString();
    });
  };
  
  // Auto-scroll to current hour when modal opens
  useEffect(() => {
    if (expandedItem && expandedItem !== 'airquality') {
      const currentIndex = getCurrentHourIndex();
      if (currentIndex > 0 && recommendationScrollRef.current) {
        // Each hourly item is approximately 56px high (paddingVertical: 12 * 2 + content)
        const scrollPosition = Math.max(0, (currentIndex - 1) * 56);
        setTimeout(() => {
          recommendationScrollRef.current?.scrollTo({ y: scrollPosition, animated: true });
        }, 300);
      }
    }
  }, [expandedItem]);

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
                  Daily Air Quality
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
                {type === 'umbrella' && 'Hourly Rain Forecast'}
                {type === 'clothing' && 'Hourly Temperature'}
                {type === 'uv' && 'Hourly UV Index'}
              </Text>
              <TouchableOpacity onPress={() => setExpandedItem(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView ref={recommendationScrollRef} style={styles.modalScroll}>
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
                {type === 'sun' && 'Daily Sun Times'}
                {type === 'moon' && 'Moon Phases'}
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
                              <MaterialCommunityIcons name="weather-sunset-up" size={14} color={colors.text} /> {dayAstronomy.sunrise}
                            </Text>
                            <Text style={[styles.hourlyValue, { color: colors.text }]}>
                              <MaterialCommunityIcons name="weather-sunset-down" size={14} color={colors.text} /> {dayAstronomy.sunset}
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
        <View style={styles.titleRow}>
          <Ionicons name="bulb-outline" size={20} color={colors.text} />
          <Text style={[styles.title, { color: colors.text }]}>Recommendations</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.featureCard} 
          onPress={() => setExpandedItem('umbrella')}
        >
          <View style={[styles.featureIcon, { backgroundColor: umbrella.color + '20' }]}>
            <Ionicons name={umbrella.icon} size={24} color={umbrella.color} />
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
            <Ionicons name={clothing.icon} size={24} color={clothing.color} />
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
            <Ionicons name={uvProtection.icon} size={24} color={uvProtection.color} />
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
              <Ionicons name={airQuality.icon} size={24} color={airQuality.color} />
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
        <View style={styles.titleRow}>
          <Ionicons name="planet-outline" size={20} color={colors.text} />
          <Text style={[styles.title, { color: colors.text }]}>Astronomy</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => setShowAstronomyDetail('sun')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#fdcb6e20' }]}>
            <Ionicons name="sunny" size={24} color="#fdcb6e" />
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
            <Ionicons name="moon" size={24} color="#74b9ff" />
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
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