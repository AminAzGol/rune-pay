export class DateUtils {
    static getNextXHours(x: number): Date {
        const date = new Date()
        date.setHours(x)
        return date
    }

    static getNextXMinutes(x: number): Date {
        const date = new Date()
        date.setMinutes(x)
        return date
    }
}