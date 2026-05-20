'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { useTheme } from 'next-themes';

interface ScreenSetupProps {
    difficulty: 'easy' | 'hard';
    setDifficulty: (mode: 'easy' | 'hard') => void;
    onStart: () => void;
}

export const ScreenSetup = ({ difficulty, setDifficulty, onStart }: ScreenSetupProps) => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full flex flex-col items-center"
        >
            <div
                style={{
                    backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                    borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
                }}
                className="backdrop-blur-md border p-6 rounded-3xl w-full cursor-default transition-colors"
                onMouseLeave={clearSpeech}
            >
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-xs font-bold uppercase tracking-widest mb-4">
                    {t('ticTacToeWidget.selectDifficulty')}
                </h3>

                <div
                    style={{
                        backgroundColor: isDark ? '#020617' : 'rgb(241,245,249)',
                        borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
                    }}
                    className="flex p-1.5 rounded-2xl border relative"
                >
                    {(['easy', 'hard'] as const).map((mode) => {
                        const isActive = difficulty === mode;
                        return (
                            <button
                                key={mode}
                                type="button"
                                onClick={() => setDifficulty(mode)}
                                onMouseEnter={() => say(mode === 'easy' ? t('avatar.ticTacToeEasy') : t('avatar.ticTacToeHard'))}
                                style={{ color: isActive ? '#ffffff' : isDark ? '#64748b' : '#94a3b8' }}
                                className="flex-1 py-2.5 rounded-xl text-xs font-bold relative transition-colors duration-300 z-10"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-difficulty-bg"
                                        className="absolute inset-0 bg-blue-600 rounded-xl z-0"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {mode === 'easy' ? t('ticTacToeWidget.easy') : t('ticTacToeWidget.hard')}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                type="button"
                onClick={onStart}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 mt-6 group"
            >
                <Swords size={14} className="group-hover:rotate-12 transition-transform" />
                {t('ticTacToeWidget.startMatch')}
            </button>
        </motion.div>
    );
};
