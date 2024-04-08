export interface Project
{
    id: string;
    name: string;
    description?: string;
    projectManagerID: string;
    projectManagerName: string;
    clientId: string;
    clientName: string;
    clientEmail: string;
    brief?: string;
    purpose?: string;
    goal?: string;
    objective?: string;
    totalBudget?: string;
    membersAssociated: number;
    status?: string;
    creationTime: string;
}