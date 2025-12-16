import React, { useState } from 'react';
import { Lightbulb, ArrowRight, X, Check, Loader2, Target, TrendingUp, ListChecks } from 'lucide-react';
import type { SprintData } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface AIRecommendationsProps {
    data: SprintData;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data }) => {
    const [selectedRec, setSelectedRec] = useState<typeof data.aiRecommendations[0] | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [appliedRecs, setAppliedRecs] = useState<string[]>([]);

    const handleApply = () => {
        setIsApplying(true);
        setTimeout(() => {
            if (selectedRec) {
                setAppliedRecs([...appliedRecs, selectedRec.id]);
                setIsApplying(false);
                setTimeout(() => setSelectedRec(null), 500); // Close modal after success
            }
        }, 1500);
    };

    return (
        <>
            <div className="card p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-lg h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Lightbulb size={24} className="text-yellow-300" />
                    </div>
                    <h3 className="text-xl font-bold">AI Recommendations</h3>
                </div>

                <div className="space-y-4">
                    {data.aiRecommendations.map((rec, index) => {
                        const isApplied = appliedRecs.includes(rec.id);
                        return (
                            <div
                                key={rec.id}
                                onClick={() => !isApplied && setSelectedRec(rec)}
                                className={`bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 transition-all cursor-pointer group relative overflow-hidden ${isApplied ? 'opacity-75 cursor-default' : 'hover:bg-white/20'
                                    }`}
                            >
                                {isApplied && (
                                    <div className="absolute top-2 right-2 bg-green-500/20 p-1 rounded-full">
                                        <Check size={14} className="text-green-300" />
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isApplied ? 'bg-green-500/20 text-green-300' : 'bg-white/20'
                                        }`}>
                                        {isApplied ? <Check size={10} /> : index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium leading-relaxed ${isApplied ? 'line-through text-white/50' : ''}`}>
                                            {rec.title}
                                        </p>
                                        <p className="text-xs text-white/70 mt-1 line-clamp-1">{rec.description}</p>
                                    </div>
                                    {!isApplied && (
                                        <ArrowRight size={16} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="w-full mt-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    View All Suggestions
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedRec && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isApplying && setSelectedRec(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm h-fit">
                                            <Lightbulb size={24} className="text-yellow-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedRec.title}</h3>
                                            <p className="text-indigo-100 text-sm mt-1">{selectedRec.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => !isApplying && setSelectedRec(null)}
                                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-white/70" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Impact Section */}
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                                        <TrendingUp size={18} />
                                        <h4>Projected Impact</h4>
                                    </div>
                                    <p className="text-indigo-900 text-sm leading-relaxed">
                                        {selectedRec.impact}
                                    </p>
                                </div>

                                {/* Reasoning Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold">
                                        <Target size={18} className="text-slate-500" />
                                        <h4>AI Reasoning</h4>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {selectedRec.reasoning}
                                    </p>
                                </div>

                                {/* Steps Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">
                                        <ListChecks size={18} className="text-slate-500" />
                                        <h4>Recommended Actions</h4>
                                    </div>
                                    <div className="space-y-2">
                                        {selectedRec.steps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0 mt-0.5">
                                                    {i + 1}
                                                </div>
                                                <p className="text-sm text-slate-700">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedRec(null)}
                                    disabled={isApplying}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    disabled={isApplying}
                                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70 min-w-[140px] justify-center"
                                >
                                    {isApplying ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Applying...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={18} />
                                            Apply Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
