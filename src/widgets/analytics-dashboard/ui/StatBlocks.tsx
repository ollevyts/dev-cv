import React from "react";
import { stats } from "@/widgets/analytics-dashboard/data/data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTheme } from "next-themes";

export const StatBlocks = () => {
    const { say, clearSpeech } = useAvatar();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <motion.div
                    key={stat.title}
                    whileHover={{ y: -2 }}
                    onMouseEnter={() => say(`${stat.title}: ${stat.desc}`)}
                    onMouseLeave={clearSpeech}
                    style={{
                        backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                        borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
                    }}
                    className="backdrop-blur-md border p-5 rounded-2xl flex flex-col justify-between cursor-default group transition-colors"
                >
                    <div className="flex justify-between items-start">
                        <span style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-xs font-bold uppercase tracking-wider">
                            {stat.title}
                        </span>
                        <stat.icon className={`${stat.color} w-5 h-5`} />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }} className="text-2xl font-black tracking-tight">
                            {stat.value}
                        </span>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
                            {stat.change} <ArrowUpRight size={12} />
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
