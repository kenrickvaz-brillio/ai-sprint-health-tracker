import React from 'react';
import { Activity, GitBranch, Layout } from 'lucide-react';
import { ProjectSwitcher } from './ProjectSwitcher';
import type { Project } from './ProjectSwitcher';

interface HeaderProps {
    projects: Project[];
    currentProject: Project;
    onProjectChange: (project: Project) => void;
    onConnectNew: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    projects,
    currentProject,
    onProjectChange,
    onConnectNew,
}) => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-xl shadow-indigo-200 shadow-lg flex-shrink-0">
                            <Activity className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight truncate max-w-[120px] sm:max-w-none">
                                AI Sprint Health Tracker
                            </h1>
                            <p className="hidden md:block text-[10px] sm:text-xs text-slate-500 font-medium">
                                Real-time insights & delivery risk analysis
                            </p>
                        </div>
                    </div>

                    <div className="h-6 sm:h-8 w-px bg-slate-200 mx-1 sm:mx-2" />

                    <ProjectSwitcher
                        projects={projects}
                        currentProject={currentProject}
                        onProjectChange={onProjectChange}
                        onConnectNew={onConnectNew}
                    />
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-semibold text-slate-600">Connected:</span>
                        </div>
                        <div className="flex items-center gap-2 ml-1">
                            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
                                <Layout size={10} className="text-blue-500" /> Jira
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
                                <GitBranch size={10} className="text-orange-500" /> Git
                            </span>
                        </div>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="User"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div >
        </header >
    );
};

