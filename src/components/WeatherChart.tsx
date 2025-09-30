import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { HourlyForecast } from '../services/types';

interface WeatherChartProps {
  data: HourlyForecast[];
  metric: 'humidity' | 'wind' | 'uv' | 'pressure' | 'visibility';
  title: string;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data, metric, title }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width - 40;

  const getMetricValue = (item: HourlyForecast): number => {
    switch (metric) {
      case 'humidity':
        return item.humidity;
      case 'wind':
        return item.windSpeed;
      case 'uv':
        return item.uvIndex || 0;
      case 'pressure':
        return item.pressure || 1013;
      case 'visibility':
        return item.visibility || 10;
      default:
        return 0;
    }
  };

  const getUnit = (): string => {
    switch (metric) {
      case 'humidity':
        return '%';
      case 'wind':
        return 'km/h';
      case 'uv':
        return '';
      case 'pressure':
        return 'hPa';
      case 'visibility':
        return 'km';
      default:
        return '';
    }
  };

  // Take first 12 hours for better readability
  const chartData = data.slice(0, 12);
  const values = chartData.map(item => getMetricValue(item));
  const labels = chartData.map(item => {
    const date = new Date(item.time);
    return date.getHours().toString().padStart(2, '0');
  });



  // If no data, return empty view (but allow UV with all zeros since that's valid at night)
  if (chartData.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Text style={[styles.noDataText, { color: colors.text + '80' }]}>
          No data available for {title}
        </Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: metric === 'pressure' ? 0 : 1,
    color: (opacity = 1) => colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
    labelColor: (opacity = 1) => colors.text + Math.round(opacity * 128).toString(16).padStart(2, '0'),
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.text + '20',
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: values,
              color: (opacity = 1) => colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        bezier
        withDots
        withShadow={false}
        withVerticalLabels
        withHorizontalLabels
        fromZero={metric === 'uv'}
        formatYLabel={(value) => `${parseFloat(value).toFixed(metric === 'pressure' ? 0 : 1)}${getUnit()}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
  },
  chart: {
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 40,
  },
});