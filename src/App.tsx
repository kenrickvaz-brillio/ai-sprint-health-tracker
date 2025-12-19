import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SprintHealthHero } from './components/SprintHealthHero';
import { BurnoutChart } from './components/BurnoutChart';
import { StoryRiskTable } from './components/StoryRiskTable';
import { WorkloadChart } from './components/WorkloadChart';
import { AIRecommendations } from './components/AIRecommendations';
import { ExportModal } from './components/ExportModal';
import { mockSprintData, mockSprintData2, mockProjects } from './data/mockData';
import type { Project } from './data/mockData';
import { motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(mockProjects[0]);

  // Get the appropriate sprint data based on current project
  const currentSprintData = currentProject.id === 'proj-1' ? mockSprintData : mockSprintData2;

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
  };

  const handleConnectNew = () => {
    setIsConnectModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header
          projects={mockProjects}
          currentProject={currentProject}
          onProjectChange={handleProjectChange}
          onConnectNew={handleConnectNew}
        />
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
      <Header
        projects={mockProjects}
        currentProject={currentProject}
        onProjectChange={handleProjectChange}
        onConnectNew={handleConnectNew}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{currentSprintData.sprintName}</h2>
            <p className="text-slate-500 mt-1">
              <span className="font-medium text-slate-700">{currentSprintData.daysRemaining} days remaining</span> • Ends {currentSprintData.endDate}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Export Report
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer">
              View Board
            </button>
          </div>
        </div>

        <SprintHealthHero data={currentSprintData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            key={`burnout-${currentProject.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <BurnoutChart data={currentSprintData} />
          </motion.div>

          <motion.div
            key={`ai-${currentProject.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <AIRecommendations data={currentSprintData} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            key={`risk-${currentProject.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <StoryRiskTable data={currentSprintData} />
          </motion.div>

          <motion.div
            key={`workload-${currentProject.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <WorkloadChart data={currentSprintData} />
          </motion.div>
        </div>
      </main>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={currentSprintData}
      />

      {/* Connect New Project Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-2">Connect New Project</h3>
            <p className="text-slate-600 mb-6">
              Connect your Jira and Git repositories to start tracking sprint health.
            </p>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Connect Jira Workspace
              </button>
              <button className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors">
                Connect GitHub Repository
              </button>
              <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors">
                Connect GitLab Repository
              </button>
            </div>
            <button
              onClick={() => setIsConnectModalOpen(false)}
              className="w-full mt-4 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;

