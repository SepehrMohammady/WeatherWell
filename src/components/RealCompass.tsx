import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Magnetometer, DeviceMotion } from 'expo-sensors';
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
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [headingAccuracy, setHeadingAccuracy] = useState(0);
  const [headingHistory, setHeadingHistory] = useState<number[]>([]);
  const [calibrationStatus, setCalibrationStatus] = useState<string>('Initializing...');

  const center = size / 2;
  const radius = size * 0.35;

  useEffect(() => {
    _subscribe();
    
    // Set a timeout for calibration - if not calibrated in 10 seconds, show fallback
    const calibrationTimeout = setTimeout(() => {
      if (!isCalibrated) {
        setCalibrationStatus('Sensors not available - showing static compass');
        setIsCalibrated(true); // Allow static compass to show
        setHeadingAccuracy(0);
      }
    }, 10000);

    return () => {
      _unsubscribe();
      clearTimeout(calibrationTimeout);
    };
  }, [isCalibrated]);

  const _subscribe = () => {
    // Try to use DeviceMotion first (more stable), fallback to Magnetometer
    DeviceMotion.isAvailableAsync().then((available) => {
      if (available && Platform.OS === 'ios') {
        // Use DeviceMotion for iOS (provides better rotation data)
        setCalibrationStatus('Calibrating device sensors...');
        setSubscription(
          DeviceMotion.addListener((result) => {
            if (result.rotation && result.rotation.gamma !== undefined) {
              // Use rotation.gamma for heading (rotation around z-axis)
              let heading = result.rotation.gamma * (180 / Math.PI);
              const normalizedHeading = (heading + 360) % 360;
              
              // Apply smoothing filter to reduce jitter
              setHeadingHistory(prev => {
                const newHistory = [...prev, normalizedHeading].slice(-5); // Keep last 5 readings
                const avgHeading = newHistory.reduce((sum, h) => sum + h, 0) / newHistory.length;
                setDeviceHeading(avgHeading);
                return newHistory;
              });
              
              setIsCalibrated(true);
              setCalibrationStatus('✓ Calibrated - Real compass active');
              setHeadingAccuracy(0.9); // DeviceMotion is generally accurate
            }
          })
        );
        DeviceMotion.setUpdateInterval(100);
      } else {
        // Use magnetometer for Android or if DeviceMotion not available
        setCalibrationStatus('Calibrating magnetometer...');
        Magnetometer.isAvailableAsync().then((magnetAvailable) => {
          if (magnetAvailable) {
            setSubscription(
              Magnetometer.addListener((result) => {
                // Calculate device heading from magnetometer data
                let heading = Math.atan2(result.y, result.x) * (180 / Math.PI);
                const normalizedHeading = (heading + 360) % 360;
                
                // Apply smoothing filter
                setHeadingHistory(prev => {
                  const newHistory = [...prev, normalizedHeading].slice(-3); // Keep last 3 readings
                  const avgHeading = newHistory.reduce((sum, h) => sum + h, 0) / newHistory.length;
                  setDeviceHeading(avgHeading);
                  return newHistory;
                });
                
                setIsCalibrated(true);
                setCalibrationStatus('✓ Calibrated - Magnetometer active');
                setHeadingAccuracy(0.7); // Magnetometer accuracy varies
              })
            );
            Magnetometer.setUpdateInterval(150);
          } else {
            // If no sensors available, show static compass
            console.warn('No compass sensors available');
            setCalibrationStatus('⚠️ No sensors available - Static compass');
            setIsCalibrated(true); // Show static compass
            setHeadingAccuracy(0);
          }
        });
      }
    }).catch((error) => {
      console.warn('Error initializing compass sensors:', error);
      // Fallback to static compass if sensor initialization fails
      setCalibrationStatus('⚠️ Sensor error - Static compass');
      setIsCalibrated(true); // Show static compass
      setHeadingAccuracy(0);
    });
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
        {calibrationStatus}
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
        <Text style={[styles.accuracyText, { color: colors.text + '60' }]}>
          {headingAccuracy > 0.8 ? '🟢 High accuracy' : headingAccuracy > 0.5 ? '🟡 Medium accuracy' : '🔴 Low accuracy - move away from metal objects'}
        </Text>
      </View>
      
      <Text style={[styles.instruction, { color: colors.text + '60' }]}>
        📱 For best accuracy: Hold phone flat, away from metal objects, and move in figure-8 pattern to calibrate
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
  accuracyText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});