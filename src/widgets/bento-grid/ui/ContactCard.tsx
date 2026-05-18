import React from "react";
import { useAvatar } from "@/features/avatar-speech/model/AvatarContext";
import { Card } from "@/widgets/bento-grid/ui/Card";
import { Send, Mail, Phone, Globe } from 'lucide-react';
import { useTranslation } from "@/shared/i18n/useTranslation";

export const ContactCard = () => {
    const { say, clearSpeech } = useAvatar();
    const { t } = useTranslation();

    return (
        <Card
            className="sm:col-span-2 lg:col-span-2 min-h-[150px]"
            title={t('cards.contact.title')}
            onMouseEnter={() => say(t('avatar.contact'))}
            onMouseLeave={clearSpeech}
        >
            <div className="grid grid-cols-2 gap-3 w-full h-full py-1">
                <a
                    href="https://t.me/ollevyts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/30 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-all group/link"
                >
                    <Send size={18} className="text-sky-500 dark:text-sky-400 group-hover/link:scale-110 transition-transform" />
                    <div className="truncate">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Telegram</p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">@ollevyts</p>
                    </div>
                </a>

                <a
                    href="mailto:levytskyi.alexandr@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-all group/link"
                >
                    <Mail size={18} className="text-blue-500 dark:text-blue-400 group-hover/link:scale-110 transition-transform" />
                    <div className="truncate">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Email</p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">levytskyi.alexandr@gmail.com</p>
                    </div>
                </a>

                <a
                    href="tel:+380674965200"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-all group/link"
                >
                    <Phone size={18} className="text-emerald-500 dark:text-emerald-400 group-hover/link:scale-110 transition-transform" />
                    <div className="truncate">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Phone</p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">+38 (067) 496-52-00</p>
                    </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800/40">
                    <Globe size={18} className="text-purple-500 dark:text-purple-400" />
                    <div className="truncate">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Location</p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">Kyiv, Ukraine 🇺🇦</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
