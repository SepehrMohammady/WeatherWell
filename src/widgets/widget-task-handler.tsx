import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherWidget } from './WeatherWidget';

export const WIDGET_DATA_KEY = 'weatherwell_widget_data';

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
  opacity?: number;
  showFeelsLike?: boolean;
  showHighLow?: boolean;
  showRainChance?: boolean;
  showConditions?: boolean;
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
      const dataStr = await AsyncStorage.getItem(WIDGET_DATA_KEY);
      const data: WidgetData = dataStr ? JSON.parse(dataStr) : {};
      props.renderWidget(<Widget {...data} />);
      break;
    }

    case 'WIDGET_DELETED':
      break;

    case 'WIDGET_CLICK':
      break;

    default:
      break;
  }
}
