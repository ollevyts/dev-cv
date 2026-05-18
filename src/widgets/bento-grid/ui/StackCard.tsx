import React from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { useTranslation } from "@/shared/i18n/useTranslation";

export const StackCard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="lg:row-span-2 min-h-[220px]"
            title={t('cards.stack.title')}
            onMouseEnter={() => say(t('avatar.stack'))}
            onMouseLeave={clearSpeech}
        >
            <div className="flex flex-col gap-3 justify-center h-full py-2">
                {[
                    { name: 'Vue', color: 'bg-emerald-500' },
                    { name: 'React', color: 'bg-yellow-500' },
                    { name: 'State Management ', color: 'bg-blue-500' },
                    { name: 'TypeScript', color: 'bg-sky-500' },
                    { name: 'Pinia / WebSockets', color: 'bg-cyan-500' },
                    { name: 'Docker / CI/CD', color: 'bg-orange-500' },
                    { name: 'Cloudflare / Node / SQL', color: 'bg-purple-500' }

                ].map(tech => (
                    <div key={tech.name} className="flex items-center gap-3 bg-slate-100/80 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800/50 p-2.5 rounded-xl">
                        <div className={`w-2 h-2 rounded-full ${tech.color} shrink-0`} />
                        <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold tracking-wide">{tech.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
