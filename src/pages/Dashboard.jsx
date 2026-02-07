import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../components';
import appwriteService from "../appwrite/config"; // Ensure path is correct

function Dashboard() {
    const userData = useSelector((state) => state.auth.userData);
    const [postCount, setPostCount] = useState(0);
    const [queryCount, setQueryCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const coins = useSelector((state) => state.auth.coins);

    useEffect(() => {
        // Fetch real post count from Appwrite
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPostCount(posts.documents.length);
            }
        }).finally(() => setLoading(false));

        // Logic for AI queries (Example: checking localStorage)
        const savedQueries = localStorage.getItem("ai_query_count") || 0;
        setQueryCount(savedQueries);
    }, []);

    const stats = [
        { label: "Total Posts", value: loading ? "..." : postCount, icon: "📝" },
        { label: "AI Queries", value: queryCount, icon: "🤖" },
        { label: "Account Status", value: "Active", icon: "✅" },
    ];

    return (
        <div className="w-full py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back, <span className="font-semibold text-orange-500">{userData?.name}</span></p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
    <p className="text-sm font-bold text-gray-400 uppercase">Wallet Balance</p>
    <div className="flex items-center">
        <span className="text-2xl mr-2">🪙</span>
        <h2 className="text-4xl font-black text-orange-500">{coins} Coins</h2>
    </div>
</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-gray-500 text-sm font-medium uppercase">{stat.label}</div>
                            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Table or List could go here */}
            </Container>
        </div>
    );
}

export default Dashboard;