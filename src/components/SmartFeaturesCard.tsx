import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeatherData } from '../services/types';
import { useTheme } from '../contexts/ThemeContext';

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
  const airQuality = getAirQualityStatus();

  return (
    <>
      {/* Smart Recommendations Section */}
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>🤖 Smart Recommendations</Text>
        
        <TouchableOpacity style={styles.featureCard} onPress={onUmbrellaAlert}>
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
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard} onPress={onClothingSuggestion}>
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
        </TouchableOpacity>
      </View>

      {/* Air Quality Section */}
      {weatherData.airQuality && (
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>💨 Air Quality</Text>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: airQuality.color + '20' }]}>
              <Text style={styles.featureEmoji}>{airQuality.emoji}</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Air Quality Index</Text>
              <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>{airQuality.text}</Text>
              <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
                AQI: {weatherData.airQuality.aqi} • PM2.5: {Math.round(weatherData.airQuality.pm2_5)}μg/m³
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Sun & Moon Section */}
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>☀️ Sun & Moon</Text>
        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: '#74b9ff20' }]}>
            <Text style={styles.featureEmoji}>🌅</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Solar Times</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>
              Sunrise: {weatherData.astronomy.sunrise} • Sunset: {weatherData.astronomy.sunset}
            </Text>
          </View>
        </View>
      </View>

      {/* Moon Phases Section */}
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>🌙 Moon Phases</Text>
        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: '#fd79a820' }]}>
            <Text style={styles.featureEmoji}>🌙</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Current Phase</Text>
            <Text style={[styles.featureDescription, { color: colors.text + '80' }]}>
              {weatherData.astronomy.moonPhase}
            </Text>
            <Text style={[styles.featureDetail, { color: colors.text + '60' }]}>
              {Math.round(weatherData.astronomy.moonIllumination * 100)}% illuminated
            </Text>
          </View>
        </View>
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
});