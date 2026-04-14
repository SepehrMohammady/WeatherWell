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
  tomorrowHigh?: string;
  tomorrowLow?: string;
  tomorrowCondition?: string;
  opacity?: number;
  showFeelsLike?: boolean;
  showHighLow?: boolean;
  showRainChance?: boolean;
  showConditions?: boolean;
  showTomorrow?: boolean;
  widgetWidth?: number;
  widgetHeight?: number;
}

export function WeatherWidget({
  temperature = '--°',
  location = 'Open app to load weather',
  conditions = '',
  high = '--°',
  low = '--°',
  rainChance,
  feelsLike,
  tomorrowHigh,
  tomorrowLow,
  tomorrowCondition,
  opacity = 0.85,
  showFeelsLike = true,
  showHighLow = true,
  showRainChance = true,
  showConditions = true,
  showTomorrow = false,
  widgetWidth = 250,
  widgetHeight = 100,
}: WeatherWidgetProps) {
  // Convert opacity to hex alpha in CSS #RRGGBBAA format
  const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
  const bgColor = `#1A1A1A${alphaHex}`;
  const surfaceColor = `#2A2A2A${alphaHex}`;

  // Scale by width (height is handled by flex layout)
  const wScale = widgetWidth / 250;
  const scale = Math.min(wScale, widgetHeight / 100);

  // Font sizes scale with overall scale
  const tempSize = Math.max(28, Math.min(64, Math.round(40 * scale)));
  const locationSize = Math.max(11, Math.min(22, Math.round(14 * scale)));
  const detailSize = Math.max(10, Math.min(20, Math.round(13 * scale)));
  const smallSize = Math.max(9, Math.min(18, Math.round(12 * scale)));
  const conditionSize = Math.max(11, Math.min(22, Math.round(14 * scale)));

  // Layout values
  const padding = Math.max(8, Math.min(20, Math.round(12 * scale)));
  const panelPadding = Math.max(4, Math.min(16, Math.round(10 * scale)));
  const gap = Math.max(2, Math.min(12, Math.round(5 * scale)));

  // Show conditions only when height is large enough (3+ rows typically ≥ 170dp)
  const autoHideConditions = widgetHeight < 170;
  // Show tomorrow only when height is large enough
  const autoHideTomorrow = widgetHeight < 140;

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: bgColor,
        borderRadius: 16,
        padding: padding,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGap: gap,
        overflow: 'hidden',
      }}
      clickAction="OPEN_APP"
    >
      {/* Location */}
      <TextWidget
        text={`📍 ${location}`}
        style={{
          fontSize: locationSize,
          color: '#B6BCBE',
        }}
        maxLines={1}
      />

      {/* Temperature Row — flex:1 fills remaining space, ensuring conditions stay visible */}
      <FlexWidget
        style={{
          flex: 1,
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
              fontSize: tempSize,
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          />
          {showFeelsLike && feelsLike ? (
            <TextWidget
              text={`Feels ${feelsLike}`}
              style={{
                fontSize: smallSize,
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
              padding: panelPadding,
            }}
          >
            <TextWidget
              text={`H: ${high}`}
              style={{ fontSize: detailSize, color: '#CB936A' }}
            />
            <TextWidget
              text={`L: ${low}`}
              style={{ fontSize: detailSize, color: '#5F758E' }}
            />
            {showRainChance && rainChance ? (
              <TextWidget
                text={`☔ ${rainChance}`}
                style={{ fontSize: smallSize, color: '#B6BCBE', marginTop: 2 }}
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
              padding: panelPadding,
            }}
          >
            <TextWidget
              text={`☔ ${rainChance}`}
              style={{ fontSize: detailSize, color: '#B6BCBE' }}
            />
          </FlexWidget>
        ) : (
          <TextWidget
            text=""
            style={{ fontSize: 1, color: '#00000000' }}
          />
        )}
      </FlexWidget>

      {/* Tomorrow Forecast — compact row with label + temps */}
      {showTomorrow && !autoHideTomorrow && tomorrowHigh ? (
        <FlexWidget
          style={{
            flexDirection: 'row',
            width: 'match_parent',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: surfaceColor,
            borderRadius: 8,
            padding: Math.max(3, panelPadding - 2),
          }}
        >
          <TextWidget
            text={`Tomorrow${tomorrowCondition ? `: ${tomorrowCondition}` : ''}`}
            style={{ fontSize: smallSize, color: '#CFAE95' }}
            maxLines={1}
          />
          <TextWidget
            text={`${tomorrowHigh} / ${tomorrowLow || '--°'}`}
            style={{ fontSize: detailSize, color: '#B6BCBE' }}
          />
        </FlexWidget>
      ) : (
        <TextWidget text="" style={{ fontSize: 1, color: '#00000000' }} />
      )}

      {/* Conditions — shown only when height allows (3+ rows); flex:1 on temp row ensures this never overflows */}
      {showConditions && !autoHideConditions ? (
        <TextWidget
          text={conditions || 'Tap to open WeatherWell'}
          style={{
            fontSize: conditionSize,
            color: '#CFAE95',
          }}
          maxLines={1}
        />
      ) : (
        <TextWidget text="" style={{ fontSize: 1, color: '#00000000' }} />
      )}
    </FlexWidget>
  );
}
