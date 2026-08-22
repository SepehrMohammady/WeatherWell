import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './en';
import { zh } from './zh';
import { es } from './es';
import { hi } from './hi';
import { ar } from './ar';
import { fa } from './fa';
import { it } from './it';

/** 'system' follows the device locale; everything else is an explicit choice */
export type AppLanguage = 'system' | 'en' | 'zh' | 'es' | 'hi' | 'ar' | 'fa' | 'it';
export type ResolvedLanguage = Exclude<AppLanguage, 'system'>;

export const LANGUAGE_STORAGE_KEY = 'appLanguage';
export const RTL_LANGUAGES: ResolvedLanguage[] = ['ar', 'fa'];

const DICTIONARIES: Record<ResolvedLanguage, Record<string, string>> = {
  en, zh, es, hi, ar, fa, it,
};

const SUPPORTED: ResolvedLanguage[] = ['en', 'zh', 'es', 'hi', 'ar', 'fa', 'it'];

/** Map the device locale onto a supported language, defaulting to English */
export function resolveSystemLanguage(): ResolvedLanguage {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en';
    const lang = locale.split(/[-_]/)[0].toLowerCase() as ResolvedLanguage;
    return SUPPORTED.includes(lang) ? lang : 'en';
  } catch {
    return 'en';
  }
}

export function resolveLanguage(language: AppLanguage): ResolvedLanguage {
  return language === 'system' ? resolveSystemLanguage() : language;
}

// Module-level active language so t() works outside React (notifications,
// widget refresh, background tasks). LanguageContext keeps it in sync.
let activeLanguage: ResolvedLanguage = resolveSystemLanguage();

export function setActiveLanguage(language: AppLanguage): void {
  activeLanguage = resolveLanguage(language);
}

export function getActiveLanguage(): ResolvedLanguage {
  return activeLanguage;
}

/**
 * Load the persisted language choice into the module-level state. Headless
 * entry points (background task, widget refresh) call this before building
 * any user-visible text.
 */
export async function loadActiveLanguage(): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    setActiveLanguage((stored as AppLanguage) || 'system');
  } catch {
    // keep the current value
  }
}

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Convert Latin digits to the native numerals of the active (or given)
 * language. Farsi and Arabic get native digits; other languages pass through.
 */
export function ln(value: string | number, language?: ResolvedLanguage): string {
  const lang = language ?? activeLanguage;
  const str = String(value);
  const digits = lang === 'fa' ? FA_DIGITS : lang === 'ar' ? AR_DIGITS : null;
  if (!digits) return str;
  return str.replace(/[0-9]/g, (d) => digits[Number(d)]);
}

/**
 * Translate a key with optional {name} interpolation. Falls back to English,
 * then to the key itself. Digits in the result are localized for fa/ar.
 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const dict = DICTIONARIES[activeLanguage];
  let s = dict[key] ?? DICTIONARIES.en[key] ?? key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
  }
  return ln(s);
}
