import React from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { Cpu } from 'lucide-react';
import { useTranslation } from "@/shared/i18n/useTranslation";

export const AICard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="sm:col-span-2 lg:col-span-2 min-h-[140px]"
            title={t('cards.ai.title')}
            onMouseEnter={() => say(t('avatar.ai'))}
            onMouseLeave={clearSpeech}
        >
            <div className="flex items-start gap-4 h-full my-auto py-1">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-500 dark:text-purple-400 shrink-0">
                    <Cpu size={24} />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">{t('cards.ai.subtitle')}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t('cards.ai.description')}
                    </p>
                </div>
            </div>
        </Card>
    );
}
