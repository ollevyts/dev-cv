'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAvatar } from '@/features/avatar-speech/model/AvatarContext';

import { ConnectionManager } from './ConnectionManager';
import { StreamStats } from './StreamStats';
import { EventTerminal } from './EventTerminal';
import { ILogEvent, ISandboxStats } from "../model/types";

const GEO_LIST = ['US', 'UA', 'DE', 'UK', 'FR', 'PL', 'BR', 'JP'];
const EVENT_TYPES = ['CLICK', 'CONVERSION', 'SYSTEM', 'ERROR'] as const;

export const RealTimeSandBox = () => {
    const { say, clearSpeech } = useAvatar();

    const [isLive, setIsLive] = useState<boolean>(true);
    const [events, setEvents] = useState<ILogEvent[]>([]);
    const [speed, setSpeed] = useState<number>(500);

    const [stats, setStats] = useState<ISandboxStats>({ clicks: 0, convs: 0, errors: 0 });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isLive) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
            const geo = GEO_LIST[Math.floor(Math.random() * GEO_LIST.length)];
            const now = new Date().toLocaleTimeString();
            const id = Math.random().toString(36).substring(2, 9);

            let message = '';
            switch (type) {
                case 'CLICK':
                    message = `User clicked on offer Link #${Math.floor(Math.random() * 500)}`;
                    break;
                case 'CONVERSION':
                    message = `Lead approved! Payout +$${(Math.random() * 15 + 2).toFixed(2)}`;
                    break;
                case 'SYSTEM':
                    message = `FSD Slice matching success / cache update`;
                    break;
                case 'ERROR':
                    message = `Rate limit hit or Tracker socket timeout 429`;
                    break;
                default:
                    message = `Undefined variable`;
                    break;
            }

            const newEvent: ILogEvent = { id, timestamp: now, type, message, geo };

            setEvents((prev) => [...prev.slice(-39), newEvent]);

            setStats((prev) => ({
                clicks: prev.clicks + (type === 'CLICK' ? 1 : 0),
                convs: prev.convs + (type === 'CONVERSION' ? 1 : 0),
                errors: prev.errors + (type === 'ERROR' ? 1 : 0),
            }));
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isLive, speed]);

    const clearLog = () => {
        setEvents([]);
        setStats({ clicks: 0, convs: 0, errors: 0 });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2 w-full">
            <div className="space-y-4">
                <ConnectionManager
                    isLive={isLive}
                    setIsLive={setIsLive}
                    speed={speed}
                    setSpeed={setSpeed}
                    clearLog={clearLog}
                    say={say}
                    clearSpeech={clearSpeech}
                />
                <StreamStats
                    stats={stats}
                    say={say}
                    clearSpeech={clearSpeech}
                />
            </div>

            <EventTerminal
                events={events}
                isLive={isLive}
                say={say}
                clearSpeech={clearSpeech}
            />
        </div>
    );
};