import { DollarSign, Target, TrendingUp, Users } from "lucide-react";

export const trafficData = [
    { name: '00:00', Clicks: 2400, Conversions: 400, Spend: 120 },
    { name: '04:00', Clicks: 1398, Conversions: 300, Spend: 90 },
    { name: '08:00', Clicks: 9800, Conversions: 2000, Spend: 500 },
    { name: '12:00', Clicks: 3908, Conversions: 1100, Spend: 280 },
    { name: '16:00', Clicks: 4800, Conversions: 1400, Spend: 310 },
    { name: '20:00', Clicks: 8300, Conversions: 2200, Spend: 460 },
    { name: '24:00', Clicks: 6100, Conversions: 1700, Spend: 380 },
];

export const geoData = [
    { country: 'US', ROI: 145, Profit: 1200 },
    { country: 'UA', ROI: 180, Profit: 950 },
    { country: 'DE', ROI: 112, Profit: 800 },
    { country: 'UK', ROI: 135, Profit: 1100 },
    { country: 'FR', ROI: 95, Profit: 450 },
];

export const stats = [
    { title: 'Total Clicks', value: '36.8K', change: '+12.3%', icon: Users, color: 'text-sky-400', desc: 'Кліки по кампаніях за добу' },
    { title: 'Conversions', value: '9.1K', change: '+8.4%', icon: Target, color: 'text-emerald-400', desc: 'Успішні ліди / конверсії' },
    { title: 'Total Spend', value: '$2,140', change: '+15.2%', icon: DollarSign, color: 'text-yellow-400', desc: 'Витрати на закупку трафіку' },
    { title: 'Avg ROI', value: '133.4%', change: '+4.1%', icon: TrendingUp, color: 'text-purple-400', desc: 'Окупність інвестицій (Return on Investment)' },
];