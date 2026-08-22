import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface TutorialModalProps {
  visible: boolean;
  onClose: () => void;
}

const PAGES: { icon: keyof typeof MaterialCommunityIcons.glyphMap; titleKey: string; bodyKey: string }[] = [
  { icon: 'weather-partly-cloudy', titleKey: 'tutorial.page1.title', bodyKey: 'tutorial.page1.body' },
  { icon: 'map-marker-star', titleKey: 'tutorial.page2.title', bodyKey: 'tutorial.page2.body' },
  { icon: 'scale-balance', titleKey: 'tutorial.page3.title', bodyKey: 'tutorial.page3.body' },
  { icon: 'lightbulb-on-outline', titleKey: 'tutorial.page4.title', bodyKey: 'tutorial.page4.body' },
  { icon: 'palette-outline', titleKey: 'tutorial.page5.title', bodyKey: 'tutorial.page5.body' },
];

/**
 * First-run introduction carousel. Also reachable from Settings, so it keeps
 * no persistence of its own — the caller decides when it shows.
 */
export const TutorialModal: React.FC<TutorialModalProps> = ({ visible, onClose }) => {
  const { colors, theme } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);

  const isLast = page === PAGES.length - 1;
  const current = PAGES[page];

  const close = () => {
    setPage(0);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: colors.surface, width: Math.min(width - 40, 420) }]}>
          <LinearGradient
            colors={theme === 'dark' ? [colors.primary + '33', 'transparent'] : [colors.primary + '22', 'transparent']}
            style={styles.iconArea}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
              <MaterialCommunityIcons name={current.icon} size={44} color="white" />
            </View>
          </LinearGradient>

          <Text style={[styles.title, { color: colors.text }]}>{t(current.titleKey)}</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>{t(current.bodyKey)}</Text>

          <View style={styles.dots}>
            {PAGES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: i === page ? colors.primary : colors.border },
                  i === page && styles.dotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonRow}>
            {page === 0 ? (
              <TouchableOpacity style={styles.textButton} onPress={close}>
                <Text style={[styles.textButtonLabel, { color: colors.textSecondary }]}>{t('tutorial.skip')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.textButton} onPress={() => setPage(page - 1)}>
                <Text style={[styles.textButtonLabel, { color: colors.textSecondary }]}>{t('tutorial.back')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => (isLast ? close() : setPage(page + 1))}
            >
              <Text style={styles.primaryButtonLabel}>{isLast ? t('tutorial.done') : t('tutorial.next')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  iconArea: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 4,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    minHeight: 88,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  textButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  primaryButtonLabel: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
