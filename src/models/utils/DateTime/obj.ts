export class DateTime {
    private date: Date;

    constructor() {
        this.date = new Date();
    }

    public addDay(day: number): DateTime {
        const nextDate = this.date.getDate();
        this.date.setDate(nextDate + day);
        return this;
    }

    public getDate(): Date {
        return this.date;
    }

    public static Now() {
        return new DateTime();
    }
}