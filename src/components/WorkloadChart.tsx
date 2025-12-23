import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SprintData } from '../data/mockData';
import { Sparkles } from 'lucide-react';

interface WorkloadChartProps {
    data: SprintData;
}

export const WorkloadChart: React.FC<WorkloadChartProps> = ({ data }) => {
    return (
        <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Developer Workload Imbalance</h3>
            </div>

            <div className="h-48 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data.developers}
                        margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                        barSize={window.innerWidth < 640 ? 20 : 40}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                fontSize: '12px'
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                        <Bar dataKey="commits" name="Commits" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="prs" name="PRs" stackId="a" fill="#8b5cf6" />
                        <Bar dataKey="stories" name="Stories" stackId="a" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 sm:p-4 flex gap-3">
                <div className="bg-white p-1.5 rounded-full shadow-sm h-fit flex-shrink-0">
                    <Sparkles className="text-yellow-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-yellow-700">AI Analysis:</span> Workload is heavily concentrated on Sarah J. and Mike T., significantly increasing delivery and burnout risk.
                    </p>
                </div>
            </div>
        </div>
    );
};
