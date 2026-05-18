import { AvatarProvider } from '@/features/avatar-speech/model/AvatarContext';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import { Providers } from '@/shared/ui/Providers';
import './globals.css';
import React from "react";

export const metadata = {
  title: `Levytskyi Oleksandr's Front-end Developer`,
  description: 'Interactive engineering portfolio built with Next.js & FSD architecture',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex h-screen w-screen overflow-x-hidden antialiased">
                <Providers>
                    <AvatarProvider>
                        <Sidebar />

                        <main className="flex-1 h-screen overflow-y-auto bg-slate-50/40 dark:bg-slate-950/40 relative pt-14 sm:pt-0">
                            {children}
                        </main>
                    </AvatarProvider>
                </Providers>
            </body>
        </html>
    );
}
