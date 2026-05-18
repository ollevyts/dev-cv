'use client';

import { StatBlocks } from "@/widgets/analytics-dashboard/ui/StatBlocks";
import { TrafficChart } from "@/widgets/analytics-dashboard/ui/TrafficChart";
import { BarsChart } from "@/widgets/analytics-dashboard/ui/BarChart";

export const AnalyticsDashboard = () => {
    return (
        <div className="space-y-6 p-2 w-full">
            <StatBlocks/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TrafficChart/>
                <BarsChart />
            </div>
        </div>
    );
}