'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface LanguageSwitcherProps {
  isCollapsed?: boolean;
}

export const LanguageSwitcher = ({ isCollapsed }: LanguageSwitcherProps) => {
  const { locale, setLocale } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'en' ? 'uk' : 'en')}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/30"
    >
      <Globe size={18} className="shrink-0" />
      {!isCollapsed && (
        <span>{locale === 'en' ? 'Українська' : 'English'}</span>
      )}
    </button>
  );
};
