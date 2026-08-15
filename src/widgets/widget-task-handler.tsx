import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherWidget } from './WeatherWidget';
import { WIDGET_DATA_KEY, fetchAndCacheWidgetData } from './widget-utils';

export { WIDGET_DATA_KEY } from './widget-utils';

const nameToWidget = {
  WeatherWidget: WeatherWidget,
};

interface WidgetData {
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
}

async function readCachedWidgetData(): Promise<WidgetData> {
  const dataStr = await AsyncStorage.getItem(WIDGET_DATA_KEY);
  return dataStr ? JSON.parse(dataStr) : {};
}

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  if (!Widget) return;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED': {
      const data = await readCachedWidgetData();
      props.renderWidget(
        <Widget
          {...data}
          widgetWidth={widgetInfo.width}
          widgetHeight={widgetInfo.height}
        />
      );
      break;
    }

    case 'WIDGET_CLICK': {
      if (props.clickAction === 'REFRESH') {
        let data: WidgetData | null = null;
        try {
          data = (await fetchAndCacheWidgetData()) as WidgetData | null;
        } catch (error) {
          console.log('Widget refresh failed:', error instanceof Error ? error.message : 'unknown');
        }
        if (!data) {
          data = await readCachedWidgetData();
        }
        props.renderWidget(
          <Widget
            {...data}
            widgetWidth={widgetInfo.width}
            widgetHeight={widgetInfo.height}
          />
        );
      }
      break;
    }

    case 'WIDGET_DELETED':
      break;

    default:
      break;
  }
}
