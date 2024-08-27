export class DateUtils {
    static getNextXDays(x: number): Date {
        const date = new Date()
        date.setDate(x)
        return date
    }

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

    static timestampToDate(timestamp: number | string): Date {
        if (typeof timestamp === 'number') {
            timestamp = timestamp.toString()
        }
        if (timestamp.length === 10) {
            return new Date(parseInt(timestamp) * 1000)
        } else if (timestamp.length === 13) {
            return new Date(parseInt(timestamp))
        } else {
            throw new Error('invalid timestamp length: ' + timestamp.length)
        }
    }

    static async sleep(ms: number): Promise<unknown> {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}