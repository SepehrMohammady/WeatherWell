import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, Polygon } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

interface WindCompassProps {
  windSpeed: number;
  windDirection: string;
  size?: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({ 
  windSpeed, 
  windDirection, 
  size = 200 
}) => {
  const { colors } = useTheme();
  const center = size / 2;
  const radius = size * 0.35;

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

  const windDegrees = getWindDegrees(windDirection);
  const windRadians = (windDegrees * Math.PI) / 180;



  // Calculate arrow end point
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
      <Text style={[styles.title, { color: colors.text }]}>Wind Direction</Text>
      
      <View style={styles.compassContainer}>
        <Svg width={size} height={size}>
          {/* Outer circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.text + '40'}
            strokeWidth="2"
            fill="none"
          />
          
          {/* Inner circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius * 0.1}
            fill={colors.text + '60'}
          />
          
          {/* Direction markers */}
          {compassDirections.map((dir) => {
            const angle = (dir.angle * Math.PI) / 180;
            const startX = center + Math.sin(angle) * radius * 0.8;
            const startY = center - Math.cos(angle) * radius * 0.8;
            const endX = center + Math.sin(angle) * radius * 0.95;
            const endY = center - Math.cos(angle) * radius * 0.95;
            const textX = center + Math.sin(angle) * radius * 1.15;
            const textY = center - Math.cos(angle) * radius * 1.15;

            return (
              <React.Fragment key={dir.label}>
                <Line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={colors.text + '60'}
                  strokeWidth="2"
                />
                <SvgText
                  x={textX}
                  y={textY + 6}
                  fontSize="14"
                  fontWeight="bold"
                  fill={colors.text}
                  textAnchor="middle"
                >
                  {dir.label}
                </SvgText>
              </React.Fragment>
            );
          })}
          
          {/* Wind arrow */}
          <Line
            x1={center}
            y1={center}
            x2={arrowEndX}
            y2={arrowEndY}
            stroke={colors.primary}
            strokeWidth="4"
          />
          
          {/* Arrow head */}
          <Polygon
            points={`${arrowEndX},${arrowEndY} ${leftHeadX},${leftHeadY} ${rightHeadX},${rightHeadY}`}
            fill={colors.primary}
          />
        </Svg>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.windSpeed, { color: colors.text }]}>
          {Math.round(windSpeed)} km/h
        </Text>
        <Text style={[styles.windDirection, { color: colors.text + '80' }]}>
          {windDirection}
        </Text>
      </View>
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
    marginBottom: 16,
  },
  compassContainer: {
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
  },
  windSpeed: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  windDirection: {
    fontSize: 16,
  },
});