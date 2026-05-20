'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, User, Cpu } from 'lucide-react';
import { useTranslation } from "@/shared/i18n/useTranslation";
import { useTheme } from 'next-themes';

interface ScreenGameProps {
    board: Array<'X' | 'O' | null>;
    isXNext: boolean;
    scores: { human: number; ai: number };
    onCellClick: (index: number) => void;
    onReset: () => void;
    onBack: () => void;
}

export const ScreenGame = ({ board, isXNext, scores, onCellClick, onReset, onBack }: ScreenGameProps) => {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-6 w-full">
                <button
                    type="button"
                    onClick={onBack}
                    style={{
                        backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                        borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
                        color: isDark ? '#94a3b8' : '#64748b',
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold border px-3 py-2 rounded-xl hover:opacity-80 transition-opacity"
                >
                    <ArrowLeft size={14} /> {t('ticTacToeWidget.back')}
                </button>

                <div
                    style={{
                        backgroundColor: isDark ? '#020617' : 'rgb(241,245,249)',
                        borderColor: isDark ? 'rgba(30,41,59,0.5)' : 'rgb(226,232,240)',
                        color: isDark ? '#cbd5e1' : '#475569',
                    }}
                    className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border"
                >
                    {t('ticTacToeWidget.turn')} {isXNext
                        ? <span className="text-sky-400">{t('ticTacToeWidget.humanTurn')}</span>
                        : <span className="text-purple-400">{t('ticTacToeWidget.aiTurn')}</span>
                    }
                </div>
            </div>

            <div
                style={{
                    backgroundColor: isDark ? 'rgba(2,6,23,0.4)' : 'rgba(241,245,249,0.8)',
                    borderColor: isDark ? 'rgb(15,23,42)' : 'rgb(226,232,240)',
                }}
                className="grid grid-cols-3 gap-3 w-full max-w-[320px] mx-auto p-2 border rounded-3xl mb-6"
            >
                {board.map((cell, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onCellClick(index)}
                        style={{
                            backgroundColor: isDark ? 'rgba(15,23,42,0.5)' : 'rgba(255,255,255,0.8)',
                            borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)',
                        }}
                        className="w-full aspect-square border rounded-2xl flex items-center justify-center text-4xl font-black transition-all hover:opacity-80 active:scale-95 outline-none"
                    >
                        {cell && (
                            <motion.span
                                initial={{ scale: 0, rotate: cell === 'X' ? -15 : 15 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className={cell === 'X' ? 'text-sky-400' : 'text-purple-400'}
                            >
                                {cell}
                            </motion.span>
                        )}
                    </button>
                ))}
            </div>

            <div
                style={{
                    backgroundColor: isDark ? 'rgba(15,23,42,0.2)' : 'rgba(255,255,255,0.85)',
                    borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
                }}
                className="border p-4 rounded-2xl flex items-center justify-between w-full"
            >
                <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                        <User size={14} className="text-sky-400" />
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{t('ticTacToeWidget.human')}:</span>
                        <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-bold">{scores.human}</span>
                    </div>
                    <div style={{ backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)' }} className="w-px h-3" />
                    <div className="flex items-center gap-1.5">
                        <Cpu size={14} className="text-purple-400" />
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{t('ticTacToeWidget.ai')}:</span>
                        <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-bold">{scores.ai}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    style={{
                        backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(241,245,249)',
                        borderColor: isDark ? 'rgba(51,65,85,0.5)' : 'rgb(226,232,240)',
                        color: isDark ? '#94a3b8' : '#64748b',
                    }}
                    className="p-2.5 transition-all rounded-xl border hover:opacity-80"
                    title={t('ticTacToeWidget.reset')}
                >
                    <RotateCcw size={14} />
                </button>
            </div>
        </motion.div>
    );
};
