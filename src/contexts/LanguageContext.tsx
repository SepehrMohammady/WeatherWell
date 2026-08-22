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

/**
 * Layout direction is baked into the native view hierarchy, so switching
 * to/from an RTL language only takes effect after the app restarts. Returns
 * true when a restart is needed so the caller can show an in-app dialog.
 */
function syncLayoutDirection(resolved: ResolvedLanguage): boolean {
  const wantRTL = RTL_LANGUAGES.includes(resolved);
  if (I18nManager.isRTL !== wantRTL) {
    I18nManager.allowRTL(wantRTL);
    I18nManager.forceRTL(wantRTL);
    return true;
  }
  return false;
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
        if (syncLayoutDirection(resolveLanguage(lang))) setRestartNeeded(true);
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
    if (syncLayoutDirection(resolveLanguage(lang))) setRestartNeeded(true);
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
