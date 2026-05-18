'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface AnimatedTogglesProps {
    isFsdStrict: boolean;
    setIsFsdStrict: (val: boolean) => void;
    isAiOptimized: boolean;
    setIsAiOptimized: (val: boolean) => void;
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const AnimatedToggles = ({
    isFsdStrict, setIsFsdStrict, isAiOptimized, setIsAiOptimized, say, clearSpeech,
}: AnimatedTogglesProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between min-h-[220px] transition-colors"
            onMouseEnter={() => say(t('avatar.toggles'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sliders size={16} className="text-purple-400" /> Animated Toggles
                </h3>
                <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mb-6">{t('uiLabWidget.toggles.subtitle')}</p>

                <div className="space-y-4 max-w-sm">
                    <div className="flex justify-between items-center">
                        <span style={{ color: isDark ? '#cbd5e1' : '#334155' }} className="text-xs font-semibold">
                            {t('uiLabWidget.toggles.fsdLabel')}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsFsdStrict(!isFsdStrict);
                                say(isFsdStrict ? t('avatar.fsdOff') : t('avatar.fsdOn'));
                            }}
                            style={{ backgroundColor: isFsdStrict ? undefined : (isDark ? 'rgb(30,41,59)' : 'rgb(203,213,225)') }}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${isFsdStrict ? 'bg-emerald-500' : ''}`}
                        >
                            <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center text-[10px]"
                                animate={{ x: isFsdStrict ? 20 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                                {isFsdStrict && <Check size={12} className="text-emerald-600 font-bold" />}
                            </motion.div>
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span style={{ color: isDark ? '#cbd5e1' : '#334155' }} className="text-xs font-semibold">
                            {t('uiLabWidget.toggles.aiLabel')}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsAiOptimized(!isAiOptimized);
                                say(!isAiOptimized ? t('avatar.aiOn') : t('avatar.aiOff'));
                            }}
                            style={{ backgroundColor: isAiOptimized ? undefined : (isDark ? 'rgb(30,41,59)' : 'rgb(203,213,225)') }}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${isAiOptimized ? 'bg-purple-600' : ''}`}
                        >
                            <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center text-[10px]"
                                animate={{ x: isAiOptimized ? 20 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                                {isAiOptimized && <Check size={12} className="text-purple-600 font-bold" />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{ borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)' }}
                className="mt-4 pt-3 border-t text-[11px] font-mono"
            >
                <span style={{ color: isDark ? '#475569' : '#94a3b8' }}>{t('uiLabWidget.toggles.footer')} </span>
                <span className={isFsdStrict ? 'text-emerald-400' : isDark ? 'text-slate-500' : 'text-slate-400'}>
                    {isFsdStrict ? t('uiLabWidget.toggles.stateReady') : t('uiLabWidget.toggles.stateLegacy')}
                </span>
            </div>
        </div>
    );
};
