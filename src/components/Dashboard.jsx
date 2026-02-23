import React from 'react';
import InputForm from './InputForm';
import RiskCard from './RiskCard';
import Charts from './Charts';
import { useBurnout } from '../context/BurnoutContext';
import { getInsights } from '../logic/trendAnalysis';
import { LayoutDashboard, Zap, Info } from 'lucide-react';

const Dashboard = () => {
    const { history } = useBurnout();
    const insights = getInsights(history);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Zap className="text-white" size={20} />
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight">FocusGuard <span className="text-indigo-600 font-medium">Dashboard</span></h1>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-500">
                        <span>Student Burnout Early-Warning System</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar / Input */}
                    <div className="lg:col-span-4 space-y-8">
                        <InputForm />

                        {/* Insights Section */}
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                            <div className="flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-400">
                                <Info size={18} />
                                <h3 className="font-bold">AI Insights</h3>
                            </div>
                            <ul className="space-y-4">
                                {insights.map((insight, idx) => (
                                    <li key={idx} className="text-sm text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
                                        "{insight}"
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        <RiskCard />
                        <Charts />
                    </div>

                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 dark:border-gray-800 mt-12 text-center">
                <p className="text-gray-400 text-xs">Built for Student Wellness | Your data stays local on your device.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
