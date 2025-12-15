import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SprintHealthHero } from './components/SprintHealthHero';
import { BurnoutChart } from './components/BurnoutChart';
import { StoryRiskTable } from './components/StoryRiskTable';
import { WorkloadChart } from './components/WorkloadChart';
import { AIRecommendations } from './components/AIRecommendations';
import { mockSprintData } from './data/mockData';
import { motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-slate-200 rounded-xl w-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-slate-200 rounded-xl"></div>
              <div className="h-80 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="h-64 bg-slate-200 rounded-xl w-full"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{mockSprintData.sprintName}</h2>
            <p className="text-slate-500 mt-1">
              <span className="font-medium text-slate-700">{mockSprintData.daysRemaining} days remaining</span> • Ends Dec 24, 2025
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Export Report
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              View Board
            </button>
          </div>
        </div>

        <SprintHealthHero data={mockSprintData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <BurnoutChart data={mockSprintData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <AIRecommendations data={mockSprintData} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <StoryRiskTable data={mockSprintData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <WorkloadChart data={mockSprintData} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
