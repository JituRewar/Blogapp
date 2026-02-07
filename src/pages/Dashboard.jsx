// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Container } from '../components';

// function Dashboard() {
//     // Getting user data from Redux to make it personalized
//     const userData = useSelector((state) => state.auth.userData);

//     const stats = [
//         { label: "Total Posts", value: "12", icon: "📝" },
//         { label: "AI Queries", value: "45", icon: "🤖" },
//         { label: "Account Status", value: "Active", icon: "✅" },
//     ];

//     return (
//         <div className="w-full py-8 bg-gray-100 min-h-[80vh]">
//             <Container>
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <h1 className="text-4xl font-extrabold text-gray-800">
//                         Dashboard
//                     </h1>
//                     <p className="text-gray-600 mt-2">
//                         Welcome back, <span className="font-semibold text-orange-500">{userData?.name || "User"}</span>! Here’s what’s happening with your account.
//                     </p>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     {stats.map((stat) => (
//                         <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                             <div className="text-3xl mb-2">{stat.icon}</div>
//                             <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
//                                 {stat.label}
//                             </div>
//                             <div className="text-2xl font-bold text-gray-900">
//                                 {stat.value}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                     <div className="p-6 border-b border-gray-100">
//                         <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
//                     </div>
//                     <div className="p-12 text-center">
//                         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="召12h8m-8 0V4m0 0L8 8m4-4l4 4" />
//                             </svg>
//                         </div>
//                         <p className="text-gray-500">No recent activity to show. Start by creating a new post!</p>
//                         <button 
//                             className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
//                             onClick={() => window.location.href = '/add-post'}
//                         >
//                             Create First Post
//                         </button>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// }

// export default Dashboard;

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