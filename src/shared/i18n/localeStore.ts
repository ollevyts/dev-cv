import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from './messages/en.json';
import uk from './messages/uk.json';

export type Locale = 'en' | 'uk';

type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, uk };

interface LocaleStore {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'uk',
      messages: messages.uk,
      setLocale: (locale) => set({ locale, messages: messages[locale] }),
    }),
    {
      name: 'portfolio-locale',

      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.messages = messages[state.locale];
        }
      },
    }
  )
);
