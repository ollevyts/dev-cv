import React from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const HobbyCard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="min-h-[140px]"
            title={t('cards.hobby.title')}
            onMouseEnter={() => say(t('avatar.hobby'))}
            onMouseLeave={clearSpeech}
        >
            <div className="flex gap-5 items-center justify-center h-full my-auto opacity-80 py-2">
                <div className="flex flex-col items-center gap-1 group">
                    <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform cursor-default" title="Formula 1">🏎️</span>
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-tight">F1 Racing</span>
                </div>
                <div className="flex flex-col items-center gap-1 group">
                    <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform cursor-default" title="Engineering">⚙️</span>
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-tight">Automotive</span>
                </div>
                <div className="flex flex-col items-center gap-1 group">
                    <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform cursor-default" title="Cuisine">🍱</span>
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-tight">Seafood</span>
                </div>
            </div>
        </Card>
    );
}
