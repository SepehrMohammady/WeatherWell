import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

interface WeatherWidgetProps {
  temperature?: string;
  location?: string;
  conditions?: string;
  high?: string;
  low?: string;
  rainChance?: string;
  feelsLike?: string;
  opacity?: number;
  showFeelsLike?: boolean;
  showHighLow?: boolean;
  showRainChance?: boolean;
  showConditions?: boolean;
}

export function WeatherWidget({
  temperature = '--°',
  location = 'Open app to load weather',
  conditions = '',
  high = '--°',
  low = '--°',
  rainChance,
  feelsLike,
  opacity = 0.85,
  showFeelsLike = true,
  showHighLow = true,
  showRainChance = true,
  showConditions = true,
}: WeatherWidgetProps) {
  // Convert opacity to hex alpha (0.0-1.0 → 00-FF)
  const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
  const bgColor = `#${alphaHex}1A1A1A`;
  const surfaceColor = `#${alphaHex}2A2A2A`;

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: bgColor,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      clickAction="OPEN_APP"
    >
      {/* Location */}
      <TextWidget
        text={`📍 ${location}`}
        style={{
          fontSize: 14,
          color: '#B6BCBE',
        }}
        maxLines={1}
      />

      {/* Temperature Row */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'match_parent',
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'column',
          }}
        >
          <TextWidget
            text={temperature}
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          />
          {showFeelsLike && feelsLike ? (
            <TextWidget
              text={`Feels ${feelsLike}`}
              style={{
                fontSize: 12,
                color: '#8A9299',
              }}
            />
          ) : (
            <TextWidget
              text=""
              style={{ fontSize: 1, color: '#00000000' }}
            />
          )}
        </FlexWidget>

        {showHighLow ? (
          <FlexWidget
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              backgroundColor: surfaceColor,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <TextWidget
              text={`H: ${high}`}
              style={{ fontSize: 13, color: '#CB936A' }}
            />
            <TextWidget
              text={`L: ${low}`}
              style={{ fontSize: 13, color: '#5F758E' }}
            />
            {showRainChance && rainChance ? (
              <TextWidget
                text={`☔ ${rainChance}`}
                style={{ fontSize: 12, color: '#B6BCBE', marginTop: 2 }}
              />
            ) : (
              <TextWidget
                text=""
                style={{ fontSize: 1, color: '#00000000' }}
              />
            )}
          </FlexWidget>
        ) : showRainChance && rainChance ? (
          <FlexWidget
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              backgroundColor: surfaceColor,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <TextWidget
              text={`☔ ${rainChance}`}
              style={{ fontSize: 14, color: '#B6BCBE' }}
            />
          </FlexWidget>
        ) : (
          <TextWidget
            text=""
            style={{ fontSize: 1, color: '#00000000' }}
          />
        )}
      </FlexWidget>

      {/* Conditions */}
      {showConditions ? (
        <TextWidget
          text={conditions || 'Tap to open WeatherWell'}
          style={{
            fontSize: 14,
            color: '#CFAE95',
          }}
          maxLines={1}
        />
      ) : (
        <TextWidget
          text=""
          style={{ fontSize: 1, color: '#00000000' }}
        />
      )}
    </FlexWidget>
  );
}
