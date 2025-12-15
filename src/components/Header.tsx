import React from 'react';
import { Activity, GitBranch, Layout } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                        <Activity className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 leading-tight">
                            AI Sprint Health Tracker
                        </h1>
                        <p className="text-xs text-slate-500 font-medium">
                            Real-time insights & delivery risk analysis
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-semibold text-slate-600">Connected Sources:</span>
                        </div>
                        <div className="flex items-center gap-2 ml-1">
                            <span className="flex items-center gap-1 text-xs font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                                <Layout size={12} className="text-blue-500" /> Jira
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                                <GitBranch size={12} className="text-orange-500" /> Git
                            </span>
                        </div>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="User"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
