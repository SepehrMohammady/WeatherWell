import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export interface AppAlertButton {
  text: string;
  style?: 'default' | 'destructive' | 'cancel';
  onPress?: () => void;
}

interface AppAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  /** Defaults to a single dismissing OK button */
  buttons?: AppAlertButton[];
  okLabel?: string;
  onDismiss: () => void;
}

/**
 * In-app themed replacement for RN's native Alert. Every dialog in the app
 * uses this so nothing falls back to the Android system look.
 */
export const AppAlert: React.FC<AppAlertProps> = ({
  visible,
  title,
  message,
  buttons,
  okLabel = 'OK',
  onDismiss,
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss} statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {!!message && (
            <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
          )}
          <View style={styles.buttons}>
            {buttons && buttons.length > 0 ? (
              buttons.map((btn, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        btn.style === 'destructive'
                          ? colors.error
                          : btn.style === 'cancel'
                          ? colors.border
                          : colors.primary,
                    },
                  ]}
                  onPress={() => {
                    onDismiss();
                    btn.onPress?.();
                  }}
                >
                  <Text style={[styles.buttonText, { color: btn.style === 'cancel' ? colors.text : 'white' }]}>
                    {btn.text}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={onDismiss}>
                <Text style={[styles.buttonText, { color: 'white' }]}>{okLabel}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
