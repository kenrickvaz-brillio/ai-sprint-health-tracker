import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SprintData } from '../data/mockData';
import { Sparkles } from 'lucide-react';

interface BurnoutChartProps {
    data: SprintData;
}

export const BurnoutChart: React.FC<BurnoutChartProps> = ({ data }) => {
    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Burnout Risk Prediction</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    Risk Score
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data.burnoutTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="riskScore"
                            stroke="#f97316"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRisk)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-lg p-4 flex gap-3">
                <div className="bg-white p-1.5 rounded-full shadow-sm h-fit">
                    <Sparkles size={16} className="text-orange-500" />
                </div>
                <div>
                    <p className="text-sm text-slate-700">
                        <span className="font-semibold text-orange-700">AI Analysis:</span> Sustained late-night commits (10pm-2am) and reduced recovery time suggest rising burnout risk among 2 developers.
                    </p>
                </div>
            </div>
        </div>
    );
};
