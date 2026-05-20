import { create } from "zustand";

type TabType = 'overview' | 'analytics' | 'sandbox' | 'ui-lab' | 'tic-tac-toe';

interface INavigationState {
    activeTab: TabType,
    setActiveTab: (tab: TabType) => void;
}

export const useNavigationStore = create<INavigationState>((set) => ({
    activeTab: 'overview',
    setActiveTab: (tab) => set({ activeTab: tab }),
}))