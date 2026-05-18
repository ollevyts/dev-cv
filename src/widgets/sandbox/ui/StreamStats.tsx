import React from 'react';
import { Activity } from 'lucide-react';
import { ISandboxStats } from '../model/types';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface StreamStatsProps {
    stats: ISandboxStats;
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const StreamStats = ({ stats, say, clearSpeech }: StreamStatsProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    const rowStyle = {
        backgroundColor: isDark ? 'rgba(2,6,23,0.4)' : 'rgba(241,245,249,0.8)',
        borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgb(226,232,240)',
    };

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl transition-colors"
            onMouseEnter={() => say(t('avatar.stream'))}
            onMouseLeave={clearSpeech}
        >
            <h3
                style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
            >
                <Activity size={16} className="text-purple-400" /> {t('sandboxWidget.stats.title')}
            </h3>

            <div className="space-y-3">
                <div style={rowStyle} className="flex justify-between items-center p-3 rounded-xl border">
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-semibold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('sandboxWidget.stats.clicks')}
                    </span>
                    <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="text-sm font-bold font-mono">{stats.clicks}</span>
                </div>
                <div style={rowStyle} className="flex justify-between items-center p-3 rounded-xl border">
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-semibold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('sandboxWidget.stats.convs')}
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">{stats.convs}</span>
                </div>
                <div style={rowStyle} className="flex justify-between items-center p-3 rounded-xl border">
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-semibold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {t('sandboxWidget.stats.errors')}
                    </span>
                    <span className="text-sm font-bold font-mono text-rose-400">{stats.errors}</span>
                </div>
            </div>
        </div>
    );
};
