export interface SprintStory {
    id: string;
    title: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    riskLevel: 'Low' | 'Medium' | 'High';
    aiReason: string;
    assignee: string;
    aiAnalysisDetail?: string;
    impact?: string;
    suggestedAction?: string;
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
    endDate: string;
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
    aiRecommendations: {
        id: string;
        title: string;
        description: string;
        impact: string;
        reasoning: string;
        steps: string[];
    }[];
}

// Helper to format dates
const today = new Date();
const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
const getSprintName = () => {
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    return `Sprint ${year}.${month} - Core Features`;
};

// Calculate dynamic end date (4 days from now)
const endDate = new Date(today);
endDate.setDate(today.getDate() + 4);

export const mockSprintData: SprintData = {
    healthScore: 72,
    sprintName: getSprintName(),
    daysRemaining: 4,
    endDate: formatDate(endDate),
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
        { day: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }), riskScore: 20 },
        { day: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }), riskScore: 25 },
        { day: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }), riskScore: 30 },
        { day: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }), riskScore: 45 },
        { day: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }), riskScore: 55 },
        { day: 'Yesterday', riskScore: 68 },
        { day: 'Today', riskScore: 75 },
    ],
    stories: [
        {
            id: 'ABC-123',
            title: 'User Authentication Flow',
            status: 'In Progress',
            riskLevel: 'High',
            aiReason: 'High churn in commits (12 files changed 5 times)',
            assignee: 'Sarah J.',
            aiAnalysisDetail: 'The authentication module has seen 12 files changed 5 times in the last 24 hours, indicating potential architectural uncertainty or regression loops. This pattern often precedes integration failures.',
            impact: 'High risk of breaking login functionality for 100% of users.',
            suggestedAction: 'Conduct an immediate code review with a senior architect to stabilize the interface.',
        },
        {
            id: 'ABC-129',
            title: 'Payment Gateway Integration',
            status: 'In Progress',
            riskLevel: 'High',
            aiReason: 'Blocked for 4 days on external dependency',
            assignee: 'Mike T.',
            aiAnalysisDetail: 'Dependency on the "Stripe API Wrapper" v2.1 has been pending for 4 days. No alternative path has been identified in the code.',
            impact: 'Delays payment processing feature, a core deliverable for this sprint.',
            suggestedAction: 'Escalate to the platform team or mock the dependency to proceed with UI development.',
        },
        {
            id: 'ABC-134',
            title: 'Dashboard Analytics',
            status: 'Review',
            riskLevel: 'Medium',
            aiReason: 'PR open for 48h with no reviews',
            assignee: 'David L.',
            aiAnalysisDetail: 'Pull Request #402 has been open for 48 hours without any reviewer activity. The code complexity is low, suggesting it might have been overlooked.',
            impact: 'Minor delay in merging, but could stack up with other pending PRs.',
            suggestedAction: 'Nudge the team in the daily standup or assign a specific reviewer.',
        },
        {
            id: 'ABC-142',
            title: 'Profile Settings',
            status: 'Done',
            riskLevel: 'Low',
            aiReason: 'Completed ahead of schedule',
            assignee: 'Emily R.',
            aiAnalysisDetail: 'Task completed 2 days ahead of the estimated timeline with 100% test coverage.',
            impact: 'Positive impact on sprint velocity.',
            suggestedAction: 'No action needed. Consider assigning a stretch goal.',
        },
        {
            id: 'ABC-145',
            title: 'Email Notifications',
            status: 'To Do',
            riskLevel: 'Medium',
            aiReason: 'Last-minute scope increase detected',
            assignee: 'Sarah J.',
            aiAnalysisDetail: '3 new sub-tasks were added to this story in the last 6 hours, increasing the estimated effort by 40%.',
            impact: 'Risk of spillover if not re-prioritized.',
            suggestedAction: 'Review the new requirements with the Product Owner to confirm necessity for this sprint.',
        },
    ],
    developers: [
        { name: 'Sarah J.', commits: 45, prs: 8, stories: 3, burnoutRisk: 'High' },
        { name: 'Mike T.', commits: 32, prs: 5, stories: 2, burnoutRisk: 'Medium' },
        { name: 'David L.', commits: 12, prs: 2, stories: 1, burnoutRisk: 'Low' },
        { name: 'Emily R.', commits: 15, prs: 3, stories: 1, burnoutRisk: 'Low' },
    ],
    aiRecommendations: [
        {
            id: 'rec-1',
            title: "Reassign 'Email Notifications'",
            description: "Reassign 'Email Notifications' (ABC-145) from Sarah J. to David L. to balance workload.",
            impact: "Reduces Sarah J.'s load by 15% and utilizes David L.'s available capacity.",
            reasoning: "Sarah J. has 3 active stories and high burnout risk. David L. has completed his sprint goals and has bandwidth.",
            steps: [
                "Update assignee field in Jira for ABC-145",
                "Notify Sarah J. and David L. via Slack",
                "Schedule brief context transfer meeting"
            ]
        },
        {
            id: 'rec-2',
            title: "De-scope 'Payment Gateway'",
            description: "Consider de-scoping 'Payment Gateway' (ABC-129) or swarming to unblock.",
            impact: "Increases probability of delivering core sprint goals from 65% to 92%.",
            reasoning: "External dependency is blocked with no ETA. Continuing to wait puts the entire sprint release at risk.",
            steps: [
                "Move ABC-129 to Backlog",
                "Flag for discussion in next Sprint Planning",
                "Notify stakeholders of scope change"
            ]
        },
        {
            id: 'rec-3',
            title: "Cooldown for Sarah J.",
            description: "Encourage cooldown time for Sarah J. due to sustained late-night activity.",
            impact: "Reduces immediate burnout risk and improves long-term retention.",
            reasoning: "Detected commits between 10 PM and 2 AM for 3 consecutive days.",
            steps: [
                "Suggest taking tomorrow morning off",
                "Review current deadlines to remove immediate pressure",
                "Check in 1:1 regarding workload sustainability"
            ]
        },
    ]
};
