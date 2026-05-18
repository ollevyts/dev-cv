import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';
import { ILogEvent } from '../model/types';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface EventTerminalProps {
    events: ILogEvent[];
    isLive: boolean;
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const EventTerminal = ({ events, isLive, say, clearSpeech }: EventTerminalProps) => {
    const logEndRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [events]);

    return (
        <div
            style={{
                backgroundColor: isDark ? '#020617' : '#f8fafc',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="lg:col-span-2 border rounded-3xl p-5 flex flex-col h-[400px] transition-colors"
            onMouseEnter={() => say(t('avatar.terminal'))}
            onMouseLeave={clearSpeech}
        >
            <div
                style={{ borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)' }}
                className="flex justify-between items-center pb-3 border-b mb-3 shrink-0"
            >
                <div className="flex items-center gap-2">
                    <Radio size={14} className={isLive ? 'text-emerald-400 animate-pulse' : 'text-slate-600'} />
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-bold uppercase tracking-widest">
                        {t('sandboxWidget.terminal.title')}
                    </span>
                </div>
                <div className="flex gap-1.5">
                    {['bg-rose-500/40', 'bg-amber-500/40', 'bg-emerald-500/40'].map((c, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs font-mono select-text">
                <AnimatePresence initial={false}>
                    {events.length === 0 ? (
                        <div style={{ color: isDark ? '#475569' : '#94a3b8' }} className="h-full flex flex-col items-center justify-center gap-2">
                            <span>{t('sandboxWidget.terminal.idle')}</span>
                        </div>
                    ) : (
                        events.map((event) => {
                            let badgeColor = isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-500';
                            if (event.type === 'CLICK') badgeColor = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
                            if (event.type === 'CONVERSION') badgeColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                            if (event.type === 'ERROR') badgeColor = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';

                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10, y: 5 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ backgroundColor: isDark ? 'rgba(15,23,42,0.3)' : 'rgba(241,245,249,0.6)' }}
                                    className="flex items-start gap-2 p-2 rounded-lg transition-colors"
                                >
                                    <span style={{ color: isDark ? '#475569' : '#94a3b8' }} className="shrink-0 select-none">{event.timestamp}</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 uppercase tracking-wide ${badgeColor}`}>
                                        {event.type}
                                    </span>
                                    <span
                                        style={{
                                            backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
                                            color: isDark ? '#cbd5e1' : '#475569',
                                        }}
                                        className="px-1 py-0.5 rounded font-bold tracking-tight shrink-0 select-none"
                                    >
                                        {event.geo}
                                    </span>
                                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="break-all">{event.message}</span>
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
                <div ref={logEndRef} />
            </div>
        </div>
    );
};
