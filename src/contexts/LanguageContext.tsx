import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppAlert } from '../components/AppAlert';
import {
  AppLanguage,
  ResolvedLanguage,
  LANGUAGE_STORAGE_KEY,
  RTL_LANGUAGES,
  resolveLanguage,
  setActiveLanguage,
  t as translate,
  ln as localizeNumber,
} from '../i18n';

interface LanguageContextType {
  /** The user's choice, possibly 'system' */
  language: AppLanguage;
  /** The concrete language in effect */
  resolved: ResolvedLanguage;
  isRTL: boolean;
  setLanguage: (language: AppLanguage) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
  ln: (value: string | number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/** Direction we last asked Android for, so a lagging isRTL cannot re-prompt */
const RTL_APPLIED_KEY = 'rtlApplied';

/**
 * Layout direction is baked into the native view hierarchy, so switching
 * to/from an RTL language only takes effect after the app restarts. Returns
 * true when a restart is needed so the caller can show an in-app dialog.
 *
 * I18nManager.isRTL can keep reporting the previous value for a launch after
 * forceRTL(), which would prompt a second time for one switch. We therefore
 * compare against the direction we recorded ourselves.
 */
async function syncLayoutDirection(resolved: ResolvedLanguage): Promise<boolean> {
  const wantRTL = RTL_LANGUAGES.includes(resolved);
  let appliedRTL = I18nManager.isRTL;
  try {
    const stored = await AsyncStorage.getItem(RTL_APPLIED_KEY);
    if (stored !== null) appliedRTL = stored === '1';
  } catch {
    // fall back to what the native module reports
  }

  if (appliedRTL === wantRTL) return false;

  I18nManager.allowRTL(wantRTL);
  I18nManager.forceRTL(wantRTL);
  await AsyncStorage.setItem(RTL_APPLIED_KEY, wantRTL ? '1' : '0').catch(() => {});
  return true;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>('system');
  const [resolved, setResolved] = useState<ResolvedLanguage>(resolveLanguage('system'));
  const [restartNeeded, setRestartNeeded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        const lang = (stored as AppLanguage) || 'system';
        setActiveLanguage(lang);
        setLanguageState(lang);
        setResolved(resolveLanguage(lang));
        if (await syncLayoutDirection(resolveLanguage(lang))) setRestartNeeded(true);
      } catch {
        // defaults already in place
      }
    })();
  }, []);

  const setLanguage = useCallback(async (lang: AppLanguage) => {
    setActiveLanguage(lang);
    setLanguageState(lang);
    setResolved(resolveLanguage(lang));
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
    if (await syncLayoutDirection(resolveLanguage(lang))) setRestartNeeded(true);
  }, []);

  // Recreated when the language changes so consumers re-render with new text
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(key, vars),
    [resolved]
  );
  const ln = useCallback((value: string | number) => localizeNumber(value), [resolved]);

  return (
    <LanguageContext.Provider value={{ language, resolved, isRTL: RTL_LANGUAGES.includes(resolved), setLanguage, t, ln }}>
      {children}
      <AppAlert
        visible={restartNeeded}
        title={translate('language.restartTitle')}
        message={translate('language.restartMessage')}
        okLabel={translate('common.ok')}
        onDismiss={() => setRestartNeeded(false)}
      />
    </LanguageContext.Provider>
  );
};
