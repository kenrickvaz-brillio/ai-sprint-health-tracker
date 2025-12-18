import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileSpreadsheet, X, Download, Loader2, Check } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { SprintData } from '../data/mockData';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: SprintData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
    const [isExporting, setIsExporting] = useState<'csv' | 'pdf' | null>(null);
    const [completed, setCompleted] = useState<'csv' | 'pdf' | null>(null);

    const handleExport = (type: 'csv' | 'pdf') => {
        setIsExporting(type);

        // Simulate export process for PDF, actual process for Excel
        setTimeout(() => {
            const now = new Date();
            const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const sanitizedSprintName = data.sprintName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

            if (type === 'csv') {
                // We'll use XLSX to generate an .xlsx file instead of a simple CSV to support multiple sheets
                // The button says "CSV Spreadsheet" but for multi-sheet support Excel is better.
                // If the user strictly wants CSV, we'd have to zip them or just export the main table.
                // Given the request "separate sheets", .xlsx is the way to go.

                const wb = XLSX.utils.book_new();

                // Sheet 1: Overview
                const overviewData = [{
                    'Sprint Name': data.sprintName,
                    'Health Score': data.healthScore,
                    'Days Remaining': data.daysRemaining,
                    'End Date': data.endDate,
                    'Burnout Risk Level': data.burnoutRisk.level,
                    'Delivery Risk Level': data.deliveryRisk.level,
                    'Workload Balance': data.workloadBalance.status
                }];
                const wsOverview = XLSX.utils.json_to_sheet(overviewData);
                XLSX.utils.book_append_sheet(wb, wsOverview, "Overview");

                // Sheet 2: Stories
                const storiesData = data.stories.map(s => ({
                    ID: s.id,
                    Title: s.title,
                    Status: s.status,
                    'Risk Level': s.riskLevel,
                    Assignee: s.assignee,
                    'AI Reason': s.aiReason,
                    Impact: s.impact,
                    'Suggested Action': s.suggestedAction
                }));
                const wsStories = XLSX.utils.json_to_sheet(storiesData);
                XLSX.utils.book_append_sheet(wb, wsStories, "Stories");

                // Sheet 3: Developers
                const devsData = data.developers.map(d => ({
                    Name: d.name,
                    Commits: d.commits,
                    PRs: d.prs,
                    Stories: d.stories,
                    'Burnout Risk': d.burnoutRisk
                }));
                const wsDevs = XLSX.utils.json_to_sheet(devsData);
                XLSX.utils.book_append_sheet(wb, wsDevs, "Developers");

                // Sheet 4: Recommendations
                const recsData = data.aiRecommendations.map(r => ({
                    Title: r.title,
                    Description: r.description,
                    Impact: r.impact,
                    Reasoning: r.reasoning,
                    Steps: r.steps.join('; ')
                }));
                const wsRecs = XLSX.utils.json_to_sheet(recsData);
                XLSX.utils.book_append_sheet(wb, wsRecs, "Recommendations");

                // Write file
                XLSX.writeFile(wb, `${sanitizedSprintName}_${timestamp}.xlsx`);
            } else {
                // PDF Generation
                import('jspdf').then(async (jsPDFModule) => {
                    const { jsPDF } = jsPDFModule;
                    const { default: autoTable } = await import('jspdf-autotable');

                    const doc = new jsPDF();

                    // Title
                    doc.setFontSize(20);
                    doc.setTextColor(40, 40, 40);
                    doc.text("Sprint Health Report", 14, 22);

                    doc.setFontSize(12);
                    doc.setTextColor(100, 100, 100);
                    doc.text(`Sprint: ${data.sprintName}`, 14, 32);
                    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);

                    // Overview Section
                    doc.setFontSize(14);
                    doc.setTextColor(60, 60, 60);
                    doc.text("Overview", 14, 50);

                    const overviewData = [
                        ['Health Score', `${data.healthScore}/100`],
                        ['Days Remaining', data.daysRemaining.toString()],
                        ['Burnout Risk', data.burnoutRisk.level],
                        ['Delivery Risk', data.deliveryRisk.level],
                        ['Workload Balance', data.workloadBalance.status]
                    ];

                    autoTable(doc, {
                        startY: 55,
                        head: [['Metric', 'Value']],
                        body: overviewData,
                        theme: 'striped',
                        headStyles: { fillColor: [79, 70, 229] }
                    });

                    // Stories Section
                    let finalY = (doc as any).lastAutoTable.finalY + 15;
                    doc.text("Stories at Risk", 14, finalY);

                    const storiesData = data.stories.map(s => [
                        s.id,
                        s.title,
                        s.status,
                        s.riskLevel,
                        s.assignee
                    ]);

                    autoTable(doc, {
                        startY: finalY + 5,
                        head: [['ID', 'Title', 'Status', 'Risk', 'Assignee']],
                        body: storiesData,
                        theme: 'grid',
                        headStyles: { fillColor: [220, 38, 38] } // Red for risk
                    });

                    // Developers Section
                    finalY = (doc as any).lastAutoTable.finalY + 15;
                    doc.text("Developer Workload", 14, finalY);

                    const devsData = data.developers.map(d => [
                        d.name,
                        d.commits,
                        d.prs,
                        d.stories,
                        d.burnoutRisk
                    ]);

                    autoTable(doc, {
                        startY: finalY + 5,
                        head: [['Name', 'Commits', 'PRs', 'Stories', 'Burnout Risk']],
                        body: devsData,
                        theme: 'striped',
                        headStyles: { fillColor: [79, 70, 229] }
                    });

                    // Recommendations Section
                    finalY = (doc as any).lastAutoTable.finalY + 15;

                    // Check if we need a new page
                    if (finalY > 250) {
                        doc.addPage();
                        finalY = 20;
                    }

                    doc.text("AI Recommendations", 14, finalY);

                    const recsData = data.aiRecommendations.map(r => [
                        r.title,
                        r.impact,
                        r.reasoning
                    ]);

                    autoTable(doc, {
                        startY: finalY + 5,
                        head: [['Recommendation', 'Impact', 'Reasoning']],
                        body: recsData,
                        theme: 'grid',
                        headStyles: { fillColor: [147, 51, 234] }, // Purple for AI
                        columnStyles: {
                            0: { cellWidth: 40 },
                            1: { cellWidth: 60 },
                            2: { cellWidth: 'auto' }
                        }
                    });

                    doc.save(`${sanitizedSprintName}_${timestamp}.pdf`);
                });
            }

            setCompleted(type);
            setIsExporting(null);

            // Close modal after short delay
            setTimeout(() => {
                setCompleted(null);
                onClose();
            }, 1500);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Export Report</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-slate-600 mb-4">
                                Choose a format to download your sprint health report.
                            </p>

                            <button
                                onClick={() => handleExport('csv')}
                                disabled={!!isExporting}
                                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group cursor-pointer disabled:cursor-not-allowed ${completed === 'csv'
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${completed === 'csv' ? 'bg-green-100 text-green-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        <FileSpreadsheet size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-slate-900">Excel Spreadsheet</div>
                                        <div className="text-sm text-slate-500">Multi-sheet report (.xlsx)</div>
                                    </div>
                                </div>
                                {isExporting === 'csv' ? (
                                    <Loader2 size={24} className="text-indigo-600 animate-spin" />
                                ) : completed === 'csv' ? (
                                    <Check size={24} className="text-green-600" />
                                ) : (
                                    <Download size={24} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                )}
                            </button>

                            <button
                                onClick={() => handleExport('pdf')}
                                disabled={!!isExporting}
                                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group cursor-pointer disabled:cursor-not-allowed ${completed === 'pdf'
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${completed === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        <FileText size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-slate-900">PDF Document</div>
                                        <div className="text-sm text-slate-500">Formatted report for sharing</div>
                                    </div>
                                </div>
                                {isExporting === 'pdf' ? (
                                    <Loader2 size={24} className="text-indigo-600 animate-spin" />
                                ) : completed === 'pdf' ? (
                                    <Check size={24} className="text-green-600" />
                                ) : (
                                    <Download size={24} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
