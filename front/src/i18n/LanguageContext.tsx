import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LANG,
  LANGUAGES,
  translations,
  type LangCode,
  type TranslationKey,
} from './translations';

const STORAGE_KEY = 'kaiman-lang';

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  languages: typeof LANGUAGES;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLangCode(value: string): value is LangCode {
  return LANGUAGES.some((item) => item.code === value);
}

function readStoredLang(): LangCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLangCode(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => readStoredLang());

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const dict = translations[lang] ?? translations.es;
      const value = dict[key] ?? translations.es[key] ?? key;
      return interpolate(value, vars);
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, t, languages: LANGUAGES }),
    [lang, setLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useI18n debe usarse dentro de LanguageProvider');
  }
  return ctx;
}
