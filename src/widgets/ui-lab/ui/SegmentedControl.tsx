'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface SegmentedControlProps {
    selectedSegment: string;
    setSelectedSegment: (id: string) => void;
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const SegmentedControl = ({ selectedSegment, setSelectedSegment, say, clearSpeech }: SegmentedControlProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    const segments = [
        { id: 'performance', label: 'Performance' },
        { id: 'security', label: 'Security' },
        { id: 'dev', label: 'Developer' },
    ];

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between min-h-[220px] transition-colors"
            onMouseEnter={() => say(t('avatar.segmented'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" /> Segmented Control
                </h3>
                <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mb-6">{t('uiLabWidget.segmented.subtitle')}</p>

                <div
                    style={{
                        backgroundColor: isDark ? '#020617' : 'rgb(241,245,249)',
                        borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
                    }}
                    className="flex p-1.5 rounded-2xl border max-w-sm relative"
                >
                    {segments.map((segment) => {
                        const isActive = selectedSegment === segment.id;
                        return (
                            <button
                                key={segment.id}
                                onClick={() => setSelectedSegment(segment.id)}
                                style={{ color: isActive ? '#ffffff' : isDark ? '#94a3b8' : '#64748b' }}
                                className="flex-1 py-2.5 rounded-xl text-xs font-bold relative transition-colors duration-300 z-10"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-segment-bg"
                                        className="absolute inset-0 bg-blue-600 rounded-xl z-0"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{segment.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                style={{ borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)' }}
                className="mt-4 pt-3 border-t text-[11px] font-mono"
            >
                <span style={{ color: isDark ? '#475569' : '#94a3b8' }}>{t('uiLabWidget.segmented.footer')} </span>
                <span className="text-blue-400 font-bold">{selectedSegment}_mode</span>
            </div>
        </div>
    );
};
