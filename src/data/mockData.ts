export interface SprintStory {
    id: string;
    title: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    riskLevel: 'Low' | 'Medium' | 'High';
    aiReason: string;
    assignee: string;
}

export interface DeveloperWorkload {
    name: string;
    commits: number;
    prs: number;
    stories: number;
    burnoutRisk: 'Low' | 'Medium' | 'High';
}

export interface SprintData {
    healthScore: number;
    sprintName: string;
    daysRemaining: number;
    burnoutRisk: {
        level: 'Low' | 'Medium' | 'High';
        trend: 'up' | 'down' | 'stable';
        value: string;
    };
    deliveryRisk: {
        level: 'Low' | 'Medium' | 'High';
        atRiskStories: number;
    };
    workloadBalance: {
        status: 'Balanced' | 'Uneven' | 'Critical';
    };
    burnoutTrend: { day: string; riskScore: number }[];
    stories: SprintStory[];
    developers: DeveloperWorkload[];
    aiRecommendations: string[];
}

export const mockSprintData: SprintData = {
    healthScore: 72,
    sprintName: "Sprint 24.12 - Core Features",
    daysRemaining: 4,
    burnoutRisk: {
        level: 'Medium',
        trend: 'up',
        value: '15%',
    },
    deliveryRisk: {
        level: 'High',
        atRiskStories: 3,
    },
    workloadBalance: {
        status: 'Uneven',
    },
    burnoutTrend: [
        { day: 'Day 1', riskScore: 20 },
        { day: 'Day 2', riskScore: 25 },
        { day: 'Day 3', riskScore: 30 },
        { day: 'Day 4', riskScore: 45 },
        { day: 'Day 5', riskScore: 55 },
        { day: 'Day 6', riskScore: 68 },
        { day: 'Day 7', riskScore: 75 },
    ],
    stories: [
        {
            id: 'ABC-123',
            title: 'User Authentication Flow',
            status: 'In Progress',
            riskLevel: 'High',
            aiReason: 'High churn in commits (12 files changed 5 times)',
            assignee: 'Sarah J.',
        },
        {
            id: 'ABC-129',
            title: 'Payment Gateway Integration',
            status: 'In Progress',
            riskLevel: 'High',
            aiReason: 'Blocked for 4 days on external dependency',
            assignee: 'Mike T.',
        },
        {
            id: 'ABC-134',
            title: 'Dashboard Analytics',
            status: 'Review',
            riskLevel: 'Medium',
            aiReason: 'PR open for 48h with no reviews',
            assignee: 'David L.',
        },
        {
            id: 'ABC-142',
            title: 'Profile Settings',
            status: 'Done',
            riskLevel: 'Low',
            aiReason: 'Completed ahead of schedule',
            assignee: 'Emily R.',
        },
        {
            id: 'ABC-145',
            title: 'Email Notifications',
            status: 'To Do',
            riskLevel: 'Medium',
            aiReason: 'Last-minute scope increase detected',
            assignee: 'Sarah J.',
        },
    ],
    developers: [
        { name: 'Sarah J.', commits: 45, prs: 8, stories: 3, burnoutRisk: 'High' },
        { name: 'Mike T.', commits: 32, prs: 5, stories: 2, burnoutRisk: 'Medium' },
        { name: 'David L.', commits: 12, prs: 2, stories: 1, burnoutRisk: 'Low' },
        { name: 'Emily R.', commits: 15, prs: 3, stories: 1, burnoutRisk: 'Low' },
    ],
    aiRecommendations: [
        "Reassign 'Email Notifications' (ABC-145) from Sarah J. to David L. to balance workload.",
        "Consider de-scoping 'Payment Gateway' (ABC-129) or swarming to unblock.",
        "Encourage cooldown time for Sarah J. due to sustained late-night activity.",
    ]
};
