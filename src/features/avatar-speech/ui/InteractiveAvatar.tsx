'use client';

import React from 'react';
import { useMousePosition } from '@/shared/hooks/useMousePosition';
import { useAvatar } from '../model/AvatarContext';
import { AnimatePresence, motion } from 'framer-motion';

export const InteractiveAvatar = () => {
    useMousePosition();
    const { speechText } = useAvatar();

    return (
        <div className="flex flex-col items-center p-4 relative z-[60]">
            <AnimatePresence mode="wait">
                {speechText && (
                    <motion.div
                        key={speechText}
                        initial={{ opacity: 0, scale: 0.9, x: -6 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -6 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 z-[9999]"
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '100%',
                                transform: 'translateY(-50%)',
                                width: 0,
                                height: 0,
                                borderTop: '7px solid transparent',
                                borderBottom: '7px solid transparent',
                                borderRight: '8px solid #1e293b',
                                marginRight: '-1px',
                            }}
                        />
                        <div className="bg-slate-800 border border-slate-700/50 text-slate-100 text-[11px] leading-relaxed font-medium px-3.5 py-2.5 rounded-2xl shadow-xl max-w-[185px] min-w-[120px]">
                            {speechText}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                    <circle cx="50" cy="50" r="40" fill="#FFD700" stroke="#1d4ed8" strokeWidth="4" />
                    <path d="M40 70 Q50 75 60 70" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" fill="none" />
                    {[32, 68].map((cx) => (
                        <g key={cx}>
                            <circle cx={cx} cy={42} r="16" fill="white" stroke="#1d4ed8" strokeWidth="3" />
                            <circle
                                cx={cx}
                                cy={42}
                                r="6"
                                fill="#001d66"
                                style={{
                                    transform: `translate(
                                        clamp(-8px, calc((var(--mouse-x) - ${cx + 100}px) * 0.05), 8px),
                                        clamp(-8px, calc((var(--mouse-y) - 200px) * 0.05), 8px)
                                    )`
                                }}
                                className="will-change-transform"
                            />
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};
