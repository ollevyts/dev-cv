
self.onmessage = (e: MessageEvent) => {
    if (e.data.action === 'run_heavy_math') {
        const count = e.data.count || 2000000;
        const data = [];

        for (let i = 0; i < count; i++) {
            data.push({
                id: i,
                amount: Math.random() * 1000,
                category: i % 3 === 0 ? 'E-commerce' : i % 3 === 1 ? 'SaaS' : 'Delivery',
                timestamp: Date.now() - Math.floor(Math.random() * 100000),
            });
        }

        data.sort((a, b) => b.amount - a.amount);

        const totalRevenue = data.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        self.postMessage({
            success: true,
            totalRevenue: Math.round(totalRevenue),
            preview: data.slice(0, 5)
        });
    }
};

export {}