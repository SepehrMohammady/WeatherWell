import React from 'react';
import { FlexWidget, TextWidget, SvgWidget } from 'react-native-android-widget';

// Material Design glyph paths (24dp viewBox) — same refresh glyph FeedWell's widget uses
const REFRESH_PATH = 'M17.65,6.35C16.2,4.9 14.21,4 12,4c-4.42,0 -7.99,3.58 -7.99,8s3.57,8 7.99,8c3.73,0 6.84,-2.55 7.73,-6h-2.08c-0.82,2.33 -3.04,4 -5.65,4 -3.31,0 -6,-2.69 -6,-6s2.69,-6 6,-6c1.66,0 3.14,0.69 4.22,1.78L13,11h7V4l-2.35,2.35z';
const DROP_PATH = 'M12,2C6.67,6.55 4,10.48 4,13.8 4,18.78 7.8,22 12,22s8,-3.22 8,-8.2C20,10.48 17.33,6.55 12,2z';

function iconSvg(path: string, color: string, rotate: number = 0): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="rotate(${rotate} 12 12)"><path fill="${color}" d="${path}"/></g></svg>`;
}

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
  isRefreshing?: boolean;
  refreshAngle?: number;
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
  isRefreshing = false,
  refreshAngle = 0,
}: WeatherWidgetProps) {
  // Convert opacity to hex alpha in CSS #RRGGBBAA format
  const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0').toUpperCase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bgColor = `#1A1A1A${alphaHex}` as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const surfaceColor = `#2A2A2A${alphaHex}` as any;

  // Scale by both width and height — height budget divided by rows to show
  const wScale = widgetWidth / 250;
  const contentRows = 2 + (showTomorrow ? 1 : 0) + (showConditions ? 1 : 0);
  const hScale = widgetHeight / (contentRows * 50); // 50dp per row at scale=1
  const scale = Math.min(wScale, Math.max(0.55, hScale));

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
  const refreshSize = Math.max(16, Math.min(28, Math.round(18 * scale)));
  const dropSize = Math.max(10, Math.min(18, Math.round(12 * scale)));

  // Hide only when truly too small to render anything useful
  const autoHideConditions = widgetHeight < 70;
  // Show tomorrow in almost all sizes
  const autoHideTomorrow = widgetHeight < 60;

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
      {/* Location + refresh */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          width: 'match_parent',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextWidget
          text={location}
          style={{
            fontSize: locationSize,
            color: '#B6BCBE',
          }}
          maxLines={1}
        />
        <SvgWidget
          clickAction="REFRESH"
          svg={iconSvg(REFRESH_PATH, isRefreshing ? '#8A9299' : '#B6BCBE', isRefreshing ? refreshAngle : 0)}
          style={{
            width: refreshSize,
            height: refreshSize,
            marginLeft: 12,
          }}
        />
      </FlexWidget>

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
              <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <SvgWidget
                  svg={iconSvg(DROP_PATH, '#B6BCBE')}
                  style={{ width: dropSize, height: dropSize, marginRight: 3 }}
                />
                <TextWidget
                  text={rainChance}
                  style={{ fontSize: smallSize, color: '#B6BCBE' }}
                />
              </FlexWidget>
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
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: surfaceColor,
              borderRadius: 12,
              padding: panelPadding,
            }}
          >
            <SvgWidget
              svg={iconSvg(DROP_PATH, '#B6BCBE')}
              style={{ width: dropSize + 2, height: dropSize + 2, marginRight: 3 }}
            />
            <TextWidget
              text={rainChance}
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

      {/* Conditions — right below today temp, before tomorrow */}
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

      {/* Spacer — pushes tomorrow row to the bottom */}
      <FlexWidget style={{ flex: 1 }} />

      {/* Tomorrow Forecast — anchored to bottom */}
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
    </FlexWidget>
  );
}
