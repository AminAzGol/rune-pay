export class SchedulerJob {
    name: string
    cronExpression: string
    lastExecution?: Date
}