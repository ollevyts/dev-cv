'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { menuItems, getAvatarSpeechKey } from '../model/menuConfig';
import { useTranslation } from '@/shared/i18n/useTranslation';

type TabType = 'overview' | 'analytics' | 'sandbox' | 'ui-lab';

interface SidebarNavigationProps {
    isCollapsed: boolean;
    activeTab: string;
    setActiveTab: (id: TabType) => void;
    say: (text: string) => void;
}

export const SidebarNavigation = ({
    isCollapsed,
    activeTab,
    setActiveTab,
    say,
}: SidebarNavigationProps) => {
    const { t } = useTranslation();

    return (
        <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id as TabType)}
                        onMouseEnter={() => {
                            const key = getAvatarSpeechKey(item.id);
                            if (key) say(t(key));
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all relative group ${
                            isActive
                                ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800/60'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/30'
                        }`}
                    >
                        <Icon
                            size={18}
                            className={isActive
                                ? 'text-sky-600 dark:text-sky-400'
                                : 'text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform'
                            }
                        />

                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {t(`nav.${item.id}`)}
                            </motion.span>
                        )}

                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-2 bottom-2 w-1 bg-sky-500 rounded-r"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </nav>
    );
};
