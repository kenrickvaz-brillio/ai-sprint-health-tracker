import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Clock, HelpCircle, X, Target, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import type { SprintData, SprintStory } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryRiskTableProps {
    data: SprintData;
}

export const StoryRiskTable: React.FC<StoryRiskTableProps> = ({ data }) => {
    const [selectedStory, setSelectedStory] = useState<SprintStory | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedStory(null);
            }
        };

        if (selectedStory) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedStory]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Done': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'In Progress': return <Clock size={16} className="text-blue-500" />;
            case 'Review': return <HelpCircle size={16} className="text-purple-500" />;
            default: return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
        }
    };

    const getRiskBadge = (level: string) => {
        switch (level) {
            case 'High': return <span className="badge badge-danger">High</span>;
            case 'Medium': return <span className="badge badge-warning">Medium</span>;
            case 'Low': return <span className="badge badge-success">Low</span>;
            default: return null;
        }
    };

    return (
        <>
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Story Risk Alerts</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-4 sm:px-6 py-3">Story ID</th>
                                <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Status</th>
                                <th className="px-4 sm:px-6 py-3">Risk Level</th>
                                <th className="px-4 sm:px-6 py-3">AI Analysis</th>
                                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Assignee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.stories.map((story) => (
                                <tr
                                    key={story.id}
                                    onClick={() => setSelectedStory(story)}
                                    className={cn(
                                        "hover:bg-slate-50 transition-colors cursor-pointer group",
                                        story.riskLevel === 'High' ? "bg-red-50/30" : ""
                                    )}
                                >
                                    <td className="px-4 sm:px-6 py-4 font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{story.id}</td>
                                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            {getStatusIcon(story.status)}
                                            {story.status}
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">{getRiskBadge(story.riskLevel)}</td>
                                    <td className="px-4 sm:px-6 py-4 text-slate-600">
                                        <div className="flex items-start gap-2">
                                            {story.riskLevel === 'High' && <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />}
                                            <span className="line-clamp-1 text-xs sm:text-sm">{story.aiReason}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center text-slate-600 font-medium">
                                                {story.assignee.charAt(0)}
                                            </div>
                                            <span className="text-slate-600">{story.assignee}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detailed Analysis Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStory(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
                        >
                            {/* Modal Header */}
                            <div className={cn(
                                "p-6 text-white",
                                selectedStory.riskLevel === 'High' ? "bg-gradient-to-r from-red-500 to-orange-600" :
                                    selectedStory.riskLevel === 'Medium' ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                                        "bg-gradient-to-r from-emerald-500 to-teal-600"
                            )}>
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm h-fit">
                                            <Activity size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold">{selectedStory.id}</h3>
                                                <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium backdrop-blur-sm">
                                                    {selectedStory.status}
                                                </span>
                                            </div>
                                            <p className="text-white/90 text-sm font-medium">{selectedStory.title}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedStory(null)}
                                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-white/80" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* AI Analysis Detail */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold">
                                        <AlertTriangle size={18} className={cn(
                                            selectedStory.riskLevel === 'High' ? "text-red-500" :
                                                selectedStory.riskLevel === 'Medium' ? "text-amber-500" : "text-emerald-500"
                                        )} />
                                        <h4>AI Risk Analysis</h4>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        {selectedStory.aiAnalysisDetail || selectedStory.aiReason}
                                    </p>
                                </div>

                                {/* Impact Section */}
                                {selectedStory.impact && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold">
                                            <TrendingUp size={18} className="text-blue-500" />
                                            <h4>Potential Impact</h4>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {selectedStory.impact}
                                        </p>
                                    </div>
                                )}

                                {/* Suggested Action Section */}
                                {selectedStory.suggestedAction && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold">
                                            <Target size={18} className="text-indigo-500" />
                                            <h4>Suggested Action</h4>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                            <div className="w-1 h-full min-h-[20px] bg-indigo-400 rounded-full" />
                                            <p className="text-sm text-indigo-900 font-medium">
                                                {selectedStory.suggestedAction}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                                <button
                                    onClick={() => setSelectedStory(null)}
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
                                >
                                    Close Analysis
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
