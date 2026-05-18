import React from "react";
import { Plane, Zap, Send } from "lucide-react";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const ExpertiseCard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="sm:col-span-2 lg:col-span-2 min-h-[150px]"
            title={t('cards.expertise.title')}
            onMouseEnter={() => say(t('avatar.expertise'))}
            onMouseLeave={clearSpeech}
        >
            <div className="grid grid-cols-3 gap-2 w-full h-full my-auto items-center text-center">
                <div className="flex flex-col items-center gap-3 group py-2">
                    <div className="p-3 rounded-2xl bg-sky-500/5 border border-sky-500/10 group-hover:bg-sky-500/10 transition-colors">
                        <Plane className="text-sky-500 dark:text-sky-400 w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">Sky-up</span>
                </div>
                <div className="flex flex-col items-center gap-3 group py-2">
                    <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors">
                        <Send className="text-emerald-500 dark:text-emerald-400 w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">Brighta</span>
                </div>
                <div className="flex flex-col items-center gap-3 group py-2">
                    <div className="p-3 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 group-hover:bg-yellow-500/10 transition-colors">
                        <Zap className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">Traffic Squad</span>
                </div>
            </div>
        </Card>
    );
}
