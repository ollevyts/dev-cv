'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface AvatarContextType {
    speechText: string,
    say: (text: string) => void,
    clearSpeech: () => void,
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
    const [speechText, setSpeechText] = useState<string>('Hello! I am glad to see you');
    const say = useCallback((text: string) => {
        setSpeechText(text);
    }, []);

    const clearSpeech = useCallback(() => {
        setSpeechText('');
    }, []);

    return (
        <AvatarContext.Provider value={{ speechText, say, clearSpeech }}>
            {children}
        </AvatarContext.Provider>
    );
};

export const useAvatar = () => {
    const context = useContext(AvatarContext);

    if (!context) {
        throw new Error('useAvatar must be used within an AvatarProvider');
    }

    return context;
}