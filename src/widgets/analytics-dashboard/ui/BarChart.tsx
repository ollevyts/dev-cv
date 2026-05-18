import React from "react";
import { Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart } from "recharts";
import { geoData } from "@/widgets/analytics-dashboard/data/data";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTheme } from "next-themes";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const BarsChart = () => {
    const { say, clearSpeech } = useAvatar();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    const gridColor = isDark ? '#1e293b' : '#e2e8f0';
    const axisColor = isDark ? '#64748b' : '#94a3b8';
    const tooltipBg = isDark ? '#0f172a' : '#ffffff';
    const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between transition-colors"
            onMouseEnter={() => say(t('avatar.geo'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <h3 style={{ color: axisColor }} className="text-sm font-bold uppercase tracking-widest">GEO Profitability</h3>
                <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mt-0.5">{t('analytics.geoSubtitle')}</p>
            </div>

            <div className="h-[240px] w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="country" stroke={axisColor} fontSize={11} tickLine={false} />
                        <YAxis stroke={axisColor} fontSize={11} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                        />
                        <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Bar dataKey="ROI" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="ROI %" />
                        <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit ($)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
