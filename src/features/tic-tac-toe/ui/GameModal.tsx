'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, LogOut, Trophy, Skull, Handshake } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/useTranslation';
import { useTheme } from 'next-themes';

interface GameModalProps {
    isOpen: boolean;
    winner: string | null;
    onRestart: () => void;
    onExit: () => void;
}

export const GameModal = ({ isOpen, winner, onRestart, onExit }: GameModalProps) => {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    if (!isOpen) return null;

    const getModalContent = () => {
        switch (winner) {
            case 'X':
                return {
                    title: t('ticTacToeWidget.victoryTitle'),
                    desc: t('ticTacToeWidget.victoryDesc'),
                    icon: <Trophy size={48} className="text-yellow-400" />,
                    borderColor: isDark ? 'rgba(234,179,8,0.3)' : 'rgba(234,179,8,0.4)',
                };
            case 'O':
                return {
                    title: t('ticTacToeWidget.defeatTitle'),
                    desc: t('ticTacToeWidget.defeatDesc'),
                    icon: <Skull size={48} className="text-rose-400" />,
                    borderColor: isDark ? 'rgba(244,63,94,0.3)' : 'rgba(244,63,94,0.4)',
                };
            default:
                return {
                    title: t('ticTacToeWidget.drawTitle'),
                    desc: t('ticTacToeWidget.drawDesc'),
                    icon: <Handshake size={48} className="text-sky-400" />,
                    borderColor: isDark ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.4)',
                };
        }
    };

    const content = getModalContent();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onRestart}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                style={{
                    backgroundColor: isDark ? 'rgb(15,23,42)' : 'rgb(255,255,255)',
                    borderColor: content.borderColor,
                }}
                className="border p-6 rounded-3xl w-full max-w-xs relative z-10 text-center shadow-2xl flex flex-col items-center"
            >
                <div
                    style={{
                        backgroundColor: isDark ? 'rgba(2,6,23,0.4)' : 'rgba(241,245,249,0.8)',
                        borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
                    }}
                    className="mb-4 p-3 rounded-2xl border"
                >
                    {content.icon}
                </div>

                <h3 style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="text-xl font-black tracking-tight mb-1">
                    {content.title}
                </h3>
                <p style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs leading-relaxed px-2 mb-6">
                    {content.desc}
                </p>

                <div className="flex flex-col gap-2 w-full">
                    <button
                        type="button"
                        onClick={onRestart}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/10 active:scale-[0.98]"
                    >
                        <RotateCcw size={14} /> {t('ticTacToeWidget.playAgain')}
                    </button>

                    <button
                        type="button"
                        onClick={onExit}
                        style={{
                            backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(241,245,249)',
                            color: isDark ? '#cbd5e1' : '#475569',
                        }}
                        className="w-full font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:opacity-80 active:scale-[0.98]"
                    >
                        <LogOut size={14} /> {t('ticTacToeWidget.mainMenu')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
