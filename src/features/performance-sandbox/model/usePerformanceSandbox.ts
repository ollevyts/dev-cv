'use client';

import { useState, useEffect, useRef } from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTranslation } from "@/shared/i18n/useTranslation";

interface LogItem {
    id: number;
    type: 'INFO' | 'SUCCESS' | 'WARN';
    message: string;
    time: string;
}

export const usePerformanceSandbox = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    const [isWorkerRunning, setIsWorkerRunning] = useState<boolean>(false);
    const [isMainThreadRunning, setIsMainThreadRunning] = useState<boolean>(false);
    const [mathResult, setMathResult] = useState<number | null>(null);
    const [executionTime, setExecutionTime] = useState<number | null>(null);

    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [logs, setLogs] = useState<LogItem[]>([]);
    const [totalProcessedLogs, setTotalProcessedLogs] = useState(0);

    const workedRef = useRef<Worker | null>(null);
    const logBufferRef = useRef<LogItem[]>([]);
    const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const batchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const logIdCounter = useRef(0);

    useEffect(() => {
        workedRef.current = new Worker(
            new URL('./report.worker.ts', import.meta.url)
        );

        workedRef.current.onmessage = (e) => {
            if (e.data.success) {
                setMathResult(e.data.totalRevenue);
                setIsWorkerRunning(false);
                say(t('avatar.perfWorkerDone'));
            }

            return () => {
                workedRef.current?.terminate();
                if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
                if (batchIntervalRef.current) clearInterval(batchIntervalRef.current);
            };
        };
    }, []);

    const runWithWorker = () => {
        setMathResult(null);
        setExecutionTime(null);
        setIsWorkerRunning(true);
        say(t('avatar.perfWorkerStart'));

        const start = performance.now();
        workedRef?.current?.postMessage({ action: 'run_heavy_math', count: 2000000 });

        setTimeout(() => {
            setExecutionTime(Math.round(performance.now() - start));
        }, 100);
    };

    const runWithMainThread = () => {
        setMathResult(null);
        setExecutionTime(null);
        setIsMainThreadRunning(true);
        say(t('avatar.perfMainThread'));

        setTimeout(() => {
            const start = performance.now();
            const data = [];

            for (let i = 0; i < 2000000; i++) {
                data.push({ id: i, amount: Math.random() * 1000 });
            }

            data.sort((a, b) => b.amount - a.amount);
            const total = data.reduce((sum, item) => sum + item.amount, 0);
            const end = performance.now();

            setExecutionTime(Math.round(end - start));
            setMathResult(Math.round(total));
            setIsMainThreadRunning(false);
        }, 200);
    };

    const toggleStream = () => {
        if (isStreaming) {
            if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
            if (batchIntervalRef.current) clearInterval(batchIntervalRef.current);
            setIsStreaming(false);
            clearSpeech();
        } else {
            setIsStreaming(true);
            setLogs([]);
            setTotalProcessedLogs(0);
            say(t('avatar.perfStream'));

            streamIntervalRef.current = setInterval(() => {
                const streamCnt = 100;
                for (let i = 0; i < streamCnt; i++) {
                    logIdCounter.current += 1;
                    const types = ['INFO', 'SUCCESS', 'WARN'] as const;
                    logBufferRef.current.push({
                        id: logIdCounter.current,
                        type: types[Math.floor(Math.random() * types.length)],
                        message: `Transaction #${logIdCounter.current} processed successfully inside cluster-ua-0${i % 4}`,
                        time: new Date().toLocaleTimeString()
                    });
                }
            }, 100);

            batchIntervalRef.current = setInterval(() => {
                if (logBufferRef.current.length === 0) return;
                const newBatch = [...logBufferRef.current];
                logBufferRef.current = [];
                setTotalProcessedLogs(prev => prev + newBatch.length);
                setLogs(prev => [...newBatch, ...prev].slice(0, 40));
            }, 200);
        }
    };

    return {
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
    };
};
