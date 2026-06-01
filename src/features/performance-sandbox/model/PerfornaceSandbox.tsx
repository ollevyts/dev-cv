'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Database, Terminal, Play, Square } from 'lucide-react';
import { usePerformanceSandbox } from '../model/usePerformanceSandbox';
import { useTranslation } from '@/shared/i18n/useTranslation';
import { useTheme } from 'next-themes';

export const PerformanceSandbox = () => {
    const {
        isWorkerRunning,
        isMainThreadRunning,
        mathResult,
        executionTime,
        isStreaming,
        logs,
        totalProcessedLogs,
        runWithWorker,
        runWithMainThread,
        toggleStream
    } = usePerformanceSandbox();

    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    const cardStyle = {
        backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
        borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
    };

    const innerStyle = {
        backgroundColor: isDark ? '#020617' : 'rgb(241,245,249)',
        borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgb(226,232,240)',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <div style={cardStyle} className="backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between transition-colors">
                <div>
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                        <Cpu size={22} />
                        <h3 style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-black text-lg tracking-tight">
                            {t('perfWidget.workerTitle')}
                        </h3>
                    </div>
                    <p style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs leading-relaxed mb-6">
                        {t('perfWidget.workerDesc')}
                    </p>

                    <div style={innerStyle} className="p-4 rounded-2xl border font-mono text-xs mb-6 space-y-2">
                        <div className="flex justify-between" style={{ color: isDark ? '#475569' : '#94a3b8' }}>
                            <span>{t('perfWidget.status')}</span>
                            <span className={isWorkerRunning || isMainThreadRunning ? 'text-yellow-400 animate-pulse' : 'text-emerald-400'}>
                                {isWorkerRunning
                                    ? t('perfWidget.statusWorker')
                                    : isMainThreadRunning
                                    ? t('perfWidget.statusMain')
                                    : t('perfWidget.statusIdle')}
                            </span>
                        </div>
                        <div className="flex justify-between" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            <span>{t('perfWidget.execTime')}</span>
                            <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-bold">
                                {executionTime ? `${executionTime} ms` : '—'}
                            </span>
                        </div>
                        <div className="flex justify-between" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            <span>{t('perfWidget.revenue')}</span>
                            <span className="text-blue-400 font-bold">
                                {mathResult ? `$${mathResult.toLocaleString()}` : '—'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        disabled={isWorkerRunning || isMainThreadRunning}
                        onClick={runWithWorker}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        <Zap size={14} /> {t('perfWidget.runWorker')}
                    </button>
                    <button
                        type="button"
                        disabled={isWorkerRunning || isMainThreadRunning}
                        onClick={runWithMainThread}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all border border-rose-500/20 disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        <Play size={14} /> {t('perfWidget.runMain')}
                    </button>
                </div>
            </div>

            <div style={cardStyle} className="backdrop-blur-md border p-6 rounded-3xl flex flex-col justify-between min-h-[380px] transition-colors">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-purple-400">
                            <Terminal size={22} />
                            <h3 style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="font-black text-lg tracking-tight">
                                {t('perfWidget.streamTitle')}
                            </h3>
                        </div>
                        <div style={{ ...innerStyle, color: isDark ? '#94a3b8' : '#64748b' }} className="text-[10px] font-mono px-2.5 py-1 border rounded-lg">
                            Total: <span className="text-purple-400 font-bold">{totalProcessedLogs}</span>
                        </div>
                    </div>
                    <p style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs leading-relaxed mb-4">
                        {t('perfWidget.streamDesc')}
                    </p>

                    <div style={innerStyle} className="rounded-2xl border p-3 h-48 overflow-y-auto font-mono text-[11px] flex flex-col gap-1.5">
                        {logs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center gap-2" style={{ color: isDark ? '#475569' : '#94a3b8' }}>
                                <Database size={24} className="stroke-1 animate-bounce" />
                                <span>{t('perfWidget.streamOffline')}</span>
                            </div>
                        ) : (
                            logs.map((log) => (
                                <div key={log.id} className="flex gap-2 border-b pb-1 leading-normal" style={{ borderColor: isDark ? 'rgba(15,23,42,0.5)' : 'rgb(226,232,240)' }}>
                                    <span style={{ color: isDark ? '#475569' : '#94a3b8' }}>[{log.time}]</span>
                                    <span className={
                                        log.type === 'SUCCESS' ? 'text-emerald-400' :
                                        log.type === 'WARN' ? 'text-amber-400' : 'text-sky-400'
                                    }>
                                        {log.type}
                                    </span>
                                    <span style={{ color: isDark ? '#cbd5e1' : '#475569' }} className="truncate">{log.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={toggleStream}
                    className={`w-full font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-4 shadow-lg ${
                        isStreaming
                            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/10'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/10'
                    }`}
                >
                    {isStreaming ? (
                        <><Square size={14} /> {t('perfWidget.stopStream')}</>
                    ) : (
                        <><Play size={14} /> {t('perfWidget.startStream')}</>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
