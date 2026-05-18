'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Card = ({ children, className = "", title = "", onMouseEnter, onMouseLeave }: CardProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgba(30,41,59,0.8)' : 'rgba(226,232,240,1)',
            }}
            className={`backdrop-blur-md border p-6 rounded-3xl relative overflow-hidden group flex flex-col justify-between cursor-default transition-colors ${className}`}
        >
            {title && (
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-xs font-bold uppercase tracking-widest mb-4 z-10">
                    {title}
                </h3>
            )}
            <div className="flex-1 flex flex-col justify-between z-10 h-full w-full">
                {children}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};
