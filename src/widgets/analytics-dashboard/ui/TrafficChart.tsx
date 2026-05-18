import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trafficData } from "@/widgets/analytics-dashboard/data/data";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTheme } from "next-themes";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const TrafficChart = () => {
    const { say, clearSpeech } = useAvatar();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();
    const [activeMetric, setActiveMetric] = useState<'Clicks' | 'Conversions'>('Clicks');

    const gridColor = isDark ? '#1e293b' : '#e2e8f0';
    const axisColor = isDark ? '#64748b' : '#94a3b8';
    const tooltipBg = isDark ? '#0f172a' : '#ffffff';
    const tooltipBorder = isDark ? '#334155' : '#e2e8f0';
    const tooltipText = isDark ? '#f8fafc' : '#0f172a';

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="lg:col-span-2 backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between transition-colors"
            onMouseEnter={() => say(t('avatar.traffic'))}
            onMouseLeave={clearSpeech}
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 style={{ color: axisColor }} className="text-sm font-bold uppercase tracking-widest">Traffic Performance</h3>
                    <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mt-0.5">{t('analytics.trafficSubtitle')}</p>
                </div>
                <div
                    style={{
                        backgroundColor: isDark ? '#020617' : '#f1f5f9',
                        borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
                    }}
                    className="flex p-1 rounded-xl border"
                >
                    <button
                        onClick={() => setActiveMetric('Clicks')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === 'Clicks' ? 'bg-blue-600 text-white' : ''}`}
                        style={{ color: activeMetric === 'Clicks' ? undefined : axisColor }}
                    >
                        Clicks
                    </button>
                    <button
                        onClick={() => setActiveMetric('Conversions')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === 'Conversions' ? 'bg-emerald-600 text-white' : ''}`}
                        style={{ color: activeMetric === 'Conversions' ? undefined : axisColor }}
                    >
                        Conversions
                    </button>
                </div>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={activeMetric === 'Clicks' ? '#2563eb' : '#10b981'} stopOpacity={0.2}/>
                                <stop offset="95%" stopColor={activeMetric === 'Clicks' ? '#2563eb' : '#10b981'} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={axisColor} fontSize={11} tickLine={false} />
                        <YAxis stroke={axisColor} fontSize={11} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tooltipText }}
                            itemStyle={{ color: activeMetric === 'Clicks' ? '#60a5fa' : '#34d399' }}
                        />
                        <Area
                            type="monotone"
                            dataKey={activeMetric}
                            stroke={activeMetric === 'Clicks' ? '#3b82f6' : '#10b981'}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorMetric)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
