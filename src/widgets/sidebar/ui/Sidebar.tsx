'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigationStore } from '@/shared/model/navigationStore';
import { InteractiveAvatar } from '@/features/avatar-speech/ui/InteractiveAvatar';
import { useAvatar } from '@/features/avatar-speech/model/AvatarContext';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { useTranslation } from '@/shared/i18n/useTranslation';

import { SidebarCollapseButton } from './SidebarCollapseButton';
import { SidebarNavigation } from './SidebarNavigation';

type ScreenType = 'mobile' | 'tablet' | 'desktop';
type TabType = 'overview' | 'analytics' | 'sandbox' | 'ui-lab';

export const Sidebar = () => {
    const getScreenType = (): ScreenType => {
        if (typeof window === 'undefined') return 'desktop';
        if (window.innerWidth < 640) return 'mobile';
        if (window.innerWidth < 1024) return 'tablet';
        return 'desktop';
    };

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 1024;
    });
    const [screenType, setScreenType] = useState<ScreenType>(getScreenType);

    const { activeTab, setActiveTab } = useNavigationStore();
    const { say } = useAvatar();
    const { t } = useTranslation();

    useEffect(() => {
        const update = () => {
            const type = getScreenType();
            setScreenType(type);
            if (type === 'tablet') {
                setIsCollapsed(true);
                setIsMobileOpen(false);
            }
            if (type === 'mobile') {
                setIsMobileOpen(false);
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const isMobile = screenType === 'mobile';
    const effectiveCollapsed = isMobile ? false : isCollapsed;

    const handleNavigate = (tab: TabType) => {
        setActiveTab(tab);
        if (isMobile) setIsMobileOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isMobile && !isMobileOpen && (
                    <motion.button
                        key="hamburger"
                        type="button"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setIsMobileOpen(true)}
                        className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md text-slate-600 dark:text-slate-300"
                    >
                        <Menu size={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobile && isMobileOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    x: isMobile ? (isMobileOpen ? 0 : -300) : 0,
                    width: isMobile ? 280 : isCollapsed ? 80 : 260,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                className={`h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col justify-between text-slate-600 dark:text-slate-300 select-none z-50 ${
                    isMobile ? 'fixed top-0 left-0' : 'relative shrink-0'
                }`}
            >
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
                    >
                        <X size={18} />
                    </button>
                )}

                {!isMobile && (
                    <SidebarCollapseButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                )}

                <div>
                    <div className={`mt-8 mb-6 flex justify-center transition-all relative z-[60] ${effectiveCollapsed ? 'scale-75 opacity-70' : 'scale-100'}`}>
                        {screenType === 'desktop' && !isCollapsed ? (
                            <InteractiveAvatar />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-500 dark:text-sky-400 font-bold tracking-wider select-none text-xs">
                                OL
                            </div>
                        )}
                    </div>

                    <SidebarNavigation
                        isCollapsed={effectiveCollapsed}
                        activeTab={activeTab}
                        setActiveTab={handleNavigate}
                        say={say}
                    />
                </div>

                <div>
                    <div className="px-3 pb-1 space-y-0.5 border-t border-gray-200 dark:border-slate-800 pt-2">
                        <ThemeToggle isCollapsed={effectiveCollapsed} />
                        <LanguageSwitcher isCollapsed={effectiveCollapsed} />
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide">
                        {!effectiveCollapsed && <p>{t('sidebar.footer')}</p>}
                    </div>
                </div>
            </motion.aside>
        </>
    );
};
