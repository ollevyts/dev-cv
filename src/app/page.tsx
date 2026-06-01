'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/shared/model/navigationStore';
import { useAvatar } from '@/features/avatar-speech/model/AvatarContext';
import { useTranslation } from '@/shared/i18n/useTranslation';
import { BentoGrid } from '@/widgets/bento-grid/ui/BentoGrid';
import { AnalyticsDashboard } from '@/widgets/analytics-dashboard/ui/AnalyticsDashboard';
import { RealTimeSandBox } from "@/widgets/sandbox/ui/RealTimeSandbox";
import { UiLab } from '@/widgets/ui-lab/ui/UiLab';
import { TicTacToe } from "@/features/tic-tac-toe/ui/TicTacToe";
import {PerformanceSandbox} from "@/features/performance-sandbox/model/PerfornaceSandbox";

export default function HomePage() {
    const { activeTab } = useNavigationStore();
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    useEffect(() => {
        say(t('avatar.greeting'));

        const timer = setTimeout(() => {
            clearSpeech();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="relative min-h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden">
            <div className="relative z-10 px-4 py-6 sm:p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.section
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col space-y-10"
                        >
                            <header className="space-y-2">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-500 bg-clip-text text-transparent"
                                >
                                    {t('sections.overview.title')}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl"
                                >
                                    {t('sections.overview.subtitle')}
                                </motion.p>
                            </header>

                            <div className="w-full">
                                <BentoGrid />
                            </div>
                        </motion.section>
                    )}

                    {activeTab === 'analytics' && (
                        <motion.section
                            key="analytics"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('sections.analytics.title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('sections.analytics.subtitle')}</p>
                            </div>

                            <AnalyticsDashboard />
                        </motion.section>
                    )}

                    {activeTab === 'sandbox' && (
                        <motion.section
                            key="sandbox"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('sections.sandbox.title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('sections.sandbox.subtitle')}</p>
                            </div>

                            <RealTimeSandBox />
                        </motion.section>
                    )}

                    {activeTab === 'ui-lab' && (
                        <motion.section
                            key="ui-lab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('sections.uiLab.title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('sections.uiLab.subtitle')}</p>
                            </div>

                            <UiLab />
                        </motion.section>
                    )}

                    {activeTab === 'tic-tac-toe' && (
                        <motion.section
                            key="tic-tac-toe"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('sections.ticTacToe.title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('sections.ticTacToe.subtitle')}</p>
                            </div>
                            <TicTacToe />
                        </motion.section>
                    )}

                    {activeTab === 'performance' && (
                        <motion.section
                            key="performance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex flex-col space-y-6"
                        >
                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t('sections.performance.title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('sections.performance.subtitle')}</p>
                            </div>
                            <PerformanceSandbox />
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] pointer-events-none z-0" />
        </main>
    );
}
