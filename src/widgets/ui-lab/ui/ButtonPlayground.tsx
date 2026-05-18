'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Loader2, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface ButtonPlaygroundProps {
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const ButtonPlayground = ({ say, clearSpeech }: ButtonPlaygroundProps) => {
    const [buttonState, setButtonState] = useState<'default' | 'loading' | 'success' | 'disabled'>('default');
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl min-h-[320px] flex flex-col justify-between transition-colors"
            onMouseEnter={() => say(t('avatar.buttonLab'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sliders size={16} className="text-orange-400" /> Button State Lab
                </h3>
                <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mb-6">{t('uiLabWidget.buttonLab.subtitle')}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div
                        style={{
                            backgroundColor: isDark ? '#020617' : 'rgb(241,245,249)',
                            borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)',
                        }}
                        className="space-y-2 p-3 rounded-2xl border"
                    >
                        {(['default', 'loading', 'success', 'disabled'] as const).map((state) => (
                            <label
                                key={state}
                                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                                className="flex items-center gap-2.5 cursor-pointer group text-xs hover:text-slate-500 transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="btnState"
                                    checked={buttonState === state}
                                    onChange={() => {
                                        setButtonState(state);
                                        if (state === 'loading') say(t('avatar.btnLoading'));
                                        if (state === 'success') say(t('avatar.btnSuccess'));
                                        if (state === 'disabled') say(t('avatar.btnDisabled'));
                                    }}
                                    className="accent-blue-500"
                                />
                                <span className="capitalize font-medium tracking-wide">{state}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-center items-center py-4">
                        <motion.button
                            disabled={buttonState === 'disabled' || buttonState === 'loading'}
                            animate={{ scale: buttonState === 'loading' ? 0.98 : 1 }}
                            style={
                                buttonState === 'loading'
                                    ? { backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)', borderColor: isDark ? 'rgb(51,65,85)' : 'rgb(203,213,225)', color: isDark ? '#94a3b8' : '#64748b' }
                                    : buttonState === 'disabled'
                                    ? { backgroundColor: isDark ? 'rgba(30,41,59,0.4)' : 'rgba(226,232,240,0.6)', borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(203,213,225)', color: isDark ? '#475569' : '#94a3b8' }
                                    : undefined
                            }
                            className={`w-full max-w-[160px] py-3 px-4 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md select-none border ${
                                buttonState === 'default' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-purple-600/10 border-transparent' : ''
                            } ${
                                buttonState === 'loading' ? 'pointer-events-none' : ''
                            } ${
                                buttonState === 'success' ? 'bg-emerald-600 text-white font-black shadow-emerald-600/10 border-transparent' : ''
                            } ${
                                buttonState === 'disabled' ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {buttonState === 'default' && (
                                    <motion.span key="def" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {t('uiLabWidget.buttonLab.saveLabel')}
                                    </motion.span>
                                )}
                                {buttonState === 'loading' && (
                                    <motion.span key="lod" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Loader2 size={14} className="animate-spin text-purple-400" /> {t('uiLabWidget.buttonLab.loadingLabel')}
                                    </motion.span>
                                )}
                                {buttonState === 'success' && (
                                    <motion.span key="suc" className="flex items-center gap-1 text-emerald-200" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                        <Check size={14} className="stroke-[3]" /> {t('uiLabWidget.buttonLab.successLabel')}
                                    </motion.span>
                                )}
                                {buttonState === 'disabled' && (
                                    <motion.span key="dis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {t('uiLabWidget.buttonLab.lockedLabel')}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            <div
                style={{ borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)' }}
                className="mt-4 pt-3 border-t text-[11px] font-mono"
            >
                <span style={{ color: isDark ? '#475569' : '#94a3b8' }}>{t('uiLabWidget.buttonLab.footer')} </span>
                <span className="text-orange-400 font-bold">button_aria_{buttonState}</span>
            </div>
        </div>
    );
};
