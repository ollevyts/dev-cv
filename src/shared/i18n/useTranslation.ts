import { useLocaleStore, type Locale } from './localeStore';

export const useTranslation = () => {
  const { messages, locale, setLocale } = useLocaleStore();

  const t = (key: string): string => {
    const parts = key.split('.');
    let result: unknown = messages;
    for (const part of parts) {
      if (result && typeof result === 'object') {
        result = (result as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return { t, locale, setLocale };
};

export type { Locale };
