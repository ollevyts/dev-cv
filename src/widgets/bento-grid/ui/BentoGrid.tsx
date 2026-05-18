'use client';

import React from 'react';
import { ProfileCard } from "@/widgets/bento-grid/ui/ProfileCard";
import { ExpertiseCard } from "@/widgets/bento-grid/ui/ExpertiseCard";
import { HobbyCard } from "@/widgets/bento-grid/ui/HobbyCard";
import { AICard } from "@/widgets/bento-grid/ui/AICard";
import { StackCard } from "@/widgets/bento-grid/ui/StackCard";
import { ContactCard } from "@/widgets/bento-grid/ui/ContactCard";

export const BentoGrid = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 w-full auto-rows-min">
            <ProfileCard />
            <ExpertiseCard />
            <ContactCard />
            <StackCard />
            <AICard />
            <HobbyCard />
        </div>
    );
};