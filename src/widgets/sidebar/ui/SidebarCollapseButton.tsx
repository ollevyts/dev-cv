'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarCollapseButtonProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
}

export const SidebarCollapseButton = ({ isCollapsed, setIsCollapsed }: SidebarCollapseButtonProps) => {
    return (
        <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-6 -right-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1 rounded-full shadow-lg z-[55] transition-colors"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
    );
};
