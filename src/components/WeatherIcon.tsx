import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ConditionCode, getConditionVisual } from '../services/conditions';

interface WeatherIconProps {
  code: ConditionCode;
  isNight?: boolean;
  size: number;
  /** Override the condition's own tint (e.g. for monochrome contexts) */
  color?: string;
}

/**
 * The one weather icon used everywhere in the app — the same Material glyph
 * family regardless of which provider supplied the data.
 */
export const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isNight = false, size, color }) => {
  const visual = getConditionVisual(code, isNight);
  return (
    <MaterialCommunityIcons
      name={visual.mci as any}
      size={size}
      color={color || visual.color}
    />
  );
};
