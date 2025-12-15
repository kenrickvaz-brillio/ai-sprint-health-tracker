import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import type { SprintData } from '../data/mockData';

interface AIRecommendationsProps {
    data: SprintData;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data }) => {
    return (
        <div className="card p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Lightbulb size={24} className="text-yellow-300" />
                </div>
                <h3 className="text-xl font-bold">AI Recommendations</h3>
            </div>

            <div className="space-y-4">
                {data.aiRecommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium leading-relaxed">{rec}</p>
                            </div>
                            <ArrowRight size={16} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
                Apply All Recommendations
            </button>
        </div>
    );
};
