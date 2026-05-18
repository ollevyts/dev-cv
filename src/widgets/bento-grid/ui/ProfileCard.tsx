import { ExternalLink } from "lucide-react";
import React from "react";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const ProfileCard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent border-blue-500/20"
            onMouseEnter={() => say(t('avatar.profile'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <div className="flex space-x-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                        {t('cards.profile.badge')}
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white leading-tight">
                    Oleksandr Levytskyi
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm font-normal">
                    {t('cards.profile.description')}
                </p>
            </div>
            <div className="flex space-x-3 mt-6">
                <a
                    href="https://djinni.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10"
                >
                    Djinni <ExternalLink size={14} />
                </a>

                <a
                    href="https://www.linkedin.com/in/alexandr-levytskyi-05713019a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                </a>
            </div>
        </Card>
    );
}
