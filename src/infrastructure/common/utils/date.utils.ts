export class DateUtils {
    static getNextXHours(x: number): Date {
        const date = new Date()
        date.setHours(x)
        return date
    }
}