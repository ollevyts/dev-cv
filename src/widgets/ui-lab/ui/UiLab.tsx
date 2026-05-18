'use client';

import React, { useState } from 'react';
import { useAvatar } from '@/features/avatar-speech/model/AvatarContext';
import { SegmentedControl } from './SegmentedControl';
import { AnimatedToggles } from './AnimatedToggles';
import { ValidationForm } from './ValidationForm';
import { ButtonPlayground } from './ButtonPlayground';

export const UiLab = () => {
    const { say, clearSpeech } = useAvatar();

    const [selectedSegment, setSelectedSegment] = useState('performance');
    const [isFsdStrict, setIsFsdStrict] = useState(true);
    const [isAiOptimized, setIsAiOptimized] = useState(false);

    return (
        <div className="space-y-6 p-2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SegmentedControl
                    selectedSegment={selectedSegment}
                    setSelectedSegment={setSelectedSegment}
                    say={say}
                    clearSpeech={clearSpeech}
                />
                <AnimatedToggles
                    isFsdStrict={isFsdStrict}
                    setIsFsdStrict={setIsFsdStrict}
                    isAiOptimized={isAiOptimized}
                    setIsAiOptimized={setIsAiOptimized}
                    say={say}
                    clearSpeech={clearSpeech}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ValidationForm say={say} clearSpeech={clearSpeech} />
                <ButtonPlayground say={say} clearSpeech={clearSpeech} />
            </div>
        </div>
    );
};