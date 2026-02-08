import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../components';
import appwriteService from "../appwrite/config";

function Dashboard() {
    const userData = useSelector((state) => state.auth.userData);
    const coins = useSelector((state) => state.auth.coins);
    const [postCount, setPostCount] = useState(0);
    const [queryCount, setQueryCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPostCount(posts.documents.length);
            }
        }).finally(() => setLoading(false));

        const savedQueries = localStorage.getItem("ai_query_count") || 0;
        setQueryCount(savedQueries);
    }, []);

    const stats = [
        { label: "Total Posts", value: loading ? "..." : postCount, icon: "📝", color: "from-blue-400 to-[#3498db]" },
        { label: "AI Queries", value: queryCount, icon: "🤖", color: "from-purple-400 to-indigo-500" },
        { label: "Account Status", value: "Active", icon: "✅", color: "from-emerald-400 to-teal-500" },
    ];

    return (
        <div className="min-h-screen w-full bg-[#fcfdff] relative overflow-hidden flex flex-col">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-purple-100/40 rounded-full blur-[130px] -z-10"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-blue-100/40 rounded-full blur-[110px] -z-10"></div>

            <Container>
                <div className="py-16 px-4">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div>
                            <h1 className="text-6xl font-black text-slate-900 tracking-tight">
                                Workspace<span className="text-[#3498db]">.</span>
                            </h1>
                            <p className="text-slate-500 text-xl mt-3 font-medium">
                                Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3498db] to-purple-600 font-bold">{userData?.name || "User"}</span> 👋
                            </p>
                        </div>
                        
                        <div className="px-6 py-3 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm flex items-center gap-3 transition-all hover:border-[#3498db]/30 cursor-default">
                            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Cloud Connected</span>
                        </div>
                    </div>

                    {/* Main Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Featured Wallet Card */}
                        <div className="lg:col-span-2 relative group overflow-hidden bg-linear-to-br from-[#3498db] via-[#2980b9] to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-200 animate-in zoom-in-95 duration-1000 delay-100">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                                            <span className="text-xl">💳</span>
                                        </div>
                                        <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Total Balance</p>
                                    </div>
                                    <h2 className="text-7xl font-black tracking-tighter mb-6">
                                        {coins} <span className="text-3xl text-blue-200/80 font-medium tracking-normal">Coins</span>
                                    </h2>
                                </div>
                                
                                <div className="flex flex-wrap gap-4">
                                    <button className="px-8 py-4 bg-white text-[#3498db] rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95">
                                        View History
                                    </button>
                                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95">
                                        Redeem Rewards
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15 transition-all duration-1000"></div>
                            <div className="absolute bottom-0 right-0 p-8 opacity-10">
                                <span className="text-9xl font-black">REVISE</span>
                            </div>
                        </div>

                        {/* Stats Sidebar Stack */}
                        <div className="flex flex-col gap-6">
                            {stats.map((stat, index) => (
                                <div 
                                    key={stat.label} 
                                    className="group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1.5 transition-all duration-500 animate-in slide-in-from-right-12"
                                    style={{ transitionDelay: `${index * 150}ms`, animationDuration: '800ms' }}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-[1.25rem] bg-linear-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform duration-300`}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Subtle Footer branding */}
            <div className="mt-auto py-8 text-center text-slate-300 font-medium tracking-widest text-xs uppercase">
                Internal Knowledge Network v2.0
            </div>
        </div>
    );
}

export default Dashboard;