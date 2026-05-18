import React from 'react';
import { Server, Pause, Play, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface ConnectionManagerProps {
    isLive: boolean;
    setIsLive: (val: boolean) => void;
    speed: number;
    setSpeed: (val: number) => void;
    clearLog: () => void;
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const ConnectionManager = ({
    isLive, setIsLive, speed, setSpeed, clearLog, say, clearSpeech,
}: ConnectionManagerProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl transition-colors"
            onMouseEnter={() => say(t('avatar.connection'))}
            onMouseLeave={clearSpeech}
        >
            <h3
                style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
            >
                <Server size={16} className="text-blue-400" /> {t('sandboxWidget.connection.title')}
            </h3>

            <div className="flex gap-2 mb-6">
                <button
                    type="button"
                    onClick={() => setIsLive(!isLive)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        isLive
                            ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                >
                    {isLive ? <Pause size={14} /> : <Play size={14} />}
                    {isLive ? t('sandboxWidget.connection.disconnect') : t('sandboxWidget.connection.connect')}
                </button>
                <button
                    type="button"
                    onClick={clearLog}
                    style={{
                        backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(241,245,249)',
                        borderColor: isDark ? 'rgba(51,65,85,0.5)' : 'rgb(226,232,240)',
                        color: isDark ? '#94a3b8' : '#64748b',
                    }}
                    className="px-4 transition-all rounded-xl border"
                    title={t('sandboxWidget.connection.clear')}
                >
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                    <span style={{ color: isDark ? '#475569' : '#94a3b8' }} className="uppercase tracking-wider">
                        {t('sandboxWidget.connection.latency')}
                    </span>
                    <span className="text-sky-400">{speed}ms</span>
                </div>
                <input
                    type="range"
                    min="200"
                    max="2000"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={!isLive}
                    style={{ backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)' }}
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-30"
                />
            </div>
        </div>
    );
};
