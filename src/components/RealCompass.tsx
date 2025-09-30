import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Svg, { Circle, Line, Text as SvgText, Polygon } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface RealCompassProps {
  windSpeed: number;
  windDirection: string;
  size?: number;
}

export const RealCompass: React.FC<RealCompassProps> = ({ 
  windSpeed, 
  windDirection, 
  size = 280 
}) => {
  const { colors } = useTheme();
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);

  const center = size / 2;
  const radius = size * 0.35;

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setMagnetometerData(result);
        
        // Calculate device heading from magnetometer data
        // Note: atan2(y, x) gives angle from positive x-axis
        // We want angle from positive y-axis (North), so we use atan2(x, y) and add 90 degrees
        let heading = Math.atan2(result.x, result.y) * (180 / Math.PI);
        
        // Normalize to 0-360 degrees
        const normalizedHeading = (heading + 360) % 360;
        setDeviceHeading(normalizedHeading);
      })
    );
    Magnetometer.setUpdateInterval(100); // Update every 100ms
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // Convert wind direction to degrees
  const getWindDegrees = (direction: string): number => {
    const directions: { [key: string]: number } = {
      'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
      'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
      'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
      'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };
    return directions[direction.toUpperCase()] || 0;
  };

  // Wind direction in degrees
  const windDegrees = getWindDegrees(windDirection);
  
  // Adjust wind direction relative to device heading (real compass behavior)
  const adjustedWindDegrees = (windDegrees - deviceHeading + 360) % 360;
  const windRadians = (adjustedWindDegrees * Math.PI) / 180;

  // Calculate wind arrow position (adjusted for device orientation)
  const arrowEndX = center + Math.sin(windRadians) * radius * 0.7;
  const arrowEndY = center - Math.cos(windRadians) * radius * 0.7;

  // Calculate arrow head points
  const arrowHeadSize = 12;
  const leftHeadX = arrowEndX - Math.sin(windRadians - 0.5) * arrowHeadSize;
  const leftHeadY = arrowEndY + Math.cos(windRadians - 0.5) * arrowHeadSize;
  const rightHeadX = arrowEndX - Math.sin(windRadians + 0.5) * arrowHeadSize;
  const rightHeadY = arrowEndY + Math.cos(windRadians + 0.5) * arrowHeadSize;

  const compassDirections = [
    { label: 'N', angle: 0 },
    { label: 'NE', angle: 45 },
    { label: 'E', angle: 90 },
    { label: 'SE', angle: 135 },
    { label: 'S', angle: 180 },
    { label: 'SW', angle: 225 },
    { label: 'W', angle: 270 },
    { label: 'NW', angle: 315 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>🧭 Real Compass</Text>
      <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
        Move your phone to see compass rotate
      </Text>
      
      <View style={styles.compassContainer}>
        <Svg width={size} height={size}>
          {/* Outer circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.text + '40'}
            strokeWidth="3"
            fill="none"
          />
          
          {/* Inner circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius * 0.1}
            fill={colors.text + '60'}
          />
          
          {/* Direction markers - these rotate with device */}
          {compassDirections.map((dir) => {
            // Adjust direction markers based on device heading
            const adjustedAngle = (dir.angle - deviceHeading + 360) % 360;
            const angle = (adjustedAngle * Math.PI) / 180;
            const startX = center + Math.sin(angle) * radius * 0.8;
            const startY = center - Math.cos(angle) * radius * 0.8;
            const endX = center + Math.sin(angle) * radius * 0.95;
            const endY = center - Math.cos(angle) * radius * 0.95;
            const textX = center + Math.sin(angle) * radius * 1.15;
            const textY = center - Math.cos(angle) * radius * 1.15;

            // Highlight North in red
            const isNorth = dir.label === 'N';
            const color = isNorth ? '#e74c3c' : colors.text + '60';
            const strokeWidth = isNorth ? '3' : '2';

            return (
              <React.Fragment key={dir.label}>
                <Line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={color}
                  strokeWidth={strokeWidth}
                />
                <SvgText
                  x={textX}
                  y={textY + 6}
                  fontSize="16"
                  fontWeight={isNorth ? "bold" : "normal"}
                  fill={color}
                  textAnchor="middle"
                >
                  {dir.label}
                </SvgText>
              </React.Fragment>
            );
          })}
          
          {/* Wind arrow - shows wind direction relative to real compass */}
          <Line
            x1={center}
            y1={center}
            x2={arrowEndX}
            y2={arrowEndY}
            stroke={colors.primary}
            strokeWidth="5"
          />
          
          {/* Arrow head */}
          <Polygon
            points={`${arrowEndX},${arrowEndY} ${leftHeadX},${leftHeadY} ${rightHeadX},${rightHeadY}`}
            fill={colors.primary}
          />
          
          {/* Wind direction label */}
          <SvgText
            x={center}
            y={center - radius - 20}
            fontSize="14"
            fontWeight="bold"
            fill={colors.primary}
            textAnchor="middle"
          >
            Wind: {windDirection}
          </SvgText>
        </Svg>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.windSpeed, { color: colors.text }]}>
          {Math.round(windSpeed)} km/h
        </Text>
        <Text style={[styles.deviceHeading, { color: colors.text + '80' }]}>
          Device heading: {Math.round(deviceHeading)}°
        </Text>
      </View>
      
      <Text style={[styles.instruction, { color: colors.text + '60' }]}>
        📱 Rotate your phone to see the compass move like a real compass app
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    margin: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  compassContainer: {
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  windSpeed: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceHeading: {
    fontSize: 14,
  },
  instruction: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});