import { DateTimeExpressionKeyValues, DateTimeExpressionType } from "../../context/UiParams/type";

export class DateTime {
    private date: Date;

    constructor(date: Date) {
        this.date = date;
    }

    public addDay(day: number): DateTime {
        const nextDate = this.date.getDate();
        this.date.setDate(nextDate + day);
        return this;
    }

    public toDateString(expressionType: DateTimeExpressionType): string {
        switch (expressionType) {
            case DateTimeExpressionKeyValues.yyyyMMdd:
                return this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
            default:
                return "";
        }
    }

    public static Now() {
        return new DateTime(new Date());
    }

    public toDate(): Date {
        return this.date;
    }

    public toUTC() {

    }

    public setLocalTimeZone(timeZone: number): DateTime {
        const hour = Math.floor(timeZone);
        const minutes = timeZone - hour
        return this;
    }
}