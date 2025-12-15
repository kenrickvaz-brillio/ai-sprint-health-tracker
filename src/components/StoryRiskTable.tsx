import React from 'react';
import { AlertCircle, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import type { SprintData } from '../data/mockData';
import { cn } from '../lib/utils';

interface StoryRiskTableProps {
    data: SprintData;
}

export const StoryRiskTable: React.FC<StoryRiskTableProps> = ({ data }) => {
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
        <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Story Risk Alerts</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Story ID</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Risk Level</th>
                            <th className="px-6 py-3">AI Analysis</th>
                            <th className="px-6 py-3">Assignee</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.stories.map((story) => (
                            <tr key={story.id} className={cn("hover:bg-slate-50 transition-colors", story.riskLevel === 'High' ? "bg-red-50/30" : "")}>
                                <td className="px-6 py-4 font-medium text-slate-700">{story.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        {getStatusIcon(story.status)}
                                        {story.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getRiskBadge(story.riskLevel)}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="flex items-start gap-2">
                                        {story.riskLevel === 'High' && <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />}
                                        {story.aiReason}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
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
    );
};
