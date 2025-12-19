import React, { useState } from 'react';
import { ChevronDown, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
    id: string;
    name: string;
    team: string;
    color: string;
}

interface ProjectSwitcherProps {
    projects: Project[];
    currentProject: Project;
    onProjectChange: (project: Project) => void;
    onConnectNew: () => void;
}

export const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({
    projects,
    currentProject,
    onProjectChange,
    onConnectNew,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
            >
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentProject.color }}
                />
                <div className="text-left">
                    <div className="text-sm font-semibold text-slate-900 leading-tight">
                        {currentProject.name}
                    </div>
                    <div className="text-xs text-slate-500">
                        {currentProject.team}
                    </div>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden"
                        >
                            <div className="p-2 border-b border-slate-100">
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2 py-1">
                                    Your Projects
                                </div>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => {
                                            onProjectChange(project);
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left group"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: project.color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-slate-900 truncate">
                                                {project.name}
                                            </div>
                                            <div className="text-xs text-slate-500 truncate">
                                                {project.team}
                                            </div>
                                        </div>
                                        {currentProject.id === project.id && (
                                            <Check size={16} className="text-indigo-600 flex-shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="p-2 border-t border-slate-100">
                                <button
                                    onClick={() => {
                                        onConnectNew();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Plus size={16} />
                                    Connect New Project
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
