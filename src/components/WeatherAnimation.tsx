import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { ConditionCode } from '../services/conditions';

interface WeatherAnimationProps {
  code: ConditionCode;
  enabled: boolean;
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type Mode = 'rain' | 'snow' | 'clouds' | 'thunder' | 'none';

function modeFor(code: ConditionCode): Mode {
  switch (code) {
    case 'drizzle':
    case 'rain':
    case 'heavy-rain':
    case 'sleet':
      return 'rain';
    case 'snow':
    case 'heavy-snow':
    case 'hail':
      return 'snow';
    case 'cloudy':
    case 'overcast':
    case 'fog':
      return 'clouds';
    case 'thunder':
    case 'thunder-rain':
      return 'thunder';
    default:
      return 'none';
  }
}

function particleCount(code: ConditionCode): number {
  switch (code) {
    case 'drizzle': return 10;
    case 'heavy-rain': return 26;
    case 'heavy-snow': return 22;
    case 'sleet': case 'hail': return 14;
    case 'snow': return 14;
    case 'thunder': return 12;
    case 'thunder-rain': return 20;
    default: return 16;
  }
}

interface FallingParticleProps {
  kind: 'rain' | 'snow';
  index: number;
}

/** One falling raindrop streak or snowflake, looping forever */
const FallingParticle: React.FC<FallingParticleProps> = ({ kind, index }) => {
  const progress = useRef(new Animated.Value(0)).current;
  // Deterministic pseudo-random layout per particle index so re-renders are stable
  const seed = useMemo(() => {
    const r = (n: number) => {
      const x = Math.sin(index * 127.1 + n * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      left: r(1) * SCREEN_W,
      delay: r(2) * 4000,
      duration: kind === 'rain' ? 900 + r(3) * 700 : 4200 + r(3) * 3200,
      drift: (r(4) - 0.5) * (kind === 'rain' ? 40 : 90),
      size: kind === 'rain' ? 9 + r(5) * 10 : 3 + r(5) * 3.5,
      opacity: 0.25 + r(6) * 0.3,
    };
  }, [index, kind]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: seed.duration,
        delay: seed.delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [progress, seed]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, SCREEN_H + 40],
  });
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, seed.drift],
  });

  return (
    <Animated.View
      style={[
        kind === 'rain' ? styles.raindrop : styles.snowflake,
        kind === 'rain' ? { height: seed.size } : { width: seed.size, height: seed.size, borderRadius: seed.size / 2 },
        {
          left: seed.left,
          opacity: seed.opacity,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
};

/** A soft translucent cloud blob drifting sideways forever */
const DriftingCloud: React.FC<{ index: number }> = ({ index }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const seed = useMemo(() => {
    const r = (n: number) => {
      const x = Math.sin(index * 269.5 + n * 183.3) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      top: 40 + r(1) * (SCREEN_H * 0.35),
      width: 160 + r(2) * 180,
      height: 46 + r(3) * 40,
      duration: 26000 + r(4) * 22000,
      delay: r(5) * 8000,
      opacity: 0.05 + r(6) * 0.07,
    };
  }, [index]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: seed.duration,
        delay: seed.delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [progress, seed]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-seed.width, SCREEN_W + seed.width],
  });

  return (
    <Animated.View
      style={[
        styles.cloud,
        {
          top: seed.top,
          width: seed.width,
          height: seed.height,
          borderRadius: seed.height / 2,
          opacity: seed.opacity,
          transform: [{ translateX }],
        },
      ]}
    />
  );
};

/** Occasional full-screen lightning flash */
const LightningFlash: React.FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(5500),
        Animated.timing(opacity, { toValue: 0.35, duration: 60, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.05, duration: 90, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.28, duration: 60, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 320, useNativeDriver: true }),
        Animated.delay(3200),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[StyleSheet.absoluteFill, styles.flash, { opacity }]} />;
};

/**
 * Ambient, condition-driven animation layer for the home screen.
 * Purely decorative: never intercepts touches, and can be turned off in
 * Settings. All animations run on the native driver.
 */
export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ code, enabled }) => {
  const mode = modeFor(code);
  if (!enabled || mode === 'none') return null;

  const count = particleCount(code);
  const indices = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {(mode === 'rain' || mode === 'thunder') &&
        indices.map((i) => <FallingParticle key={`r${i}`} kind="rain" index={i} />)}
      {mode === 'snow' &&
        indices.map((i) => <FallingParticle key={`s${i}`} kind="snow" index={i} />)}
      {mode === 'clouds' &&
        [0, 1, 2, 3].map((i) => <DriftingCloud key={`c${i}`} index={i} />)}
      {mode === 'thunder' && <LightningFlash />}
    </View>
  );
};

const styles = StyleSheet.create({
  raindrop: {
    position: 'absolute',
    top: 0,
    width: 1.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  snowflake: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#FFFFFF',
  },
  cloud: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  flash: {
    backgroundColor: '#FFFFFF',
  },
});
