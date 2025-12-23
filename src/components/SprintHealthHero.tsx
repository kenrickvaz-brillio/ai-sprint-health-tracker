import React from 'react';
import { AlertTriangle, TrendingUp, Users, Zap } from 'lucide-react';
import type { SprintData } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface SprintHealthHeroProps {
    data: SprintData;
}

export const SprintHealthHero: React.FC<SprintHealthHeroProps> = ({ data }) => {
    const getHealthColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getHealthLabel = (score: number) => {
        if (score >= 80) return 'Healthy';
        if (score >= 60) return 'Moderate Risk';
        return 'Critical Risk';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Main Health Score Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-4 sm:p-6 flex flex-col items-center justify-center lg:col-span-1 bg-white relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Sprint Health Score</h3>
                <div className="relative flex items-center justify-center scale-90 sm:scale-100">
                    <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90">
                        <circle
                            className="text-slate-100"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="52"
                            cx="56"
                            cy="56"
                        />
                        <circle
                            className={getHealthColor(data.healthScore)}
                            strokeWidth="8"
                            strokeDasharray={326}
                            strokeDashoffset={326 - (326 * data.healthScore) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="52"
                            cx="56"
                            cy="56"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className={cn("text-3xl sm:text-4xl font-bold", getHealthColor(data.healthScore))}>
                            {data.healthScore}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-400 font-medium">/100</span>
                    </div>
                </div>
                <div className={cn("mt-4 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-opacity-10",
                    data.healthScore >= 80 ? "bg-green-100 text-green-700" :
                        data.healthScore >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                )}>
                    {getHealthLabel(data.healthScore)}
                </div>
            </motion.div>

            {/* Summary Metrics */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Burnout Risk */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="card p-4 sm:p-5 border-l-4 border-l-orange-500"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 sm:p-2 bg-orange-50 rounded-lg">
                                <Users className="text-orange-600 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <h4 className="text-sm sm:text-base font-semibold text-slate-700">Burnout Risk</h4>
                        </div>
                        <span className="badge badge-warning text-[10px] sm:text-xs">Medium</span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-slate-800">Medium</span>
                            <span className="text-[10px] sm:text-xs font-medium text-red-500 flex items-center">
                                <TrendingUp className="mr-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3" /> {data.burnoutRisk.value}
                            </span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Increase in late-night commits</p>
                    </div>
                </motion.div>

                {/* Delivery Risk */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="card p-4 sm:p-5 border-l-4 border-l-red-500"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 sm:p-2 bg-red-50 rounded-lg">
                                <AlertTriangle className="text-red-600 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <h4 className="text-sm sm:text-base font-semibold text-slate-700">Delivery Risk</h4>
                        </div>
                        <span className="badge badge-danger text-[10px] sm:text-xs">High</span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-slate-800">High</span>
                            <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                                {data.deliveryRisk.atRiskStories} stories at risk
                            </span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Blocked items & scope creep</p>
                    </div>
                </motion.div>

                {/* Workload Balance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="card p-4 sm:p-5 border-l-4 border-l-yellow-500 sm:col-span-2 md:col-span-1"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 sm:p-2 bg-yellow-50 rounded-lg">
                                <Zap className="text-yellow-600 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <h4 className="text-sm sm:text-base font-semibold text-slate-700">Workload</h4>
                        </div>
                        <span className="badge badge-warning text-[10px] sm:text-xs">Uneven</span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-slate-800">Uneven</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1">2 devs over-capacity</p>
                    </div>
                </motion.div>

                {/* AI Insight Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="col-span-1 sm:col-span-2 md:col-span-3 bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-start gap-3"
                >
                    <SparklesIcon className="text-indigo-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-indigo-800">
                        <span className="font-semibold">AI Insight:</span> Based on recent commit patterns, story movement, and sprint velocity,
                        delivery risk is trending upward due to blocked dependencies.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
);
