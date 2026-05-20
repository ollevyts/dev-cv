import { User, Database, FolderCode, LayoutDashboard, LucideIcon, Gamepad2 } from 'lucide-react';

export interface IMenuItem {
    id: string;
    icon: LucideIcon;
}

export const menuItems: IMenuItem[] = [
    { id: 'overview', icon: User },
    { id: 'analytics', icon: Database },
    { id: 'sandbox', icon: FolderCode },
    { id: 'ui-lab', icon: LayoutDashboard },
    { id: 'tic-tac-toe', icon: Gamepad2 }
];

const avatarSpeechKeyMap: Record<string, string> = {
    overview: 'avatar.overview',
    analytics: 'avatar.analytics',
    sandbox: 'avatar.sandbox',
    'ui-lab': 'avatar.uiLab',
    'tic-tac-toe': 'avatar.ticTacToe',
};

export const getAvatarSpeechKey = (id: string): string => avatarSpeechKeyMap[id] ?? '';
