import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export interface AppPickerOption {
  label: string;
  value: string;
  /** Optional secondary line (e.g. what "System" currently resolves to) */
  hint?: string;
}

interface AppPickerProps {
  selectedValue?: string;
  onValueChange: (value: string) => void;
  options: AppPickerOption[];
  /** Title shown at the top of the selection sheet */
  title?: string;
  placeholder?: string;
}

/**
 * In-app themed selector: a bordered field that opens a scrollable modal list.
 * Keeps long option lists (languages) compact instead of a wrapping chip grid,
 * and avoids any Android-native dropdown UI.
 */
export const AppPicker: React.FC<AppPickerProps> = ({
  selectedValue,
  onValueChange,
  options,
  title,
  placeholder,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === selectedValue);

  const handleSelect = (value: string) => {
    setOpen(false);
    if (value !== selectedValue) onValueChange(value);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.field, { borderColor: colors.border, backgroundColor: colors.card }]}
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
      >
        <Text style={[styles.fieldText, { color: selected ? colors.text : colors.textSecondary }]} numberOfLines={1}>
          {selected ? selected.label : placeholder || ''}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity style={[styles.sheet, { backgroundColor: colors.surface }]} activeOpacity={1}>
            {!!title && <Text style={[styles.sheetTitle, { color: colors.text }]}>{title}</Text>}
            <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.option, isSelected && { backgroundColor: colors.primary + '22' }]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(option.value)}
                  >
                    <View style={styles.optionTextWrap}>
                      <Text
                        style={[
                          styles.optionText,
                          { color: colors.text },
                          isSelected && { fontWeight: '700', color: colors.primary },
                        ]}
                        numberOfLines={1}
                      >
                        {option.label}
                      </Text>
                      {!!option.hint && (
                        <Text style={[styles.optionHint, { color: colors.textSecondary }]} numberOfLines={1}>
                          {option.hint}
                        </Text>
                      )}
                    </View>
                    {isSelected && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    gap: 8,
  },
  fieldText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '75%',
    borderRadius: 16,
    paddingVertical: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 8,
  },
  optionTextWrap: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
  },
  optionHint: {
    fontSize: 12,
    marginTop: 2,
  },
});
