export interface ViewTask {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    dueDate: Date;
    finishedAt: Date;
}