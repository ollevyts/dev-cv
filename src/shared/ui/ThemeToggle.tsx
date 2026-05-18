'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface ThemeToggleProps {
  isCollapsed?: boolean;
}

export const ThemeToggle = ({ isCollapsed }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="w-full h-12 px-4 flex items-center">
      <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
    </div>
  );

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-slate-600 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/30"
    >
      {isDark
        ? <Sun size={18} className="shrink-0" />
        : <Moon size={18} className="shrink-0" />
      }
      {!isCollapsed && (
        <span>{isDark ? t('theme.light') : t('theme.dark')}</span>
      )}
    </button>
  );
};
